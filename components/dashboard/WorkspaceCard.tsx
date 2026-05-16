'use client';

import { motion } from 'framer-motion';
import { Layers, MousePointer2, Clock, ExternalLink, Share2, Trash2, MoreVertical } from 'lucide-react';
import { GlassCard, Badge, ANIM_VARIANTS } from '@/components/ui';
import { Workspace } from '@/types';
import Link from 'next/link';

interface WorkspaceCardProps {
  workspace: Workspace;
  index: number;
}

export const WorkspaceCard = ({ workspace, index }: WorkspaceCardProps) => (
  <motion.div
    {...ANIM_VARIANTS.fadeInUp}
    transition={{ delay: Math.min(index * 0.05, 0.5) }}
  >
    <GlassCard className="group p-8! flex items-center gap-8! cursor-pointer border-line hover:border-accent/30 relative overflow-hidden rounded-4xl!">
      <div className="absolute top-0 right-0 p-10! opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700">
        <Layers size={140} />
      </div>

      <div className="w-20 h-20 bg-bg/60 rounded-2xl! flex items-center justify-center shrink-0 border border-line group-hover:border-accent/20 transition-all duration-700 relative overflow-hidden">
        <Layers size={32} className="text-t3 group-hover:text-accent transition-colors duration-700 relative z-10" />
        <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
      
      <div className="grow min-w-0 relative z-10">
        <div className="flex items-center gap-6! mb-3!">
          <h3 className="font-bold text-xl! md:text-2xl! truncate text-t1 group-hover:text-accent transition-colors duration-300 tracking-tighter!">
            {workspace.name}
          </h3>
          {workspace.is_public && (
            <Badge variant="accent" className="flex items-center gap-3! py-1.5! px-4! text-[10px]! font-black uppercase tracking-widest">
              <div className="w-2! h-2! rounded-full bg-accent animate-pulse" />
              Broadcast Live
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-8! gap-y-2! text-[12px]! text-t3 font-bold tracking-tight opacity-40 group-hover:opacity-80 transition-opacity">
           <span className="flex items-center gap-2!">
             <MousePointer2 size={14} className="text-accent/60" /> {workspace.data?.length || 0} Tabs
           </span>
           <span className="flex items-center gap-2!">
             <Clock size={14} className="text-accent/60" /> {new Date(workspace.updated_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
           </span>
        </div>
      </div>

      <div className="flex items-center gap-3! opacity-0 group-hover:opacity-100 transition-all translate-x-4! group-hover:translate-x-0! shrink-0 relative z-10">
         {workspace.is_public && (
           <Link href={`/s/${workspace.share_id}`} target="_blank" onClick={(e) => e.stopPropagation()}>
             <button className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl! hover:bg-accent/20 hover:text-accent transition-all border border-transparent hover:border-accent/20" title="View Broadcast">
                <ExternalLink size={20} />
             </button>
           </Link>
         )}
         <button className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl! hover:bg-white/10 transition-all border border-transparent hover:border-line/20" title="Share Settings">
            <Share2 size={20} />
         </button>
         <button className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl! hover:bg-red-500/20 hover:text-red-400 transition-all border border-transparent hover:border-red-500/20" title="Destroy Vault">
            <Trash2 size={20} />
         </button>
      </div>
      
      <div className="block sm:hidden opacity-40">
        <MoreVertical className="text-t3" />
      </div>
    </GlassCard>
  </motion.div>
);
