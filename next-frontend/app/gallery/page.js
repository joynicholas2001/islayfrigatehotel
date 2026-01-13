'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import Image from 'next/image';

const GalleryPage = () => {
    const categories = ['Hotel', 'Rooms', 'Dining', 'Islay Coast'];
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedImage, setSelectedImage] = useState(null);

    const images = [
        { id: 1, url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', cat: 'Hotel' },
        { id: 2, url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', cat: 'Rooms' },
        { id: 3, url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80', cat: 'Dining' },
        { id: 4, url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', cat: 'Islay Coast' },
        { id: 5, url: 'https://images.unsplash.com/photo-1571896349842-3378af4f3299?auto=format&fit=crop&w=1200&q=80', cat: 'Hotel' },
        { id: 6, url: 'https://images.unsplash.com/photo-1544161515-4ae6ce6a6b18?auto=format&fit=crop&w=1200&q=80', cat: 'Dining' },
        { id: 7, url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80', cat: 'Rooms' },
        { id: 8, url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80', cat: 'Islay Coast' },
    ];

    const filteredImages = activeCategory === 'All'
        ? images
        : images.filter(img => img.cat === activeCategory);

    const handleNext = (e) => {
        e.stopPropagation();
        const currentIndex = images.findIndex(img => img.id === selectedImage.id);
        const nextIndex = (currentIndex + 1) % images.length;
        setSelectedImage(images[nextIndex]);
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        const currentIndex = images.findIndex(img => img.id === selectedImage.id);
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setSelectedImage(images[prevIndex]);
    };

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
                    <Image
                        src="https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&w=2000&q=80"
                        alt="Gallery Header"
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>
                <div className="relative z-10 text-center">
                    <motion.span
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-primary uppercase tracking-[0.6em] font-bold text-[10px] mb-8 block"
                    >
                        Visual Anthology
                    </motion.span>
                    <motion.h1
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1.2 }}
                        className="text-white text-6xl md:text-8xl font-serif italic reveal-text"
                    >
                        Our <span className="text-primary">Gallery</span>
                    </motion.h1>
                </div>
            </section>

            <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-20 md:py-32">
                {/* Filtering - Minimalist */}
                <div className="flex flex-wrap justify-center gap-12 mb-24">
                    <button
                        onClick={() => setActiveCategory('All')}
                        className={`text-[10px] font-bold uppercase tracking-[0.4em] transition-all relative group ${activeCategory === 'All' ? 'text-primary' : 'text-gray-400 hover:text-secondary'}`}
                    >
                        Display All
                        <span className={`absolute -bottom-2 left-0 w-full h-px bg-primary origin-left transition-transform duration-500 ${activeCategory === 'All' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`text-[10px] font-bold uppercase tracking-[0.4em] transition-all relative group ${activeCategory === cat ? 'text-primary' : 'text-gray-400 hover:text-secondary'}`}
                        >
                            {cat}
                            <span className={`absolute -bottom-2 left-0 w-full h-px bg-primary origin-left transition-transform duration-500 ${activeCategory === cat ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                        </button>
                    ))}
                </div>

                {/* Grid - Refined Spacing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                    <AnimatePresence mode='popLayout'>
                        {filteredImages.map((img) => (
                            <motion.div
                                key={img.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="relative aspect-[4/5] group overflow-hidden cursor-pointer luxury-shadow"
                                onClick={() => setSelectedImage(img)}
                            >
                                <Image
                                    src={img.url}
                                    alt={img.cat}
                                    fill
                                    className="object-cover transition-transform duration-2000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col items-center justify-center p-8 text-center">
                                    <div className="p-6 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white group-hover:scale-110 transition-transform duration-700">
                                        <Maximize2 size={24} strokeWidth={1} />
                                    </div>
                                    <div className="absolute bottom-10 left-10 text-left">
                                        <span className="text-[9px] uppercase tracking-[0.4em] text-white/60 mb-2 block font-bold">{img.cat}</span>
                                        <h3 className="text-white font-serif text-xl italic">View Collection</h3>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Lightbox Modal - Enhanced */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-[#050505]/98 backdrop-blur-2xl flex items-center justify-center p-6 md:p-20"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-10 right-10 text-white/30 hover:text-white transition-colors z-[110]"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={32} strokeWidth={1} />
                        </button>

                        <button
                            className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors z-[110] p-4 group"
                            onClick={handleNext}
                        >
                            <ChevronLeft size={48} strokeWidth={1} className="group-hover:-translate-x-2 transition-transform duration-500" />
                        </button>

                        <button
                            className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors z-[110] p-4 group"
                            onClick={handleNext}
                        >
                            <ChevronRight size={48} strokeWidth={1} className="group-hover:translate-x-2 transition-transform duration-500" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.98, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.98, opacity: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-full h-full flex flex-col items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full h-[65vh] md:h-[75vh] overflow-hidden">
                                <Image
                                    src={selectedImage.url}
                                    alt={selectedImage.cat}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="mt-12 text-center text-white max-w-lg space-y-6">
                                <span className="text-primary text-[10px] uppercase tracking-[0.5em] font-bold block">{selectedImage.cat}</span>
                                <h4 className="text-3xl font-serif italic">Harbour Front Anthology</h4>
                                <div className="w-12 h-px bg-primary/30 mx-auto"></div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GalleryPage;
