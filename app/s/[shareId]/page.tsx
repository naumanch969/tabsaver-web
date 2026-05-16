'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { ExternalLink, Globe, Copy, Check, MousePointer2, Layers, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Workspace } from '@/types';
import { GlassCard, PremiumButton, SerifHeading, Container, ANIM_VARIANTS } from '@/components/ui';
import { MainLayout } from '@/components/layout';

export default function SharedWorkspacePage() {

  /////////////////////////////////////////////// VARIABLES /////////////////////////////////////////////// 
  const { shareId } = useParams();
  
  /////////////////////////////////////////////// STATES /////////////////////////////////////////////// 
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  
  /////////////////////////////////////////////// EFFECTS /////////////////////////////////////////////// 
  useEffect(() => {
    const fetchWorkspace = async () => {
      const { data } = await supabase
      .from('workspaces')
      .select('*')
      .eq('share_id', shareId)
      .eq('is_public', true)
      .single();
      
      if (data) setWorkspace(data);
      setLoading(false);
    };

    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) setUserEmail(session.user.email ?? null);
    };

    if (shareId) fetchWorkspace();
    fetchSession();
  }, [shareId]);
  
  /////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////// 
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUserEmail(null);
  };

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

  /////////////////////////////////////////////// RENDER /////////////////////////////////////////////// 
  if (loading) {
    return (
      <MainLayout showFooter={false} className="items-center justify-center">
        <div className="flex flex-col items-center justify-center p-6! gap-8!">
          <div className="w-16! h-16! border-2! border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-[11px] font-black uppercase tracking-[0.5em] text-accent animate-pulse">Deciphering broadcast...</p>
        </div>
      </MainLayout>
    );
  }

  if (!workspace) {
    return (
      <MainLayout userEmail={userEmail} onSignOut={handleSignOut}>
        <Container className="relative z-10 max-w-2xl! mx-auto! py-20! text-center">
          <div className="w-32! h-32! bg-red-500/10 border border-red-500/20 rounded-4xl! flex items-center justify-center mb-12! mx-auto!">
             <Globe className="text-red-400 opacity-60" size={56} />
          </div>
          <SerifHeading as="h1" className="mx-auto!">Vault Not<br />Found.</SerifHeading>
          <p className="text-t2 text-xl! md:text-2xl! mb-16! font-medium leading-relaxed opacity-60">
            This broadcast might have been revoked by the owner or the vault link has expired. Secure termination is absolute.
          </p>
          <PremiumButton variant="secondary" onClick={() => window.location.href = '/'} className="mx-auto! px-12! py-6! text-lg!">
            Return to Nexus
          </PremiumButton>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout 
      userEmail={userEmail} 
      onSignOut={handleSignOut}
      mainClassName="pb-32!"
    >
      {/* Premium Header */}
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
                 onClick={copyUrl}
                 className="h-20! px-10! glass border border-white/10 rounded-2xl! flex items-center gap-4! hover:bg-white/5 transition-all font-black text-[11px] uppercase tracking-[0.4em] w-full sm:w-auto justify-center"
                >
                  {copied ? (
                    <><Check className="text-green-400" size={20} /> Link Copied</>
                  ) : (
                    <><Copy size={18} className="text-t3" /> Copy Broadcast Link</>
                  )}
               </button>
               <PremiumButton 
                 onClick={openAll}
                 className="h-20! px-12! w-full sm:w-auto justify-center text-lg! rounded-2xl!"
               >
                 <MousePointer2 size={24} /> Initialize Stack
               </PremiumButton>
            </motion.div>
          </div>
        </Container>

        {/* Big Background Letter */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 opacity-[0.03] select-none pointer-events-none">
          <div className="text-[40rem] md:text-[70rem] font-serif leading-none tracking-tighter">
            {workspace.name.charAt(0)}
          </div>
        </div>
      </header>

      <main className="relative z-20">
        <Container className="max-w-5xl! -mt-32! md:-mt-48!">
          <div className="grid gap-8!">
            {workspace.data?.map((tab, i) => (
              <GlassCard
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.05, 0.4) }}
                key={i}
                className="p-10! md:p-12! flex items-center gap-10! group rounded-4xl! border-white/5!"
                onClick={() => window.open(tab.url, '_blank')}
              >
                <div className="w-20! h-20! bg-bg2 rounded-2xl! flex items-center justify-center shrink-0 border border-white/5 group-hover:border-accent/20 transition-all duration-700 overflow-hidden relative shadow-2xl shadow-black/20">
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
                <div className="w-16! h-16! flex items-center justify-center bg-white/5 rounded-2xl! opacity-0 group-hover:opacity-100 transition-all translate-x-8! group-hover:translate-x-0! border border-white/10 shadow-xl shadow-black/20">
                  <ExternalLink size={24} className="text-accent" />
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Footer info */}
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
        </Container>
      </main>
    </MainLayout>
  );
}
  );
}
