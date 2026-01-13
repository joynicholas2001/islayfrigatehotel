'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const BookingPage = () => {
    const [step, setStep] = useState(1);

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    return (
        <div className="pt-24 pb-24 min-h-screen bg-white font-light">
            <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">

                {/* Immersive Header */}
                <section className="py-24 text-center space-y-8 mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-primary uppercase tracking-[0.6em] font-bold text-[10px]"
                    >
                        Reservation Portal
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-serif text-secondary italic"
                    >
                        Secure your <span className="text-primary">Sanctuary</span>
                    </motion.h1>
                    <div className="w-12 h-px bg-primary/30 mx-auto mt-12"></div>
                </section>

                <div className="max-w-5xl mx-auto">
                    {/* Progress Indicator */}
                    <div className="grid grid-cols-4 gap-4 mb-24 max-w-sm mx-auto">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="space-y-3">
                                <div className={`h-1 transition-all duration-700 ${step >= i ? 'bg-primary' : 'bg-gray-100'}`}></div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
                        {/* Booking Forms */}
                        <div className="lg:col-span-8">
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-16"
                                    >
                                        <div className="space-y-4">
                                            <h3 className="text-3xl font-serif text-secondary italic">Stay Duration</h3>
                                            <p className="text-gray-400 text-sm">Select the dates for your coastal retreat.</p>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                            <div className="space-y-2 border-b border-black/5 pb-4">
                                                <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-gray-400">Arriving</label>
                                                <input type="date" className="w-full bg-transparent focus:outline-none text-secondary py-2" />
                                            </div>
                                            <div className="space-y-2 border-b border-black/5 pb-4">
                                                <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-gray-400">Departing</label>
                                                <input type="date" className="w-full bg-transparent focus:outline-none text-secondary py-2" />
                                            </div>
                                        </div>
                                        <button onClick={nextStep} className="bg-secondary text-white py-5 px-10 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-primary transition-all group flex items-center justify-center gap-4">
                                            <span>Continue Selection</span>
                                            <ArrowRight size={14} className="group-hover:translate-x-2 transition-all" />
                                        </button>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-16"
                                    >
                                        <div className="space-y-4">
                                            <h3 className="text-3xl font-serif text-secondary italic">Guest Details</h3>
                                            <p className="text-gray-400 text-sm">Please inform us of your traveling companions.</p>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                            <div className="space-y-2 border-b border-black/5 pb-4">
                                                <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-gray-400">Adult Residents</label>
                                                <select className="w-full bg-transparent focus:outline-none text-secondary py-2">
                                                    {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n} Guests</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex gap-8">
                                            <button onClick={prevStep} className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400 hover:text-secondary py-5 px-10 border border-black/5">Back</button>
                                            <button onClick={nextStep} className="bg-secondary text-white py-5 px-10 text-[10px] font-bold uppercase tracking-[0.3em] flex-1 hover:bg-primary transition-all group flex items-center justify-center gap-4">
                                                <span>Finalize Inquiry</span>
                                                <ArrowRight size={14} className="group-hover:translate-x-2 transition-all" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {step >= 3 && (
                                    <motion.div
                                        key="final"
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center space-y-12 py-20 bg-[#FAF9F6] luxury-shadow"
                                    >
                                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                                            <Check className="text-primary" size={32} />
                                        </div>
                                        <h3 className="text-3xl font-serif text-secondary italic">Inquiry Received</h3>
                                        <p className="text-gray-500 max-w-sm mx-auto font-light leading-relaxed">
                                            Our concierge is currently reviewing your selection. A bespoke confirmation will be dispatched to your mailbox shortly.
                                        </p>
                                        <Link href="/" className="inline-block text-[10px] uppercase tracking-[0.4em] font-bold text-primary hover:text-secondary pt-8 underline-offset-8 underline">
                                            Return to Frontage
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Summary Sidebar */}
                        <div className="lg:col-span-4 lg:sticky lg:top-40">
                            <div className="bg-[#FAF9F6] p-12 luxury-shadow space-y-10">
                                <h4 className="text-[10px] uppercase tracking-[0.5em] font-bold text-secondary border-b border-black/5 pb-6">Stay Summary</h4>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center text-sm italic py-2">
                                        <span className="text-gray-400">Harbour Side Suite</span>
                                        <span className="text-secondary">$185.00</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm italic py-2">
                                        <span className="text-gray-400">Experience Fees</span>
                                        <span className="text-secondary">$0.00</span>
                                    </div>
                                    <div className="pt-6 border-t border-black/5 flex justify-between items-center">
                                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400">Total Selection</span>
                                        <span className="text-2xl font-serif text-secondary font-bold">$185.00</span>
                                    </div>
                                </div>
                                <div className="pt-8 space-y-4">
                                    <p className="text-[9px] uppercase tracking-widest text-gray-400 leading-relaxed font-bold">
                                        Ferry connections to Islay are just steps from our sanctuary.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
