'use client';

import { useEffect, useState } from 'react';
import { supabase, getUserWorkspaces, getQuickSaves } from '@/lib/supabase';
import { formatDate } from '@/lib/date-formatter';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

const LogoMark = () => (
  <svg width="22" height="22" viewBox="0 0 56 56" fill="none">
    <rect x="14" y="20" width="12" height="6" rx="3" fill="#e8a84b" opacity="0.18"/>
    <rect x="14" y="24" width="36" height="22" rx="5" fill="#e8a84b" opacity="0.18"/>
    <rect x="10" y="15" width="12" height="6" rx="3" fill="#e8a84b" opacity="0.45"/>
    <rect x="10" y="19" width="36" height="22" rx="5" fill="#e8a84b" opacity="0.45"/>
    <rect x="6" y="10" width="14" height="7" rx="3.5" fill="#e8a84b"/>
    <rect x="6" y="15" width="36" height="22" rx="5" fill="#e8a84b"/>
    <rect x="13" y="22" width="16" height="2" rx="1" fill="#171610" opacity="0.5"/>
    <rect x="13" y="27" width="10" height="2" rx="1" fill="#171610" opacity="0.3"/>
  </svg>
);

const COLOR_MAP: Record<string, string> = {
  green: '#4ade80', blue: '#60a5fa', yellow: '#e8a84b',
  purple: '#c084fc', red: '#f87171', tan: '#cc9c73',
};

function WorkspaceCard({ ws }: { ws: any }) {
  const tabs: any[] = ws.data || [];
  const color = ws.color ? COLOR_MAP[ws.color] ?? '#e8a84b' : '#e8a84b';

  return (
    <div className="glass rounded-xl p-5 hover:border-white/[0.13] transition-colors duration-200">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ background: color }} />
            <h3 className="text-[14px] font-semibold text-white/88">{ws.name}</h3>
          </div>
          <p className="text-xs text-white/30">{tabs.length} tab{tabs.length !== 1 ? 's' : ''}</p>
        </div>
        {ws.is_public && ws.share_id && (
          <a
            href={`/s/${ws.share_id}`}
            className="text-[11px] text-[#e8a84b]/70 hover:text-[#e8a84b] transition-colors border border-[#e8a84b]/20 hover:border-[#e8a84b]/40 rounded-full px-2.5 py-1"
          >
            Shared
          </a>
        )}
      </div>
      <div className="flex items-center gap-1.5 flex-wrap">
        {tabs.slice(0, 4).map((tab: any, i: number) => (
          <a
            key={i}
            href={tab.url}
            target="_blank"
            rel="noopener noreferrer"
            title={tab.title}
            className="text-[10px] text-white/35 hover:text-white/60 transition-colors bg-white/[0.04] rounded px-2 py-0.5 max-w-[120px] truncate"
          >
            {tab.title || tab.url}
          </a>
        ))}
        {tabs.length > 4 && (
          <span className="text-[10px] text-white/25">+{tabs.length - 4} more</span>
        )}
      </div>
    </div>
  );
}

function QuickSaveCard({ qs }: { qs: any }) {
  const tabs: any[] = qs.tabs || [];
  const expiresAt = new Date(qs.expires_at);
  const daysLeft = Math.ceil((expiresAt.getTime() - Date.now()) / 86400000);

  return (
    <div className="glass rounded-xl p-5 hover:border-white/[0.13] transition-colors duration-200">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[13px] text-white/88 font-medium truncate flex-1 mr-3">
          {tabs[0]?.title || tabs[0]?.url || 'Quick Save'}
        </p>
        <div className="flex flex-col items-end gap-1">
          <span className={`text-[10px] shrink-0 rounded-full px-2 py-0.5 border ${
            daysLeft <= 2
              ? 'text-red-400/80 border-red-400/20 bg-red-400/5'
              : 'text-white/30 border-white/10 bg-white/[0.03]'
          }`}>
            {daysLeft}d left
          </span>
          <span className="text-[9px] text-white/30" title="Expires at">
            {formatDate(expiresAt)}
          </span>
        </div>
      </div>
      {tabs.slice(0, 2).map((tab: any, i: number) => (
        <a
          key={i}
          href={tab.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-[11px] text-white/30 hover:text-[#e8a84b] transition-colors truncate mb-1"
        >
          {tab.url}
        </a>
      ))}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="glass rounded-xl p-5 animate-pulse">
      <div className="h-3.5 bg-white/[0.06] rounded-full w-1/2 mb-3" />
      <div className="h-2.5 bg-white/[0.04] rounded-full w-1/4 mb-4" />
      <div className="flex gap-2">
        <div className="h-4 bg-white/[0.04] rounded w-20" />
        <div className="h-4 bg-white/[0.04] rounded w-16" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [quickSaves, setQuickSaves] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push('/login'); return; }

      setUserEmail(session.user.email ?? '');

      try {
        const [ws, qs] = await Promise.all([
          getUserWorkspaces(session.user.id),
          getQuickSaves(session.user.id),
        ]);
        setWorkspaces(ws || []);
        setQuickSaves(qs || []);
      } catch (err) {
        console.error('Failed to fetch data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  return (
    <div className="min-h-[100dvh]">
      {/* Nav */}
      <nav className="sticky top-0 z-40 glass border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <LogoMark />
            <span className="text-sm font-semibold text-white/70">
              3tab<span className="text-[#e8a84b]">saver</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {userEmail && <span className="text-xs text-white/30 hidden sm:block">{userEmail}</span>}
            <button
              onClick={() => supabase.auth.signOut().then(() => router.push('/'))}
              className="btn-secondary !py-1.5 !px-3 text-xs"
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <h1 className="font-serif text-2xl md:text-3xl tracking-tight text-white/90 mb-1">Your Vaults</h1>
          <p className="text-sm text-white/35">Workspaces synced from the extension.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          {/* Workspaces column */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-semibold tracking-[0.12em] uppercase text-white/40">
                Workspaces
              </h2>
              {!loading && <span className="text-xs text-white/25">{workspaces.length} total</span>}
            </div>

            {loading ? (
              <div className="flex flex-col gap-3">
                {[0, 1, 2].map(i => <SkeletonCard key={i} />)}
              </div>
            ) : workspaces.length === 0 ? (
              <div className="glass rounded-xl p-10 text-center">
                <div className="mb-4 flex justify-center">
                  <svg width="40" height="40" viewBox="0 0 56 56" fill="none" opacity="0.25">
                    <rect x="6" y="15" width="36" height="22" rx="5" fill="#e8a84b"/>
                  </svg>
                </div>
                <p className="text-sm text-white/35 mb-1">No workspaces yet</p>
                <p className="text-xs text-white/20">Install the extension and save a session to start syncing.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {workspaces.map((ws, i) => (
                  <motion.div
                    key={ws.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                  >
                    <WorkspaceCard ws={ws} />
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* Quick saves column */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-semibold tracking-[0.12em] uppercase text-white/40">
                Quick Saves
              </h2>
              {!loading && quickSaves.length > 0 && (
                <span className="text-xs text-white/25">{quickSaves.length} active</span>
              )}
            </div>

            {loading ? (
              <div className="flex flex-col gap-3">
                {[0, 1].map(i => <SkeletonCard key={i} />)}
              </div>
            ) : quickSaves.length === 0 ? (
              <div className="glass rounded-xl p-8 text-center">
                <p className="text-sm text-white/35 mb-1">No quick saves</p>
                <p className="text-xs text-white/20">Use the extension to quick-save a tab. It stays for 7 days.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {quickSaves.map((qs, i) => (
                  <motion.div
                    key={qs.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                  >
                    <QuickSaveCard qs={qs} />
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
