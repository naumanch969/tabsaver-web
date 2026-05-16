'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ShieldAlert, Zap, Globe, ArrowLeft } from 'lucide-react';
import { GlassCard, SerifHeading, Container, ANIM_VARIANTS, LegalBadge } from '@/components/ui';
import { TermsCard } from './_components/TermsCard';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <>
      <header className="pb-20! md:pb-32! relative z-10 border-b border-white/5">
        <Container>
          <motion.div {...ANIM_VARIANTS.fadeInUp} className="max-w-6xl! mx-auto!">
            <Link href="/" className="inline-flex items-center gap-4! text-t3 hover:text-accent transition-colors mb-16! font-black uppercase tracking-[0.4em] text-[10px]!">
              <ArrowLeft size={14} /> Back to Entry
            </Link>
            
            <div className="flex flex-col md:flex-row! items-start md:items-end justify-between gap-16!">
              <div className="grow">
                <LegalBadge className="mb-8!">Governance Framework</LegalBadge>
                <SerifHeading as="h1">
                  Terms of<br />Authority.
                </SerifHeading>
                <p className="text-t2 text-base! md:text-lg! font-medium tracking-tight max-w-3xl! leading-relaxed! opacity-70!">
                  The foundational protocols governing the utilization of the TabStack ecosystem.
                </p>
              </div>
              
              <div className="shrink-0 flex flex-col items-start md:items-end gap-5!">
                <div className="text-[10px]! font-black uppercase tracking-[0.4em] opacity-40!">Statute v2.1</div>
                <div className="text-[10px]! font-black uppercase tracking-[0.4em] text-accent!">Eff: April 2026</div>
              </div>
            </div>
          </motion.div>
        </Container>
      </header>

      <div className="pt-20! pb-20! relative z-10">
        <Container className="max-w-5xl!">
          <div className="grid gap-16! md:gap-32!">
            <section>
              <GlassCard className="p-12! md:p-20! rounded-[3rem]! border-white/5!" hover={false}>
                <div className="flex flex-col md:flex-row items-start gap-12! md:gap-20!">
                  <div className="w-20! h-20! bg-accent/10 rounded-4xl flex items-center justify-center shrink-0 border border-accent/20">
                    <FileText className="text-accent" size={40} />
                  </div>
                  <div className="space-y-8!">
                    <SerifHeading as="h2">Software License</SerifHeading>
                    <p className="text-t2 text-base! md:text-lg! leading-relaxed font-medium opacity-80">
                      TabStack is provided as a premium productivity instrument. We grant you a non-exclusive, revocable license to utilize the software within the parameters of these terms. This instrument is designed for professionals who demand excellence in their digital workspace architecture.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </section>

            <div className="grid md:grid-cols-2 gap-8! md:gap-12!">
              <TermsCard 
                icon={Zap} 
                title="Acceptable Use" 
                desc="Users agree not to attempt de-compilation, unauthorized API access, or redistribution of the proprietary TabStack codebase. The system must not be used for malicious indexing or automated scraping."
              />
              <TermsCard 
                icon={ShieldAlert} 
                title="Liability Limits" 
                desc="TabStack is provided 'as-is'. While we maintain 99.9% uptime for cloud features, we are not liable for any data loss occurring outside our vault system. You are the architect of your own focus."
              />
            </div>

            <section className="space-y-16! py-24! border-y border-white/5">
              <div className="flex flex-col md:flex-row gap-12! md:gap-20!">
                <div className="md:w-1/3">
                  <SerifHeading as="h2">Cloud Services</SerifHeading>
                  <div className="h-2! w-24! bg-accent rounded-full" />
                </div>
                <div className="md:w-2/3 space-y-10! text-t2 font-medium leading-relaxed text-base! md:text-lg! opacity-80">
                  <p>
                    Usage of the synchronization and broadcasting features requires a valid account authenticated via our secure OTP protocol.
                    You are responsible for maintaining the confidentiality of your access tokens and magic links.
                  </p>
                  <p>
                    We reserve the right to terminate access for users who violate these terms or engage in behavior
                    detrimental to the TabStack community or infrastructure integrity.
                  </p>
                </div>
              </div>
            </section>

            <section className="text-center pt-32! pb-20!">
              <SerifHeading as="h3">Need Clarification?</SerifHeading>
              <p className="text-t2 text-lg! md:text-xl! mb-16! font-medium opacity-60 max-w-2xl! mx-auto! leading-relaxed!">
                For legal inquiries or detailed policy breakdowns regarding our governance framework.
              </p>
              <a
                href="mailto:legal@tabstack.app"
                className="inline-flex items-center gap-6! px-12! py-6! bg-white/5 border border-white/10 rounded-full text-accent font-black uppercase tracking-[0.5em] text-[11px] hover:bg-white/10 transition-all group"
              >
                Contact Legal Counsel <Globe size={18} className="group-hover:rotate-12 transition-transform" />
              </a>
            </section>
          </div>
        </Container>
      </div>
    </>
  );
}
