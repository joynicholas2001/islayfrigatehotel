'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ContactPage = () => {
    return (
        <div className="pt-24 pb-24 bg-white font-light">
            {/* Immersive Header */}
            <section className="relative h-[40vh] md:h-[60vh] flex items-center justify-center overflow-hidden bg-secondary">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.3 }}
                    transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1449156001437-3a1f9d977ae2?auto=format&fit=crop&q=80"
                        alt="Contact Coastal"
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
                        Inquire & Connect
                    </motion.span>
                    <motion.h1
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1.2 }}
                        className="text-white text-6xl md:text-8xl font-serif italic reveal-text"
                    >
                        Get in <span className="text-primary">Touch</span>
                    </motion.h1>
                </div>
            </section>

            <section className="py-40">
                <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
                        {/* Contact Information */}
                        <div className="space-y-24">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.2 }}
                                viewport={{ once: true }}
                            >
                                <span className="text-primary uppercase tracking-[0.5em] font-bold mb-10 block text-[10px]">Concierge Services</span>
                                <h2 className="text-5xl font-serif text-secondary mb-16 italic leading-tight">We are here to curate your coastal sanctuary.</h2>

                                <div className="space-y-16">
                                    <div className="flex items-start gap-10 group">
                                        <div className="w-px h-12 bg-primary/30 group-hover:h-20 transition-all duration-700"></div>
                                        <div className="space-y-4">
                                            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400">Location</h4>
                                            <p className="text-secondary text-lg leading-relaxed font-serif">
                                                Islay Frigate Hotel Limited<br />
                                                Harbour Street, Tarbert<br />
                                                Argyll & Bute, Scotland, PA29 6UD
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-10 group">
                                        <div className="w-px h-12 bg-primary/30 group-hover:h-20 transition-all duration-700"></div>
                                        <div className="space-y-4">
                                            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400">Reservations</h4>
                                            <p className="text-secondary text-2xl font-serif italic">+44 1880 820 300</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-10 group">
                                        <div className="w-px h-12 bg-primary/30 group-hover:h-20 transition-all duration-700"></div>
                                        <div className="space-y-4">
                                            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400">Email</h4>
                                            <p className="text-secondary text-lg font-serif">islayfrigatehotel@outlook.com</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Inquiry Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                            className="bg-[#FAF9F6] p-12 md:p-20 luxury-shadow relative overflow-hidden"
                        >
                            <div className="relative z-10 space-y-16">
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-serif text-secondary italic">Digital Inquiry</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed max-w-sm">Please allow up to 24 hours for our concierge to respond to your request.</p>
                                </div>

                                <form className="space-y-12">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                                        <div className="space-y-2 group">
                                            <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-[0.4em]">First Name</label>
                                            <input type="text" className="w-full bg-transparent border-b border-black/10 py-4 focus:outline-none focus:border-primary transition-all text-sm font-light" placeholder="Alexander" />
                                        </div>
                                        <div className="space-y-2 group">
                                            <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-[0.4em]">Last Name</label>
                                            <input type="text" className="w-full bg-transparent border-b border-black/10 py-4 focus:outline-none focus:border-primary transition-all text-sm font-light" placeholder="Sterling" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-[0.4em]">Electronic Mail</label>
                                        <input type="email" className="w-full bg-transparent border-b border-black/10 py-4 focus:outline-none focus:border-primary transition-all text-sm font-light" placeholder="alexander@sterling.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-[0.4em]">Inquiry Detail</label>
                                        <textarea rows="4" className="w-full bg-transparent border-b border-black/10 py-4 focus:outline-none focus:border-primary transition-all text-sm font-light resize-none" placeholder="How may we assist you?"></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        onClick={(e) => { e.preventDefault(); alert('Your inquiry has been sent to our concierge.'); }}
                                        className="bg-secondary text-white py-5 px-8 text-[10px] font-bold uppercase tracking-[0.3em] w-full text-center hover:bg-primary transition-all"
                                    >
                                        Submit Inquiry
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Aesthetic Map Section */}
            <section className="h-[40vh] md:h-[60vh] relative grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-2000 overflow-hidden">
                <iframe
                    title="Tarbert Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2222.123456789!2d-5.4123!3d55.8645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTVuNTEuOCIgNVcnNDQuMiJX!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
                    className="w-full h-full border-0"
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white via-transparent to-white/20"></div>
            </section>
        </div>
    );
};

export default ContactPage;
