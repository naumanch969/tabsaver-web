'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const SignInFooter = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3 }}
    className="flex justify-start gap-8! mt-10!"
  >
    <FooterLink href="/sign-up">Create Account</FooterLink>
  </motion.div>
);

const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <Link 
    href={href} 
    className="text-t3 text-[10px] hover:text-accent transition-all duration-500 uppercase tracking-[0.4em] font-black border-b border-transparent hover:border-accent/20 pb-1!"
  >
    {children}
  </Link>
);
