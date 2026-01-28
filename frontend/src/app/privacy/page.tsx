import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Energize Business Group Privacy Policy. How we collect, use, and protect your personal data in Saudi Arabia and the MENA region.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white pt-20 sm:pt-24">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
        <div className="absolute -top-40 -right-40 w-[520px] h-[520px] bg-gradient-to-br from-red-500/10 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[420px] h-[420px] bg-gradient-to-tr from-amber-500/5 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-red-500/30 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-red-300/90">
          Legal
          <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
          Energize Business Group
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Privacy Policy
        </h1>
        <p className="text-gray-400 text-sm mb-10">
          Last updated: January 2025
        </p>

        <div className="space-y-8">
          <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-transparent p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white pb-2 border-b border-gray-700/50 mb-4 text-red-200/90">
              1. Who We Are
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Energize Business Group (&quot;we&quot;, &quot;us&quot;,
              &quot;our&quot;) is a business conglomerate operating in Saudi
              Arabia and the MENA region since 1999. We provide comprehensive
              solutions in marketing, event management, logistics, and
              manufacturing. Our headquarters are located in Jeddah, Saudi
              Arabia. This Privacy Policy explains how we collect, use, and
              protect your personal information when you use our website and
              services.
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-transparent p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white pb-2 border-b border-gray-700/50 mb-4 text-red-200/90">
              2. Information We Collect
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
              We may collect the following types of information:
            </p>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-2 ml-2">
              <li>
                Contact details (name, email, phone number) when you get in
                touch or subscribe to our updates
              </li>
              <li>
                Usage data (how you use our website, pages visited, and
                preferences)
              </li>
              <li>
                Communication records when you contact us via email or our
                contact forms
              </li>
              <li>
                Information you provide when applying for careers or engaging
                with our portfolio companies
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-transparent p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white pb-2 border-b border-gray-700/50 mb-4 text-red-200/90">
              3. How We Use Your Information
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
              We use your information to:
            </p>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-2 ml-2">
              <li>Respond to your inquiries and provide customer support</li>
              <li>
                Send you relevant updates, insights, and newsletters (with your
                consent)
              </li>
              <li>Improve our website, services, and user experience</li>
              <li>
                Comply with applicable laws and regulations in Saudi Arabia and
                internationally
              </li>
              <li>Manage recruitment and business relationships</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-transparent p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white pb-2 border-b border-gray-700/50 mb-4 text-red-200/90">
              4. Data Security & Retention
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              We implement appropriate technical and organizational measures to
              protect your personal data against unauthorized access, loss, or
              misuse. We retain your information only for as long as necessary
              to fulfill the purposes described in this policy or as required by
              law. Our practices align with Saudi Arabia&apos;s data protection
              considerations and international best practices.
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-transparent p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white pb-2 border-b border-gray-700/50 mb-4 text-red-200/90">
              5. Sharing & Disclosure
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              We do not sell your personal data. We may share your information
              with trusted service providers who assist us in operating our
              website and services, and with our portfolio companies where
              relevant to your engagement. We may also disclose information when
              required by law or to protect our rights and safety.
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-transparent p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white pb-2 border-b border-gray-700/50 mb-4 text-red-200/90">
              6. Your Rights
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
              You have the right to access, correct, or request deletion of your
              personal data. You may also opt out of marketing communications at
              any time. To exercise these rights or ask questions about this
              policy, contact us at{" "}
              <a
                href="mailto:Info@energize-sa.com"
                className="text-red-400 hover:text-red-300 transition-colors underline"
              >
                Info@energize-sa.com
              </a>
              .
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-transparent p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white pb-2 border-b border-gray-700/50 mb-4 text-red-200/90">
              7. Cookies & Tracking
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Our website may use cookies and similar technologies to improve
              functionality and analyze usage. You can adjust your browser
              settings to manage or disable cookies. Continued use of our site
              implies acceptance of our use of cookies as described here.
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-transparent p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white pb-2 border-b border-gray-700/50 mb-4 text-red-200/90">
              8. Changes & Contact
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              We may update this Privacy Policy from time to time. The
              &quot;Last updated&quot; date at the top reflects the latest
              version. For any questions about this policy or our data
              practices, please contact us at{" "}
              <a
                href="mailto:Info@energize-sa.com"
                className="text-red-400 hover:text-red-300 transition-colors underline"
              >
                Info@energize-sa.com
              </a>
              , or call{" "}
              <a
                href="tel:0126825858"
                className="text-red-400 hover:text-red-300 transition-colors underline"
              >
                0126825858
              </a>
              . Energize Business Group — Jeddah, Saudi Arabia.
            </p>
          </section>
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 transition hover:-translate-y-0.5 hover:border-red-400/60 hover:text-red-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
