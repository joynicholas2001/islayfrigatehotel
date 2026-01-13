'use client'

import React from 'react';
import Hero from '@/components/Hero';
import { motion } from 'framer-motion';
import Link from 'next/link';
import RoomCard from '@/components/RoomCard';
import ReviewCarousel from '@/components/ReviewCarousel';
import { Wifi, Wine, Utensils, Waves } from 'lucide-react';
import Image from 'next/image';

const HomeClient = ({ rooms }) => {
    return (
        <div className="overflow-x-hidden">
            <Hero />

            {/* Introduction Section */}
            <section className="py-32 bg-white relative">
                <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                            className="max-w-xl"
                        >
                            <span className="text-primary uppercase tracking-[0.5em] font-bold mb-8 block text-[10px]">Sophistication Shorefront</span>
                            <h2 className="text-5xl md:text-7xl font-serif text-secondary mb-12 leading-[1.1]">
                                Harbour Front <br />
                                <span className="italic">Poise & Purpose</span>
                            </h2>
                            <p className="text-gray-500 mb-10 leading-relaxed text-lg font-light italic">
                                "The rhythm of the tide meets the grace of a grand era."
                            </p>
                            <p className="text-gray-600 mb-12 leading-relaxed font-light">
                                Situated in the heart of Tarbert’s vibrant fishing village, the Islay Frigate Hotel is a masterpiece of coastal hospitality.
                                We offer an intimate retreat where heritage architecture harmonizes with contemporary luxury.
                            </p>
                            <Link href="/about" className="group inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] overflow-hidden">
                                <span className="relative z-10">Discover our Story</span>
                                <div className="h-px w-12 bg-primary transition-all duration-700 group-hover:w-24"></div>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="overflow-hidden luxury-shadow relative h-[400px] md:h-[700px]">
                                <Image
                                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                                    alt="Hotel Exterior"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-2000"
                                />
                            </div>
                            <div className="absolute -bottom-16 -left-16 w-64 h-80 hidden xl:block overflow-hidden luxury-shadow">
                                <Image
                                    src="https://images.unsplash.com/photo-1551882547-ff43c6166863?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                                    alt="Detail"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Rooms */}
            <section className="py-32 bg-[#FAF9F6]">
                <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
                        <div className="max-w-2xl">
                            <span className="text-primary uppercase tracking-[0.5em] font-bold mb-6 block text-[10px]">Restful Sanctuaries</span>
                            <h2 className="text-5xl md:text-6xl font-serif text-secondary leading-tight italic">Refined Accommodations</h2>
                        </div>
                        <Link href="/rooms" className="text-[10px] font-bold uppercase tracking-[0.4em] border-b border-primary/30 pb-2 hover:border-primary transition-all">View Curated Stays</Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                        {rooms.map((room) => (
                            <RoomCard key={room.id} room={room} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Amenities Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-primary uppercase tracking-[0.3em] font-bold mb-4 block text-xs"
                        >
                            The Frigate Experience
                        </motion.span>
                        <h2 className="text-4xl md:text-5xl font-serif text-secondary mb-6 italic">World Class Amenities</h2>
                        <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
                        <p className="text-gray-500 font-light text-lg">
                            We provide a seamless blend of traditional charm and modern convenience to ensure your stay is as comfortable as it is memorable.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {[
                            { icon: <Wifi size={32} />, title: "Digital Freedom", desc: "High-speed WiFi throughout" },
                            { icon: <Wine size={32} />, title: "Whisky Library", desc: "50+ local malts to discover" },
                            { icon: <Waves size={32} />, title: "Beer Garden", desc: "Harbour views & refreshing brews" },
                            { icon: <Utensils size={32} />, title: "Events Suite", desc: "Function rooms for every occasion" },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center group"
                            >
                                <div className="mb-6 inline-block p-6 rounded-full bg-accent text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-bold text-secondary uppercase tracking-widest mb-2 italic">{item.title}</h3>
                                <p className="text-gray-400 text-sm font-light">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Tarbert Gateway Section */}
            <section className="py-40 bg-white overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
                        {/* Summary Header */}
                        <div className="lg:col-span-5 space-y-12">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true }}
                            >
                                <span className="text-primary uppercase tracking-[0.5em] font-bold mb-8 block text-[10px]">The Gateway</span>
                                <h2 className="text-5xl md:text-7xl font-serif text-secondary mb-12 leading-[1.1]">
                                    Tarbert <br />
                                    <span className="italic">Kintyre’s Jewel</span>
                                </h2>
                                <p className="text-gray-600 text-lg font-light leading-relaxed mb-10">
                                    Situated at the northern pinnacle of the Kintyre peninsula, Tarbert is more than a destination; it is a living portrait of Highland coastal life.
                                    Centred around its historic harbour, the village breathes a unique rhythm of working fishing boats and refined leisure.
                                </p>
                                <div className="space-y-6 border-l border-primary/20 pl-8 py-4">
                                    <p className="text-secondary font-serif italic text-lg opacity-80">
                                        "A mosaic of boutique shops, traditional bars, and artisanal restaurants set against a timeless maritime backdrop."
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Detailed Content Grid */}
                        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-16">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="space-y-6"
                            >
                                <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary">Leisure & Wellness</h4>
                                <p className="text-gray-500 text-sm font-light leading-relaxed">
                                    Engage with our vibrant community life across three meticulously maintained play parks and a modern outdoor gym—perfect for maintaining balance while the little ones explore.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="space-y-6"
                            >
                                <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary">Nature’s Immersive Paths</h4>
                                <p className="text-gray-500 text-sm font-light leading-relaxed">
                                    Venture through magical woodland trails to the serene White Shore Beach, navigate the crystalline Shell Beach, or ascend to the ruins of Tarbert Castle for an unparalleled vista of the harbour.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, delay: 0.6 }}
                                viewport={{ once: true }}
                                className="md:col-span-2 bg-[#FAF9F6] p-12 space-y-10 luxury-shadow"
                            >
                                <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary">The Nautical Junction</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <p className="text-gray-600 text-sm font-light leading-relaxed">
                                        Ideally positioned for island hopping, Tarbert provides direct access to the fabled ferry routes serving Islay, Jura, Gigha, Arran, and Portavadie. Whether heading north toward the rugged peaks of Fort William and the charm of Oban, or south to the fabled Mull of Kintyre, we are your essential base.
                                    </p>
                                    <div className="flex flex-col gap-4 text-[10px] uppercase tracking-[0.2em] font-bold text-secondary">
                                        <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-primary rounded-full"></div> Ferry to Islay & Jura</div>
                                        <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-primary rounded-full"></div> Route to Mull of Kintyre</div>
                                        <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-primary rounded-full"></div> Gateway to Oban & Oban Beyond</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-40 bg-[#FBF9F7]">
                <div className="text-center mb-24">
                    <span className="text-primary uppercase tracking-[0.6em] font-bold mb-6 block text-[10px]">Guest Reflections</span>
                    <h2 className="text-5xl md:text-7xl font-serif text-secondary italic">Whispers of Satisfaction</h2>
                    <div className="w-16 h-px bg-primary/30 mx-auto mt-12"></div>
                </div>
                <ReviewCarousel />
            </section>

            {/* Call to Action */}
            <section className="py-24 bg-secondary text-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-4xl md:text-6xl font-serif mb-12 leading-tight">Ready for a Coastal <br /><span className="text-primary italic">Adventure?</span></h2>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/book" className="bg-primary hover:bg-primary-hover text-white px-12 py-5 rounded-sm text-sm font-bold uppercase tracking-[0.2em] transition-luxury">Book My Stay Now</Link>
                        <Link href="/contact" className="bg-transparent border border-white/30 hover:border-white text-white px-12 py-5 rounded-sm text-sm font-bold uppercase tracking-[0.2em] transition-luxury">Contact Concierge</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomeClient;
