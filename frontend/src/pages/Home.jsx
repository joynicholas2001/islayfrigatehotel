import React from 'react';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div>
            <Hero />

            {/* Introduction Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-primary uppercase tracking-widest font-medium mb-4 block">Our Story</span>
                            <h2 className="text-4xl md:text-5xl font-serif text-secondary mb-8 leading-tight">
                                A Warm Welcome at the Heart of Tarbert
                            </h2>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Situated in the beautiful working fishing village of Tarbert, Argyll and Bute, the Islay Frigate is a long-established hotel with a rich heritage.
                                Our 8-bedroom establishment features a lively bar, beer garden, and function rooms designed for comfort and connection.
                            </p>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                We offer over 50 local whiskies, many from the nearby Island of Islay. Whether you're here for an overnight stay before the ferry or to explore the scenic Kintyre peninsula, we offer affordable comfort and a legendary welcome.
                            </p>
                            <button className="text-secondary font-medium uppercase tracking-widest border-b-2 border-primary pb-1 hover:text-primary transition-colors">
                                Discover More
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1571896349842-3378af4f3299?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                                alt="Luxury Hotel Interior"
                                className="w-full h-[600px] object-cover rounded-sm shadow-xl"
                            />
                            <div className="absolute -bottom-10 -left-10 hidden lg:block">
                                <img
                                    src="https://images.unsplash.com/photo-1596436889106-be35c843f9b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                                    alt="Coastal View"
                                    className="w-64 h-64 object-cover rounded-sm shadow-2xl border-8 border-white"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Experience */}
            <section className="py-24 bg-cream">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-primary uppercase tracking-widest font-medium mb-4 block">The Experience</span>
                        <h2 className="text-4xl font-serif text-secondary mb-16">Unforgettable Moments</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Well-Stocked Bar',
                                desc: 'Experience our collection of over 50 local whiskies and a wide variety of draught beers.',
                                img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80'
                            },
                            {
                                title: 'Coastal Gateway',
                                desc: 'The ideal stopover before catching the ferry to Islay, with stunning harbour views.',
                                img: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&w=600&q=80'
                            },
                            {
                                title: 'Village Life',
                                desc: 'Located in the heart of Tarbert, surrounded by local shops and picturesque scenery.',
                                img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80'
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="group cursor-pointer"
                            >
                                <div className="relative overflow-hidden mb-6 h-80">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                                </div>
                                <h3 className="text-2xl font-serif text-secondary mb-3">{item.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
