import { motion, AnimatePresence } from 'framer-motion';

const Gallery = () => {
    const categories = ['Hotel', 'Rooms', 'Dining', 'Islay Coast'];
    const [activeCategory, setActiveCategory] = React.useState('All');

    const images = [
        { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', cat: 'Hotel' },
        { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', cat: 'Rooms' },
        { url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', cat: 'Dining' },
        { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', cat: 'Islay Coast' },
        { url: 'https://images.unsplash.com/photo-1571896349842-3378af4f3299?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', cat: 'Hotel' },
        { url: 'https://images.unsplash.com/photo-1544161515-4ae6ce6a6b18?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', cat: 'Dining' },
        { url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', cat: 'Rooms' },
        { url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', cat: 'Islay Coast' },
    ];

    const filteredImages = activeCategory === 'All'
        ? images
        : images.filter(img => img.cat === activeCategory);

    return (
        <div className="pt-24 pb-24 min-h-screen bg-white">
            {/* Header */}
            <section className="bg-cream py-20 text-center px-4 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-primary uppercase tracking-widest font-medium mb-4 block">Visual Journey</span>
                    <h1 className="text-4xl md:text-6xl font-serif text-secondary mb-6">Area Gallery</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Explore the beauty of the Islay Frigate Hotel and the breathtaking surroundings of the Isle of Islay.
                    </p>
                </motion.div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Filtering (Visual Only for now) */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <button
                        onClick={() => setActiveCategory('All')}
                        className={`px-6 py-2 rounded-full text-sm font-medium uppercase tracking-widest transition-all ${activeCategory === 'All' ? 'bg-secondary text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-medium uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-secondary text-white' : 'bg-gray-100 text-gray-500 hover:bg-primary hover:text-white'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Mosaic Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <AnimatePresence mode='popLayout'>
                        {filteredImages.map((img, index) => (
                            <motion.div
                                key={img.url}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5 }}
                                className="relative aspect-square group overflow-hidden cursor-pointer"
                            >
                                <img
                                    src={img.url}
                                    alt={img.cat}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white font-serif text-xl border-b border-primary pb-1">{img.cat}</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Gallery;
