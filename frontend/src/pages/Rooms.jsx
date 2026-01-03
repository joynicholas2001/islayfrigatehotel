import React, { useState, useEffect } from 'react';
import { fetchRooms } from '../api';
import RoomCard from '../components/RoomCard';
import { motion } from 'framer-motion';
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
        <div className="pt-24 pb-24 min-h-screen bg-gray-50">
            {/* Header */}
            <section className="bg-secondary py-20 text-center px-4 mb-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-primary uppercase tracking-widest font-medium mb-4 block">Our Accommodation</span>
                    <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Rooms & Suites</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Choose from our curated selection of luxury accommodations, each designed to provide the ultimate comfort and a unique Islay experience.
                    </p>
                </motion.div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40">
                        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                        <p className="text-gray-500 font-medium">Preparing your luxury retreat...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-40">
                        <p className="text-red-500 font-medium text-lg">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-6 bg-secondary text-white px-8 py-3 rounded-sm uppercase tracking-widest text-sm hover:bg-primary transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
                        {rooms.length > 0 ? (
                            rooms.map((room) => (
                                <RoomCard key={room.id} room={room} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20">
                                <p className="text-gray-500 text-lg">No rooms available at the moment. Please check back later.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Rooms;
