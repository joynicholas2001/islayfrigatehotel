import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, BedDouble, LogOut, Settings } from 'lucide-react';

const AdminLayout = ({ children }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Basic logout logic
        navigate('/');
    };

    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
        { name: 'Room Management', icon: <BedDouble size={20} />, path: '/admin/rooms' },
        { name: 'Bookings', icon: <CalendarDays size={20} />, path: '/admin/bookings' },
        { name: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-secondary text-white flex flex-col">
                <div className="p-8 border-b border-gray-800">
                    <span className="text-xl font-serif font-bold">
                        ISLAY <span className="text-primary italic">Admin</span>
                    </span>
                </div>
                <nav className="flex-grow p-4 space-y-2 mt-4">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className="flex items-center space-x-3 p-3 rounded-sm hover:bg-gray-800 transition-colors text-sm font-medium uppercase tracking-widest"
                        >
                            <span className="text-primary">{item.icon}</span>
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 p-3 w-full text-left rounded-sm hover:bg-red-900/20 text-red-400 transition-colors text-sm font-medium uppercase tracking-widest"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-10 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
