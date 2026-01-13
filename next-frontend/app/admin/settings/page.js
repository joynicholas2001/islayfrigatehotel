'use client'

import React from 'react';
import { Settings } from 'lucide-react';

const AdminSettingsPage = () => {
    return (
        <div className="py-24 text-center space-y-6 bg-white border border-gray-100 shadow-sm rounded-sm">
            <div className="relative inline-block">
                <Settings size={64} className="mx-auto text-primary animate-spin-slow" />
            </div>
            <h3 className="text-3xl font-serif text-secondary italic uppercase tracking-widest">Global Property Settings</h3>
            <p className="text-gray-500 max-w-md mx-auto font-light leading-relaxed">
                This area is reserved for core system configurations, payment gateway keys, and channel management integrations.
            </p>
            <div className="pt-12">
                <button className="bg-gray-100 text-gray-400 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] cursor-not-allowed">
                    Access Curated Configurations
                </button>
            </div>

            <style jsx>{`
                :global(.animate-spin-slow) {
                    animation: spin 8s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default AdminSettingsPage;
