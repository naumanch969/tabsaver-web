import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '3TabSaver — Save, Sync & Share Browser Sessions',
  description: 'Snapshot your open tabs into named vaults, sync them across every Chrome profile, and share sessions with a single link.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
