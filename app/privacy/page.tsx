'use client';

import { Footer } from '../components/footer';
import { Nav } from '../components/nav';

export default function Privacy() {
    return (
        <main className="min-h-screen! bg-bg text-white/90!">
            <Nav />
            <div className="w-full flex items-center justify-center pt-24! pb-20!">
                <div className="w-full max-w-2xl px-6! md:px-10!">
                    <div className="prose prose-invert prose-sm max-w-none">
                        <h1 className="font-serif text-4xl! mb-2!">Privacy Policy</h1>
                        <p className="text-white/50! text-sm! mb-8!">Last updated: April 2026</p>

                        <section className="mb-8!">
                            <h2 className="text-xl! font-semibold mb-4!">Overview</h2>
                            <p className="text-white/70! mb-4!">
                                tab saver is a Chrome extension that saves your open tabs locally on your device. We respect your privacy and are committed to being transparent about how we handle your data.
                            </p>
                        </section>

                        <section className="mb-8!">
                            <h2 className="text-xl! font-semibold mb-4!">Data We Collect</h2>
                            <p className="text-white/70! mb-4!">
                                tab saver operates entirely locally on your device. We do not:
                            </p>
                            <ul className="list-disc list-inside text-white/70! space-y-2 mb-4!">
                                <li>Collect any personal information</li>
                                <li>Send your tab data to external servers</li>
                                <li>Track your browsing behavior</li>
                                <li>Store cookies or identifiers</li>
                                <li>Share data with third parties</li>
                            </ul>
                        </section>

                        <section className="mb-8!">
                            <h2 className="text-xl! font-semibold mb-4!">How Your Data Is Stored</h2>
                            <p className="text-white/70! mb-4!">
                                Your saved tab workspaces are stored using Chrome&apos;s local storage and sync APIs. If you have Chrome sync enabled, your workspaces may sync across your devices using Google&apos;s encrypted sync infrastructure. This sync is controlled entirely by you through Chrome&apos;s native sync settings.
                            </p>
                        </section>

                        <section className="mb-8!">
                            <h2 className="text-xl! font-semibold mb-4!">Contact</h2>
                            <p className="text-white/70!">
                                If you have questions about this policy, please contact us through the Chrome Web Store.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
