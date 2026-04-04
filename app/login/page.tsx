'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

const LogoMark = () => (
  <svg width="24" height="24" viewBox="0 0 56 56" fill="none">
    <rect x="14" y="20" width="12" height="6" rx="3" fill="#e8a84b" opacity="0.18"/>
    <rect x="14" y="24" width="36" height="22" rx="5" fill="#e8a84b" opacity="0.18"/>
    <rect x="10" y="15" width="12" height="6" rx="3" fill="#e8a84b" opacity="0.45"/>
    <rect x="10" y="19" width="36" height="22" rx="5" fill="#e8a84b" opacity="0.45"/>
    <rect x="6" y="10" width="14" height="7" rx="3.5" fill="#e8a84b"/>
    <rect x="6" y="15" width="36" height="22" rx="5" fill="#e8a84b"/>
    <rect x="13" y="22" width="16" height="2" rx="1" fill="#171610" opacity="0.5"/>
    <rect x="13" y="27" width="10" height="2" rx="1" fill="#171610" opacity="0.3"/>
  </svg>
);

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.push('/dashboard');
    });
  }, [router]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push('/dashboard');
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage('Check your email for the confirmation link.');
      }
    } catch (error: any) {
      setIsError(true);
      setMessage(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center p-4 relative">
      {/* subtle ambient glow */}
      <div className="fixed top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#e8a84b] opacity-[0.04] blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="w-full max-w-[400px] relative z-10"
      >
        {/* Card */}
        <div className="glass rounded-2xl p-8">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <Link href="/" className="flex items-center gap-2 mb-5 no-underline">
              <LogoMark />
              <span className="text-sm font-semibold text-white/70">
                3tab<span className="text-[#e8a84b]">saver</span>
              </span>
            </Link>
            <h1 className="font-serif text-2xl tracking-tight text-white/92 mb-1">
              {isLogin ? 'Welcome back' : 'Create account'}
            </h1>
            <p className="text-sm text-white/35">
              {isLogin ? 'Sign in to sync your vaults' : 'Start syncing your tabs for free'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleAuth} className="flex flex-col gap-4">
            <div className="input-group">
              <label className="input-label">Email</label>
              <input
                type="email"
                className="styled-input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <input
                type="password"
                className="styled-input"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                autoComplete={isLogin ? 'current-password' : 'new-password'}
              />
            </div>

            {message && (
              <div className={`text-xs rounded-lg px-3 py-2.5 ${
                isError
                  ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                  : 'bg-[#e8a84b]/10 text-[#e8a84b] border border-[#e8a84b]/20'
              }`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-1 justify-center"
            >
              {loading ? 'Processing…' : isLogin ? 'Sign in' : 'Create account'}
            </button>
          </form>

          {/* Toggle */}
          <div className="text-center mt-6 pt-6 border-t border-white/[0.06]">
            <button
              onClick={() => { setIsLogin(!isLogin); setMessage(''); }}
              className="text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <span className="text-[#e8a84b]/80 hover:text-[#e8a84b]">
                {isLogin ? 'Sign up' : 'Sign in'}
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
