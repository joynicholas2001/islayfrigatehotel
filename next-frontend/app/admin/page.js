'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    BedDouble,
    CalendarCheck,
    Settings,
    TrendingUp,
    Users,
    ChevronRight,
    Download,
    DollarSign,
    Lock,
    Unlock,
    Search
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboardPage = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const stats = [
        { label: 'Total Revenue', value: '$24,500', icon: <DollarSign />, color: 'bg-green-500' },
        { label: 'Bookings', value: '142', icon: <CalendarCheck />, color: 'bg-blue-500' },
        { label: 'Occupancy', value: '84%', icon: <TrendingUp />, color: 'bg-primary' },
        { label: 'Active Guests', value: '28', icon: <Users />, color: 'bg-purple-500' },
    ];

    const bookings = [
        { id: 'IFH-KB9A1', guest: 'John Doe', room: 'Ocean View', dates: 'Dec 24-28', status: 'Paid', amount: '$1,200' },
        { id: 'IFH-XC2P4', guest: 'Jane Smith', room: 'Deluxe Suite', dates: 'Jan 02-05', status: 'Pending', amount: '$850' },
        { id: 'IFH-MT7Y9', guest: 'Robert Ross', room: 'Classic Room', dates: 'Jan 15-18', status: 'Confirmed', amount: '$600' },
    ];

    const rooms = [
        { id: 1, name: 'Ocean View Suite', price: '$350', status: 'Available' },
        { id: 2, name: 'Deluxe King Room', price: '$280', status: 'Blocked' },
        { id: 3, name: 'Family Garden View', price: '$420', status: 'Available' },
    ];

    const TabButton = ({ id, label, icon: Icon }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-3 px-6 py-4 w-full text-left uppercase tracking-widest text-[10px] font-bold transition-all ${activeTab === id ? 'bg-primary text-white shadow-lg translate-x-1' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
        >
            <Icon size={16} /> {label}
        </button>
    );

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-end">
                <div>
                    <h3 className="text-4xl font-serif text-secondary italic mb-2">Welcome Back, Manager</h3>
                    <p className="text-gray-400 text-sm font-light">Here's what's happening at Islay Frigate today.</p>
                </div>
                <button onClick={() => toast.success("Exporting Data...")} className="flex items-center gap-2 bg-primary text-white px-6 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-secondary transition-all">
                    <Download size={14} /> Export Reports
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white border border-gray-200 p-8 shadow-sm hover:border-primary transition-all group">
                        <div className={`${stat.color} w-10 h-10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-white`}>
                            {stat.icon}
                        </div>
                        <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-1">{stat.label}</p>
                        <p className="text-3xl font-serif font-bold italic text-secondary">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white border border-gray-200 p-8 shadow-sm">
                <h4 className="text-xl font-serif text-secondary italic mb-8 flex justify-between uppercase tracking-widest">
                    Recent Activity
                    <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Real-time update</span>
                </h4>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-100 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                                <th className="pb-4">Booking ID</th>
                                <th className="pb-4">Guest</th>
                                <th className="pb-4">Room Type</th>
                                <th className="pb-4">Stay</th>
                                <th className="pb-4">Status</th>
                                <th className="pb-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {bookings.map((b) => (
                                <tr key={b.id} className="group">
                                    <td className="py-6 font-mono text-xs text-primary">{b.id}</td>
                                    <td className="py-6 font-medium text-secondary">{b.guest}</td>
                                    <td className="py-6 text-gray-400 font-light italic">{b.room}</td>
                                    <td className="py-6 text-xs text-secondary">{b.dates}</td>
                                    <td className="py-6">
                                        <span className="px-2 py-1 bg-gray-100 text-secondary text-[10px] font-bold uppercase tracking-widest rounded-sm">{b.status}</span>
                                    </td>
                                    <td className="py-6">
                                        <button className="text-gray-300 hover:text-primary"><ChevronRight size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
