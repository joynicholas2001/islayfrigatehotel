import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Power } from 'lucide-react';
import { fetchRooms } from '../api';
import toast from 'react-hot-toast';

const AdminRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRooms();
    }, []);

    const getRooms = async () => {
        setLoading(true);
        try {
            const response = await fetchRooms();
            setRooms(response.data);
        } catch (err) {
            toast.error('Failed to load rooms');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to remove this room from the collection?')) {
            setRooms(rooms.filter(r => r.id !== id));
            toast.success('Room removed successfully');
        }
    };

    const handleToggleStatus = (id) => {
        setRooms(rooms.map(r => r.id === id ? { ...r, isAvailable: !r.isAvailable } : r));
        toast.success('Room status updated');
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <header className="mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-serif text-secondary mb-2">Room Management</h1>
                    <p className="text-gray-500">Add, edit, or manage the status of your luxury rooms.</p>
                </div>
                <button className="flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-sm text-sm font-medium uppercase tracking-widest hover:bg-primary-hover transition-colors shadow-lg">
                    <Plus size={18} />
                    <span>Add New Room</span>
                </button>
            </header>

            {/* Rooms List */}
            <div className="grid grid-cols-1 gap-6">
                {loading ? (
                    <div className="text-center py-20">Loading rooms...</div>
                ) : (
                    rooms.map((room) => (
                        <div key={room.id} className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-center justify-between group">
                            <div className="flex flex-col md:flex-row gap-8 items-center flex-grow">
                                <div className="w-32 h-24 rounded-sm overflow-hidden flex-shrink-0">
                                    <img src={JSON.parse(room.images)[0]} alt={room.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-serif text-secondary mb-1">{room.name}</h3>
                                    <p className="text-gray-500 text-sm mb-2 line-clamp-1">{room.description}</p>
                                    <div className="flex items-center space-x-4">
                                        <span className="text-secondary font-bold font-serif">${room.price} <span className="text-[10px] uppercase font-sans font-normal text-gray-400 font-normal">/ night</span></span>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${room.isAvailable ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                            }`}>
                                            {room.isAvailable ? 'Active' : 'Maintanance'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-3 text-gray-400 hover:text-primary transition-colors" title="Edit"><Edit2 size={18} /></button>
                                <button
                                    onClick={() => handleToggleStatus(room.id)}
                                    className={`p-3 transition-colors ${room.isAvailable ? 'text-green-500 hover:text-orange-500' : 'text-gray-400 hover:text-green-500'}`}
                                    title="Toggle Status"
                                >
                                    <Power size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(room.id)}
                                    className="p-3 text-gray-400 hover:text-red-500 transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </motion.div>
    );
};

export default AdminRooms;
