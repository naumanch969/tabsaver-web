import React from 'react';
import { motion } from 'framer-motion';
import { Badge, SerifHeading } from '@/components/ui';

export const ForgotPasswordHeader = () => {
  return (
    <div className="mb-10!">
      <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <Badge variant="accent" className="mb-6! px-4! py-1.5! text-[10px]!">Security Recovery</Badge>
        <SerifHeading as="h1" className="text-4xl! md:text-5xl! mb-4!">
          Recovery.
        </SerifHeading>
        <p className="text-base! font-medium opacity-60 leading-relaxed!">
          Enter your email to receive a secure recovery link.
        </p>
      </motion.div>
    </div>
  );
};
