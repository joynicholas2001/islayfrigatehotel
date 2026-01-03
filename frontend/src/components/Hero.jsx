import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}
            >
                <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/60 via-transparent to-black/60"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-primary uppercase tracking-[0.3em] font-medium mb-6 block"
                >
                    A Warm Welcome in Tarbert
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-8xl font-serif text-white mb-8 leading-tight"
                >
                    Islay Frigate <br />
                    <span className="italic text-white">Harbour Front Hotel</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed"
                >
                    Experience coastal comfort and a legendary welcome in the heart of Tarbert.
                    Your gateway to the Western Isles and beyond.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <Link
                        to="/rooms"
                        className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white px-10 py-4 rounded-sm text-sm font-medium uppercase tracking-widest transition-luxury"
                    >
                        Explore Rooms
                    </Link>
                    <Link
                        to="/book"
                        className="w-full sm:w-auto bg-transparent border border-white hover:bg-white hover:text-secondary text-white px-10 py-4 rounded-sm text-sm font-medium uppercase tracking-widest transition-luxury"
                    >
                        Book Your Stay
                    </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2, repeat: Infinity, repeatType: 'reverse' }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center"
            >
                <span className="text-[10px] uppercase tracking-widest mb-2 opacity-70">Scroll</span>
                <div className="w-[1px] h-12 bg-white/30 relative">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-primary"></div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
