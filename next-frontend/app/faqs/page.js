'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const FAQItem = ({ question, answer, isOpen, toggle }) => (
    <div className="border-b border-black/5 last:border-none">
        <button
            onClick={toggle}
            className="w-full py-10 flex justify-between items-center text-left focus:outline-none transition-all hover:text-primary group"
        >
            <span className="text-xl md:text-2xl font-serif text-secondary italic leading-tight group-hover:pl-4 transition-all duration-700">{question}</span>
            <div className={`p-2 transition-transform duration-700 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                {isOpen ? <Minus size={20} strokeWidth={1} className="text-primary" /> : <Plus size={20} strokeWidth={1} className="text-gray-300" />}
            </div>
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                >
                    <p className="pb-10 pl-4 text-gray-500 leading-relaxed font-light max-w-4xl">
                        {answer}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const FAQsPage = () => {
    const [openIndex, setOpenIndex] = useState('0-0');

    const faqData = [
        {
            category: 'Reservations',
            items: [
                { question: 'How do I secure a boutique suite?', answer: 'Suites can be reserved directly through our digital portal or by contacting our concierge at +44 (0) 1880 820 300. For an optimized experience, we recommend direct booking.' },
                { question: 'What is your cancellation grace period?', answer: 'Reservations may be cancelled without penalty up to 72 hours prior to arrival. Special curated rates may carry distinct terms.' },
                { question: 'Are family accommodations available?', answer: 'While our focus is on intimate boutique stays, several of our 8 guest rooms can be configured to accommodate small families. Please inquire for specific availability.' }
            ]
        },
        {
            category: 'The Experience',
            items: [
                { question: 'What are the check-in protocols?', answer: 'We invite guests to check in from 3:00 PM. Check-out is requested by 11:00 AM to allow us to prepare the sanctuary for arriving guests.' },
                { question: 'Is dining available on-site?', answer: 'The Islay Frigate focuses on a premium bar experience and refined rest. While we do not operate a full-scale restaurant, Tarbert’s finest eateries are just a short walk away along the harbour.' },
                { question: 'Do you offer secure parking?', answer: 'Yes, we provide complimentary on-site parking for all our residents.' }
            ]
        },
        {
            category: 'Sanctuary Policies',
            items: [
                { question: 'Is the property smoke-free?', answer: 'To maintain the freshness of our coastal air, the Islay Frigate is a strictly non-smoking property.' },
                { question: 'Do you provide high-speed connectivity?', answer: 'Complimentary high-speed Wi-Fi is available throughout the property, ensuring you stay connected to the world while retreating in Kintyre.' }
            ]
        }
    ];

    return (
        <div className="pt-24 pb-24 min-h-screen bg-white font-light">
            {/* Immersive Header */}
            <section className="relative h-[40vh] md:h-[60vh] flex items-center justify-center overflow-hidden bg-secondary">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.3 }}
                    transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1444201983204-c43cbd584d93?auto=format&fit=crop&q=80"
                        alt="Support Coastal"
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
                        Guidance & Support
                    </motion.span>
                    <motion.h1
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1.2 }}
                        className="text-white text-6xl md:text-8xl font-serif italic reveal-text"
                    >
                        Frequently Asked <span className="text-primary">Inquiries</span>
                    </motion.h1>
                </div>
            </section>

            <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                    {/* Sidebar Header */}
                    <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit space-y-10">
                        <span className="text-primary uppercase tracking-[0.4em] font-bold text-[10px]">Guest Support</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-secondary italic leading-tight">Your Journey, <br />Perfected.</h2>
                        <p className="text-gray-500 leading-relaxed italic">
                            Everything you need to know about your coastal retreat in Tarbert.
                        </p>
                        <div className="h-px w-20 bg-primary/30"></div>
                    </div>

                    {/* FAQ Accordion */}
                    <div className="lg:col-span-8 space-y-32">
                        {faqData.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="space-y-12">
                                <h3 className="text-[10px] uppercase tracking-[0.6em] font-bold text-primary border-b border-black/5 pb-8">{section.category}</h3>
                                <div className="divide-y divide-black/5">
                                    {section.items.map((faq, itemIndex) => {
                                        const globalIndex = `${sectionIndex}-${itemIndex}`;
                                        return (
                                            <FAQItem
                                                key={itemIndex}
                                                question={faq.question}
                                                answer={faq.answer}
                                                isOpen={openIndex === globalIndex}
                                                toggle={() => setOpenIndex(globalIndex === openIndex ? -1 : globalIndex)}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Immersive CTA */}
            <section className="py-40 bg-[#FAF9F6] mt-40">
                <div className="max-w-4xl mx-auto px-6 text-center space-y-16">
                    <h2 className="text-4xl md:text-6xl font-serif text-secondary italic">Still seeking clarity?</h2>
                    <p className="text-gray-500 text-lg md:text-xl font-light leading-relaxed">
                        Our 24/7 concierge team is dedicated to curating your perfect stay. Reach out for any bespoke requests.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-8 justify-center items-center font-bold text-[10px] uppercase tracking-[0.4em]">
                        <a href="tel:+441880820300" className="group flex items-center gap-4 text-secondary hover:text-primary transition-all">
                            Call Concierge <ArrowRight size={14} className="group-hover:translate-x-2 transition-all" />
                        </a>
                        <div className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block"></div>
                        <a href="mailto:islayfrigatehotel@outlook.com" className="group flex items-center gap-4 text-secondary hover:text-primary transition-all">
                            Send Inquiry <ArrowRight size={14} className="group-hover:translate-x-2 transition-all" />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FAQsPage;
