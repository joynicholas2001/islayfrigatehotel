import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Banknote, BedDouble, ArrowUpRight } from 'lucide-react';
import { fetchAdminStats } from '../api';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getStats = async () => {
            try {
                const response = await fetchAdminStats();
                setStats(response.data);
            } catch (err) {
                toast.error('Failed to load dashboard statistics');
            } finally {
                setLoading(false);
            }
        };
        getStats();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-secondary font-serif italic animate-pulse">Loading Islay Frigate Dashboard...</div>
        </div>
    );

    const cards = [
        { name: 'Total Bookings', value: stats?.totalBookings || '0', icon: <Calendar size={20} />, color: 'bg-[#1a2b3c]' },
        { name: 'Total Revenue', value: `$${stats?.revenue?.toLocaleString() || '0'}`, icon: <Banknote size={20} />, color: 'bg-[#2c3e50]' },
        { name: 'Available Rooms', value: `${stats?.availableRooms} / ${stats?.totalRooms}`, icon: <BedDouble size={20} />, color: 'bg-primary' },
        { name: 'Occupancy Rate', value: `${stats?.totalRooms ? Math.round(((stats.totalRooms - stats.availableRooms) / stats.totalRooms) * 100) : 0}%`, icon: <Users size={20} />, color: 'bg-[#34495e]' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
        >
            <header>
                <h1 className="text-4xl font-serif text-secondary mb-2 italic">Dashboard Overview</h1>
                <p className="text-gray-500 tracking-wide font-light">Welcome back, Admin. Here is the latest activity for Islay Frigate.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {cards.map((stat) => (
                    <div key={stat.name} className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                        <div className="flex items-center justify-between mb-6">
                            <div className={`w-12 h-12 rounded-full text-white flex items-center justify-center ${stat.color} shadow-inner`}>
                                {stat.icon}
                            </div>
                            <span className="text-green-500 text-[10px] font-bold flex items-center gap-1 uppercase tracking-widest bg-green-50 px-2 py-1 rounded-full">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Live
                            </span>
                        </div>
                        <h3 className="text-gray-400 text-[11px] uppercase tracking-[0.2em] mb-2">{stat.name}</h3>
                        <p className="text-3xl font-serif font-bold text-secondary group-hover:text-primary transition-colors">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent Bookings Table */}
            <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                    <h2 className="text-2xl font-serif text-secondary italic">Recent Bookings</h2>
                    <button
                        onClick={() => window.location.href = '/admin/bookings'}
                        className="text-primary text-[11px] font-bold uppercase tracking-[0.2em] hover:text-secondary flex items-center gap-2 transition-colors border-b border-transparent hover:border-secondary pb-1"
                    >
                        View All <ArrowUpRight size={14} />
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-400 text-[10px] uppercase tracking-[0.2em] border-b border-gray-50">
                                <th className="px-8 py-5 font-bold">Guest</th>
                                <th className="px-8 py-5 font-bold">Room</th>
                                <th className="px-8 py-5 font-bold">Check-In</th>
                                <th className="px-8 py-5 font-bold">Status</th>
                                <th className="px-8 py-5 font-bold text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {stats?.recentBookings?.length > 0 ? (
                                stats.recentBookings.map((booking) => (
                                    <tr key={booking.id} className="text-sm text-secondary hover:bg-cream/20 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="font-medium group-hover:text-primary transition-colors">{booking.guestName}</div>
                                            <div className="text-[11px] text-gray-400 font-light mt-0.5 tracking-wide">{booking.guestEmail}</div>
                                        </td>
                                        <td className="px-8 py-6 text-xs text-gray-500 italic">{booking.room?.name}</td>
                                        <td className="px-8 py-6 text-xs text-gray-400">{new Date(booking.checkIn).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${booking.status === 'CONFIRMED' ? 'border-green-100 text-green-600 bg-green-50/50' :
                                                    booking.status === 'CANCELLED' ? 'border-red-100 text-red-600 bg-red-50/50' :
                                                        'border-orange-100 text-orange-600 bg-orange-50/50'
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right font-medium text-secondary">
                                            ${booking.totalAmount.toFixed(2)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center text-gray-400 font-serif italic tracking-wide">
                                        The reservation log is currently empty.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
};

export default AdminDashboard;
