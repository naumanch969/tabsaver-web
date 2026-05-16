import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { GlassCard, SerifHeading } from '@/components/ui';

export const BroadcastFooter = () => (
  <div className="mt-48!">
      <GlassCard className="p-20! md:p-32! text-center border-white/5! rounded-4xl! hover:false">
        <div className="w-24! h-24! bg-accent/10 rounded-2xl! flex items-center justify-center mx-auto! mb-12! border border-accent/20">
          <ShieldCheck className="text-accent" size={48} />
        </div>
        <SerifHeading as="h2">Secure Infrastructure.</SerifHeading>
        <p className="text-t2 text-lg! md:text-xl! font-medium max-w-2xl mx-auto! leading-relaxed mb-16! opacity-70">
          This session was curated and broadcasted using TabStack&apos;s end-to-end encrypted vault system. Reclaim your focus with industrial-grade workspace management.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center gap-4! px-12! py-6! bg-accent text-bg font-black uppercase tracking-[0.5em] text-[11px] rounded-full hover:scale-105 transition-all group"
        >
          Build your own vault <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
     </GlassCard>
  </div>
);
