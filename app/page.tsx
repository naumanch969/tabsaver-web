'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

/* ─── tiny SVG primitives ─────────────────────────────────────── */
const TabsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="15" rx="2"/>
    <path d="M2 7l3-4h6l3 4"/>
  </svg>
);
const CloudIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
  </svg>
);
const ShareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);
const LightningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e8a84b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const LogoMark = () => (
  <svg width="28" height="28" viewBox="0 0 56 56" fill="none">
    <rect x="14" y="20" width="12" height="6" rx="3" fill="#e8a84b" opacity="0.18"/>
    <rect x="14" y="24" width="36" height="22" rx="5" fill="#e8a84b" opacity="0.18"/>
    <rect x="10" y="15" width="12" height="6" rx="3" fill="#e8a84b" opacity="0.45"/>
    <rect x="10" y="19" width="36" height="22" rx="5" fill="#e8a84b" opacity="0.45"/>
    <rect x="6" y="10" width="14" height="7" rx="3.5" fill="#e8a84b"/>
    <rect x="6" y="15" width="36" height="22" rx="5" fill="#e8a84b"/>
    <rect x="13" y="22" width="16" height="2" rx="1" fill="#171610" opacity="0.5"/>
    <rect x="13" y="27" width="10" height="2" rx="1" fill="#171610" opacity="0.3"/>
  </svg>
);

/* ─── fade-in variants ────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

/* ─── mock workspace preview ──────────────────────────────────── */
const PREVIEW_TABS = [
  { title: 'Figma · Dashboard v3', domain: 'figma.com', color: '#a78bfa' },
  { title: 'Linear · Sprint 12 board', domain: 'linear.app', color: '#60a5fa' },
  { title: "Notion · Q2 Roadmap", domain: 'notion.so', color: '#94a3b8' },
  { title: 'Supabase · tabsaver-db', domain: 'supabase.com', color: '#4ade80' },
  { title: 'Vercel · tabsaver-web', domain: 'vercel.com', color: '#f0ede4' },
];

function WorkspacePreview() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % PREVIEW_TABS.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full max-w-[460px] mx-auto lg:ml-auto">
      {/* glow */}
      <div className="absolute -inset-12 rounded-full bg-[#e8a84b] opacity-[0.06] blur-[60px] pointer-events-none" />

      <div className="glass rounded-2xl overflow-hidden relative shadow-2xl">
        {/* window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
          <div className="flex gap-1.5">
            {['#e07070','#e8a84b','#4ade80'].map(c => (
              <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.7 }} />
            ))}
          </div>
          <div className="flex-1 mx-3 h-5 bg-white/[0.06] rounded-md flex items-center px-2">
            <span className="text-[10px] text-white/30 font-mono">Design Sprint · 5 tabs</span>
          </div>
        </div>

        {/* tab list */}
        <div className="divide-y divide-white/[0.04]">
          {PREVIEW_TABS.map((tab, i) => (
            <motion.div
              key={tab.domain}
              animate={{ backgroundColor: active === i ? 'rgba(232,168,75,0.07)' : 'rgba(0,0,0,0)' }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3 px-4 py-3"
            >
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: tab.color, opacity: active === i ? 1 : 0.35 }} />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-white/80 truncate leading-tight">{tab.title}</p>
                <p className="text-[11px] text-white/30 mt-0.5">{tab.domain}</p>
              </div>
              {active === i && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-[10px] text-[#e8a84b] font-medium shrink-0"
                >
                  active
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* footer row */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.06]">
          <span className="text-[10px] text-white/25 font-mono">Synced seconds ago</span>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
            <span className="text-[10px] text-white/25">Cloud active</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── feature data ────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: <TabsIcon />,
    label: 'Session Vaults',
    headline: 'Snapshot your whole workspace in one click.',
    body: 'Group all open tabs — with notes and color labels — into a named vault. Restore any session exactly as you left it, months later.',
  },
  {
    icon: <CloudIcon />,
    label: 'Cross-Profile Sync',
    headline: 'Same sessions on every browser and device.',
    body: "Sign in once. Your vaults travel with you. Home laptop, work desktop, or a borrowed MacBook — your tabs are always where you expect them.",
  },
  {
    icon: <ShareIcon />,
    label: 'Public Share Links',
    headline: 'Share a session with anyone, instantly.',
    body: 'Turn any workspace into a public link. Teammates open every tab in one click — no logins, no setup. Perfect for handoffs and research dumps.',
  },
  {
    icon: <LightningIcon />,
    label: 'Quick Save',
    headline: 'Bookmark a tab without naming anything.',
    body: 'Hold a URL for 7 days with one click. No workspace, no ritual — just a fast buffer that clears itself automatically.',
  },
];

const STEPS = [
  { n: '01', title: 'Install the extension', body: 'Add 3TabSaver to Chrome in seconds. It sits quietly until you need it.' },
  { n: '02', title: 'Save a session', body: 'Click the popover, name the vault, pick a colour. Done in under 4 seconds.' },
  { n: '03', title: 'Sign in to sync', body: 'Create a free account and your vaults replicate to the cloud immediately.' },
  { n: '04', title: 'Share or restore', body: 'Send a link, restore on another device, or quick-save a lone tab while you work.' },
];

/* ─── Nav ─────────────────────────────────────────────────────── */
function Nav() {
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-white/[0.06]' : ''
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-10 h-14 max-w-7xl mx-auto w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          <LogoMark />
          <span className="text-sm font-semibold tracking-wide text-white/90">
            3tab<span className="text-[#e8a84b]">saver</span>
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-white/45">
          {['Features', 'How it works'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="hover:text-white/80 transition-colors duration-150">
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link href="/login" className="btn-secondary !py-2 !px-4 text-sm">Sign in</Link>
          <Link href="/login" className="btn-primary !py-2 !px-4 text-sm">Get started</Link>
        </div>
      </div>
    </motion.nav>
  );
}

/* ─── Page ────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <Nav />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="min-h-[100dvh] flex items-center relative overflow-hidden">
        {/* ambient bg blob */}
        <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#e8a84b] opacity-[0.045] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#e8a84b] opacity-[0.03] blur-[80px] pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left — copy */}
            <div>
              {/* pill badge */}
              <motion.div
                variants={fadeUp} initial="hidden" animate="show" custom={0}
                className="inline-flex items-center gap-2 glass rounded-full px-3.5 py-1.5 mb-8"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
                <span className="text-xs text-white/50 font-medium">Free to use · Chrome Extension</span>
              </motion.div>

              <motion.h1
                variants={fadeUp} initial="hidden" animate="show" custom={1}
                className="font-serif text-[2.6rem] md:text-[3.25rem] leading-[1.08] tracking-tight text-white/95 mb-5"
              >
                Save tabs.<br />
                Sync everywhere.<br />
                <em className="not-italic text-[#e8a84b]">Never lose context.</em>
              </motion.h1>

              <motion.p
                variants={fadeUp} initial="hidden" animate="show" custom={2}
                className="text-base text-white/45 leading-relaxed mb-9 max-w-[42ch]"
              >
                A browser extension that snapshots your tabs into named vaults, syncs them across every device, and lets you share sessions with a single link.
              </motion.p>

              <motion.div
                variants={fadeUp} initial="hidden" animate="show" custom={3}
                className="flex flex-wrap items-center gap-3 mb-10"
              >
                <Link href="/login" className="btn-primary gap-2">
                  Start syncing <ArrowRight />
                </Link>
                <a
                  href="https://chrome.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Install extension
                </a>
              </motion.div>

              <motion.div
                variants={fadeUp} initial="hidden" animate="show" custom={4}
                className="flex flex-col gap-2"
              >
                {['No tab limits', 'Works across Chrome profiles', '7-day quick-save buffer'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-white/40">
                    <CheckIcon />
                    <span>{item}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — live preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="hidden lg:block"
            >
              <WorkspacePreview />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section id="features" className="py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-10">

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="mb-16"
          >
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#e8a84b] mb-3">Features</p>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-white/90 max-w-[20ch] leading-tight">
              Everything a power user needs.
            </h2>
          </motion.div>

          {/* Zig-zag feature rows */}
          <div className="flex flex-col gap-10">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={feat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="glass rounded-2xl p-7 md:p-9 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 md:gap-12 items-start hover:border-white/[0.14] transition-colors duration-300"
              >
                <div>
                  <div className="inline-flex items-center gap-2 mb-3">
                    <div className="text-[#e8a84b]">{feat.icon}</div>
                    <span className="text-xs font-semibold tracking-[0.12em] uppercase text-[#e8a84b]/80">{feat.label}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white/90 leading-snug">{feat.headline}</h3>
                </div>
                <p className="text-[15px] text-white/45 leading-relaxed md:pt-8">{feat.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#e8a84b] mb-3">How it works</p>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-white/90 leading-tight">
              From install to synced in minutes.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="p-7 bg-[#111008] flex flex-col gap-4"
              >
                <span className="font-mono text-[11px] text-[#e8a84b]/60 tracking-wider">{step.n}</span>
                <h3 className="text-[15px] font-semibold text-white/85 leading-snug">{step.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="relative overflow-hidden glass rounded-3xl px-8 py-16 md:px-16 md:py-20 text-center"
          >
            {/* radial amber glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[500px] h-[200px] rounded-full bg-[#e8a84b] opacity-[0.06] blur-[70px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl mx-auto">
              <LogoMark />
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-white/92 leading-tight">
                Your tabs. Your context. <em className="not-italic text-[#e8a84b]">Your cloud.</em>
              </h2>
              <p className="text-[15px] text-white/40 leading-relaxed max-w-[38ch]">
                Set up in 60 seconds. Free accounts sync up to 50 workspaces.
              </p>
              <div className="flex items-center gap-3 mt-4">
                <Link href="/login" className="btn-primary">
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] py-10 mt-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <LogoMark />
            <span className="text-sm font-semibold tracking-wide text-white/70">
              3tab<span className="text-[#e8a84b]">saver</span>
            </span>
          </div>
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} 3TabSaver. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-xs text-white/40 hover:text-white/80 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-white/40 hover:text-white/80 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </>
  );
}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link href="/login" className="btn-primary gap-2">
                  Create free account <ArrowRight />
                </Link>
                <a
                  href="https://chrome.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Install extension
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <LogoMark />
            <span className="text-sm font-semibold text-white/50">
              3tab<span className="text-[#e8a84b]">saver</span>
            </span>
          </div>
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} 3TabSaver. Crafted with intention.
          </p>
          <div className="flex items-center gap-5 text-xs text-white/30">
            <Link href="/login" className="hover:text-white/60 transition-colors">Sign in</Link>
            <Link href="/dashboard" className="hover:text-white/60 transition-colors">Dashboard</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
