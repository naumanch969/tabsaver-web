'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, LayoutDashboard, Layers, History, Zap, ShieldCheck, FolderOpen, Clock, Settings, Share2 } from 'lucide-react';
import { GlassCard, PremiumButton, SerifHeading, Label, Container, ANIM_VARIANTS } from '@/components/ui';
import { supabase } from '@/lib/supabase';
import { Workspace } from '@/types';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';

// Modular Components
import { StatCard } from './_components/StatCard';
import { TabButton } from './_components/TabButton';
import { WorkspaceCard } from './_components/WorkspaceCard';
import { SidebarAction } from './_components/SidebarAction';

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
      <div className="flex flex-col items-center justify-center grow p-6! gap-8!">
        <div className="w-14! h-14! border-[3px]! border-accent border-t-transparent rounded-full animate-spin shadow-2xl shadow-accent/20" />
        <Label className="animate-pulse tracking-[0.3em]">Loading workspaces...</Label>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center grow">
        <GlassCard className="p-10! max-w-lg! mx-auto!" hover={false}>
          <div className="w-16! h-16! bg-accent/10 rounded-lg! flex items-center justify-center mx-auto! mb-8!">
            <ShieldCheck size={32} className="text-accent" />
          </div>
          <SerifHeading as="h3" className="mx-auto w-full text-center">Sign In Required</SerifHeading>
          <p className="text-base! mb-8! font-medium leading-relaxed max-w-sm mx-auto! text-t2">
            Please sign in to access and manage your saved workspaces and snapshots.
          </p>
          <Link href="/sign-in">
            <PremiumButton variant="primary" className="w-full! py-4! text-sm!">
              Sign In
            </PremiumButton>
          </Link>
        </GlassCard>
      </div>
    );
  }

  return (
    <Container className="mx-auto!">
        {/* Dashboard Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6! md:gap-10! mx-auto!">
          <div className="space-y-4! grow mx-auto! md:mx-0!">
            <div className="flex items-center gap-3! justify-center md:justify-start!">
              <div className="w-10 h-10 bg-accent/10 border border-accent/20 rounded-lg! flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-accent" />
              </div>
              <Label className="text-[10px]! tracking-[0.2em]! font-black uppercase">Dashboard</Label>
            </div>
            <SerifHeading as="h3" className="text-center md:text-left!">
              Your Workspaces.
            </SerifHeading>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4! w-full md:w-auto shrink-0 mx-auto!">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-5! top-1/2 -translate-y-1/2 text-t3" size={16} />
              <input
                type="text"
                placeholder="Search workspaces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-line rounded-lg! py-3! pl-12! pr-4! text-sm font-medium focus:outline-none focus:border-accent/40 transition-colors h-12! placeholder:text-t3/50"
              />
            </div>
            <PremiumButton variant="primary" className="h-12! px-6! rounded-lg! w-full sm:w-auto text-[10px]! font-bold uppercase tracking-widest">
              <Plus size={16} strokeWidth={2.5} /> New Workspace
            </PremiumButton>
          </div>
        </header>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4! md:gap-6! md:mb-16! mx-auto!">
          <StatCard
            icon={Layers}
            label="Workspaces"
            value={workspaces.length.toString()}
            trend="Status: Active"
          />
          <StatCard
            icon={Zap}
            label="Total Tabs"
            value={workspaces.reduce((acc, ws) => acc + (ws.data?.length || 0), 0).toString()}
            trend="Synced"
          />
          <StatCard
            icon={History}
            label="Snapshots"
            value="14"
            trend="Encrypted"
          />
          <StatCard
            icon={Share2}
            label="Shared Links"
            value={workspaces.filter(w => w.is_public).length.toString()}
            trend="Public Access"
          />
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-6! md:gap-8! border-b border-line mb-8! md:mb-12! mx-auto!">
          <TabButton
            active={activeTab === 'workspaces'}
            onClick={() => setActiveTab('workspaces')}
            label="My Workspaces"
            count={workspaces.length}
          />
          <TabButton
            active={activeTab === 'snapshots'}
            onClick={() => setActiveTab('snapshots')}
            label="History"
            count={0}
          />
          <TabButton
            active={activeTab === 'shared'}
            onClick={() => setActiveTab('shared')}
            label="Shared"
            count={workspaces.filter(w => w.is_public).length}
          />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8! md:gap-12! mx-auto!">
          {/* Left Column: Workspaces Grid */}
          <div className="lg:col-span-2 space-y-4! md:space-y-6!">
            <AnimatePresence mode="popLayout">
              {filteredWorkspaces.length > 0 ? (
                filteredWorkspaces.map((ws, i) => (
                  <WorkspaceCard key={ws.id} workspace={ws} index={i} />
                ))
              ) : (
                  <motion.div
                  {...ANIM_VARIANTS.fadeIn}
                  className="text-center py-20! md:py-32! bg-white/2 rounded-lg! border border-dashed border-line"
                >
                  <FolderOpen className="mx-auto! mb-5! text-t3 opacity-20" size={48} />
                  <p className="text-t2 text-base! font-medium mb-3!">No workspaces found</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-accent text-[10px]! font-black uppercase tracking-[0.2em] hover:opacity-70 transition-all"
                  >
                    Clear Filter
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Sidebar Actions/Info */}
          <div className="space-y-6! md:space-y-8!">
            <GlassCard className="p-6! md:p-8!" hover={false}>
              <SerifHeading as="h4" className="mb-6!">Quick Access</SerifHeading>
              <div className="space-y-4!">
                <SidebarAction
                  icon={Layers}
                  label="Restore Session"
                  desc="Reopen your last workspace"
                />
                <SidebarAction
                  icon={Clock}
                  label="History"
                  desc="Browse previous states"
                />
                <SidebarAction
                  icon={Settings}
                  label="Security"
                  desc="Manage your settings"
                />
              </div>
            </GlassCard>

            <GlassCard className="p-6! md:p-8! bg-accent/5 border-accent/10 relative overflow-hidden group" hover={false}>
              <div className="absolute -top-10 -right-10 p-6! opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                <Zap size={160} />
              </div>
              <div className="flex items-center gap-3! mb-5! relative z-10">
                <div className="w-8 h-8 bg-accent/20 rounded-lg! flex items-center justify-center">
                  <Zap className="text-accent" size={16} />
                </div>
                <SerifHeading as="h4" className="mb-0! text-xl!">TabStack Pro</SerifHeading>
              </div>
              <p className="text-t2 text-sm! leading-relaxed mb-6! font-medium relative z-10 opacity-70">
                Unlock multi-device sync, persistent sharing links, and advanced organization tools.
              </p>
              <PremiumButton variant="primary" className="w-full! py-3.5! text-[10px]! font-bold uppercase tracking-widest relative z-10 shadow-lg shadow-accent/20">
                Upgrade Now
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
  );
}