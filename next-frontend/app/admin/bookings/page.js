'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Download, MoreVertical, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import { fetchAdminBookings, updateBookingStatus } from '@/lib/api';
import toast from 'react-hot-toast';

const AdminBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    useEffect(() => {
        getBookings();
    }, []);

    useEffect(() => {
        let result = bookings;
        if (searchTerm) {
            result = result.filter(b =>
                b.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                b.guestEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                b.bookingId.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (statusFilter !== 'All') {
            result = result.filter(b => b.status === statusFilter);
        }
        setFilteredBookings(result);
    }, [searchTerm, statusFilter, bookings]);

    const getBookings = async () => {
        try {
            const response = await fetchAdminBookings();
            setBookings(response.data);
            setFilteredBookings(response.data);
        } catch (err) {
            toast.error('Failed to load bookings');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await updateBookingStatus(id, newStatus);
            toast.success(`Booking ${newStatus.toLowerCase()} successfully`);
            getBookings();
        } catch (err) {
            toast.error('Failed to update status');
        }
    };

    const exportToCSV = () => {
        if (filteredBookings.length === 0) return toast.error('No data to export');

        const headers = ['Booking ID,Guest Name,Guest Email,Room,Check-In,Check-Out,Amount,Status,Payment'];
        const rows = filteredBookings.map(b => [
            b.bookingId,
            b.guestName,
            b.guestEmail,
            b.room?.name,
            new Date(b.checkIn).toLocaleDateString(),
            new Date(b.checkOut).toLocaleDateString(),
            b.totalAmount,
            b.status,
            b.paymentStatus
        ].join(','));

        const csvContent = headers.concat(rows).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', `islay_frigate_bookings_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast.success('Bookings exported successfully');
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-secondary font-serif italic animate-pulse">Accessing Reservation Archives...</div>
        </div>
    );

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-4xl font-serif text-secondary mb-2 italic uppercase tracking-widest">Bookings</h1>
                    <p className="text-gray-500 font-light tracking-wide">Oversee and coordinate all guest arrivals and departures.</p>
                </div>
                <button
                    onClick={exportToCSV}
                    className="flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-sm text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-sm"
                >
                    <Download size={16} />
                    <span>Export Ledger (CSV)</span>
                </button>
            </header>

            {/* Toolbar */}
            <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 justify-between items-center">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by Guest, Email or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-100 focus:border-primary focus:ring-0 rounded-sm text-sm placeholder:text-gray-300 transition-all shadow-inner bg-gray-50/30 outline-none"
                    />
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="flex-grow md:flex-grow-0 border border-gray-100 focus:border-primary focus:ring-0 rounded-sm text-xs px-6 py-3 uppercase tracking-widest font-bold text-gray-500 bg-gray-50/30 outline-none"
                    >
                        <option value="All">All Statuses</option>
                        <option value="PENDING">Pending</option>
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 text-gray-400 text-[10px] uppercase tracking-[0.2em] border-b border-gray-50">
                                <th className="px-8 py-5 font-bold">Booking ID</th>
                                <th className="px-8 py-5 font-bold">Guest</th>
                                <th className="px-8 py-5 font-bold">Stay Period</th>
                                <th className="px-8 py-5 font-bold">Payment</th>
                                <th className="px-8 py-5 font-bold">Status</th>
                                <th className="px-8 py-5 font-bold text-right">Coordination</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            <AnimatePresence>
                                {filteredBookings.length > 0 ? (
                                    filteredBookings.map((booking) => (
                                        <motion.tr
                                            key={booking.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="text-sm text-secondary hover:bg-cream/10 transition-colors group"
                                        >
                                            <td className="px-8 py-6">
                                                <span className="font-mono text-xs font-bold text-primary bg-primary/5 px-2 py-1 rounded-sm">{booking.bookingId}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="font-medium group-hover:text-primary transition-colors">{booking.guestName}</div>
                                                <div className="text-[11px] text-gray-400 font-light mt-0.5">{booking.guestEmail}</div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="text-xs text-secondary font-medium">
                                                    {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                                                </div>
                                                <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-1 italic">{booking.room?.name}</div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className={`text-[10px] font-bold uppercase tracking-wider ${booking.paymentStatus === 'PAID' ? 'text-green-600' : 'text-orange-600'}`}>
                                                    {booking.paymentStatus}
                                                </div>
                                                <div className="text-[11px] text-gray-400 mt-0.5">${booking.totalAmount.toFixed(2)}</div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${booking.status === 'CONFIRMED' ? 'border-green-100 text-green-600 bg-green-50/50' :
                                                    booking.status === 'CANCELLED' ? 'border-red-100 text-red-600 bg-red-50/50' :
                                                        'border-orange-100 text-orange-600 bg-orange-50/50'
                                                    }`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {booking.status !== 'CONFIRMED' && (
                                                        <button
                                                            onClick={() => handleStatusUpdate(booking.id, 'CONFIRMED')}
                                                            className="p-2 text-green-500 hover:bg-green-50 rounded-full transition-colors"
                                                            title="Confirm Arrival"
                                                        >
                                                            <CheckCircle size={18} />
                                                        </button>
                                                    )}
                                                    {booking.status !== 'CANCELLED' && (
                                                        <button
                                                            onClick={() => handleStatusUpdate(booking.id, 'CANCELLED')}
                                                            className="p-2 text-red-400 hover:bg-red-50 rounded-full transition-colors"
                                                            title="Cancel Reservation"
                                                        >
                                                            <XCircle size={18} />
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="group-hover:hidden">
                                                    <MoreVertical size={16} className="text-gray-300 ml-auto" />
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-8 py-20 text-center text-gray-400 font-serif italic tracking-wide">
                                            No reservations match your current selection.
                                        </td>
                                    </tr>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
};

export default AdminBookingsPage;
