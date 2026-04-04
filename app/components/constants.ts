export const EXTENSION_DOWNLOAD_LINK = 'https://chromewebstore.google.com/detail/tabsaver/fcoojccdffamjgkgcegmiopcmipnieeb'

export const fadeUp = {
    hidden: { opacity: 0, y: 22 },
    show: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.52, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    }),
};

export const PREVIEW_TABS = [
    { title: 'Figma · Dashboard v3', domain: 'figma.com', color: '#a78bfa' },
    { title: 'Linear · Sprint 12 board', domain: 'linear.app', color: '#60a5fa' },
    { title: "Notion · Q2 Roadmap", domain: 'notion.so', color: '#94a3b8' },
    { title: 'Supabase · tabsaver-db', domain: 'supabase.com', color: '#4ade80' },
    { title: 'Vercel · tabsaver-web', domain: 'vercel.com', color: '#f0ede4' },
];

export const FEATURES = [
    {
        icon: 'tabs',
        label: 'Save & Clear',
        headline: 'Save all your tabs in seconds.',
        body: 'Name your session, pick a color, and close all tabs at once. No more tab overload cluttering your focus.',
    },
    {
        icon: 'cloud',
        label: 'Auto-Saved Sessions',
        headline: 'Never lose your last session.',
        body: "Your extension automatically remembers what you were working on. Come back to your work exactly where you left off, instantly.",
    },
    {
        icon: 'share',
        label: 'Organize by Color',
        headline: 'Stay organized with color tags.',
        body: 'Tag your workspaces with colors. "Client Work" in red, "Research" in blue. Quick visual scanning to find what you need.',
    },
    {
        icon: 'lightning',
        label: 'One-Click Restore',
        headline: 'Restore an entire session instantly.',
        body: 'Click a workspace and all tabs open at once. Perfect for switching between deep work contexts without mental switching costs.',
    },
];

export const STEPS = [
    { n: '01', title: 'Install the extension', body: 'Add Tab Saver to Chrome. It sits quietly in your toolbar until you need it.' },
    { n: '02', title: 'Save your session', body: 'Click the icon, name your workspace, pick a color. Save & close all tabs in one action.' },
    { n: '03', title: 'Focus on what matters', body: 'With tabs gone, your browser is clean. Your mind is clear. Get deep work done.' },
    { n: '04', title: 'Restore anytime', body: 'Click a saved workspace and all your tabs open instantly. Pick up exactly where you left off.' },
];
