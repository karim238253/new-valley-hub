import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.png';

const Navbar = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstallBtn, setShowInstallBtn] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);
            // Update UI notify the user they can install the PWA
            setShowInstallBtn(true);
        };

        const handleAppInstalled = () => {
            // Hide the app-provided install promotion
            setShowInstallBtn(false);
            setDeferredPrompt(null);
            console.log('PWA was installed');
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);

        // We've used the prompt, and can't use it again, discard it
        setDeferredPrompt(null);
        setShowInstallBtn(false);
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm transition-all duration-300">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center py-3">
                    <Link to="/" className="hover:opacity-90 transition-opacity flex-shrink-0">
                        <img
                            src={logo}
                            alt="New Valley Hub Logo"
                            className="h-20 w-auto object-contain"
                        />
                    </Link>

                    <div className="hidden md:flex items-center space-x-10">
                        {[
                            { path: "/", label: "Home" },
                            { path: "/attractions", label: "Attractions" },
                            { path: "/services", label: "Services" },
                            { path: "/hotels", label: "Hotels" },
                            { path: "/map", label: "Map" },
                            { path: "/marketplace", label: "Market" },
                            { path: "/souvenir", label: "Souvenir Maker 📸" },
                            { path: "/contact", label: "Contact Us" },
                        ].map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="text-gray-700 font-semibold text-lg hover:text-orange-500 transition-colors duration-300 relative group"
                            >
                                {link.label}
                                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-orange-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                            </Link>
                        ))}

                        {/* Install App Button */}
                        {showInstallBtn && (
                            <button
                                onClick={handleInstallClick}
                                className="flex items-center gap-2 border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-bold px-5 py-2.5 rounded-full transition-colors animate-pulse"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                Install App
                            </button>
                        )}

                        <Link
                            to="/planner"
                            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-orange-500/30 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            Trip Planner ✨
                        </Link>
                    </div>

                    <div className="md:hidden">
                        {/* Mobile menu button placeholder */}
                        <button className="text-gray-700 hover:text-orange-500 p-2">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
