'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui';
import { Navbar } from '@/components/layout/Navbar';
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
    <div className="min-h-screen bg-bg text-t1 flex flex-col selection:bg-accent/30 relative overflow-hidden">
      <Navbar />

      <main className="grow flex items-center justify-center py-20! px-6! relative z-10">
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
      </main>

      {/* Decorative Background Elements - Simplified to prevent lag */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.05),transparent_70%)]" />
      </div>
    </div>
  );
}

