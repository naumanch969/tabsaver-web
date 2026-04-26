'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Trash2, ExternalLink, Shield, Cloud, LogOut, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { Workspace } from '@/types';
import { User } from '@supabase/supabase-js';

declare const chrome: {
  runtime: {
    sendMessage: (id: string, message: any, callback?: (response: any) => void) => void;
    lastError?: any;
  };
};

export default function DashboardPage() {
  
  //////////////////////////////////////////// STATES //////////////////////////////////////////// 
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

//////////////////////////////////////////// EFFECTS //////////////////////////////////////////// 
  const fetchWorkspaces = async (userId: string) => {
    const { data, error } = await supabase
      .from('workspaces')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (!error) setWorkspaces(data || []);
    setLoading(false);
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = '/sign-in';
        return;
      }
      setUser(user);
      fetchWorkspaces(user.id);
    };
    checkUser();
  }, []);

  const togglePublic = async (id: string, isPublic: boolean) => {
    const { error } = await supabase
      .from('workspaces')
      .update({ is_public: !isPublic })
      .eq('id', id);

    if (!error) {
      setWorkspaces(workspaces.map(w => w.id === id ? { ...w, is_public: !isPublic } : w));
    }
  };

  const deleteWorkspace = async (id: string) => {
    if (!confirm('Are you sure? This will remove it from the cloud.')) return;
    const { error } = await supabase
      .from('workspaces')
      .delete()
      .eq('id', id);

    if (!error) {
      setWorkspaces(workspaces.filter(w => w.id !== id));
    }
  };

  const handleSignOut = async () => {
    // Clear extension auth if possible
    try {
      if (typeof chrome !== 'undefined' && chrome.runtime?.sendMessage) {
        chrome.runtime.sendMessage(process.env.NEXT_PUBLIC_EXTENSION_ID || '', { type: 'CLEAR_AUTH' });
      }
    } catch {
      console.warn('Extension not found during sign-out');
    }

    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  //////////////////////////////////////////// RENDER //////////////////////////////////////////// 
  if (loading || !user) {
    return (
      <div className="min-h-screen bg-bg text-t1 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-t1 selection:bg-accent/30">
      {/* Nav */}
      <nav className="border-b border-line bg-bg/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/20">
               <Cloud className="w-5 h-5 text-bg" />
             </div>
             <span className="font-bold text-xl tracking-tight">tab<span className="text-accent">stack</span></span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sm text-t2 hidden md:inline font-medium">{user.email}</span>
            <button 
              onClick={handleSignOut}
              className="p-2.5 hover:bg-white/5 rounded-full text-t2 hover:text-t1 transition-all"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-serif">Cloud Vault</h1>
            <p className="text-t2 text-lg max-w-xl">Manage your synced workspaces and broadcast your sessions to the world.</p>
          </div>
          <div className="bg-accent/5 border border-accent/10 rounded-2xl px-6 py-5 flex items-center gap-5">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
              <Shield className="text-accent" size={24} />
            </div>
            <div>
              <div className="text-sm font-bold text-t1">End-to-End Encryption</div>
              <div className="text-xs text-t2">Your tab metadata is secure in our vault.</div>
            </div>
          </div>
        </div>

        {workspaces.length === 0 ? (
          <div className="py-32 text-center bg-white/1 border border-dashed border-line rounded-[2.5rem]">
            <Cloud className="w-20 h-20 text-t3 mx-auto mb-6 opacity-40" />
            <h3 className="text-2xl font-bold mb-3">No workspaces synced</h3>
            <p className="text-t2 max-w-sm mx-auto leading-relaxed">
              Open the extension and click &quot;Sync to Cloud&quot; on any workspace to see it appear here in your vault.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {workspaces.map((ws) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={ws.id}
                  className="group relative bg-bg2 border border-line rounded-4xl p-8 hover:bg-bg3 hover:border-line2 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-line group-hover:border-accent/30 transition-colors">
                      <Share2 size={24} className="text-t2 group-hover:text-accent transition-colors" />
                    </div>
                    <button 
                      onClick={() => deleteWorkspace(ws.id)}
                      className="p-3 text-t3 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <h3 className="text-2xl font-bold mb-2 truncate text-t1 font-serif">{ws.name}</h3>
                  <div className="flex items-center gap-2 mb-8">
                    <div className="w-2 h-2 rounded-full bg-accent/40" />
                    <span className="text-sm text-t2 font-medium">{ws.data?.length || 0} tabs synced</span>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-line">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-t3 uppercase tracking-[0.2em]">Visibility</span>
                      <button 
                        onClick={() => togglePublic(ws.id, ws.is_public)}
                        className={`text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full border transition-all ${ws.is_public ? 'bg-accent text-bg border-accent shadow-lg shadow-accent/20' : 'bg-white/5 text-t2 border-line'}`}
                      >
                        {ws.is_public ? 'Public' : 'Private'}
                      </button>
                    </div>

                    {ws.is_public && ws.share_id && (
                      <div className="flex items-center gap-2 mt-4">
                         <div className="relative grow">
                            <input 
                              readOnly
                              value={`${window.location.origin}/s/${ws.share_id}`}
                              className="w-full bg-bg/50 border border-line text-[11px] py-3.5 px-4 rounded-xl text-t3 font-mono focus:outline-none focus:border-accent/30 transition-all pr-10"
                            />
                            <Link 
                              href={`/s/${ws.share_id}`}
                              target="_blank"
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-t3 hover:text-accent transition-colors"
                            >
                              <ExternalLink size={14} />
                            </Link>
                         </div>
                         <button 
                           onClick={() => copyToClipboard(ws.id, `${window.location.origin}/s/${ws.share_id}`)}
                           className="p-3.5 bg-bg border border-line hover:bg-bg2 rounded-xl text-t2 hover:text-accent transition-all"
                         >
                           {copiedId === ws.id ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                         </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
