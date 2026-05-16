'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const SignInFooter = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3 }}
    className="flex justify-center gap-10! mt-12! text-center!"
  >
    <FooterLink href="/terms">Terms of Authority</FooterLink>
    <FooterLink href="/privacy">Privacy Protocol</FooterLink>
  </motion.div>
);

const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <a 
    href={href} 
    className="text-t3 text-[10px] hover:text-accent transition-all duration-500 uppercase tracking-[0.4em] font-black border-b border-transparent hover:border-accent/20 pb-1!"
  >
    {children}
  </a>
);
