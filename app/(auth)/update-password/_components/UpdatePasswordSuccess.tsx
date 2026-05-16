import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export const UpdatePasswordSuccess = () => {
  return (
    <motion.div key="success" initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full">
      <div className="p-10! bg-bg2/20 border border-white/5 rounded-3xl!">
        <div className="w-16! h-16! bg-green-500/10 rounded-2xl! flex items-center justify-center mb-8! border border-green-500/20">
          <CheckCircle2 className="text-green-400" size={32} />
        </div>
        <h3 className="text-2xl font-serif mb-4">Update Successful</h3>
        <p className="text-t2 text-lg! leading-relaxed mb-10! opacity-70">
          Your credentials have been updated. Redirecting to your vault...
        </p>
      </div>
    </motion.div>
  );
};
