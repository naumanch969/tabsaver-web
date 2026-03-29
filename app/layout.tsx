import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '3TabSaver — Professional Workspace Manager',
  description: 'Sync, Share, and Save your workspaces with Obsidian Gold aesthetics.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-[#0f0e09]">
          {children}
        </div>
      </body>
    </html>
  );
}
