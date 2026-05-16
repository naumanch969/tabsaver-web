'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui';
import { SignInHeader } from './_components/SignInHeader';
import { SignInForm } from './_components/SignInForm';
import { SuccessState } from './_components/SuccessState';
import { SignInFooter } from './_components/SignInFooter';

export default function SignInPage() {

  ///////////////////////////////////////////// STATES /////////////////////////////////////////////
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  ///////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////
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

  ///////////////////////////////////////////// RENDER /////////////////////////////////////////////
  return (
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
  );
}

