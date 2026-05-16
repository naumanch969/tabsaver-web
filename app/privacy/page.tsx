'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, EyeOff, ServerOff, Globe, ArrowLeft } from 'lucide-react';
import { MainLayout } from '@/components/layout';
import { GlassCard, SerifHeading, Container, ANIM_VARIANTS } from '@/components/ui';
import { PrivacyCard } from '@/components/legal/PrivacyCard';
import { LegalBadge } from '@/components/legal/LegalBadge';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <MainLayout className="pb-32!">
      <header className="pt-20! pb-20! md:pt-32! md:pb-32! relative z-10 border-b border-white/5">
        <Container>
          <motion.div {...ANIM_VARIANTS.fadeInUp} className="max-w-6xl! mx-auto!">
            <Link href="/" className="inline-flex items-center gap-4! text-t3 hover:text-accent transition-colors mb-16! font-black uppercase tracking-[0.4em] text-[10px]!">
              <ArrowLeft size={14} /> Back to Entry
            </Link>
            
            <div className="flex flex-col md:flex-row! items-start md:items-end justify-between gap-16!">
              <div className="grow">
                <LegalBadge className="mb-8!">Security Clearance: Global</LegalBadge>
                <SerifHeading as="h1">
                  Privacy<br />Directive.
                </SerifHeading>
                <p className="text-t2 text-base! md:text-lg! font-medium tracking-tight max-w-3xl! leading-relaxed! opacity-70!">
                  How we handle your digital identity and tab architectures in an era of mass surveillance.
                </p>
              </div>
              
              <div className="shrink-0 flex flex-col items-start md:items-end gap-5!">
                <div className="text-[10px]! font-black uppercase tracking-[0.4em] opacity-40!">Protocol v2.1</div>
                <div className="text-[10px]! font-black uppercase tracking-[0.4em] text-accent!">Last Rev: April 2026</div>
              </div>
            </div>
          </motion.div>
        </Container>
      </header>

      <main className="grow pt-20! relative z-10">
        <Container className="max-w-5xl! mx-auto!">
          <div className="grid gap-12! md:gap-24!">
            <section>
              <GlassCard className="p-12! md:p-20! rounded-[3rem]! border-white/5!" hover={false}>
                <div className="flex flex-col md:flex-row items-start gap-12! md:gap-20!">
                  <div className="w-20! h-20! bg-accent/10 rounded-2xl flex items-center justify-center shrink-0 border border-accent/20">
                    <Globe className="text-accent" size={40} />
                  </div>
                  <div className="space-y-8!">
                    <SerifHeading as="h2">Architectural Integrity</SerifHeading>
                    <p className="text-t2 text-base! md:text-lg! leading-relaxed! font-medium opacity-80!">
                      TabStack is a high-performance browser extension designed to snapshot and serialize your digital workspace.
                      Unlike traditional tools, we prioritize local-first architecture and end-to-end security. We believe that your research paths are a reflection of your mind and deserve total sanctuary.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </section>

            <div className="grid md:grid-cols-2 gap-6! md:gap-10!">
              <PrivacyCard 
                icon={EyeOff} 
                title="Zero Tracking" 
                desc="We do not collect personal identifiers, track browsing history, or monitor your interaction patterns. Your identity remains anonymous by design. No analytics, no cookies, no compromise."
              />
              <PrivacyCard 
                icon={ServerOff} 
                title="Local-First" 
                desc="Saved workspaces are stored within your browser's encrypted local storage. Data never leaves your machine unless you explicitly broadcast it to the cloud vault."
              />
            </div>

            <section className="space-y-16! py-24! border-y border-white/5">
              <div className="flex flex-col md:flex-row gap-12! md:gap-20!">
                <div className="md:w-1/3">
                  <SerifHeading as="h2">Security Protocols</SerifHeading>
                  <div className="h-2! w-24! bg-accent rounded-full" />
                </div>
                <div className="md:w-2/3 space-y-10! text-t2 font-medium leading-relaxed! text-base! md:text-lg! opacity-80!">
                  <p>
                    If you utilize our cloud vault features, your data is transmitted via secure TLS channels and stored in our encrypted database using AES-256 standards.
                    Broadcasted links use cryptographically secure identifiers (Share IDs) that are nearly impossible to guess.
                  </p>
                  <p>
                    You retain full authority over your data. Any shared vault can be revoked or deleted instantly from your dashboard,
                    terminating all public access and purging the data from our edge nodes.
                  </p>
                </div>
              </div>
            </section>

            <section className="text-center pt-32! pb-20!">
              <SerifHeading as="h3">Questions on Governance?</SerifHeading>
              <p className="text-t2 text-lg! md:text-xl! mb-16! font-medium opacity-60 max-w-2xl! mx-auto! leading-relaxed!">
                For technical inquiries regarding our security standards or data handling methodologies.
              </p>
              <a
                href="mailto:security@tabstack.app"
                className="inline-flex items-center gap-6! px-12! py-6! bg-white/5 border border-white/10 rounded-full text-accent font-black uppercase tracking-[0.5em] text-[11px] hover:bg-white/10 transition-all group"
              >
                Contact Security <ShieldCheck size={18} className="group-hover:scale-110 transition-transform" />
              </a>
            </section>
          </div>
        </Container>
      </main>
    </MainLayout>
  );
}
