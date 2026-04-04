'use client';

import { motion } from 'framer-motion';
import { EXTENSION_DOWNLOAD_LINK } from './constants';
import Link from 'next/link';
import Logo from './logo';

export function CTA() {
    return (
        <section className="w-full flex items-center! justify-center!">
            <div className="w-full max-w-6xl px-6 md:px-10 ">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                    className="relative overflow-hidden glass rounded-3xl px-4! md:px-8! py-6! md:py-12! flex justify-center items-center "
                >
                    {/* radial amber glow */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-125! h-50! rounded-full bg-accent opacity-6 blur-[70px]" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center gap-7! max-w-2xl mx-auto">
                        <Logo />
                        <h2 className="font-serif text-[2.25rem]! sm:text-[2.75rem]! md:text-[3.25rem]! tracking-[-0.015em] text-white/92 leading-[1.1] text-center">
                            Ready to <em className="not-italic text-accent">reclaim your focus?</em>
                        </h2>
                        <p className="text-base text-white/45 leading-[1.7]! max-w-[42ch]! text-center">
                            Install the extension and start organizing your work. No sign up. No sync. Just clean tabs and a clear mind.
                        </p>
                        <div className="flex items-center gap-3! mt-2!">
                            <Link
                                href={EXTENSION_DOWNLOAD_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary"
                            >
                                Install from Chrome Store
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
