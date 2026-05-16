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
    <GlassCard className="group p-5! md:p-6! flex items-center gap-4! md:gap-6! cursor-pointer border-line hover:border-accent/30 relative overflow-hidden rounded-lg!">
      <div className="absolute top-0 right-0 p-8! opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700">
        <Layers size={100} />
      </div>

      <div className="w-14 h-14 md:w-16 md:h-16 bg-bg/60 rounded-lg! flex items-center justify-center shrink-0 border border-line group-hover:border-accent/20 transition-all duration-700 relative overflow-hidden">
        <Layers size={24} className="text-t3 group-hover:text-accent transition-colors duration-700 relative z-10" />
        <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
      
      <div className="grow min-w-0 relative z-10">
        <div className="flex items-center gap-4! mb-2!">
          <SerifHeading as="h4" className="mb-0! text-lg! md:text-xl! truncate group-hover:text-accent transition-colors duration-300">
            {workspace.name}
          </SerifHeading>
          {workspace.is_public && (
            <Badge variant="accent" className="flex items-center gap-2! py-1! px-3! text-[9px]! font-bold uppercase tracking-widest">
              <div className="w-1.5! h-1.5! rounded-full bg-accent animate-pulse" />
              Broadcast Live
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-6! gap-y-1.5! text-[11px]! text-t3 font-medium tracking-tight opacity-40 group-hover:opacity-80 transition-opacity">
           <span className="flex items-center gap-1.5!">
             <MousePointer2 size={12} className="text-accent/60" /> {workspace.data?.length || 0} Tabs
           </span>
           <span className="flex items-center gap-1.5!">
             <Clock size={12} className="text-accent/60" /> {new Date(workspace.updated_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
           </span>
        </div>
      </div>

      <div className="flex items-center gap-2! opacity-0 group-hover:opacity-100 transition-all translate-x-4! group-hover:translate-x-0! shrink-0 relative z-10">
         {workspace.is_public && (
           <Link href={`/s/${workspace.share_id}`} target="_blank" onClick={(e) => e.stopPropagation()}>
             <button className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg! hover:bg-accent/20 hover:text-accent transition-all border border-transparent hover:border-accent/20" title="View Broadcast">
                <ExternalLink size={16} />
             </button>
           </Link>
         )}
         <button className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg! hover:bg-white/10 transition-all border border-transparent hover:border-line/20" title="Share Settings">
            <Share2 size={16} />
         </button>
         <button className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg! hover:bg-red-500/20 hover:text-red-400 transition-all border border-transparent hover:border-red-500/20" title="Destroy Vault">
            <Trash2 size={16} />
         </button>
      </div>
      
      <div className="block sm:hidden opacity-40">
        <MoreVertical className="text-t3" />
      </div>
    </GlassCard>
  </motion.div>
);
