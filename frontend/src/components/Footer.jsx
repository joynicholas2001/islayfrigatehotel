import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-secondary text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Info */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-2xl font-serif font-bold mb-6">
                            ISLAY <span className="text-primary">FRIGATE</span>
                        </h3>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Experience the pinnacle of coastal luxury at the Islay Frigate Hotel. Where timeless elegance meets modern comfort.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-primary transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-primary transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-primary transition-colors"><Twitter size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h4 className="text-lg font-medium mb-6 uppercase tracking-wider">Explore</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link to="/rooms" className="hover:text-white transition-colors">Rooms & Suites</Link></li>
                            <li><Link to="/gallery" className="hover:text-white transition-colors">Area Gallery</Link></li>
                            <li><Link to="/faqs" className="hover:text-white transition-colors">FAQs</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-span-1">
                        <h4 className="text-lg font-medium mb-6 uppercase tracking-wider">Contact</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-center space-x-3">
                                <Phone size={18} className="text-primary" />
                                <span>+91 1800 123 4567</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail size={18} className="text-primary" />
                                <span>stay@islayfrigate.com</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <MapPin size={18} className="text-primary" />
                                <span>Isle of Islay, Scotland, UK</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="col-span-1">
                        <h4 className="text-lg font-medium mb-6 uppercase tracking-wider">Newsletter</h4>
                        <p className="text-gray-400 mb-4 text-sm">Subscribe to receive exclusive offers and news.</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="bg-gray-800 border-none px-4 py-2 w-full focus:ring-1 focus:ring-primary outline-none transition-all"
                            />
                            <button className="bg-primary hover:bg-primary-hover px-4 py-2 transition-luxury">
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    <p>© {new Date().getFullYear()} Islay Frigate Hotel. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
