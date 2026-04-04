'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PREVIEW_TABS } from './constants';

export function WorkspacePreview() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % PREVIEW_TABS.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full max-w-115!">
      {/* glow */}
      <div className="absolute -inset-12! rounded-full bg-accent opacity-6 blur-[60px] pointer-events-none" />

      <div className="glass rounded-2xl! overflow-hidden relative shadow-2xl">
        {/* window chrome */}
        <div className="flex items-center gap-2! px-4! py-3! border-b border-white/6">
          <div className="flex gap-1.5!">
            {['#e07070', '#e8a84b', '#4ade80'].map(c => (
              <div key={c} className="w-2.5! h-2.5! rounded-full" style={{ background: c, opacity: 0.7 }} />
            ))}
          </div>
          <div className="flex-1! mx-3! h-5! bg-white/6 rounded-md flex items-center px-2!">
            <span className="text-[10px]! text-white/30 font-mono">Design Sprint · 5 tabs</span>
          </div>
        </div>

        {/* tab list */}
        <div className="divide-y divide-white/4">
          {PREVIEW_TABS.map((tab, i) => (
            <motion.div
              key={tab.domain}
              animate={{ backgroundColor: active === i ? 'rgba(232,168,75,0.07)' : 'rgba(0,0,0,0)' }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3 px-4! py-3!"
            >
              <div className="w-2! h-2! rounded-full shrink-0" style={{ background: tab.color, opacity: active === i ? 1 : 0.35 }} />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-white/80 truncate leading-tight">{tab.title}</p>
                <p className="text-[11px] text-white/30 mt-0.5">{tab.domain}</p>
              </div>
              {active === i && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-[10px] text-accent font-medium shrink-0"
                >
                  active
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* footer row */}
        <div className="flex items-center justify-between px-4! py-3! border-t border-white/6">
          <span className="text-[10px]! text-white/25 font-mono">Synced seconds ago</span>
          <div className="flex items-center gap-1">
            <div className="w-1.5! h-1.5! rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px]! text-white/25">Cloud active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
