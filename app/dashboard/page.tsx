"use client";

import { useEffect, useState } from "react";
import { supabase, getUserWorkspaces, getQuickSaves } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [quickSaves, setQuickSaves] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/login");
        return;
      }

      try {
        const ws = await getUserWorkspaces(session.user.id);
        const qs = await getQuickSaves(session.user.id);
        setWorkspaces(ws || []);
        setQuickSaves(qs || []);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  return (
    <div className="min-h-screen bg-[var(--bg)] p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between border-b border-[var(--line2)] pb-4 mb-8">
          <h1 className="logo-name text-2xl">
            <span className="wm-tab">3tab</span>
            <span className="wm-dot !mx-1"></span>
            <span className="wm-saver !text-lg pt-1">saver dashboard</span>
          </h1>
          <button
            onClick={() => supabase.auth.signOut().then(() => router.push("/"))}
            className="text-[var(--t3)] hover:text-[var(--accent)] transition-colors text-sm"
          >
            Sign Out
          </button>
        </header>

        {loading ? (
          <div className="text-[var(--t2)] text-center mt-20">Loading workspaces...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="glass rounded-[16px] p-6 border-[var(--line2)]">
              <h2 className="text-xl serif text-[var(--accent)] mb-4">Your Workspaces</h2>
              {workspaces.length === 0 ? (
                <p className="text-[var(--t3)] text-sm italic">No workspaces synced yet. Install the extension to start syncing.</p>
              ) : (
                <ul className="flex flex-col gap-3">
                  {workspaces.map((ws) => (
                    <li key={ws.id} className="bg-[var(--bg2)] rounded-[12px] p-4 border border-[var(--line2)] shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
                      <div className="font-medium text-[var(--t1)] mb-1">{ws.name}</div>
                      <div className="text-xs text-[var(--t3)]">{ws.data?.length || 0} tabs synced</div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="glass rounded-[16px] p-6 border-[var(--line2)]">
              <h2 className="text-xl serif text-[var(--accent)] mb-4">Quick Saves (7 Days)</h2>
              {quickSaves.length === 0 ? (
                <p className="text-[var(--t3)] text-sm italic">No quick saves.</p>
              ) : (
                <ul className="flex flex-col gap-3">
                  {quickSaves.map((qs) => (
                    <li key={qs.id} className="bg-[var(--bg2)] rounded-[12px] p-4 border border-[var(--line2)] shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
                      <div className="font-medium text-[var(--t1)] mb-1">Quick Save</div>
                      <div className="text-xs text-[var(--t3)]">
                        Expires: {new Date(qs.expires_at).toLocaleDateString()}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
