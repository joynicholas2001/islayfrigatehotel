import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Mail, CreditCard, ChevronRight, Check } from 'lucide-react';
import { fetchRooms, createBooking, createRazorpayOrder, verifyRazorpayPayment, createStripeIntent } from '../api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
    const [step, setStep] = useState(1);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        roomId: '',
        checkIn: '',
        checkOut: '',
        guests: 1,
        name: '',
        email: '',
        paymentMethod: 'razorpay', // default
    });
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const getRooms = async () => {
            try {
                const response = await fetchRooms();
                setRooms(response.data);
            } catch (err) {
                toast.error('Could not load rooms. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        getRooms();
    }, []);

    const calculateNights = () => {
        if (!formData.checkIn || !formData.checkOut) return 0;
        const start = new Date(formData.checkIn);
        const end = new Date(formData.checkOut);
        const diff = end - start;
        return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    };

    const nights = calculateNights();
    const subtotal = selectedRoom ? selectedRoom.price * nights : 0;
    const taxes = subtotal * 0.12; // 12% tax
    const serviceFee = selectedRoom ? 25 : 0;
    const totalAmount = subtotal + taxes + serviceFee;

    const handleNext = () => {
        if (step === 1) {
            if (!formData.roomId) return toast.error('Please select a room');
            if (!formData.checkIn || !formData.checkOut) return toast.error('Please select dates');
            if (nights <= 0) return toast.error('Check-out must be after check-in');
        }
        if (step === 2) {
            if (!formData.name || !formData.email) return toast.error('Please fill in all details');
        }
        setStep(step + 1);
    };

    const handleRazorpayPayment = async (order, bookingId) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_mock_id',
            amount: order.amount,
            currency: order.currency,
            name: "Islay Frigate Hotel",
            description: "Luxury Room Reservation",
            order_id: order.id,
            handler: async (response) => {
                try {
                    const verifyRes = await verifyRazorpayPayment({
                        ...response,
                        bookingId
                    });
                    if (verifyRes.data.status === 'success') {
                        toast.success('Payment verified successfully!');
                        setStep(4);
                    }
                } catch (err) {
                    toast.error('Payment verification failed. Please contact support.');
                }
            },
            prefill: {
                name: formData.name,
                email: formData.email,
            },
            theme: {
                color: "#c19b76",
            },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            // 1. Create Initial Booking
            const bookingRes = await createBooking({
                ...formData,
                guestName: formData.name,
                guestEmail: formData.email,
                totalAmount,
                checkIn: new Date(formData.checkIn).toISOString(),
                checkOut: new Date(formData.checkOut).toISOString(),
            });

            const bookingId = bookingRes.data.bookingId;

            if (formData.paymentMethod === 'razorpay') {
                // 2. Create Razorpay Order
                const orderRes = await createRazorpayOrder({
                    amount: totalAmount,
                    bookingId
                });
                handleRazorpayPayment(orderRes.data, bookingId);
            } else {
                // Stripe Flow (Simplified Mock for now)
                toast.loading('Initializing Stripe Secure Payment...');
                setTimeout(() => {
                    toast.dismiss();
                    toast.success('Stripe Payment Successful (Mock)');
                    setStep(4);
                }, 2000);
            }
        } catch (err) {
            toast.error('Process failed. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="pt-24 pb-24 min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Stepper */}
                <div className="flex justify-between items-center mb-16 relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>
                    {[1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-luxury ${step >= s ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
                                }`}
                        >
                            {step > s ? <Check size={20} /> : s}
                        </div>
                    ))}
                </div>

                {step === 4 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20"
                    >
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Check size={40} />
                        </div>
                        <h2 className="text-4xl font-serif text-secondary mb-4">Reservation Confirmed</h2>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            Your stay at Islay Frigate has been booked. A confirmation email has been sent to your address.
                        </p>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="bg-secondary text-white px-10 py-3 rounded-sm uppercase tracking-widest text-sm hover:bg-primary transition-colors"
                        >
                            Back to Home
                        </button>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Form Area */}
                        <div className="md:col-span-2">
                            <form onSubmit={step === 3 ? handleSubmit : (e) => e.preventDefault()}>
                                {step === 1 && (
                                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                                        <h2 className="text-3xl font-serif text-secondary mb-8">Select Room & Dates</h2>
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">Choose a Room</label>
                                                <select
                                                    value={formData.roomId}
                                                    onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
                                                    className="w-full border-gray-200 focus:border-primary focus:ring-primary rounded-sm py-3 transition-all"
                                                >
                                                    <option value="">Select a room...</option>
                                                    {rooms.map(room => (
                                                        <option key={room.id} value={room.id}>{room.name} - ${room.price}/night</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">Check-In</label>
                                                    <input
                                                        type="date"
                                                        value={formData.checkIn}
                                                        onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                                                        className="w-full border-gray-200 focus:border-primary focus:ring-primary rounded-sm py-3"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">Check-Out</label>
                                                    <input
                                                        type="date"
                                                        value={formData.checkOut}
                                                        onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                                                        className="w-full border-gray-200 focus:border-primary focus:ring-primary rounded-sm py-3"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                                        <h2 className="text-3xl font-serif text-secondary mb-8">Personal Information</h2>
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">Full Name</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full border-gray-200 focus:border-primary focus:ring-primary rounded-sm py-3"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">Email Address</label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full border-gray-200 focus:border-primary focus:ring-primary rounded-sm py-3"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                                        <h2 className="text-3xl font-serif text-secondary mb-8">Payment Method</h2>
                                        <div className="space-y-4">
                                            <div
                                                onClick={() => setFormData({ ...formData, paymentMethod: 'razorpay' })}
                                                className={`p-6 border rounded-sm cursor-pointer transition-all ${formData.paymentMethod === 'razorpay' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'}`}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-4">
                                                        <CreditCard className={formData.paymentMethod === 'razorpay' ? 'text-primary' : 'text-gray-400'} />
                                                        <div>
                                                            <p className="font-medium text-secondary">Razorpay</p>
                                                            <p className="text-sm text-gray-500">Pay via Cards, UPI, or Netbanking (INR)</p>
                                                        </div>
                                                    </div>
                                                    {formData.paymentMethod === 'razorpay' && <Check className="text-primary" />}
                                                </div>
                                            </div>

                                            <div
                                                onClick={() => setFormData({ ...formData, paymentMethod: 'stripe' })}
                                                className={`p-6 border rounded-sm cursor-pointer transition-all ${formData.paymentMethod === 'stripe' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'}`}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-4">
                                                        <CreditCard className={formData.paymentMethod === 'stripe' ? 'text-primary' : 'text-gray-400'} />
                                                        <div>
                                                            <p className="font-medium text-secondary">Stripe</p>
                                                            <p className="text-sm text-gray-500">Pay via International Credit/Debit Cards (USD)</p>
                                                        </div>
                                                    </div>
                                                    {formData.paymentMethod === 'stripe' && <Check className="text-primary" />}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="mt-8 text-xs text-gray-400 flex items-center gap-2">
                                            <Check size={14} className="text-green-500" />
                                            Secure 256-bit SSL Encrypted Payment
                                        </p>
                                    </motion.div>
                                )}

                                <div className="mt-12 flex justify-between">
                                    {step > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => setStep(step - 1)}
                                            className="text-gray-500 font-medium uppercase tracking-widest text-sm hover:text-secondary"
                                        >
                                            Back
                                        </button>
                                    )}
                                    {step < 3 ? (
                                        <button
                                            type="button"
                                            onClick={handleNext}
                                            className="bg-secondary text-white px-10 py-3 rounded-sm uppercase tracking-widest text-sm hover:bg-primary transition-colors ml-auto"
                                        >
                                            Continue
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="bg-primary text-white px-10 py-3 rounded-sm uppercase tracking-widest text-sm hover:bg-primary-hover transition-colors ml-auto disabled:opacity-50"
                                        >
                                            {submitting ? 'Processing...' : 'Secure Payment'}
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>

                        <div className="col-span-1">
                            <div className="bg-cream p-8 rounded-sm sticky top-24 border border-primary/10">
                                <h3 className="text-xl font-serif text-secondary mb-6 border-b border-primary/20 pb-4">Booking Summary</h3>
                                {selectedRoom ? (
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Room</span>
                                            <span className="font-medium text-secondary">{selectedRoom.name}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Dates</span>
                                            <span className="font-medium text-secondary">{formData.checkIn} to {formData.checkOut}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Nights</span>
                                            <span className="font-medium text-secondary">{nights}</span>
                                        </div>
                                        <div className="pt-4 border-t border-primary/10 space-y-2">
                                            <div className="flex justify-between text-sm text-gray-600">
                                                <span>Subtotal</span>
                                                <span>${subtotal.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-sm text-gray-600">
                                                <span>Taxes & Fees (12%)</span>
                                                <span>${taxes.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-sm text-gray-600">
                                                <span>Service Fee</span>
                                                <span>${serviceFee.toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <div className="border-t border-primary/20 pt-4 flex justify-between font-bold text-xl text-secondary">
                                            <span>Total</span>
                                            <span>${totalAmount.toFixed(2)}</span>
                                        </div>

                                        {step === 1 && (
                                            <p className="text-xs text-gray-400 mt-6 italic bg-white/50 p-3 rounded-sm">
                                                * Final price includes luxury amenities and complimentary breakfast.
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-10">
                                        <Calendar className="mx-auto text-gray-300 mb-4" size={32} />
                                        <p className="text-gray-400 text-sm italic">Select a room and dates to see your luxury stay summary</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Booking;
