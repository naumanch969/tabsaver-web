'use client';

import { Layers, Globe, Shield } from 'lucide-react';
import Link from 'next/link';
import { Label, Container } from '@/components/ui';
import Logo from './Logo';

export const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-line/10 py-24! bg-bg2/30">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16! mb-20! mx-auto!">
          <FooterBrand />
          <FooterNav />
          <FooterLegal />
        </div>
        <FooterBottom />
      </Container>
    </footer>
  );
};

const FooterBrand = () => (
  <div className="col-span-1 md:col-span-2">
    <Logo />
    <p className="text-t2 text-base! max-w-sm mb-10! font-medium leading-relaxed">
      The professional workspace architecture for the modern web.
    </p>
    <div className="flex gap-3!">
      <a href="#" className="w-10 h-10 glass flex items-center justify-center rounded-2xl! text-t2 hover:text-accent transition-all hover:scale-110">
        <Globe size={18} />
      </a>
      <a href="#" className="w-10 h-10 glass flex items-center justify-center rounded-2xl! text-t2 hover:text-accent transition-all hover:scale-110">
        <Shield size={18} />
      </a>
    </div>
  </div>
);

const FooterNav = () => (
  <div>
    <Label className="block mb-6!">Navigation</Label>
    <ul className="space-y-4! text-t2 font-bold text-sm!">
      <li><a href="#" className="hover:text-accent transition-colors">Extension</a></li>
      <li><Link href="/dashboard" className="hover:text-accent transition-colors">Cloud Vault</Link></li>
      <li><a href="#" className="hover:text-accent transition-colors">Pricing</a></li>
      <li><a href="#" className="hover:text-accent transition-colors">Changelog</a></li>
    </ul>
  </div>
);

const FooterLegal = () => (
  <div>
    <Label className="block mb-6!">Security</Label>
    <ul className="space-y-4! text-t2 font-bold text-sm!">
      <li><Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link></li>
      <li><Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
      <li><a href="#" className="hover:text-accent transition-colors">Trust Center</a></li>
      <li><a href="#" className="hover:text-accent transition-colors">Open Source</a></li>
    </ul>
  </div>
);

const FooterBottom = () => (
  <div className="pt-10! border-t border-line/5 flex flex-col md:flex-row justify-between items-center gap-6!">
    <div className="text-[9px] text-t3 uppercase tracking-[0.4em] font-black">
      © 2026 TabStack Vault. ALL RIGHTS RESERVED.
    </div>
    <div className="text-t3 text-[10px] font-bold italic opacity-60">
      Precision engineering for your digital architecture.
    </div>
  </div>
);
