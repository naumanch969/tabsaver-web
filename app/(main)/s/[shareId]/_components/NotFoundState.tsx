import React from 'react';
import { Globe } from 'lucide-react';
import { Container, SerifHeading, PremiumButton } from '@/components/ui';

export const NotFoundState = () => (
  <Container className="relative z-10 max-w-2xl! mx-auto! py-20! text-center">
    <div className="w-32! h-32! bg-red-500/10 border border-red-500/20 rounded-4xl! flex items-center justify-center mb-12! mx-auto!">
       <Globe className="text-red-400 opacity-60" size={56} />
    </div>
    <SerifHeading as="h1" className="mx-auto!">Vault Not<br />Found.</SerifHeading>
    <p className="text-t2 text-xl! md:text-2xl! mb-16! font-medium leading-relaxed opacity-60">
      This broadcast might have been revoked by the owner or the vault link has expired. Secure termination is absolute.
    </p>
    <PremiumButton variant="secondary" onClick={() => window.location.href = '/'} className="mx-auto! px-12! py-6! text-lg!">
      Return to Nexus
    </PremiumButton>
  </Container>
);
