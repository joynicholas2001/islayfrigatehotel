const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const Razorpay = require('razorpay');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_mock_key');
const crypto = require('crypto');

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_mock_id',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'rzp_test_mock_secret',
});

// Mock Email Service
const sendMockEmail = (to, subject, body) => {
    console.log('--- MOCK EMAIL SENT ---');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${body}`);
    console.log('-----------------------');
};

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Basic Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Islay Frigate Hotel API is running' });
});

// Rooms Route
app.get('/api/rooms', async (req, res) => {
    try {
        const rooms = await prisma.room.findMany();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch rooms' });
    }
});

// Booking Route
app.post('/api/bookings', async (req, res) => {
    try {
        const {
            roomId,
            guestName,
            guestEmail,
            checkIn,
            checkOut,
            totalAmount
        } = req.body;

        const bookingId = `BK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        const booking = await prisma.booking.create({
            data: {
                bookingId,
                roomId,
                guestName,
                guestEmail,
                checkIn: new Date(checkIn),
                checkOut: new Date(checkOut),
                totalAmount,
            },
        });

        // Trigger Mock Email
        sendMockEmail(
            guestEmail,
            'Booking Confirmation - Islay Frigate Hotel',
            `Dear ${guestName}, your booking ${bookingId} has been created and is pending payment.`
        );

        res.status(201).json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create booking' });
    }
});

// Payment: Create Razorpay Order
app.post('/api/payments/razorpay/order', async (req, res) => {
    try {
        const { amount, bookingId } = req.body;
        const options = {
            amount: Math.round(amount * 100), // amount in the smallest currency unit (paise)
            currency: "INR",
            receipt: bookingId,
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create Razorpay order' });
    }
});

// Payment: Verify Razorpay Payment
app.post('/api/payments/razorpay/verify', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'rzp_test_mock_secret')
            .update(body.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            await prisma.booking.update({
                where: { bookingId },
                data: { status: 'CONFIRMED', paymentStatus: 'PAID', paymentId: razorpay_payment_id },
            });
            res.json({ status: 'success' });
        } else {
            res.status(400).json({ status: 'failure' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Verification failed' });
    }
});

// Payment: Create Stripe Checkout Session (Simplified for demo)
app.post('/api/payments/stripe/create-intent', async (req, res) => {
    try {
        const { amount, bookingId } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: 'usd',
            metadata: { bookingId },
        });
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create Stripe intent' });
    }
});

// Guest: Manage Booking
app.get('/api/guest/booking/:bookingId', async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { email } = req.query;

        const booking = await prisma.booking.findFirst({
            where: {
                bookingId: bookingId,
                guestEmail: email
            },
            include: { room: true }
        });

        if (!booking) {
            return res.status(404).json({ error: 'Booking not found or email mismatch' });
        }

        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch booking' });
    }
});

// Admin: Get all bookings
app.get('/api/admin/bookings', async (req, res) => {
    try {
        const bookings = await prisma.booking.findMany({
            include: { room: true },
            orderBy: { createdAt: 'desc' },
        });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
});

// Admin: Update booking status
app.patch('/api/admin/bookings/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const booking = await prisma.booking.update({
            where: { id },
            data: { status },
        });

        // Mock Email for status update
        const guestEmail = booking.guestEmail;
        sendMockEmail(
            guestEmail,
            `Booking Status Updated - ${booking.status}`,
            `Dear ${booking.guestName}, your booking ${booking.bookingId} is now ${booking.status}.`
        );

        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update status' });
    }
});

// Admin: Dashboard Stats
app.get('/api/admin/stats', async (req, res) => {
    try {
        const totalBookings = await prisma.booking.count();
        const paidBookings = await prisma.booking.findMany({
            where: { paymentStatus: 'PAID' },
        });
        const revenue = paidBookings.reduce((sum, b) => sum + b.totalAmount, 0);

        const totalRooms = await prisma.room.count();
        const availableRooms = await prisma.room.count({
            where: { isAvailable: true },
        });

        const recentBookings = await prisma.booking.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: { room: true },
        });

        res.json({
            totalBookings,
            revenue,
            totalRooms,
            availableRooms,
            recentBookings,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
