'use client';

import React, { useEffect, useState } from 'react';
import { Navbar, Footer, BackgroundDecor } from '@/components/layout';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function MainGroupLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  // Special handling for dashboard padding if needed, 
  // but we want to standardize paddings as much as possible.
  const isDashboard = pathname === '/dashboard';
  const isSignIn = pathname === '/sign-in';
  const showFooter = !isDashboard && !isSignIn;

  return (
    <div className="min-h-screen bg-bg text-t1 selection:bg-accent/30 overflow-x-hidden relative flex flex-col">
      <BackgroundDecor />
      <Navbar userEmail={user?.email} onSignOut={handleSignOut} />
      
      <main className={cn(
        "relative z-10 pt-24! md:pt-32! grow flex flex-col",
        isDashboard && "pt-32! md:pt-40! pb-40!",
        isSignIn && "items-center justify-center"
      )}>
        {children}
      </main>

      {showFooter && <Footer />}
    </div>
  );
}
