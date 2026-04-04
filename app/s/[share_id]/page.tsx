import { getSharedWorkspace } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const LogoMark = () => (
  <svg width="20" height="20" viewBox="0 0 56 56" fill="none">
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

const ExternalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

interface PageProps {
  params: Promise<{ share_id: string }>;
}

export default async function SharedWorkspacePage({ params }: PageProps) {
  const { share_id } = await params;

  let workspace: any;
  try {
    workspace = await getSharedWorkspace(share_id);
  } catch {
    return notFound();
  }

  if (!workspace?.data) return notFound();

  const tabs: any[] = Array.isArray(workspace.data) ? workspace.data : [];
  const COLOR_MAP: Record<string, string> = {
    green: '#4ade80', blue: '#60a5fa', yellow: '#e8a84b',
    purple: '#c084fc', red: '#f87171', tan: '#cc9c73',
  };
  const accentColor = workspace.color ? COLOR_MAP[workspace.color] ?? '#e8a84b' : '#e8a84b';

  return (
    <div className="min-h-[100dvh]">
      {/* Nav strip */}
      <nav className="border-b border-white/[0.06] h-12 flex items-center px-6">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <LogoMark />
          <span className="text-sm font-semibold text-white/55">
            3tab<span className="text-[#e8a84b]">saver</span>
          </span>
        </Link>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Session header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full" style={{ background: accentColor }} />
            <span className="text-xs font-semibold tracking-[0.12em] uppercase text-white/30">
              Shared session · {tabs.length} tab{tabs.length !== 1 ? 's' : ''}
            </span>
          </div>
          <h1 className="font-serif text-2xl md:text-3xl tracking-tight text-white/92 mb-1">
            {workspace.name}
          </h1>
          <p className="text-sm text-white/35">
            Open all tabs at once or visit them one by one.
          </p>
        </div>

        {/* Open-all action */}
        <div className="flex items-center gap-3 mb-8 p-4 glass rounded-xl">
          <div className="flex-1">
            <p className="text-sm text-white/70 font-medium">Open all {tabs.length} tabs</p>
            <p className="text-xs text-white/30 mt-0.5">Install 3TabSaver to save this session to your vault</p>
          </div>
          <Link href="/login" className="btn-primary !py-2 !px-4 text-sm shrink-0">
            Save to vault
          </Link>
        </div>

        {/* Tab list */}
        <div className="flex flex-col gap-2">
          {tabs.map((tab: any, i: number) => {
            let domain = '';
            try { domain = new URL(tab.url).hostname.replace('www.', ''); } catch { domain = ''; }

            return (
              <a
                key={i}
                href={tab.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 glass rounded-xl p-4 hover:border-white/[0.14] transition-all duration-200 no-underline"
              >
                <div className="w-8 h-8 bg-white/[0.04] rounded-lg flex items-center justify-center shrink-0">
                  {tab.favIconUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={tab.favIconUrl} alt="" className="w-4 h-4 rounded" />
                  ) : (
                    <div className="w-4 h-4 bg-white/10 rounded" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-white/80 truncate group-hover:text-white/95 transition-colors">
                    {tab.title || domain}
                  </p>
                  <p className="text-[11px] text-white/30 truncate mt-0.5">{domain}</p>
                </div>
                <div className="text-white/20 group-hover:text-[#e8a84b] transition-colors shrink-0">
                  <ExternalIcon />
                </div>
              </a>
            );
          })}
        </div>

        {/* Footer nudge */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] text-center">
          <p className="text-xs text-white/25 mb-3">Powered by 3TabSaver</p>
          <Link href="/" className="btn-secondary !py-2 !px-4 text-xs inline-flex">
            Get the extension
          </Link>
        </div>
      </div>
    </div>
  );
}
