'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

const Hero = () => {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-[#001F3F]">
            {/* Background Parallax */}
            <motion.div
                initial={{ scale: 1.15, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.6 }}
                transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                    alt="Luxury Hotel"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#001F3F]/80 via-transparent to-[#001F3F]"></div>
            </motion.div>

            {/* Content Layer */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                <div className="reveal-text">
                    <motion.span
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="text-[#C5A059] uppercase tracking-[0.6em] font-bold text-[10px] mb-8 block"
                    >
                        Est. 1924 • Argyll & Bute
                    </motion.span>
                </div>

                <div className="reveal-text overflow-hidden">
                    <motion.h1
                        initial={{ y: 150 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 1 }}
                        className="text-white text-5xl md:text-9xl mb-12 leading-[0.85] font-serif italic"
                    >
                        Coastal <br />
                        <span className="text-[#C5A059] italic">Heritage</span>
                    </motion.h1>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 2 }}
                    className="flex flex-col sm:flex-row gap-8 items-center"
                >
                    <Link href="/rooms" className="px-12 py-5 bg-[#C5A059] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#AB8A4B] transition-all duration-500 shadow-xl">
                        Unveil the Suites
                    </Link>
                    <Link href="/book" className="px-12 py-5 border border-white/30 text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-[#001F3F] transition-all duration-500">
                        Begin Journey
                    </Link>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3, duration: 2 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4"
                >
                    <span className="text-[9px] uppercase tracking-[0.5em] text-white/30 font-bold">Discover</span>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2.5 }}
                    >
                        <ChevronDown size={24} strokeWidth={1} className="text-[#C5A059]" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
