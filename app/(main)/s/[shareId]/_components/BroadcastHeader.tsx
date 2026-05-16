import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Clock, Copy, Check, MousePointer2 } from 'lucide-react';
import { Container, SerifHeading, PremiumButton, ANIM_VARIANTS } from '@/components/ui';
import { Workspace } from '@/types';

interface BroadcastHeaderProps {
  workspace: Workspace;
  shareId: string;
  copied: boolean;
  onCopy: () => void;
  onOpenAll: () => void;
}

export const BroadcastHeader = ({ workspace, shareId, copied, onCopy, onOpenAll }: BroadcastHeaderProps) => (
  <header className="relative pt-20! pb-64! md:pt-32! md:pb-80! overflow-hidden border-b border-white/5">
    <Container className="relative z-10">
      <div className="flex flex-col gap-16!">
        <motion.div {...ANIM_VARIANTS.fadeInUp}>
          <div className="flex flex-wrap items-center gap-4! mb-10!">
            <div className="inline-flex items-center gap-3! bg-accent/10 border border-accent/20 px-6! py-2! rounded-full text-accent font-black uppercase tracking-[0.4em] text-[10px]">
              <div className="w-1.5! h-1.5! rounded-full bg-accent animate-pulse" />
              Live Broadcast
            </div>
            <div className="px-6! py-2! border border-white/10 rounded-full text-t3 font-black uppercase tracking-[0.4em] text-[10px] opacity-60">
              ID: {shareId}
            </div>
          </div>
          
          <SerifHeading as="h1">{workspace.name}</SerifHeading>
          
          <div className="flex flex-wrap items-center gap-12! text-t2 font-bold tracking-tight">
             <div className="flex items-center gap-4!">
                <div className="w-12! h-12! rounded-2xl! bg-white/5 border border-white/10 flex items-center justify-center">
                  <Layers size={20} className="text-accent" />
                </div>
                <span className="text-lg! md:text-xl! opacity-80">{workspace.data?.length || 0} Tabs in Stack</span>
             </div>
             <div className="flex items-center gap-4!">
                <div className="w-12! h-12! rounded-2xl! bg-white/5 border border-white/10 flex items-center justify-center">
                  <Clock size={20} className="text-accent" />
                </div>
                <span className="text-lg! md:text-xl! opacity-80">Captured {new Date(workspace.updated_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
             </div>
          </div>
        </motion.div>
        
        <motion.div 
          {...ANIM_VARIANTS.fadeIn}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center gap-6! shrink-0"
        >
           <button 
             onClick={onCopy}
             className="h-20! px-10! glass border border-white/10 rounded-2xl! flex items-center gap-4! hover:bg-white/5 transition-all font-black text-[11px] uppercase tracking-[0.4em] w-full sm:w-auto justify-center"
            >
              {copied ? (
                <><Check className="text-green-400" size={20} /> Link Copied</>
              ) : (
                <><Copy size={18} className="text-t3" /> Copy Broadcast Link</>
              )}
           </button>
           <PremiumButton 
             onClick={onOpenAll}
             className="h-20! px-12! w-full sm:w-auto justify-center text-lg! rounded-2xl!"
           >
             <MousePointer2 size={24} /> Initialize Stack
           </PremiumButton>
        </motion.div>
      </div>
    </Container>

    <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 opacity-[0.03] select-none pointer-events-none">
      <div className="text-[40rem] md:text-[70rem] font-serif leading-none tracking-tighter">
        {workspace.name.charAt(0)}
      </div>
    </div>
  </header>
);
