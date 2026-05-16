'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Cpu, ArrowRight, Layers, RefreshCw, Lock } from 'lucide-react';
import { Session } from '@supabase/supabase-js';
import { GlassCard, PremiumButton, SerifHeading, Label, Container } from '@/components/ui';
import { Navbar } from '@/components/layout/Navbar';

interface ChromeMessage {
  type: string;
  session: Session | null;
}

interface ChromeResponse {
  success?: boolean;
}

// Fix for 'chrome' undefined in TypeScript
declare const chrome: {
  runtime: {
    sendMessage: (
      extensionId: string, 
      message: ChromeMessage, 
      callback: (response: ChromeResponse) => void
    ) => void;
    lastError?: { message?: string };
  };
};

const EXTENSION_ID = process.env.NEXT_PUBLIC_EXTENSION_ID || 'dummy-id';

export default function ConnectExtensionPage() {

  /////////////////////////////////////////////// STATES /////////////////////////////////////////////// 
  const [status, setStatus] = useState<'checking' | 'ready' | 'connecting' | 'success' | 'error'>('checking');
  const [error, setError] = useState<string | null>(null);

  /////////////////////////////////////////////// EFFECTS /////////////////////////////////////////////// 
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        window.location.href = '/sign-in';
        return;
      }
      setStatus('ready');
      setTimeout(() => {
        connectToExtension(session);
      }, 1000);
    };
    checkSession();
  }, []);

  /////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////// 
  const connectToExtension = async (activeSession?: Session) => {
    setStatus('connecting');
    try {
      const session = activeSession || (await supabase.auth.getSession()).data.session;
      if (!session) throw new Error('No active session. Please sign in again.');

      if (typeof chrome === 'undefined' || !chrome.runtime) {
        throw new Error('Extension environment not detected. Make sure you are in a supported browser and the extension is installed.');
      }

      chrome.runtime.sendMessage(EXTENSION_ID, {
        type: 'SET_AUTH',
        session
      }, (response: ChromeResponse) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          setError('Extension not detected. Make sure TabStack is installed and enabled.');
          setStatus('error');
          return;
        }

        if (response?.success) {
          setStatus('success');
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 2000);
        } else {
          setError('Handshake failed. Please try again.');
          setStatus('error');
        }
      });
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      setStatus('error');
    }
  };

  /////////////////////////////////////////////// RENDER /////////////////////////////////////////////// 
  return (
    <div className="min-h-screen bg-bg text-t1 flex flex-col selection:bg-accent/30 overflow-hidden relative">
      <Navbar />

      <main className="grow flex items-center justify-center py-20! px-6! relative z-10">
        <Container className="max-w-xl! mx-auto!">
          <div className="text-center mb-12!">
            <div className="relative inline-block mb-10!">
              <div className="w-20! h-20! bg-accent rounded-2xl flex items-center justify-center shadow-2xl shadow-accent/30 relative z-10">
                <Layers className="w-10! h-10! text-bg" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute -right-4! -bottom-4! w-12! h-12! glass rounded-xl! flex items-center justify-center border border-white/10 z-20"
              >
                <RefreshCw size={20} className="text-accent" />
              </motion.div>
            </div>
            
            <SerifHeading as="h1" className="text-5xl! md:text-7xl! mb-10! tracking-tighter! leading-[0.9]!">
              Bridge<br />Connection.
            </SerifHeading>
            <p className="text-t2 text-lg! md:text-2xl! font-medium leading-relaxed! max-w-lg! mx-auto! opacity-60!">
              Syncing your identity with the browser extension ecosystem.
            </p>
          </div>

          <GlassCard
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="p-10! md:p-14! shadow-2xl relative overflow-hidden rounded-[2.5rem]! border-white/5!"
            hover={false}
          >
            {/* Progress states */}
            <div className="space-y-8!">
              <Step 
                active={status === 'checking' || status === 'ready'} 
                done={status !== 'checking' && status !== 'ready'} 
                icon={ShieldCheck} 
                title="Verify identity session" 
                num="01" 
              />
              <Step 
                active={status === 'connecting'} 
                done={status === 'success'} 
                icon={Cpu} 
                title="Secure extension handshake" 
                num="02" 
              />
              <Step 
                active={status === 'success'} 
                done={false} 
                icon={Lock} 
                title="Establish encrypted vault" 
                num="03" 
              />
            </div>

            <div className="mt-12! pt-10! border-t border-white/5">
              {status === 'error' ? (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6! rounded-3xl! mb-6!">
                  <p className="font-black text-lg! mb-3! tracking-tight uppercase">Connection Refused</p>
                  <p className="text-xs! font-medium opacity-80 leading-relaxed mb-6!">{error}</p>
                  <PremiumButton
                    onClick={() => connectToExtension()}
                    className="w-full! h-14! bg-red-500 hover:bg-red-400 rounded-xl!"
                  >
                    Retry Connection
                  </PremiumButton>
                </div>
              ) : status === 'success' ? (
                <div className="text-center bg-green-500/5 border border-green-500/10 text-green-400 p-8! rounded-3xl!">
                  <div className="w-14! h-14! bg-green-500/10 rounded-full flex items-center justify-center mx-auto! mb-6! border border-green-500/20">
                    <CheckCircle2 size={28} />
                  </div>
                  <p className="text-xl! font-black tracking-tight mb-2! uppercase">Bridge Established</p>
                  <p className="text-[10px]! font-medium opacity-80 uppercase tracking-widest">Redirecting to Vault...</p>
                </div>
              ) : (
                <PremiumButton
                  onClick={() => connectToExtension()}
                  disabled={status === 'connecting' || status === 'checking'}
                  className="w-full! py-6! h-16! text-[11px]! uppercase tracking-[0.4em] font-black rounded-xl!"
                >
                  {status === 'connecting' ? 'Initiating...' : 'Authorize Sync'}
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </PremiumButton>
              )}
            </div>
          </GlassCard>

          <p className="text-center mt-10! text-t3 text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4! opacity-40">
            <ShieldCheck size={14} className="text-accent" />
            Chrome Secure Messaging v2.0
          </p>
        </Container>
      </main>

      {/* Decorative Background Elements - Simplified to prevent lag */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.05),transparent_70%)]" />
      </div>
    </div>
  );
}


const Step = ({ active, done, icon: Icon, title, num }: { active: boolean, done: boolean, icon: React.ElementType, title: string, num: string }) => (
  <div className={`flex items-center gap-10! transition-all duration-700 ${active ? 'opacity-100 translate-x-6!' : 'opacity-20'}`}>
    <div className={`w-16! h-16! rounded-2xl! border flex items-center justify-center shrink-0 transition-all duration-700 ${done ? 'bg-green-500/10 border-green-500/20 scale-90' : (active ? 'bg-accent/10 border-accent/20 scale-110 shadow-2xl shadow-accent/20' : 'bg-white/5 border-white/5')}`}>
      <Icon size={32} className={done ? 'text-green-400' : (active ? 'text-accent' : 'text-t2')} />
    </div>
    <div>
      <Label className="text-[11px]! uppercase tracking-[0.5em]! opacity-40 mb-2! block font-black">Step {num}</Label>
      <p className="font-bold text-2xl! md:text-3xl! tracking-tighter! leading-none">{title}</p>
    </div>
  </div>
);
