'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { ExternalLink, Globe, Copy, Check, MousePointer2, Layout, Clock, ArrowRight } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Workspace } from '@/types';

export default function SharedWorkspacePage() {
  const { shareId } = useParams();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchWorkspace = async () => {
      const { data, error } = await supabase
        .from('workspaces')
        .select('*')
        .eq('share_id', shareId)
        .eq('is_public', true)
        .single();

      if (data) setWorkspace(data);
      setLoading(false);
    };

    if (shareId) fetchWorkspace();
  }, [shareId]);

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openAll = () => {
    workspace?.data?.forEach((tab) => {
      window.open(tab.url, '_blank');
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg text-t1 flex flex-col items-center justify-center p-6">
        <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-t3 tracking-tight">Deciphering broadcast signal...</p>
      </div>
    );
  }

  if (!workspace) {
    return (
      <div className="min-h-screen bg-bg text-t1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-bg2 border border-line rounded-3xl flex items-center justify-center mb-8">
           <Globe className="text-red-400 opacity-50" size={40} />
        </div>
        <h1 className="text-3xl font-bold mb-4 font-serif">Vault Not Found</h1>
        <p className="text-t2 max-w-sm mx-auto mb-12">
          This broadcast might have been revoked by the owner or the link is incorrect.
        </p>
        <Link href="/" className="btn-secondary">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-t1 pb-24 selection:bg-accent/30">
      {/* Premium Header */}
      <div className="relative border-b border-line overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-accent/5 opacity-40 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-6">
                <div className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[10px] uppercase tracking-widest font-bold text-accent italic">
                  Public Broadcast
                </div>
                <div className="h-1 w-1 rounded-full bg-t3" />
                <div className="text-t3 text-[10px] uppercase tracking-widest font-bold">
                  ID: {shareId}
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 font-serif">{workspace.name}</h1>
              <div className="flex items-center gap-6 text-t2 font-medium">
                 <div className="flex items-center gap-2">
                    <Layout size={16} className="text-accent/50" />
                    <span>{workspace.data?.length || 0} Tabs</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Clock size={16} className="text-accent/50" />
                    <span>Updated {new Date(workspace.updated_at).toLocaleDateString()}</span>
                 </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 shrink-0">
               <button 
                 onClick={copyUrl}
                 className="h-14 px-6 bg-bg2 border border-line rounded-2xl flex items-center gap-3 hover:bg-bg3 transition-all font-bold text-sm tracking-tight"
                >
                  {copied ? (
                    <><Check className="text-green-400" size={18} /> Copied</>
                  ) : (
                    <><Copy size={18} className="text-t3" /> Share Vault</>
                  )}
               </button>
               <button 
                 onClick={openAll}
                 className="h-14 px-8 bg-accent text-bg rounded-2xl flex items-center gap-3 hover:translate-y-[-2px] transition-all font-bold text-sm shadow-xl shadow-accent/20 active:scale-95"
               >
                 <MousePointer2 size={18} /> Open Session
               </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 -mt-16">
        <div className="grid gap-4">
          {workspace.data?.map((tab, i) => (
            <motion.a
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              key={i}
              href={tab.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-bg2/40 backdrop-blur-md border border-line rounded-2xl p-6 flex items-center gap-6 hover:bg-bg2 hover:border-accent/30 transition-all"
            >
              <div className="w-14 h-14 bg-bg rounded-xl flex items-center justify-center shrink-0 border border-line group-hover:border-accent/10">
                {tab.favIconUrl ? (
                  <Image src={tab.favIconUrl} alt="" width={32} height={32} className="w-8 h-8 rounded-sm" />
                ) : (
                  <Globe className="text-t3 group-hover:text-accent/50 transition-colors" size={24} />
                )}
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="font-bold text-lg truncate mb-1 text-t1 group-hover:text-accent transition-colors">
                  {tab.title}
                </h3>
                <p className="text-sm text-t3 truncate font-medium">{tab.url}</p>
              </div>
              <div className="p-3 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink size={18} className="text-t2" />
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-20 text-center py-20 border-t border-line">
           <div className="mb-8 font-serif italic text-t2 text-xl">
             &quot;Effortless browsing curation powered by TabStack.&quot;
           </div>
           <a 
             href="https://tabsaver.io" 
             className="inline-flex items-center gap-3 text-accent font-bold uppercase tracking-[0.2em] text-[10px] hover:tracking-[0.3em] transition-all"
           >
             Get the Extension <ArrowRight size={14} />
           </a>
        </div>
      </main>
    </div>
  );
}
