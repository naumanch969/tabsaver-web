'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, LogOut } from 'lucide-react';
import Link from 'next/link';
import { PremiumButton, Label, Container } from '@/components/ui';
import Logo from './Logo';

interface NavbarProps {
  userEmail?: string | null;
  onSignOut?: () => void;
  showLinks?: boolean;
}

export const Navbar = ({ userEmail, onSignOut, showLinks = true }: NavbarProps) => {
  return (
    <nav className="fixed! top-0! left-0! right-0! z-50 py-4! md:py-8! pointer-events-none">
      <Container className="max-w-5xl! mx-auto! pointer-events-auto!">
        <div className="glass rounded-2xl md:rounded-[2.5rem]! px-6! md:px-10! h-16! md:h-20! flex! items-center! justify-between! border border-line/10 shadow-2xl! shadow-black/40 mx-auto!">
          <Logo />

          <div className="flex items-center gap-6! md:gap-10!">
            {showLinks && !userEmail && <NavLinks />}
            <NavAuth userEmail={userEmail} onSignOut={onSignOut} />
          </div>
        </div>
      </Container>
    </nav>
  );
};

const NavLinks = () => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    className="hidden md:flex items-center gap-8! mr-4!"
  >
    <Link href="/#features" className="text-xs! font-black uppercase tracking-[0.2em] text-t3 hover:text-accent transition-colors">Features</Link>
    <Link href="/dashboard" className="text-xs! font-black uppercase tracking-[0.2em] text-t3 hover:text-accent transition-colors">Dashboard</Link>
  </motion.div>
);

const NavAuth = ({ userEmail, onSignOut }: { userEmail?: string | null, onSignOut?: () => void }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-center gap-4!"
  >
    {userEmail ? (
      <>
        <div className="hidden md:flex flex-col items-end mr-2!">
          <Label className="text-[9px]! opacity-50">Authorized</Label>
          <span className="text-[11px]! font-black uppercase tracking-wider text-t2">{userEmail.split('@')[0]}</span>
        </div>
        <button
          onClick={onSignOut}
          className="w-10! h-10! flex items-center justify-center hover:bg-white/5 rounded-2xl! text-t3 hover:text-red-400 transition-all border border-transparent hover:border-red-400/20"
          title="Sign Out"
        >
          <LogOut size={16} />
        </button>
      </>
    ) : (
      <>
        <Link href="/sign-in" className="text-xs! font-black uppercase tracking-[0.2em] text-t3 hover:text-t1 transition-all">Sign In</Link>
        <Link href="/sign-in">
          <PremiumButton variant="primary" className="py-3! px-6! rounded-2xl! text-xs! shadow-2xl shadow-accent/20">
            Get Started
          </PremiumButton>
        </Link>
      </>
    )}
  </motion.div>
);
