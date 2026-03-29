import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[var(--bg)]">
      <div className="absolute top-0 w-full h-full pointer-events-none overflow-hidden flex justify-center mt-[-20%]">
        <div className="w-[800px] h-[800px] rounded-full bg-[var(--accent)] blur-[150px] opacity-10"></div>
      </div>
      
      <main className="z-10 flex flex-col items-center text-center max-w-2xl gap-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-[var(--accent-dim)] rounded-xl border border-[var(--accent-glow)] flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
              <line x1="2" y1="10" x2="22" y2="10"></line>
              <line x1="8" y1="20" x2="8" y2="10"></line>
            </svg>
          </div>
          <h1 className="logo-name text-4xl">
            <span className="wm-tab">3tab</span>
            <span className="wm-dot !w-[6px] !h-[6px] !mx-1"></span>
            <span className="wm-saver !text-2xl pt-1">saver</span>
          </h1>
        </div>

        <h2 className="text-5xl serif text-[var(--t1)] tracking-tight leading-tight">
          Save tabs. Sync everywhere. <br/> <span className="text-[var(--accent)] italic">Never lose context.</span>
        </h2>

        <p className="text-[var(--t2)] text-xl font-light">
          The elegant workspace manager for Chrome. Group, save, and share your tabs securely with Obsidian Gold aesthetics.
        </p>

        <div className="flex gap-4 mt-4">
          <Link href="/login" className="btn-primary text-base px-8 py-3">
            Start Syncing
          </Link>
          <a href="#" className="btn-secondary text-base px-8 py-3 glass">
            Install Extension
          </a>
        </div>
      </main>
      
      <div className="absolute bottom-8 text-[var(--t3)] text-sm z-10">
         Created for speed. Designed for elegance.
      </div>
    </div>
  );
}
