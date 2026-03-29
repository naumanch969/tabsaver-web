import { getSharedWorkspace } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";

interface PageProps {
  params: {
    share_id: string;
  };
}

export default async function SharedWorkspacePage({ params }: PageProps) {
  let workspace;
  try {
    workspace = await getSharedWorkspace(params.share_id);
  } catch (e) {
    return notFound();
  }

  if (!workspace || !workspace.data) {
    return notFound();
  }

  const tabs = Array.isArray(workspace.data) ? workspace.data : [];

  return (
    <div className="min-h-screen bg-[var(--bg)] p-8">
      <div className="max-w-2xl mx-auto pt-10">
        <header className="flex justify-between items-end border-b border-[var(--line2)] pb-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-[var(--accent-dim)] rounded-lg flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h1 className="logo-name text-xl">
                <span className="wm-tab">3tab</span>
                <span className="wm-dot !mx-1"></span>
                <span className="wm-saver !text-sm pt-1">saver shared</span>
              </h1>
            </div>
            <h2 className="text-3xl serif text-[var(--t1)]">{workspace.name}</h2>
            <p className="text-sm text-[var(--t3)] italic mt-2">
              {tabs.length} saved tabs
            </p>
          </div>
          <button className="btn-primary text-sm px-4 py-2 flex items-center gap-2 shadow-[0_4px_16px_rgba(232,168,75,0.2)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Save to Extension
          </button>
        </header>

        <ul className="flex flex-col gap-3 pb-20">
          {tabs.map((tab: any, i: number) => {
            let domain = "";
            try {
              domain = new URL(tab.url).hostname;
            } catch (e) {
              domain = tab.url;
            }

            return (
              <li key={i} className="flex items-center gap-4 bg-[var(--bg2)] rounded-[12px] p-4 border border-[var(--line2)] hover:bg-[var(--bg3)] hover:translate-x-1 transition-all">
                <div className="w-10 h-10 bg-[var(--bg)] rounded-lg flex items-center justify-center shrink-0 shadow-md">
                  {tab.favIconUrl ? (
                    <img src={tab.favIconUrl} alt="icon" className="w-5 h-5 rounded" />
                  ) : (
                    <div className="w-5 h-5 bg-[var(--line2)] rounded"></div>
                  )}
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-sm font-medium text-[var(--t1)] truncate">{tab.title}</span>
                  <span className="text-[11px] text-[var(--t3)] truncate opacity-70">{domain}</span>
                </div>
                <a href={tab.url} target="_blank" rel="noopener noreferrer" className="text-xs bg-[var(--accent-dim)] text-[var(--accent)] px-3 py-1.5 rounded-md hover:bg-[var(--accent)] hover:text-[#1a1508] transition-colors whitespace-nowrap font-medium">
                  Visit
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
