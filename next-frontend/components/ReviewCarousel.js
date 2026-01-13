'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';

const reviews = [
    {
        name: "Alexander Sterling",
        location: "London, UK",
        text: "An absolute coastal masterpiece. The attention to detail and the warmth of the staff made our Islay pilgrimage truly unforgettable.",
        rating: 5
    },
    {
        name: "Elena Rossi",
        location: "Milan, Italy",
        text: "The view from the Admiral Suite is unparalleled. Waking up to the rhythm of the Tarbert harbour is an experience that stays with you.",
        rating: 5
    },
    {
        name: "David Macleod",
        location: "Edinburgh, Scotland",
        text: "The whisky collection is a revelation. Over 50 malts paired with the most genuine hospitality I've found in all of Argyll.",
        rating: 5
    }
];

const ReviewCarousel = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % reviews.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative max-w-5xl mx-auto px-4 py-20">
            <div className="flex flex-col items-center">
                <Quote size={48} className="text-primary/20 mb-12" strokeWidth={1} />

                <div className="relative h-64 md:h-48 w-full flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0 flex flex-col items-center text-center px-4"
                        >
                            <p className="text-2xl md:text-3xl lg:text-4xl font-serif text-secondary leading-relaxed italic mb-10 max-w-3xl">
                                "{reviews[index].text}"
                            </p>
                            <div className="reveal-text">
                                <h4 className="text-[10px] uppercase tracking-[0.5em] font-bold text-primary mb-1">
                                    {reviews[index].name}
                                </h4>
                                <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400">
                                    {reviews[index].location}
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Indicators */}
                <div className="flex gap-4 mt-16 md:mt-24">
                    {reviews.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`h-1 transition-all duration-700 ${index === i ? 'w-12 bg-primary' : 'w-4 bg-gray-200 hover:bg-gray-300'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReviewCarousel;
