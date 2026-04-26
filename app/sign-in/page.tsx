'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Cloud, CheckCircle2 } from 'lucide-react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Check your email for the magic link!' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-bg text-t1 flex items-center justify-center p-6 selection:bg-accent/30">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-accent/20"
          >
            <Cloud className="w-8 h-8 text-bg" />
          </motion.div>
          <h1 className="text-4xl font-bold tracking-tight mb-3 font-serif">Welcome Back</h1>
          <p className="text-t2">Sign in to sync your vaults across profiles.</p>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-bg2 border border-line p-8 md:p-10 rounded-[2.5rem] shadow-2xl"
        >
          {message?.type === 'success' ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="text-green-400" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">Check your inbox</h3>
              <p className="text-t2 leading-relaxed">
                We&apos;ve sent a magic link to <span className="text-t1 font-medium">{email}</span>. Click the link to securely sign in.
              </p>
              <button 
                onClick={() => setMessage(null)}
                className="mt-8 text-sm text-accent hover:underline font-semibold"
              >
                Try another email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSignIn} className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-t3 mb-3 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-t3" size={18} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-bg3 border border-line rounded-2xl py-4 pl-12 pr-4 text-t1 placeholder:text-t3 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/40 transition-all"
                  />
                </div>
              </div>

              {message?.type === 'error' && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm py-3 px-4 rounded-xl">
                  {message.text}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent text-bg font-bold py-4 rounded-2xl hover:translate-y-[-2px] transition-all active:scale-95 disabled:opacity-50 disabled:translate-y-0 flex items-center justify-center gap-2 shadow-lg shadow-accent/20"
              >
                {loading ? 'Sending Link...' : 'Continue with Email'}
                <ArrowRight size={18} />
              </button>

              <p className="text-center text-xs text-t3 mt-8">
                No password required. We&apos;ll send a secure login link to your inbox.
              </p>
            </form>
          )}
        </motion.div>
        
        <p className="text-center mt-12 text-t3 text-sm">
          By continuing, you agree to our <a href="/terms" className="text-t2 hover:text-accent underline underline-offset-4">Terms</a> and <a href="/privacy" className="text-t2 hover:text-accent underline underline-offset-4">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
