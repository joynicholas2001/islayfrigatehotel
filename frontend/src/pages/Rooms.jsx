import React, { useState, useEffect } from 'react';
import { fetchRooms } from '../api';
import RoomCard from '../components/RoomCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getRooms = async () => {
            try {
                const response = await fetchRooms();
                setRooms(response.data);
            } catch (err) {
                setError('Failed to load rooms. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        getRooms();
    }, []);

    return (
        <div className="pt-24 pb-24 min-h-screen bg-white font-light">
            {/* Immersive Header */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-secondary">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.4 }}
                    transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                >
                    <img
                        src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80"
                        alt="Suites"
                        className="w-full h-full object-cover"
                    />
                </motion.div>
                <div className="relative z-10 text-center">
                    <motion.span
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-primary uppercase tracking-[0.6em] font-bold text-[10px] mb-8 block"
                    >
                        Private Sanctuaries
                    </motion.span>
                    <motion.h1
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1.2 }}
                        className="text-white text-6xl md:text-8xl font-serif italic reveal-text"
                    >
                        Rooms & <span className="text-primary">Suites</span>
                    </motion.h1>
                </div>
            </section>

            <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-20 md:py-32">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <div className="max-w-xl">
                        <span className="text-primary uppercase tracking-[0.4em] font-bold text-[10px] mb-6 block">Boutique Accommodation</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-secondary italic">Curated Comfort</h2>
                    </div>
                    <p className="text-gray-400 text-sm italic max-w-sm">"Each suite is a dialogue between traditional Highland warmth and contemporary coastal grace."</p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40">
                        <Loader2 className="w-8 h-8 text-primary animate-spin mb-6" strokeWidth={1} />
                        <p className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold">Unveiling the Collection...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-40">
                        <p className="text-red-500 font-light text-lg mb-8">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="btn-luxury"
                        >
                            Retry Journey
                        </button>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-24 lg:gap-32"
                    >
                        {rooms.length > 0 ? (
                            rooms.map((room) => (
                                <RoomCard key={room.id} room={room} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20">
                                <p className="text-gray-500 text-lg italic">The collection is currently held for an exclusive event. Please inquire for availability.</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Rooms;
