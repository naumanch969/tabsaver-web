'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Logo from './logo';
import Link from 'next/link';
import { EXTENSION_DOWNLOAD_LINK } from './constants';

export function Nav() {
    const showButton = typeof window !== 'undefined' && window.location.pathname === '/';
    const links = [
        { name: 'Features', href: '#features' },
        { name: 'How it works', href: '#how-it-works' },
    ]

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', fn, { passive: true });
        return () => window.removeEventListener('scroll', fn);
    }, []);

    return (
        <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4! py-1! `}
        >
            <div className={`w-full flex items-center justify-center `}>
                <div className={`flex items-center justify-between h-14! w-full max-w-6xl ${scrolled ? 'transition-all! px-1.5! glass border-b border-white/6' : ''}`}>
                    {/* Logo */}
                    <Logo />

                    {/* Nav links */}
                    <div className="hidden md:flex items-center gap-6 text-sm text-white/45">
                        {links.map(link => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="hover:text-white/80 transition-colors duration-150"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        {
                            showButton &&
                            <Link
                                href={EXTENSION_DOWNLOAD_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary text-sm"
                            >
                                Install
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
