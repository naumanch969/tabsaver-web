import React from 'react';
import { motion } from 'framer-motion';
import { PremiumButton, Label } from '@/components/ui';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

interface SignUpFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string | null;
}

export const SignUpForm = ({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  onSubmit,
  loading,
  error
}: SignUpFormProps) => {
  return (
    <motion.div key="form" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full">
      <form onSubmit={onSubmit} className="space-y-6!">
        <div className="space-y-4!">
          <div className="space-y-2!">
            <Label className="text-[10px] opacity-60">Email Address</Label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-bg2/20 border border-white/10 rounded-xl! py-4! px-5! text-t1 placeholder:text-t3/30 focus:outline-none focus:border-accent/40 transition-all font-medium"
            />
          </div>

          <div className="space-y-2!">
            <Label className="text-[10px] opacity-60">Choose Password</Label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-bg2/20 border border-white/10 rounded-xl! py-4! px-5! pr-12! text-t1 placeholder:text-t3/30 focus:outline-none focus:border-accent/40 transition-all font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4! top-1/2! -translate-y-1/2! text-t3/50 hover:text-t1 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} /> }
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-3! px-5! rounded-xl! flex items-center gap-3!">
            <div className="w-1.5! h-1.5! rounded-full bg-red-400" />
            {error}
          </div>
        )}

        <PremiumButton type="submit" disabled={loading} className="w-full! py-4! h-14!">
          {loading ? 'Creating Account...' : 'Create Account'}
        </PremiumButton>

        <p className="text-center text-[10px] text-t3 font-black uppercase tracking-[0.3em] opacity-30 leading-loose">
          By registering, you agree to our Terms and Privacy.
        </p>
      </form>
    </motion.div>
  );
};
