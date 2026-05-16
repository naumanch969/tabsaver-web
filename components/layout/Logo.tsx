import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link';
import { Layers } from 'lucide-react';

const Logo = () => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2!"
    >
        <Link href="/" className="flex items-center gap-3! hover:opacity-80 transition-opacity">
            <div className="w-8! h-8! md:w-10! md:h-10! bg-accent rounded-2xl! flex items-center justify-center shadow-lg shadow-accent/20">
                <Layers className="w-4! h-4! md:w-5! md:h-5! text-bg" />
            </div>
            <span className="font-bold text-xl md:text-2xl! tracking-tighter">tab<span className="text-accent">stack</span></span>
        </Link>
    </motion.div>
);

export default Logo