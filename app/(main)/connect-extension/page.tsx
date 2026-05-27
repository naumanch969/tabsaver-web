'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Cpu, ArrowRight, Layers, RefreshCw, Lock } from 'lucide-react';
import { Session } from '@supabase/supabase-js';
import { GlassCard, PremiumButton, SerifHeading, Label, Container } from '@/components/ui';
import { Step } from './_components/Step';

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

// Use an IIFE or similar context-safe way to default if the env var isn't loaded correctly yet.
const getExtensionId = () => {
  const envId = process.env.NEXT_PUBLIC_EXTENSION_ID;
  if (envId && envId.length === 32 && envId !== 'your_extension_id_from_step_5') {
    return envId;
  }
  return 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'; // 32 'a's for valid dummy format
};

const EXTENSION_ID = getExtensionId();

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

  const connectToExtension = async (activeSession?: Session) => {
    setStatus('connecting');
    try {
      const session = activeSession || (await supabase.auth.getSession()).data.session;
      if (!session) throw new Error('No active session. Please sign in again.');

      if (typeof chrome === 'undefined' || !chrome.runtime) {
        throw new Error('Extension not found. Make sure you are using Chrome and the TabStack extension is installed.');
      }

      try {
        chrome.runtime.sendMessage(EXTENSION_ID, {
          type: 'SET_AUTH',
          session
        }, (response: ChromeResponse) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            setError('TabStack extension not found. Make sure it is installed and enabled.');
            setStatus('error');
            return;
          }

          if (response?.success) {
            setStatus('success');
            setTimeout(() => {
              window.location.href = '/dashboard';
            }, 2000);
          } else {
            setError('Could not connect. Please try again.');
            setStatus('error');
          }
        });
      } catch (sendError) {
        console.error('SendMessage Error:', sendError);
        console.log('process.env.NEXT_PUBLIC_EXTENSION_ID:', EXTENSION_ID);
        setError('Could not reach the extension. Check that it is installed and your browser supports it.');
        setStatus('error');
      }
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      setStatus('error');
    }
  };

  /////////////////////////////////////////////// RENDER /////////////////////////////////////////////// 
  return (
    <Container className="mx-auto!">
      <div className="text-center mb-12!">
        <div className="relative inline-block mb-10!">
          <div className="w-20! h-20! bg-accent rounded-2xl flex items-center justify-center shadow-2xl shadow-accent/30 relative z-10">
            <Layers className="w-10! h-10! text-bg" />
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute -right-4! -bottom-4! w-12! h-12! glass rounded-lg! flex items-center justify-center border border-white/10 z-20"
          >
            <RefreshCw size={20} className="text-accent" />
          </motion.div>
        </div>

        <SerifHeading as="h2" className="mb-6! md:mb-8!">
          Connecting<br />Your Account.
        </SerifHeading>
        <p className="text-base! md:text-lg! font-medium leading-relaxed max-w-xl! mx-auto! opacity-70 text-t2">
          Linking your account to the TabStack browser extension.
        </p>
      </div>

      <GlassCard
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-xl! mx-auto! p-10! md:p-14! shadow-2xl relative overflow-hidden rounded-lg! border-white/5!"
        hover={false}
      >
        {/* Progress states */}
        <div className="space-y-8!">
          <Step
            active={status === 'checking' || status === 'ready'}
            done={status !== 'checking' && status !== 'ready'}
            icon={ShieldCheck}
            title="Check you're signed in"
            num="01"
          />
          <Step
            active={status === 'connecting'}
            done={status === 'success'}
            icon={Cpu}
            title="Connect to the extension"
            num="02"
          />
          <Step
            active={status === 'success'}
            done={false}
            icon={Lock}
            title="All set"
            num="03"
          />
        </div>

        <div className="mt-12! pt-10! border-t border-white/5">
          {status === 'error' ? (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6! rounded-lg! mb-6!">
              <p className="font-black text-sm! md:text-base! mb-3! tracking-tight uppercase">Could not connect</p>
              <p className="text-sm! font-medium opacity-80 leading-relaxed mb-6!">{error}</p>
              <div className="flex flex-col items-center gap-4!">
                <PremiumButton
                  onClick={() => connectToExtension()}
                  className="w-full! h-14! bg-red-500 hover:bg-red-400 rounded-lg!"
                >
                  Retry Connection
                </PremiumButton>
                <a
                  href="https://chromewebstore.google.com/detail/TabStack/fcoojccdffamjgkgcegmiopcmipnieeb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs! font-medium text-red-400/70 hover:text-red-400 underline underline-offset-4 transition-colors"
                >
                  Don&apos;t have the extension? Install it here.
                </a>
              </div>
            </div>
          ) : status === 'success' ? (
            <div className="text-center bg-green-500/5 border border-green-500/10 text-green-400 p-8! rounded-lg!">
              <div className="w-14! h-14! bg-green-500/10 rounded-full flex items-center justify-center mx-auto! mb-6! border border-green-500/20">
                <CheckCircle2 size={28} />
              </div>
              <p className="text-lg! font-black tracking-tight mb-2! uppercase">Connected!</p>
              <p className="text-xs! font-medium opacity-80 uppercase tracking-widest">Heading to your dashboard...</p>
            </div>
          ) : (
            <PremiumButton
              onClick={() => connectToExtension()}
              disabled={status === 'connecting' || status === 'checking'}
              className="w-full! py-6! h-16! text-[11px]! uppercase tracking-[0.4em] font-black rounded-lg!"
            >
              {status === 'connecting' ? 'Connecting...' : 'Connect Extension'}
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </PremiumButton>
          )}
        </div>
      </GlassCard>

      <p className="text-center mt-10! text-t3 text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4! opacity-40">
        <ShieldCheck size={14} className="text-accent" />
        Extension connection is safe and private
      </p>
    </Container>
  );
}


