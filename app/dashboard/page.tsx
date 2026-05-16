'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, LayoutDashboard, Layers, History, Zap, ShieldCheck, FolderOpen, Clock, Settings, Share2 } from 'lucide-react';
import { GlassCard, PremiumButton, SerifHeading, Label, Container, ANIM_VARIANTS } from '@/components/ui';
import { Navbar } from '@/components/layout/Navbar';
import { BackgroundDecor } from '@/components/layout/BackgroundDecor';
import { supabase } from '@/lib/supabase';
import { Workspace } from '@/types';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';

// Modular Components
import { StatCard } from '@/components/dashboard/StatCard';
import { TabButton } from '@/components/dashboard/TabButton';
import { WorkspaceCard } from '@/components/dashboard/WorkspaceCard';
import { SidebarAction } from '@/components/dashboard/SidebarAction';

export default function DashboardPage() {
  /////////////////////////////////////////////// STATES /////////////////////////////////////////////// 
  const [user, setUser] = useState<User | null>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'workspaces' | 'snapshots' | 'shared'>('workspaces');

  /////////////////////////////////////////////// EFFECTS /////////////////////////////////////////////// 
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data } = await supabase
          .from('workspaces')
          .select('*')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false });

        if (data) setWorkspaces(data);
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  /////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////// 
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const filteredWorkspaces = workspaces.filter(ws =>
    ws.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /////////////////////////////////////////////// RENDER /////////////////////////////////////////////// 
  if (loading) {
    return (
      <div className="min-h-screen bg-bg text-t1 flex flex-col items-center justify-center p-6! gap-8!">
        <BackgroundDecor />
        <div className="w-14! h-14! border-[3px]! border-accent border-t-transparent rounded-full animate-spin shadow-2xl shadow-accent/20" />
        <Label className="animate-pulse tracking-[0.5em]">Synchronizing Vaults...</Label>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-bg text-t1 flex flex-col items-center justify-center p-6! text-center">
        <BackgroundDecor />
        <GlassCard className="p-16! max-w-xl! mx-auto!" hover={false}>
          <div className="w-20! h-20! bg-accent/10 rounded-3xl! flex items-center justify-center mx-auto! mb-10!">
            <ShieldCheck size={40} className="text-accent" />
          </div>
          <SerifHeading as="h2" className="text-4xl! md:text-5xl! mb-6!">Identity Verification</SerifHeading>
          <p className="text-t2 text-xl! mb-12! font-medium leading-relaxed max-w-sm mx-auto!">
            Authorized access only. Please sign in to establish a secure link with your cloud vaults.
          </p>
          <Link href="/sign-in">
            <PremiumButton variant="primary" className="w-full! py-5! text-base!">
              Establish Connection
            </PremiumButton>
          </Link>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-t1 selection:bg-accent/30 overflow-x-hidden relative pb-40!">
      <BackgroundDecor />
      <Navbar userEmail={user.email} onSignOut={handleSignOut} />

      <main className="relative z-10 pt-32! md:pt-40!">
        <Container className="mx-auto!">
          {/* Dashboard Header */}
          <header className="flex flex-col md:flex-row! items-start! md:items-end! justify-between! mb-16! md:mb-28! gap-10! md:gap-16! mx-auto!">
            <div className="space-y-8! grow mx-auto! md:mx-0!">
              <div className="flex items-center gap-5! justify-center md:justify-start!">
                <div className="w-12 h-12 bg-accent/10 border border-accent/20 rounded-2xl! flex items-center justify-center">
                  <LayoutDashboard className="w-6 h-6 text-accent" />
                </div>
                <Label className="text-[11px]! tracking-[0.5em]! font-black uppercase">Command Center</Label>
              </div>
              <SerifHeading as="h1" className="text-5xl! md:text-7xl! leading-[0.95]! tracking-tighter! text-center md:text-left!">
                Control<br />Surface.
              </SerifHeading>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-5! w-full md:w-auto shrink-0 mx-auto!">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-6! top-1/2 -translate-y-1/2 text-t3" size={18} />
                <input
                  type="text"
                  placeholder="Filter vaults..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-line rounded-2xl! py-4! pl-14! pr-6! text-sm font-bold focus:outline-none focus:border-accent/40 transition-colors h-14! placeholder:text-t3/50"
                />
              </div>
              <PremiumButton variant="primary" className="h-14! px-8! rounded-2xl! w-full sm:w-auto text-[11px]! font-black uppercase tracking-widest">
                <Plus size={20} strokeWidth={3} /> New Vault
              </PremiumButton>
            </div>
          </header>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6! md:gap-8! mb-16! md:mb-24! mx-auto!">
            <StatCard
              icon={Layers}
              label="Active Vaults"
              value={workspaces.length.toString()}
              trend="Status: Online"
            />
            <StatCard
              icon={Zap}
              label="Total Tabs"
              value={workspaces.reduce((acc, ws) => acc + (ws.data?.length || 0), 0).toString()}
              trend="Sync: Live"
            />
            <StatCard
              icon={History}
              label="Snapshots"
              value="14"
              trend="Encrypted"
            />
            <StatCard
              icon={Share2}
              label="Broadcasts"
              value={workspaces.filter(w => w.is_public).length.toString()}
              trend="Access: Open"
            />
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-10! border-b border-line mb-12! md:mb-16! mx-auto!">
            <TabButton
              active={activeTab === 'workspaces'}
              onClick={() => setActiveTab('workspaces')}
              label="Active Vaults"
              count={workspaces.length}
            />
            <TabButton
              active={activeTab === 'snapshots'}
              onClick={() => setActiveTab('snapshots')}
              label="Snapshots"
              count={0}
            />
            <TabButton
              active={activeTab === 'shared'}
              onClick={() => setActiveTab('shared')}
              label="Broadcasts"
              count={workspaces.filter(w => w.is_public).length}
            />
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10! md:gap-16! mx-auto!">
            {/* Left Column: Workspaces Grid */}
            <div className="lg:col-span-2 space-y-6! md:space-y-8!">
              <AnimatePresence mode="popLayout">
                {filteredWorkspaces.length > 0 ? (
                  filteredWorkspaces.map((ws, i) => (
                    <WorkspaceCard key={ws.id} workspace={ws} index={i} />
                  ))
                ) : (
                  <motion.div
                    {...ANIM_VARIANTS.fadeIn}
                    className="text-center py-32! md:py-48! bg-white/2 rounded-4xl! border border-dashed border-line"
                  >
                    <FolderOpen className="mx-auto! mb-6! text-t3 opacity-20" size={64} />
                    <p className="text-t2 text-xl! font-medium mb-4!">No vaults detected in sectors</p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-accent text-[10px]! font-black uppercase tracking-[0.4em] hover:opacity-70 transition-all"
                    >
                      Reset Protocol
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column: Sidebar Actions/Info */}
            <div className="space-y-10! md:space-y-12!">
              <GlassCard className="p-10!" hover={false}>
                <SerifHeading as="h3" className="text-2xl! mb-8! tracking-tight">Quick Access</SerifHeading>
                <div className="space-y-5!">
                  <SidebarAction
                    icon={Layers}
                    label="Restore Session"
                    desc="Reopen last architecture"
                  />
                  <SidebarAction
                    icon={Clock}
                    label="Vault History"
                    desc="Browse previous states"
                  />
                  <SidebarAction
                    icon={Settings}
                    label="Security Suite"
                    desc="Manage encryption keys"
                  />
                </div>
              </GlassCard>

              <GlassCard className="p-10! bg-accent/5 border-accent/10 relative overflow-hidden group" hover={false}>
                <div className="absolute -top-10 -right-10 p-6! opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                  <Zap size={200} />
                </div>
                <div className="flex items-center gap-4! mb-6! relative z-10">
                  <div className="w-10 h-10 bg-accent/20 rounded-2xl! flex items-center justify-center">
                    <Zap className="text-accent" size={20} />
                  </div>
                  <h4 className="font-bold text-lg! tracking-tight">Pro Protocol</h4>
                </div>
                <p className="text-t2 text-sm! leading-relaxed mb-10! font-medium relative z-10 opacity-70">
                  Unlock multi-identity sync, persistent broadcast links, and advanced behavioral forensics.
                </p>
                <PremiumButton variant="primary" className="w-full! py-4! text-[11px]! font-black uppercase tracking-widest relative z-10 shadow-2xl shadow-accent/20">
                  Upgrade Access
                </PremiumButton>
              </GlassCard>

              <div className="px-6! text-center!">
                <Label className="block opacity-30 mb-4! tracking-[0.4em] text-[9px]!">System Status</Label>
                <div className="inline-flex items-center justify-center gap-3! px-6! py-2.5! bg-green-500/5 border border-green-500/10 rounded-full! text-[10px]! font-black uppercase tracking-widest text-green-400">
                  <div className="w-2! h-2! rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.4)]" />
                  Operational
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}