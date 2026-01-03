import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Rooms', path: '/rooms' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Contact', path: '/contact' },
    ];

    const isAdminPage = location.pathname.startsWith('/admin');
    const isHomePage = location.pathname === '/';
    const showSolidNav = isScrolled || isAdminPage || isOpen || !isHomePage;

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-500 ${showSolidNav ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center group">
                        <span className={`text-2xl font-serif font-bold tracking-tighter transition-colors duration-500 ${showSolidNav ? 'text-secondary' : 'text-white'
                            }`}>
                            ISLAY <span className="text-primary group-hover:text-secondary transition-colors italic">FRIGATE</span>
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-[11px] font-bold uppercase tracking-[0.2em] hover:text-primary transition-all duration-300 relative group ${showSolidNav ? 'text-secondary' : 'text-white'
                                    }`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''
                                    }`}></span>
                            </Link>
                        ))}

                        <div className="h-6 w-px bg-gray-200 mx-2"></div>

                        <Link
                            to="/book"
                            className="bg-secondary text-white px-8 py-3 rounded-sm text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:bg-primary hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                        >
                            Reserve Stay
                        </Link>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 transition-colors duration-300 ${showSolidNav ? 'text-secondary' : 'text-white'
                                }`}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 top-0 left-0 w-full h-screen bg-white z-40 md:hidden flex flex-col p-8"
                    >
                        <div className="flex justify-between items-center mb-16">
                            <span className="text-2xl font-serif font-bold tracking-tighter text-secondary">
                                ISLAY <span className="text-primary italic">FRIGATE</span>
                            </span>
                            <button onClick={() => setIsOpen(false)} className="text-secondary p-2">
                                <X size={28} />
                            </button>
                        </div>

                        <div className="flex flex-col space-y-8 mb-auto">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className="text-3xl font-serif text-secondary hover:text-primary transition-colors italic"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Link
                                    to="/book"
                                    onClick={() => setIsOpen(false)}
                                    className="bg-secondary text-white w-full py-5 rounded-sm text-[12px] font-bold uppercase tracking-[0.2em] inline-block text-center shadow-md"
                                >
                                    Make a Reservation
                                </Link>
                            </motion.div>
                        </div>

                        <div className="pt-8 border-t border-gray-100 flex justify-between items-center text-gray-400">
                            <div className="flex space-x-4">
                                <Instagram size={20} />
                                <Facebook size={20} />
                                <Twitter size={20} />
                            </div>
                            <div className="text-[10px] uppercase tracking-widest font-bold">
                                Est. 1924
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
