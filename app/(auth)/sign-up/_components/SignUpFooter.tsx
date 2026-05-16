import React from 'react';
import Link from 'next/link';

export const SignUpFooter = () => {
  return (
    <div className="flex justify-start gap-8! mt-10!">
      <Link href="/sign-in" className="text-t3 text-[10px] hover:text-accent transition-all duration-500 uppercase tracking-[0.4em] font-black border-b border-transparent hover:border-accent/20 pb-1!">
        Already have an account?
      </Link>
    </div>
  );
};
