'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const RoomCard = ({ room }) => {
    // Safely parse JSON strings if needed
    const images = typeof room.images === 'string' ? JSON.parse(room.images) : room.images;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="group relative"
        >
            {/* Image Section */}
            <div className="relative h-[28rem] overflow-hidden luxury-shadow bg-secondary">
                <Image
                    src={images[0] || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80'}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-2000 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700"></div>

                {/* Price Tag Overlay */}
                <div className="absolute bottom-0 right-0 p-8">
                    <div className="bg-white px-6 py-4 luxury-shadow">
                        <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-1">Nightly from</p>
                        <p className="text-xl font-serif font-bold text-secondary">${room.price}</p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="pt-10 pb-6 px-2">
                <h3 className="text-3xl font-serif text-secondary mb-4 group-hover:text-primary transition-smooth italic">
                    {room.name}
                </h3>

                <div className="flex items-center gap-6 mb-6 text-gray-400">
                    <div className="flex items-center gap-2">
                        <Users size={12} className="text-primary/60" />
                        <span className="text-[9px] uppercase tracking-[0.3em] font-bold">Sleeps {room.capacity}</span>
                    </div>
                    <div className="h-px w-8 bg-gray-200"></div>
                    <span className="text-[9px] uppercase tracking-[0.3em] font-bold">Harbour Side Sanctuary</span>
                </div>

                <div className="flex items-center justify-between border-t border-black/5 pt-8 mt-4 overflow-hidden">
                    <Link
                        href={`/rooms/${room.id}`}
                        className="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary hover:text-primary transition-all flex items-center gap-3 group/link"
                    >
                        Reveal Details <ArrowRight size={14} className="group-hover/link:translate-x-2 transition-transform duration-500" />
                    </Link>

                    <Link
                        href="/book"
                        className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 text-[10px] font-bold uppercase tracking-[0.4em] text-primary"
                    >
                        Reserve Now
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default RoomCard;
