import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TabStack — Save, Sync & Share Browser Sessions',
  description: 'Architecture for your browser sessions. Snapshot open tabs into named vaults, sync across profiles, and broadcast with authority.',
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
