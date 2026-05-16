'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Badge, SerifHeading } from '@/components/ui';

export const SignInHeader = () => (
  <div className="text-center mb-16! mx-auto! max-w-2xl!">
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <Badge variant="accent" className="mb-8! px-6! py-2! text-[11px]!">Access Protocol v1.0</Badge>
      <SerifHeading as="h1" className="tracking-tighter">
        Initialize<br />Access.
      </SerifHeading>
      <p className="text-base! md:text-lg! font-medium opacity-60 max-w-md! mx-auto! leading-relaxed!">
        Authenticate your identity to unlock your secure cloud-synced vault.
      </p>
    </motion.div>
  </div>
);
