'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="bg-[#050505] text-white pt-40 pb-20 relative overflow-hidden font-light">
            <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">

                {/* Visual Separator */}
                <div className="h-px w-full bg-white/5 mb-32"></div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-16">
                    {/* Brand Main */}
                    <div className="lg:col-span-5 space-y-16">
                        <div>
                            <Link href="/" className="text-4xl md:text-5xl font-serif font-bold tracking-tighter block mb-8">
                                ISLAY <span className="text-[#C5A059] italic font-medium -ml-1">FRIGATE</span>
                            </Link>
                            <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-md italic font-serif">
                                "Where the legacy of the West Coast meets the grace of modern repose."
                            </p>
                        </div>

                        <div className="flex flex-col space-y-4">
                            <span className="text-[10px] uppercase tracking-[0.5em] text-[#C5A059] font-bold">Harbour Front Sanctuary</span>
                            <p className="text-gray-400 text-sm">Harbour Street, Tarbert, Argyll & Bute, Scotland</p>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-16 lg:gap-8">
                        {/* Column 1 */}
                        <div className="space-y-10">
                            <h4 className="text-[10px] uppercase tracking-[0.6em] font-bold text-gray-500">The Estate</h4>
                            <ul className="space-y-6">
                                {[
                                    { n: 'Story', p: '/about' },
                                    { n: 'Suites', p: '/rooms' },
                                    { n: 'Gallery', p: '/gallery' },
                                    { n: 'Inquiry', p: '/contact' }
                                ].map((item) => (
                                    <li key={item.n}>
                                        <Link href={item.p} className="text-sm text-gray-400 hover:text-white transition-all duration-500 flex items-center group">
                                            {item.n}
                                            <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500 ml-2" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-10">
                            <h4 className="text-[10px] uppercase tracking-[0.6em] font-bold text-gray-500">Concierge</h4>
                            <ul className="space-y-6">
                                <li>
                                    <p className="text-sm text-white font-medium">+44 (0) 1880 820 300</p>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-600 mt-1">Reservations</p>
                                </li>
                                <li>
                                    <p className="text-sm text-white font-medium">islayfrigatehotel@outlook.com</p>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-600 mt-1">Correspondence</p>
                                </li>
                            </ul>
                        </div>

                        {/* Column 3 */}
                        <div className="space-y-10">
                            <h4 className="text-[10px] uppercase tracking-[0.6em] font-bold text-gray-500">Social</h4>
                            <ul className="space-y-6">
                                {['Instagram', 'Facebook', 'LinkedIn'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-sm text-gray-400 hover:text-white transition-all duration-500 flex items-center group">
                                            {item}
                                            <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500 ml-2" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-end gap-12">
                    <div className="space-y-4">
                        <p className="text-[10px] uppercase tracking-[0.4em] text-gray-600 font-bold">
                            © {new Date().getFullYear()} Islay Frigate Hotel Limited.
                        </p>
                        <p className="text-[10px] uppercase tracking-[0.4em] text-gray-700 font-bold">
                            Crafted for Elegance & Comfort
                        </p>
                    </div>

                    <button
                        onClick={scrollToTop}
                        className="group flex flex-col items-center gap-4"
                    >
                        <span className="text-[9px] uppercase tracking-[1em] text-gray-500 mr-[-1em] group-hover:text-[#C5A059] transition-all duration-500">Back to Top</span>
                        <div className="w-px h-16 bg-white/10 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-[#C5A059] -translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Aesthetic Detail */}
            <div className="absolute -bottom-20 -right-20 text-[20vw] font-serif italic text-white/[0.02] pointer-events-none select-none">
                Frigate
            </div>
        </footer>
    )
}

export default Footer
