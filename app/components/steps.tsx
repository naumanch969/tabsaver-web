'use client';

import { motion } from 'framer-motion';
import { STEPS } from './constants';

export function Steps() {
  return (
    <section id="how-it-works" className="py-32! md:py-48! w-full flex items-center justify-center">
      <div className="w-full max-w-6xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16!"
        >
          <p className="text-xs! font-semibold tracking-[0.15em]! uppercase text-accent mb-4">Setup</p>
          <h2 className="font-serif text-[2.25rem]! sm:text-[2.75rem]! md:text-[3.25rem]! tracking-[-0.015em] text-white/90 leading-[1.1]">
            Get started in minutes.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px! bg-white/6 rounded-2xl overflow-hidden">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="p-8! md:p-9! bg-bg flex flex-col gap-5"
            >
              <span className="font-mono text-sm text-accent/50 tracking-widest font-semibold">{step.n}</span>
              <h3 className="text-lg font-semibold text-white/85 leading-[1.4]">{step.title}</h3>
              <p className="text-base! text-white/45 leading-[1.6]!">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
