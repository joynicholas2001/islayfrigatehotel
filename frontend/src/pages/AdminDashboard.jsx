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

const AdminDashboard = () => {
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
        <div className="min-h-screen bg-secondary text-white pt-24">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Sidebar */}
                    <div className="lg:col-span-3 xl:col-span-2 space-y-12">
                        <div>
                            <h2 className="text-2xl font-serif italic mb-8 border-l-2 border-primary pl-4">Admin Suite</h2>
                            <nav className="space-y-1">
                                <TabButton id="overview" label="Dashboard" icon={LayoutDashboard} />
                                <TabButton id="rooms" label="Manage Rooms" icon={BedDouble} />
                                <TabButton id="bookings" label="Reservations" icon={CalendarCheck} />
                                <TabButton id="settings" label="System Settings" icon={Settings} />
                            </nav>
                        </div>

                        <div className="p-6 bg-white/5 border border-white/10 rounded-sm">
                            <p className="text-[10px] uppercase font-bold text-primary mb-2">Access Status</p>
                            <div className="flex items-center gap-2 text-green-400 text-xs">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                Secure Session Active
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-9 xl:col-span-10">
                        {activeTab === 'overview' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <h3 className="text-4xl font-serif italic mb-2">Welcome Back, Manager</h3>
                                        <p className="text-gray-400 text-sm font-light">Here's what's happening at Islay Frigate today.</p>
                                    </div>
                                    <button onClick={() => toast.success("Exporting Data...")} className="flex items-center gap-2 bg-primary px-6 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-primary-hover transition-all">
                                        <Download size={14} /> Export Reports
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                                    {stats.map((stat, i) => (
                                        <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-sm hover:bg-white/[0.07] transition-all group">
                                            <div className={`${stat.color} w-10 h-10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                                {stat.icon}
                                            </div>
                                            <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-1">{stat.label}</p>
                                            <p className="text-3xl font-serif font-bold italic">{stat.value}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-white/5 border border-white/10 p-8">
                                    <h4 className="text-xl font-serif italic mb-8 flex justify-between">
                                        Recent Activity
                                        <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Real-time update</span>
                                    </h4>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="border-b border-white/10 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                                                    <th className="pb-4">Booking ID</th>
                                                    <th className="pb-4">Guest</th>
                                                    <th className="pb-4">Room Type</th>
                                                    <th className="pb-4">Stay</th>
                                                    <th className="pb-4">Status</th>
                                                    <th className="pb-4">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {bookings.map((b) => (
                                                    <tr key={b.id} className="group">
                                                        <td className="py-6 font-mono text-xs text-primary">{b.id}</td>
                                                        <td className="py-6 font-medium">{b.guest}</td>
                                                        <td className="py-6 text-gray-400 font-light italic">{b.room}</td>
                                                        <td className="py-6 text-xs">{b.dates}</td>
                                                        <td className="py-6">
                                                            <span className="px-2 py-1 bg-white/10 text-[10px] font-bold uppercase tracking-widest rounded-sm">{b.status}</span>
                                                        </td>
                                                        <td className="py-6">
                                                            <button className="text-gray-500 hover:text-white"><ChevronRight size={18} /></button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'rooms' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                                <h3 className="text-3xl font-serif italic">Room Management</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                    {rooms.map(room => (
                                        <div key={room.id} className="bg-white/5 border border-white/10 p-8 space-y-6">
                                            <div className="flex justify-between items-start">
                                                <h4 className="text-xl font-serif italic">{room.name}</h4>
                                                {room.status === 'Available' ? <Unlock size={18} className="text-green-400" /> : <Lock size={18} className="text-red-400" />}
                                            </div>
                                            <div className="flex justify-between items-center border-y border-white/5 py-4">
                                                <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Base Rate</p>
                                                <p className="text-xl font-serif italic text-primary">{room.price}</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 pt-2">
                                                <button onClick={() => toast.success("Pricing Updated")} className="bg-white/5 hover:bg-white/10 py-3 text-[10px] font-bold uppercase tracking-widest transition-all">Adjust Price</button>
                                                <button onClick={() => toast.success("Calendar Status Updated")} className={`py-3 text-[10px] font-bold uppercase tracking-widest transition-all ${room.status === 'Available' ? 'bg-red-500/20 text-red-400 hover:bg-red-500/40' : 'bg-green-500/20 text-green-400 hover:bg-green-500/40'}`}>
                                                    {room.status === 'Available' ? 'Block Dates' : 'Unblock'}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'bookings' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-3xl font-serif italic">Reservation Ledger</h3>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                                        <input type="text" placeholder="Search Guest Name or ID..." className="bg-white/5 border border-white/10 pl-10 pr-4 py-3 text-xs w-64 focus:ring-1 focus:ring-primary outline-none transition-all" />
                                    </div>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-8 text-center py-24 italic text-gray-500">
                                    Expanded Booking Ledger Placeholder - Real-time data sync required for full view.
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="py-24 text-center space-y-6">
                                <Settings size={48} className="mx-auto text-primary animate-spin-slow" />
                                <h3 className="text-2xl font-serif italic">Global Property Settings</h3>
                                <p className="text-gray-500 max-w-md mx-auto">This area is reserved for core system configurations, payment gateway keys, and channel management integrations.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <style jsx>{`
                .animate-spin-slow {
                    animation: spin 8s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
