import React from 'react';
import { motion } from 'framer-motion';
import { Users, Wifi, Wind, Coffee, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
    // Safely parse JSON strings if needed
    const amenities = typeof room.amenities === 'string' ? JSON.parse(room.amenities) : room.amenities;
    const images = typeof room.images === 'string' ? JSON.parse(room.images) : room.images;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="premium-card group"
        >
            {/* Image Section */}
            <div className="relative h-80 overflow-hidden">
                <img
                    src={images[0] || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80'}
                    alt={room.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-secondary/20 group-hover:bg-transparent transition-colors duration-500"></div>
                <div className="absolute top-6 right-6 bg-white px-5 py-2 shadow-xl">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">Starting at</p>
                    <p className="text-xl font-serif font-bold text-secondary">
                        ${room.price} <span className="text-[10px] font-sans font-medium text-gray-400 italic">/ night</span>
                    </p>
                </div>
                {room.isAvailable === false && (
                    <div className="absolute inset-0 bg-secondary/60 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="text-white font-serif italic text-2xl tracking-widest uppercase border border-white/30 px-8 py-3">Fully Booked</span>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-10">
                <div className="flex justify-between items-baseline mb-6">
                    <h3 className="text-3xl font-serif text-secondary group-hover:text-primary transition-colors duration-500 italic">
                        {room.name}
                    </h3>
                </div>

                <div className="flex items-center gap-6 mb-8 text-gray-400">
                    <div className="flex items-center gap-2">
                        <Users size={14} className="text-primary" />
                        <span className="text-[10px] uppercase tracking-widest font-bold">Up to {room.capacity} Guests</span>
                    </div>
                    <div className="w-px h-3 bg-gray-200"></div>
                    <div className="flex items-center gap-3">
                        <Wifi size={14} />
                        <Wind size={14} />
                        <Coffee size={14} />
                    </div>
                </div>

                <p className="text-gray-500 text-sm mb-10 line-clamp-2 leading-relaxed font-light tracking-wide italic">
                    {room.description}
                </p>

                <div className="flex items-center justify-between gap-4">
                    <Link
                        to={`/rooms/${room.id}`}
                        className="text-secondary text-[11px] font-bold uppercase tracking-[0.2em] hover:text-primary transition-all flex items-center gap-2 group/link"
                    >
                        Explore Suite <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        to="/book"
                        className="btn-luxury py-2.5 px-6 whitespace-nowrap"
                    >
                        Book Now
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default RoomCard;
