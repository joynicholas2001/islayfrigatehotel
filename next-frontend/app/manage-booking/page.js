'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageBookingPage = () => {
    const [bookingId, setBookingId] = useState('');
    const [email, setEmail] = useState('');
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            if (bookingId.startsWith('IFH')) {
                setBooking({
                    id: bookingId,
                    email: email,
                    room: "Premium Sea View Suite",
                    checkIn: "Dec 24, 2025",
                    checkOut: "Dec 28, 2025",
                    guests: 2,
                    total: 1450.00,
                    status: "Confirmed"
                });
                toast.success("Reservation located");
            } else {
                toast.error("Reservation not found. Please verify your ID.");
            }
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="pt-24 pb-24 min-h-screen bg-white font-light">
            <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">

                {!booking ? (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-3xl mx-auto text-center py-20"
                    >
                        <span className="text-primary uppercase tracking-[0.6em] font-bold mb-10 block text-[10px]">Guest Services</span>
                        <h1 className="text-5xl md:text-7xl font-serif text-secondary mb-16 italic">Manage Your <span className="text-primary">Stay</span></h1>

                        <div className="bg-[#FAF9F6] p-12 md:p-20 luxury-shadow relative overflow-hidden">
                            <form onSubmit={handleSearch} className="space-y-12">
                                <div className="space-y-4 text-left group">
                                    <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-gray-400 ml-1">Reservation Identifier</label>
                                    <div className="relative">
                                        <input
                                            required
                                            type="text"
                                            placeholder="IFH-XXXXXXX"
                                            value={bookingId}
                                            onChange={(e) => setBookingId(e.target.value.toUpperCase())}
                                            className="w-full bg-transparent border-b border-black/10 py-6 focus:outline-none focus:border-primary transition-all text-lg"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 text-left group">
                                    <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-gray-400 ml-1">Electronic Mail Address</label>
                                    <div className="relative">
                                        <input
                                            required
                                            type="email"
                                            placeholder="your@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-transparent border-b border-black/10 py-6 focus:outline-none focus:border-primary transition-all text-lg"
                                        />
                                    </div>
                                </div>

                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="bg-secondary text-white py-5 px-10 text-[10px] font-bold uppercase tracking-[0.3em] w-full hover:bg-primary transition-all flex items-center justify-center gap-4 mt-8 disabled:opacity-50"
                                >
                                    <span>{loading ? "Locating Stay..." : "Retrieve Reservation"}</span>
                                    <ArrowRight size={14} className="transition-all" />
                                </button>
                            </form>
                        </div>
                        <p className="mt-12 text-gray-400 text-xs font-light italic tracking-wide">Cannot locate your identifier? Please contact our 24/7 concierge desk.</p>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-[1200px] mx-auto py-20"
                    >
                        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
                            <div className="space-y-4">
                                <span className="text-primary uppercase tracking-[0.5em] font-bold text-[10px]">Confirmed Reservation</span>
                                <h1 className="text-5xl font-serif text-secondary italic leading-tight">Your Retreat Details</h1>
                                <p className="text-gray-400 font-bold tracking-[0.2em] text-[10px] uppercase">IFH Identifier: {booking.id}</p>
                            </div>
                            <div className="flex gap-8">
                                <button onClick={() => toast.success("Document Generation Initiated")} className="text-[10px] uppercase tracking-[0.4em] font-bold text-secondary flex items-center gap-3 hover:text-primary transition-all underline underline-offset-8">
                                    <Download size={14} /> Download Invitation
                                </button>
                                <button onClick={() => setBooking(null)} className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400 flex items-center gap-3 hover:text-secondary transition-all">
                                    <ArrowLeft size={14} /> New Search
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
                            {/* Detailed Info */}
                            <div className="lg:col-span-8 space-y-24">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16">
                                    <div className="space-y-4 border-l border-primary/20 pl-8">
                                        <h4 className="text-[9px] uppercase tracking-[0.4em] font-bold text-gray-400">Selected Suite</h4>
                                        <p className="text-2xl font-serif text-secondary italic">{booking.room}</p>
                                    </div>
                                    <div className="space-y-4 border-l border-primary/20 pl-8">
                                        <h4 className="text-[9px] uppercase tracking-[0.4em] font-bold text-gray-400">Reservation Status</h4>
                                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-green-600 bg-green-50 px-4 py-2">
                                            {booking.status}
                                        </span>
                                    </div>
                                    <div className="space-y-4 border-l border-primary/20 pl-8">
                                        <h4 className="text-[9px] uppercase tracking-[0.4em] font-bold text-gray-400">Arrival</h4>
                                        <div className="flex items-center gap-4 text-secondary font-serif text-xl italic">
                                            {booking.checkIn}
                                        </div>
                                    </div>
                                    <div className="space-y-4 border-l border-primary/20 pl-8">
                                        <h4 className="text-[9px] uppercase tracking-[0.4em] font-bold text-gray-400">Departure</h4>
                                        <div className="flex items-center gap-4 text-secondary font-serif text-xl italic">
                                            {booking.checkOut}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#FAF9F6] p-16 space-y-10 luxury-shadow">
                                    <h4 className="text-[10px] uppercase tracking-[0.5em] font-bold text-primary italic">Concierge Adjustments</h4>
                                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                                        <p className="text-gray-500 text-sm italic font-light max-w-md">Modifications to your stay are handled with personal care by our harbour frontage team.</p>
                                        <button onClick={() => toast("Adjustment Request Sent", { icon: "🔔" })} className="bg-secondary text-white py-5 px-12 text-[10px] font-bold uppercase tracking-[0.3em] whitespace-nowrap hover:bg-primary transition-all">
                                            Request Amendment
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar Actions */}
                            <div className="lg:col-span-4 space-y-12">
                                <div className="border border-black/5 p-12 space-y-12">
                                    <h3 className="text-[10px] uppercase tracking-[0.5em] font-bold text-secondary italic border-b border-black/5 pb-8">Policies</h3>

                                    <div className="space-y-10 font-light">
                                        <div className="space-y-4">
                                            <h4 className="text-[9px] uppercase tracking-[0.3em] font-bold text-gray-400">Check-In Registry</h4>
                                            <p className="text-sm italic text-secondary">3:00 PM Arrival</p>
                                        </div>
                                        <div className="space-y-4">
                                            <h4 className="text-[9px] uppercase tracking-[0.3em] font-bold text-gray-400">Check-Out Departure</h4>
                                            <p className="text-sm italic text-secondary">11:00 AM Farewell</p>
                                        </div>
                                    </div>

                                    <button onClick={() => toast.error("Cancellation requires direct concierge contact.")} className="w-full text-left group flex items-center justify-between pt-12 border-t border-black/5">
                                        <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-gray-400 group-hover:text-red-500 transition-all flex items-center gap-3">
                                            <Trash2 size={12} strokeWidth={1.5} /> Relinquish Reservation
                                        </span>
                                        <ArrowRight size={12} className="text-gray-300 group-hover:text-red-500 transition-all" />
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

export default ManageBookingPage;
