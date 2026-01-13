'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Story', path: '/about' },
        { name: 'Rooms', path: '/rooms' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Contact', path: '/contact' },
    ]

    const isHomePage = pathname === '/'
    const showSolidNav = isScrolled || isOpen || !isHomePage

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-700 ${showSolidNav ? 'bg-white/80 backdrop-blur-xl border-b border-black/5 py-4 shadow-sm' : 'bg-transparent py-8'
                }`}
        >
            <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center group overflow-hidden">
                        <motion.span
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className={`text-2xl font-serif font-bold tracking-tighter transition-all duration-700 ${showSolidNav ? 'text-[#001F3F]' : 'text-white'
                                }`}
                        >
                            ISLAY <span className="text-[#C5A059] italic font-medium -ml-1">FRIGATE</span>
                        </motion.span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-12">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.path}
                                className={`text-[10px] font-bold uppercase tracking-[0.4em] hover:text-[#C5A059] transition-all duration-500 relative group overflow-hidden ${showSolidNav ? 'text-[#001F3F]' : 'text-white'
                                    }`}
                            >
                                <span className="relative z-10">{link.name}</span>
                                <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-[#C5A059] origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100 ${pathname === link.path ? 'scale-x-100' : ''
                                    }`}></span>
                            </Link>
                        ))}

                        <div className={`h-4 w-px bg-current opacity-10 ${showSolidNav ? 'text-[#001F3F]' : 'text-white'}`}></div>

                        <Link
                            href="/book"
                            className={`px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${showSolidNav
                                    ? 'bg-[#001F3F] text-white hover:bg-[#C5A059]'
                                    : 'bg-white text-[#001F3F] hover:bg-[#C5A059] hover:text-white shadow-xl'
                                }`}
                        >
                            Book Now
                        </Link>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 transition-colors duration-300 ${showSolidNav ? 'text-[#001F3F]' : 'text-white'
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
                            <span className="text-2xl font-serif font-bold tracking-tighter text-[#001F3F]">
                                ISLAY <span className="text-[#C5A059] italic">FRIGATE</span>
                            </span>
                            <button onClick={() => setIsOpen(false)} className="text-[#001F3F] p-2">
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
                                        href={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className="text-3xl font-serif text-[#001F3F] hover:text-[#C5A059] transition-colors italic"
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
                                    href="/book"
                                    onClick={() => setIsOpen(false)}
                                    className="bg-[#001F3F] text-white w-full py-5 rounded-sm text-[12px] font-bold uppercase tracking-[0.2em] inline-block text-center shadow-md"
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
    )
}

export default Navbar
