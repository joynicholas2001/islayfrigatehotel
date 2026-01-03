import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Contact = () => {
    return (
        <div className="pt-24 pb-24 min-h-screen bg-white">
            {/* Hero Header */}
            <section className="bg-secondary py-20 text-center px-4 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-primary uppercase tracking-widest font-medium mb-4 block">Get in Touch</span>
                    <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Contact Us</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        We are here to assist you. Whether you have a question about our rooms or need help planning your trip, feel free to reach out.
                    </p>
                </motion.div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Details */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-serif text-secondary mb-8">Hotel Information</h2>
                        <div className="space-y-8">
                            <div className="flex items-start space-x-4">
                                <div className="bg-cream p-3 rounded-sm">
                                    <MapPin className="text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-secondary uppercase tracking-wider text-sm mb-1">Location</h4>
                                    <p className="text-gray-600">Islay Frigate Hotel Limited, Harbour Street, Tarbert, PA29 6UD, Scotland</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-cream p-3 rounded-sm">
                                    <Phone className="text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-secondary uppercase tracking-wider text-sm mb-1">Reservations</h4>
                                    <p className="text-gray-600">01880 820 300 / +44 7771 084 284</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-cream p-3 rounded-sm">
                                    <Mail className="text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-secondary uppercase tracking-wider text-sm mb-1">Email</h4>
                                    <p className="text-gray-600">islayfrigatehotel@outlook.com</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-cream p-3 rounded-sm">
                                    <Clock className="text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-secondary uppercase tracking-wider text-sm mb-1">Reception</h4>
                                    <p className="text-gray-600">24/7 Concierge Service Available</p>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="mt-12 h-80 bg-gray-100 rounded-sm overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-serif italic">
                                Interactive Map Loading...
                            </div>
                            <iframe
                                title="Google Maps"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1138.835158284568!2d-6.071861614050293!3d55.76104445330386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4889658f8b89e3a9%3A0x6a1eb1d3550e68e4!2sIslay!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
                                className="w-full h-full border-0 grayscale opacity-80"
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-cream p-10 rounded-sm"
                    >
                        <h2 className="text-3xl font-serif text-secondary mb-8">Send a Message</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 mt-2 uppercase tracking-wider">First Name</label>
                                    <input type="text" className="w-full border-gray-200 focus:border-primary focus:ring-primary rounded-sm py-3" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 mt-2 uppercase tracking-wider">Last Name</label>
                                    <input type="text" className="w-full border-gray-200 focus:border-primary focus:ring-primary rounded-sm py-3" placeholder="Doe" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">Email Address</label>
                                <input type="email" className="w-full border-gray-200 focus:border-primary focus:ring-primary rounded-sm py-3" placeholder="john@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">Message</label>
                                <textarea rows="6" className="w-full border-gray-200 focus:border-primary focus:ring-primary rounded-sm py-3" placeholder="How can we help you?"></textarea>
                            </div>
                            <button
                                type="submit"
                                onClick={(e) => { e.preventDefault(); alert('Message sent! We will get back to you soon.'); }}
                                className="w-full bg-secondary text-white py-4 rounded-sm uppercase tracking-widest font-medium text-sm hover:bg-primary transition-luxury"
                            >
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
