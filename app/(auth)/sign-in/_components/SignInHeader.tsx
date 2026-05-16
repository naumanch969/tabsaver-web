'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Badge, SerifHeading } from '@/components/ui';

export const SignInHeader = () => (
  <div className="mb-10!">
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <Badge variant="accent" className="mb-6! px-4! py-1.5! text-[10px]!">Access Protocol v1.0</Badge>
      <SerifHeading as="h1" className="text-4xl! md:text-3xl! mb-4!">
        Sign In.
      </SerifHeading>
      <p className="text-base! font-medium opacity-60 leading-relaxed!">
        Authenticate your identity to unlock your secure cloud-synced vault.
      </p>
    </motion.div>
  </div>
);
