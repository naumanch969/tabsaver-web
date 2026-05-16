import React from 'react';
import Image from 'next/image';
import { Globe, ExternalLink } from 'lucide-react';
import { GlassCard, SerifHeading } from '@/components/ui';

interface TabItemProps {
  tab: {
    title: string;
    url: string;
    favIconUrl?: string;
  };
  index: number;
}

export const TabItem = ({ tab, index }: TabItemProps) => (
  <GlassCard
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: Math.min(index * 0.05, 0.4) }}
    className="p-10! md:p-12! flex items-center gap-10! group rounded-lg! border-white/5!"
    onClick={() => window.open(tab.url, '_blank')}
  >
    <div className="w-20! h-20! bg-bg2 rounded-lg! flex items-center justify-center shrink-0 border border-white/5 group-hover:border-accent/20 transition-all duration-700 overflow-hidden relative shadow-2xl shadow-black/20">
      {tab.favIconUrl ? (
        <Image src={tab.favIconUrl} alt="" width={40} height={40} className="w-10! h-10! rounded-md! relative z-10" />
      ) : (
        <Globe className="text-t3 group-hover:text-accent/50 transition-colors relative z-10" size={32} />
      )}
      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    <div className="grow min-w-0">
      <SerifHeading as="h4" className="mb-2! truncate group-hover:text-accent transition-colors duration-500">
        {tab.title}
      </SerifHeading>
      <p className="text-[12px]! text-t3 truncate font-black uppercase tracking-[0.3em] opacity-30 group-hover:opacity-60 transition-opacity">{tab.url}</p>
    </div>
    <div className="w-16! h-16! flex items-center justify-center bg-white/5 rounded-lg! opacity-0 group-hover:opacity-100 transition-all translate-x-8! group-hover:translate-x-0! border border-white/10 shadow-xl shadow-black/20">
      <ExternalLink size={24} className="text-accent" />
    </div>
  </GlassCard>
);
