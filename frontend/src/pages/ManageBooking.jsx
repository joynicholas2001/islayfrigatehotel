import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, User, Mail, CreditCard, ChevronRight, Check, XCircle } from 'lucide-react';
import { fetchGuestBooking } from '../api';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';

const ManageBooking = () => {
    const [bookingId, setBookingId] = useState('');
    const [email, setEmail] = useState('');
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();

    React.useEffect(() => {
        const id = searchParams.get('id');
        const emailParam = searchParams.get('email');
        if (id && emailParam) {
            setBookingId(id);
            setEmail(emailParam);
            autoSearch(id, emailParam);
        }
    }, [searchParams]);

    const autoSearch = async (id, emailAddr) => {
        setLoading(true);
        try {
            const response = await fetchGuestBooking(id.toUpperCase(), emailAddr);
            setBooking(response.data);
        } catch (err) {
            toast.error('Auto-lookup failed. Please check details manually.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetchGuestBooking(bookingId.toUpperCase(), email);
            setBooking(response.data);
            toast.success('Booking retrieved successfully');
        } catch (err) {
            toast.error('Booking not found. Please check your ID and Email.');
            setBooking(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-24 pb-24 min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif text-secondary mb-4 italic">Manage Your Reservation</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        View details, check status, or manage your upcoming stay at Islay Frigate.
                    </p>
                </div>

                {!booking ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-md mx-auto bg-cream p-8 rounded-sm border border-primary/10 shadow-sm"
                    >
                        <form onSubmit={handleSearch} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">Booking ID</label>
                                <input
                                    type="text"
                                    required
                                    value={bookingId}
                                    onChange={(e) => setBookingId(e.target.value)}
                                    placeholder="e.g. BK-XXXXXXX"
                                    className="w-full border-gray-200 focus:border-primary focus:ring-primary rounded-sm py-3"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">Guest Email</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="john@example.com"
                                    className="w-full border-gray-200 focus:border-primary focus:ring-primary rounded-sm py-3"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-secondary text-white py-4 rounded-sm uppercase tracking-widest text-sm font-bold hover:bg-primary transition-colors flex items-center justify-center gap-2"
                            >
                                {loading ? 'Searching...' : <><Search size={18} /> Find My Booking</>}
                            </button>
                        </form>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white border border-primary/10 rounded-sm overflow-hidden shadow-xl"
                    >
                        <div className="bg-secondary p-8 text-white flex justify-between items-center">
                            <div>
                                <p className="text-primary-subtle text-sm uppercase tracking-widest mb-1">Reservation ID</p>
                                <h2 className="text-2xl font-serif">{booking.bookingId}</h2>
                            </div>
                            <div className="text-right">
                                <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border ${booking.status === 'CONFIRMED' ? 'border-green-400 text-green-400' : 'border-yellow-400 text-yellow-400'
                                    }`}>
                                    {booking.status}
                                </span>
                            </div>
                        </div>

                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Stay Details</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center text-primary">
                                                <Calendar size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 uppercase">Dates</p>
                                                <p className="text-secondary font-medium">
                                                    {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center text-primary">
                                                <User size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 uppercase">Guest</p>
                                                <p className="text-secondary font-medium">{booking.guestName}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Room Details</h3>
                                    <div className="bg-cream p-4 rounded-sm">
                                        <p className="text-secondary font-serif text-lg">{booking.room.name}</p>
                                        <p className="text-sm text-gray-500 mt-1">{booking.room.capacity} Guests Max</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Payment Summary</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Total Amount</span>
                                            <span className="font-bold text-secondary text-lg">${booking.totalAmount.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Payment Status</span>
                                            <span className={`font-medium ${booking.paymentStatus === 'PAID' ? 'text-green-600' : 'text-orange-600'}`}>
                                                {booking.paymentStatus}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8">
                                    <button
                                        onClick={() => setBooking(null)}
                                        className="text-primary font-bold text-sm uppercase tracking-widest hover:underline"
                                    >
                                        ← Look up another booking
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ManageBooking;
