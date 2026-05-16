'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui';
import { MainLayout } from '@/components/layout';
import { SignInHeader } from '@/components/auth/SignInHeader';
import { SignInForm } from '@/components/auth/SignInForm';
import { SuccessState } from '@/components/auth/SuccessState';
import { SignInFooter } from '@/components/auth/SignInFooter';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Check your email for the magic link!' });
    }
    setLoading(false);
  };

  return (
    <MainLayout showFooter={false} mainClassName="grow flex items-center justify-center">
      <Container className="max-w-xl! mx-auto!">
        <SignInHeader />
        
        <AnimatePresence mode="wait">
          {message?.type === 'success' ? (
            <SuccessState email={email} onReset={() => setMessage(null)} />
          ) : (
            <SignInForm 
              email={email} 
              setEmail={setEmail} 
              loading={loading} 
              message={message} 
              onSubmit={handleSignIn} 
            />
          )}
        </AnimatePresence>

        <SignInFooter />
      </Container>
    </MainLayout>
  );
}

