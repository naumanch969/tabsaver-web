'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Cpu, ArrowRight, Cloud, RefreshCw } from 'lucide-react';
import { Session } from '@supabase/supabase-js';

declare const chrome: {
  runtime: {
    sendMessage: (id: string, message: any, callback?: (response: any) => void) => void;
    lastError?: any;
  };
};

const EXTENSION_ID = process.env.NEXT_PUBLIC_EXTENSION_ID || 'dummy-id';

export default function ConnectExtensionPage() {
  const [status, setStatus] = useState<'checking' | 'ready' | 'connecting' | 'success' | 'error'>('checking');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        window.location.href = '/sign-in';
        return;
      }
      setStatus('ready');
      // Auto-trigger connection for smoothness
      setTimeout(() => {
        connectToExtension(session);
      }, 800);
    };
    checkSession();
  }, []);

  const connectToExtension = async (activeSession?: Session) => {
    setStatus('connecting');
    try {
      const session = activeSession || (await supabase.auth.getSession()).data.session;
      if (!session) throw new Error('No active session. Please sign in again.');

      // Send message to extension
      chrome.runtime.sendMessage(EXTENSION_ID, { 
        type: 'SET_AUTH', 
        session 
      }, (response: { success?: boolean }) => {
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

  return (
    <div className="min-h-screen bg-bg text-t1 flex items-center justify-center p-6 selection:bg-accent/30">
      <div className="w-full max-w-xl">
        <div className="text-center mb-16">
          <div className="relative inline-block mb-8">
             <div className="w-20 h-20 bg-accent rounded-3xl flex items-center justify-center shadow-2xl shadow-accent/20">
               <Cloud className="w-10 h-10 text-bg" />
             </div>
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
               className="absolute -right-4 -bottom-4 w-10 h-10 bg-bg2 border border-line rounded-xl flex items-center justify-center"
             >
                <RefreshCw size={18} className="text-accent" />
             </motion.div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4 font-serif">Bridge Connection</h1>
          <p className="text-t2 text-lg">Syncing your identity with the TabStack browser extension.</p>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-bg2 border border-line p-10 rounded-[3rem] shadow-2xl relative overflow-hidden"
        >
          {/* Progress states */}
          <div className="space-y-8">
            <div className={`flex items-center gap-5 transition-opacity ${status === 'checking' ? 'opacity-100' : 'opacity-40'}`}>
              <div className="w-10 h-10 rounded-full border border-line flex items-center justify-center shrink-0">
                <ShieldCheck size={20} className={status !== 'checking' ? 'text-green-400' : 'text-accent'} />
              </div>
              <span className="font-semibold">Verify identity session</span>
            </div>

            <div className={`flex items-center gap-5 transition-opacity ${status === 'connecting' ? 'opacity-100' : 'opacity-40'}`}>
              <div className="w-10 h-10 rounded-full border border-line flex items-center justify-center shrink-0">
                <Cpu size={20} className={status === 'connecting' ? 'text-accent' : (status === 'success' ? 'text-green-400' : 'text-t2')} />
              </div>
              <span className="font-semibold">Secure extension handshake</span>
            </div>

            <div className={`flex items-center gap-5 transition-opacity ${status === 'success' ? 'opacity-100' : 'opacity-40'}`}>
              <div className="w-10 h-10 rounded-full border border-line flex items-center justify-center shrink-0">
                <CheckCircle2 size={20} className={status === 'success' ? 'text-green-400' : 'text-t2'} />
              </div>
              <span className="font-semibold">Establish encrypted vault sync</span>
            </div>
          </div>

          <div className="mt-12 pt-10 border-t border-line">
            {status === 'error' ? (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl mb-6">
                <p className="font-bold mb-1">Connection Refused</p>
                <p className="text-sm opacity-80">{error}</p>
                <button 
                  onClick={() => connectToExtension()}
                  className="mt-6 w-full bg-red-400 text-bg py-3.5 rounded-xl font-bold hover:bg-red-300 transition-colors"
                >
                  Retry Connection
                </button>
              </div>
            ) : status === 'success' ? (
              <div className="text-center bg-green-500/10 border border-green-500/20 text-green-400 p-8 rounded-2xl">
                 <p className="text-xl font-bold mb-2">Authenticated Successfully</p>
                 <p className="text-sm opacity-80">You can now close this tab and return to the extension.</p>
              </div>
            ) : (
              <button
                onClick={() => connectToExtension()}
                disabled={status === 'connecting' || status === 'checking'}
                className="w-full bg-accent text-bg font-bold py-5 rounded-3xl hover:translate-y-[-2px] transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl shadow-accent/20 group"
              >
                {status === 'connecting' ? 'Syncing...' : 'Authorize Extension Sync'}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        </motion.div>
        
        <p className="text-center mt-12 text-t3 text-sm flex items-center justify-center gap-2">
          <ShieldCheck size={14} /> 
          Connected via Chrome Secure Messaging Protocol
        </p>
      </div>
    </div>
  );
}
