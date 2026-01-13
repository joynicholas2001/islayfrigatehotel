import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Wifi, Tv, MapPin, Wind, Utensils, Award, History } from 'lucide-react';

const About = () => {
    return (
        <div className="pt-24 pb-24 bg-white overflow-hidden font-light">
            {/* Immersive Header */}
            <section className="relative h-[50vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-secondary">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.4 }}
                    transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                >
                    <img
                        src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                        alt="Heritage"
                        className="w-full h-full object-cover"
                    />
                </motion.div>
                <div className="relative z-10 text-center">
                    <motion.span
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-primary uppercase tracking-[0.6em] font-bold text-[10px] mb-8 block"
                    >
                        Our Heritage • Est. 1924
                    </motion.span>
                    <motion.h1
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1.2 }}
                        className="text-white text-6xl md:text-8xl font-serif italic reveal-text"
                    >
                        Our <span className="text-primary">Story</span>
                    </motion.h1>
                </div>
            </section>

            {/* The Essence of Islay Frigate */}
            <section className="py-40 bg-white">
                <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
                        <div className="lg:col-span-5 space-y-12">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.2 }}
                                viewport={{ once: true }}
                            >
                                <span className="text-primary uppercase tracking-[0.5em] font-bold mb-8 block text-[10px]">Independent & Timeless</span>
                                <h2 className="text-5xl font-serif text-secondary mb-12 italic leading-tight">A Boutique Sanctuary on the Harbour Front</h2>
                                <p className="text-gray-600 text-lg font-light leading-relaxed mb-10">
                                    The Islay Frigate Hotel is more than a residence; it is a long-established pillar of the Tarbert community.
                                    Our collection of approximately 8 boutique guest rooms features a mix of curated accommodations, including several premier sea-view rooms that look out over the vibrant harbour.
                                </p>
                            </motion.div>
                        </div>

                        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-16">
                            <div className="space-y-6">
                                <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary">Strategic Location</h4>
                                <p className="text-gray-500 text-sm font-light leading-relaxed">
                                    Ideally positioned on Harbour Street, we serve as the perfect gateway for those journeying to the Isle of Islay.
                                    Our doorstep is just steps away from ferry connections, boutique shops, and local monuments like the Royal Castle of Tarbert.
                                </p>
                            </div>
                            <div className="space-y-6">
                                <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary">Guest Philosophy</h4>
                                <p className="text-gray-500 text-sm font-light leading-relaxed">
                                    We welcome travelers seeking the soul of Scotland. From whisky enthusiasts exploring nearby distilleries to families finding respite in our common lounges,
                                    our atmosphere is consistently described as "cosy, welcoming, and genuine."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Facilities Showcase */}
            <section className="py-40 bg-[#FAF9F6]">
                <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
                    <div className="text-center mb-32">
                        <span className="text-primary uppercase tracking-[0.6em] font-bold mb-8 block text-[10px]">Curated Amenities</span>
                        <h2 className="text-5xl font-serif text-secondary italic">Modest Comfort, World-Class Care</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { icon: <Tv size={32} />, title: "Digital Repose", desc: "Flat-screen TVs in every guest room." },
                            { icon: <Coffee size={32} />, title: "Morning Ritual", desc: "Premium electric kettles and tea selections." },
                            { icon: <Wifi size={32} />, title: "Connected", desc: "Complimentary high-speed Wi-Fi throughout." },
                            { icon: <Award size={32} />, title: "Concierge Desk", desc: "In-room workspace for the modern nomad." },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white p-12 luxury-shadow group hover:-translate-y-2 transition-smooth"
                            >
                                <div className="text-primary mb-8 group-hover:scale-110 transition-transform duration-700">{item.icon}</div>
                                <h3 className="text-xs uppercase tracking-[0.4em] font-bold text-secondary mb-4 italic">{item.title}</h3>
                                <p className="text-gray-400 text-sm font-light leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-20 md:mt-40 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
                        <div className="relative h-[400px] md:h-[600px] overflow-hidden luxury-shadow">
                            <img src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Lounge" className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div className="space-y-12">
                            <h3 className="text-4xl font-serif text-secondary italic leading-tight">Social Spaces & Sun-Traps</h3>
                            <p className="text-gray-500 text-lg leading-relaxed">
                                Our iconic "Sun-trap" beer garden and outdoor terraces offer a sanctuary for reflection. Inside, our common lounge and bar
                                serve as the heart of the hotel—a space where stories are shared over a wide selection of local whiskies and craft beers.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-primary">
                                    <div className="w-8 h-px bg-primary/30"></div> 50+ Local Whiskies
                                </div>
                                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-primary">
                                    <div className="w-8 h-px bg-primary/30"></div> Free On-Site Parking
                                </div>
                                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-primary">
                                    <div className="w-8 h-px bg-primary/30"></div> Non-Smoking Environment
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Note on Dining */}
            <section className="py-20 md:py-40 bg-white">
                <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
                    <div className="bg-secondary p-12 md:p-20 text-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 pointer-events-none text-[30vw] font-serif italic text-white -bottom-20 -right-20">Taste</div>
                        <div className="relative z-10 max-w-3xl mx-auto space-y-10">
                            <h2 className="text-4xl font-serif text-white italic">A Local Culinary Journey</h2>
                            <p className="text-gray-400 text-lg font-light leading-relaxed">
                                While the Islay Frigate focuses on premium bar service and refined rest, we celebrate our location in the heart of Tarbert.
                                Guests are encouraged to explore the exceptional local eateries just steps away, from fresh seafood bistros to traditional Scottish grills.
                            </p>
                            <div className="h-px w-24 bg-primary mx-auto"></div>
                            <p className="text-xs uppercase tracking-[0.5em] text-primary font-bold">Harbour Side Gastronomy</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats/Ratings Section */}
            <section className="py-40 bg-white">
                <div className="max-w-[1400px] mx-auto px-6 sm:px-10 text-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
                        <div>
                            <p className="text-7xl font-serif text-primary italic mb-4">8</p>
                            <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-secondary">Boutique Suites</p>
                        </div>
                        <div>
                            <p className="text-7xl font-serif text-primary italic mb-4">8.1</p>
                            <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-secondary">Guest Experience Index</p>
                        </div>
                        <div>
                            <p className="text-7xl font-serif text-primary italic mb-4">1924</p>
                            <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-secondary">Established Heritage</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
