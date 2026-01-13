import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchRooms } from '../api';
import { Wifi, Tv, Coffee, Users, ArrowLeft, ArrowRight, MapPin, Award } from 'lucide-react';
import toast from 'react-hot-toast';

const RoomDetail = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getRoom = async () => {
            try {
                const response = await fetchRooms();
                const foundRoom = response.data.find(r => r.id === parseInt(id));
                if (foundRoom) {
                    setRoom(foundRoom);
                } else {
                    toast.error("Room not found");
                    navigate('/rooms');
                }
            } catch (err) {
                console.error(err);
                toast.error("Failed to load room details");
            } finally {
                setLoading(false);
            }
        };
        getRoom();
    }, [id, navigate]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-8 h-8 border border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!room) return null;

    const images = typeof room.images === 'string' ? JSON.parse(room.images) : room.images;

    return (
        <div className="pt-24 pb-24 bg-white font-light">
            <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">

                {/* Back Link */}
                <Link to="/rooms" className="inline-flex items-center gap-4 text-gray-400 hover:text-primary transition-smooth mb-20 text-[10px] font-bold uppercase tracking-[0.4em] group">
                    <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-smooth" /> Return to the Collection
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 mb-40">
                    {/* Visual Narrative */}
                    <div className="lg:col-span-7 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="aspect-[16/10] overflow-hidden luxury-shadow bg-secondary"
                        >
                            <img
                                src={images[0] || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80'}
                                alt={room.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </motion.div>
                        <div className="grid grid-cols-2 gap-8">
                            {(images.slice(1, 3).length > 0 ? images.slice(1, 3) : [images[0], images[0]]).map((img, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 * idx, duration: 1 }}
                                    className="aspect-[4/3] overflow-hidden luxury-shadow"
                                >
                                    <img src={img} alt={`${room.name} detail`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 cursor-pointer" />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Information & Booking */}
                    <div className="lg:col-span-5 space-y-16">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2 }}
                            className="space-y-12"
                        >
                            <div className="space-y-4">
                                <span className="text-primary uppercase tracking-[0.5em] font-bold text-[10px]">Private Residence</span>
                                <h1 className="text-5xl md:text-6xl font-serif text-secondary italic leading-[1.1]">
                                    {room.name}
                                </h1>
                            </div>

                            <div className="flex items-center gap-10">
                                <div className="flex items-center gap-3">
                                    <Users size={14} className="text-primary/60" />
                                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Sleeps {room.capacity}</span>
                                </div>
                                <div className="w-px h-4 bg-gray-200"></div>
                                <div className="flex items-center gap-3">
                                    <MapPin size={14} className="text-primary/60" />
                                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Harbour Front</span>
                                </div>
                            </div>

                            <p className="text-gray-500 text-lg leading-relaxed italic border-l border-primary/20 pl-8">
                                {room.description}
                            </p>

                            <div className="grid grid-cols-2 gap-y-10 pt-8 border-t border-black/5">
                                {[
                                    { icon: <Wifi size={16} />, label: "Complimentary Wi-Fi" },
                                    { icon: <Tv size={16} />, label: "Flat-screen TV" },
                                    { icon: <Coffee size={16} />, label: "Electric Kettle" },
                                    { icon: <Award size={16} />, label: "Concierge Desk" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 group">
                                        <span className="text-primary/40 group-hover:text-primary transition-colors">{item.icon}</span>
                                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-600">{item.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-[#FAF9F6] p-12 luxury-shadow space-y-10">
                                <div className="flex flex-col gap-2">
                                    <span className="text-[9px] uppercase tracking-[0.4em] text-gray-400 font-bold">Nightly from</span>
                                    <p className="text-4xl font-serif text-secondary font-bold">${room.price}</p>
                                </div>
                                <Link
                                    to="/book"
                                    className="btn-luxury w-full group flex items-center justify-center gap-4"
                                >
                                    <span>Begin Reservation</span>
                                    <ArrowRight size={14} className="group-hover:translate-x-2 transition-smooth" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Legacy & Detail */}
                <section className="py-40 border-t border-black/5 flex flex-col md:flex-row gap-24 items-start">
                    <div className="md:w-1/2 space-y-12">
                        <span className="text-primary uppercase tracking-[0.5em] font-bold text-[10px]">The Heritage Detail</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-secondary italic leading-tight">Authentic Coastal Living</h2>
                        <div className="space-y-8 text-gray-500 font-light leading-relaxed text-lg">
                            <p>
                                Every element of the {room.name} has been curated to honour Tarbert's maritime legacy.
                                Beyond the premium amenities, you will find an atmosphere defined by the gentle rhythm of the harbour and the warmth of genuine Highland hospitality.
                            </p>
                            <p>
                                Wake to the sound of departing fishing boats and the silhouette of Tarbert Castle. This is your personal sanctuary at the very northern tip of Kintyre.
                            </p>
                        </div>
                    </div>

                    <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-12 w-full">
                        <div className="p-10 bg-[#FAF9F6] space-y-6">
                            <h4 className="text-[9px] uppercase tracking-[0.4em] font-bold text-primary">Check-in / Out</h4>
                            <p className="text-sm font-light text-secondary italic">Check-in: 3:00 PM<br />Check-out: 11:00 AM</p>
                        </div>
                        <div className="p-10 bg-[#FAF9F6] space-y-6">
                            <h4 className="text-[9px] uppercase tracking-[0.4em] font-bold text-primary">Sanctuary Policy</h4>
                            <p className="text-sm font-light text-secondary italic">Non-smoking property.<br />Complimentary on-site parking.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default RoomDetail;
