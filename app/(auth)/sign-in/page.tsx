'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AnimatePresence } from 'framer-motion';
import { SignInHeader } from './_components/SignInHeader';
import { SignInForm } from './_components/SignInForm';
import { SignInSuccess } from './_components/SignInSuccess';
import { SignInFooter } from './_components/SignInFooter';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  ///////////////////////////////////////////// STATES /////////////////////////////////////////////
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  ///////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
      setLoading(false);
    } else {
      const isExtension = searchParams.get('extension') === 'true';
      router.push(isExtension ? '/dashboard?extension=true' : '/dashboard');
    }
  };

  ///////////////////////////////////////////// RENDER /////////////////////////////////////////////
  return (
    <>
      <SignInHeader />
      
      <AnimatePresence mode="wait">
        {message?.type === 'success' ? (
          <SignInSuccess email={email} onReset={() => setMessage(null)} />
        ) : (
          <SignInForm 
            email={email} 
            setEmail={setEmail} 
            password={password}
            setPassword={setPassword}
            loading={loading} 
            message={message} 
            onSubmit={handleSignIn} 
          />
        )}
      </AnimatePresence>

      <SignInFooter />
    </>
  );
}
