'use client';

import { motion } from 'framer-motion';
import { Folder, Cloud, Share2, Zap } from 'lucide-react';
import { FEATURES } from './constants';

const iconMap = {
    tabs: Folder,
    cloud: Cloud,
    share: Share2,
    lightning: Zap,
};

export function Features() {
    return (
        <section id="features" className="relative w-full flex items-center justify-center">
            <div className="w-full max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                    className="mb-16!"
                >
                    <p className="text-xs! font-semibold tracking-[0.15em]! uppercase text-accent mb-4">How it works</p>
                    <h2 className="font-serif text-[2.25rem]! sm:text-[2.75rem]! md:text-[3.25rem]! tracking-[-0.015em] text-white/90 max-w-[22ch] leading-[1.1]">
                        Built for focus.
                    </h2>
                </motion.div>

                <div className="flex flex-col gap-6 md:gap-8!">
                    {FEATURES.map((feat) => {
                        const Icon = iconMap[feat.icon as keyof typeof iconMap];
                        return (
                            <motion.div
                                key={feat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                                className="glass rounded-2xl p-8! md:p-10! grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-8 items-start hover:border-white/[0.14] transition-colors duration-300"
                            >
                                <div>
                                    <div className="inline-flex items-center gap-2.5 mb-4">
                                        <Icon className="w-5 h-5 text-accent" />
                                        <span className="text-xs font-semibold tracking-[0.12em] uppercase text-accent/85">{feat.label}</span>
                                    </div>
                                    <h3 className="text-[1.125rem] font-semibold text-white/90 leading-[1.4]">{feat.headline}</h3>
                                </div>
                                <p className="text-base text-white/50 leading-[1.7]">{feat.body}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
