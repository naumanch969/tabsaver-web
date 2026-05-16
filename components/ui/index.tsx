import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

export const ANIM_VARIANTS = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8 }
  }
};

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'flat' | 'glass';
  hover?: boolean;
}

export const GlassCard = ({ children, className, variant = 'default', hover = true, ...props }: GlassCardProps) => {
  return (
    <motion.div
      className={cn(
        "rounded-4xl! p-10!",
        variant === 'default' && "bg-bg2/50 border border-line",
        variant === 'glass' && "glass",
        variant === 'accent' && "glass-accent",
        variant === 'flat' && "bg-bg2 border border-line",
        hover && "card-hover",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const PremiumButton = ({ children, className, variant = 'primary', size = 'md', ...props }: { children: React.ReactNode, className?: string, variant?: 'primary' | 'secondary' | 'ghost' | 'outline', size?: 'sm' | 'md' | 'lg' } & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-3! transition-all active:scale-95 disabled:opacity-50 font-bold tracking-tight rounded-2xl!",
        variant === 'primary' && "btn-primary",
        variant === 'secondary' && "btn-secondary",
        variant === 'outline' && "bg-transparent border border-line hover:border-accent/40 text-t2 hover:text-t1",
        variant === 'ghost' && "text-t2 hover:text-t1 hover:bg-white/5",
        size === 'sm' && "px-4! py-2! text-xs!",
        size === 'md' && "px-8! py-4!",
        size === 'lg' && "px-10! py-5! text-lg!",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const SerifHeading = ({ children, className, as: Tag = 'h2' }: { children: React.ReactNode, className?: string, as?: 'h1' | 'h2' | 'h3' | 'h4' }) => {
  const defaultSizes = {
    h1: "text-5xl! md:text-8xl! mb-12!",
    h2: "text-3xl! md:text-6xl! mb-16!",
    h3: "text-2xl! md:text-4xl! mb-10!",
    h4: "text-xl! md:text-3xl! mb-8!"
  };
  
  return (
    <Tag className={cn("font-serif tracking-tighter! text-t1 leading-[0.95]! md:leading-[0.9]!", defaultSizes[Tag], className)}>
      {children}
    </Tag>
  );
};

export const Label = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={cn("text-[11px]! uppercase tracking-[0.3em] font-black text-t3", className)}>
    {children}
  </span>
);

export const Badge = ({ children, className, variant = 'default' }: { children: React.ReactNode, className?: string, variant?: 'default' | 'accent' | 'outline' }) => (
  <span className={cn(
    "px-3! py-1! rounded-xl! text-[10px]! font-black uppercase tracking-widest",
    variant === 'default' && "bg-white/5 text-t2",
    variant === 'accent' && "bg-accent/10 text-accent border border-accent/20",
    variant === 'outline' && "border border-line text-t3",
    className
  )}>
    {children}
  </span>
);

export const GridPattern = ({ className }: { className?: string }) => (
  <svg
    className={cn("absolute inset-0 h-full w-full stroke-white/3 mask-[radial-gradient(100%_100%_at_top_right,white,transparent)]", className)}
    aria-hidden="true"
  >
    <defs>
      <pattern
        id="grid-pattern"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
        x="50%"
        y="-1"
      >
        <path d="M.5 40V.5H40" fill="none" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" strokeWidth="0" fill="url(#grid-pattern)" />
  </svg>
);

export const Section = ({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={cn("relative z-10 py-24! md:py-32!", className)}>
    {children}
  </section>
);

export const Container = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("max-w-7xl! mx-auto! px-6! md:px-12!", className)}>
    {children}
  </div>
);
