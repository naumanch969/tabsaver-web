'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { SignUpHeader } from './_components/SignUpHeader';
import { SignUpForm } from './_components/SignUpForm';
import { SignUpSuccess } from './_components/SignUpSuccess';
import { SignUpFooter } from './_components/SignUpFooter';

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
      setLoading(false);
    } else {
      setMessage({ type: 'success', text: 'Success! Please check your email to verify your account.' });
      setLoading(false);
    }
  };

  return (
    <>
      <SignUpHeader />

      <AnimatePresence mode="wait">
        {message?.type === 'success' ? (
          <SignUpSuccess email={email} onBack={() => router.push('/sign-in')} />
        ) : (
          <SignUpForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            onSubmit={handleSignUp}
            loading={loading}
            error={message?.type === 'error' ? message.text : null}
          />
        )}
      </AnimatePresence>

      <SignUpFooter />
    </>
  );
}
