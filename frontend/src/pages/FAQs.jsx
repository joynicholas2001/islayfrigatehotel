import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, toggle }) => (
    <div className="border-b border-gray-100">
        <button
            onClick={toggle}
            className="w-full py-6 flex justify-between items-center text-left focus:outline-none transition-colors hover:text-primary"
        >
            <span className="text-lg font-medium text-secondary">{question}</span>
            {isOpen ? <Minus size={20} className="text-primary" /> : <Plus size={20} className="text-gray-400" />}
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                >
                    <p className="pb-6 text-gray-600 leading-relaxed">
                        {answer}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const FAQs = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
        },
        {
            question: 'Is breakfast included in the room rate?',
            answer: 'All our rates include a full Scottish breakfast served in our ocean-view dining room.'
        }
    ];

    return (
        <div className="pt-24 pb-24 min-h-screen bg-white">
            {/* Header */}
            <section className="bg-secondary py-20 text-center px-4 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-primary uppercase tracking-widest font-medium mb-4 block">Information</span>
                    <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Frequently Asked Questions</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Find answers to common questions about your stay at the Islay Frigate Hotel.
                    </p>
                </motion.div>
            </section>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-2">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            toggle={() => setOpenIndex(index === openIndex ? -1 : index)}
                        />
                    ))}
                </div>

                <div className="mt-20 p-12 bg-cream text-center rounded-sm">
                    <h3 className="text-2xl font-serif text-secondary mb-4">Still have questions?</h3>
                    <p className="text-gray-600 mb-8">Feel free to reach out to our 24/7 concierge service for any assistance.</p>
                    <button className="bg-primary text-white px-10 py-3 rounded-sm uppercase tracking-widest font-medium text-sm hover:bg-primary-hover transition-luxury">
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FAQs;
