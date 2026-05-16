'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { UpdatePasswordHeader } from './_components/UpdatePasswordHeader';
import { UpdatePasswordForm } from './_components/UpdatePasswordForm';
import { UpdatePasswordSuccess } from './_components/UpdatePasswordSuccess';

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
      setLoading(false);
    } else {
      setMessage({ type: 'success', text: 'Password updated successfully.' });
      setLoading(false);
      setTimeout(() => router.push('/dashboard'), 2000);
    }
  };

  return (
    <>
      <UpdatePasswordHeader />

      <AnimatePresence mode="wait">
        {message?.type === 'success' ? (
          <UpdatePasswordSuccess />
        ) : (
          <UpdatePasswordForm
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            onSubmit={handleUpdatePassword}
            loading={loading}
            error={message?.type === 'error' ? message.text : null}
          />
        )}
      </AnimatePresence>
    </>
  );
}
