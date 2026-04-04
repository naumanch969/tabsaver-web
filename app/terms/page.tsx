'use client';

import { Footer } from '../components/footer';
import { Nav } from '../components/nav';

export default function Terms() {
    return (
        <main className="min-h-screen! bg-bg text-white/90!">
            {/* Navigation */}

            <Nav />

            {/* Content */}
            <div className="w-full flex items-center justify-center pt-24! pb-20!">
                <div className="w-full max-w-2xl px-6! md:px-10!">
                    <div className="prose prose-invert prose-sm max-w-none">
                        <h1 className="font-serif text-4xl! mb-2!">Terms of Service</h1>
                        <p className="text-white/50! text-sm! mb-8!">Last updated: April 2026</p>

                        <section className="mb-8!">
                            <h2 className="text-xl! font-semibold mb-4!">License</h2>
                            <p className="text-white/70! mb-4!">
                                tab saver is provided to you as-is. We grant you a non-exclusive, non-transferable license to use this extension for personal purposes on any device where you have Chrome installed.
                            </p>
                        </section>

                        <section className="mb-8!">
                            <h2 className="text-xl! font-semibold mb-4!">Acceptable Use</h2>
                            <p className="text-white/70! mb-4!">
                                You agree not to:
                            </p>
                            <ul className="list-disc list-inside text-white/70! space-y-2 mb-4!">
                                <li>Reverse engineer, decompile, or disassemble the extension</li>
                                <li>Use the extension for any illegal purposes</li>
                                <li>Attempt to modify or create derivative works</li>
                                <li>Distribute the extension outside of official channels</li>
                            </ul>
                        </section>

                        <section className="mb-8!">
                            <h2 className="text-xl! font-semibold mb-4!">Limitation of Liability</h2>
                            <p className="text-white/70! mb-4!">
                                The extension is provided on an &quot;as-is&quot; basis. We are not liable for any loss of data, damage, or other issues arising from your use of this extension. Always maintain backups of important information.
                            </p>
                        </section>

                        <section className="mb-8!">
                            <h2 className="text-xl! font-semibold mb-4!">Changes to Terms</h2>
                            <p className="text-white/70! mb-4!">
                                We may update these terms at any time. Your continued use of the extension constitutes acceptance of the updated terms.
                            </p>
                        </section>

                        <section className="mb-8!">
                            <h2 className="text-xl! font-semibold mb-4!">Contact</h2>
                            <p className="text-white/70!">
                                If you have questions about these terms, please contact us through the Chrome Web Store.
                            </p>
                        </section>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
