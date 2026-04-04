'use client';

import Logo from './logo';

export function Footer() {
    return (
        <footer className="border-t! border-white/6 py-4! mt-20! w-full flex items-center justify-center">
            <div className="w-full max-w-6xl px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <Logo />
                <p className="text-xs text-white/35">
                    &copy; {new Date().getFullYear()} Tab Saver. Built for focus.
                </p>
                <div className="flex gap-6">
                    <a href="/privacy" className="text-xs text-white/45 hover:text-white/75 transition-colors">Privacy</a>
                    <a href="/terms" className="text-xs text-white/45 hover:text-white/75 transition-colors">Terms</a>
                </div>
            </div>
        </footer>
    );
}
