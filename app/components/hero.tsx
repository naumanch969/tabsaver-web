'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from './icons';
import { EXTENSION_DOWNLOAD_LINK, fadeUp } from './constants';
import { WorkspacePreview } from './workspace-preview';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="min-h-dvh flex items-center justify-center relative overflow-hidden pt-32 pb-40">
      {/* ambient bg blobs */}
      <div className="absolute top-[-15%]! left-[-10%]! w-150! h-150! rounded-full bg-accent opacity-[0.045] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-100! h-100! rounded-full bg-accent opacity-3 blur-[80px] pointer-events-none" />

      <div className="w-full max-w-6xl! mx-auto! px-4!">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16! lg:gap-32! items-center justify-center">

          {/* Left — copy */}
          <div>
            {/* pill badge */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={0}
              className="inline-flex items-center gap-2 glass rounded-full px-3.5! py-1.5! mb-8!"
            >
              <div className="w-1.5! h-1.5! rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs! text-white/50 font-medium">Free · Simple · No accounts</span>
            </motion.div>

            <motion.h1
              variants={fadeUp} initial="hidden" animate="show" custom={1}
              className="font-serif text-[3rem]! sm:text-[3.5rem]! md:text-[4rem]! leading-[1.05]! tracking-[-0.02em]! text-white/95 mb-6!"
            >
              Clear your tabs.<br />
              Clear your mind.<br />
              <em className="not-italic text-accent">Deep work starts here.</em>
            </motion.h1>

            <motion.p
              variants={fadeUp} initial="hidden" animate="show" custom={2}
              className="text-[17px]! text-white/50 leading-[1.7]! mb-6! max-w-[48ch]!"
            >
              Save all your open tabs into named workspaces. Close them to focus. Restore them all at once when you&apos;re ready. That&apos;s it.
            </motion.p>

            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={3}
              className="flex flex-wrap items-center gap-4! mb-12!"
            >
              <Link
                href={EXTENSION_DOWNLOAD_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary gap-2!"
              >
                Install Extension <ArrowRight />
              </Link>
              <Link
                href="#features"
                className="btn-secondary"
              >
                Learn more
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={4}
              className="flex flex-col gap-3!"
            >
              <div className="text-sm text-white/40">
                <strong className="text-white/60">No setup is required.</strong> No accounts. Just your tabs.
              </div>
            </motion.div>
          </div>

          {/* Right — live preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="hidden lg:flex justify-center"
          >
            <WorkspacePreview />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
