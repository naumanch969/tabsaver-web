'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { ForgotPasswordHeader } from './_components/ForgotPasswordHeader';
import { ForgotPasswordForm } from './_components/ForgotPasswordForm';
import { ForgotPasswordSuccess } from './_components/ForgotPasswordSuccess';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
      setLoading(false);
    } else {
      setMessage({ type: 'success', text: 'Reset link dispatched.' });
      setLoading(false);
    }
  };

  return (
    <>
      <ForgotPasswordHeader />

      <AnimatePresence mode="wait">
        {message?.type === 'success' ? (
          <ForgotPasswordSuccess email={email} />
        ) : (
          <ForgotPasswordForm
            email={email}
            setEmail={setEmail}
            onSubmit={handleResetRequest}
            loading={loading}
            error={message?.type === 'error' ? message.text : null}
          />
        )}
      </AnimatePresence>
    </>
  );
}
