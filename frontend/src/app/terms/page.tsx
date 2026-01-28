import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Energize Business Group Terms and Conditions. Rules for using our website and services in Saudi Arabia and the MENA region.",
};

export default function TermsPage() {
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
          Terms & Conditions
        </h1>
        <p className="text-gray-400 text-sm mb-10">
          Last updated: January 2025
        </p>

        <div className="space-y-8">
          <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-transparent p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white pb-2 border-b border-gray-700/50 mb-4 text-red-200/90">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              By accessing or using the website and services of Energize
              Business Group (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;),
              you agree to be bound by these Terms & Conditions. If you do not
              agree with any part of these terms, please do not use our website.
              We are a business conglomerate operating in Saudi Arabia and the
              MENA region since 1999, providing comprehensive solutions in
              marketing, event management, logistics, and manufacturing. Our
              headquarters are in Jeddah, Saudi Arabia.
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-transparent p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white pb-2 border-b border-gray-700/50 mb-4 text-red-200/90">
              2. Use of Our Website
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
              You agree to use our website only for lawful purposes and in a way
              that does not infringe the rights of others or restrict their use
              of the site. You must not:
            </p>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-2 ml-2">
              <li>Use the site for any fraudulent or unlawful purpose</li>
              <li>
                Attempt to gain unauthorized access to our systems or
                third-party data
              </li>
              <li>Transmit harmful code, spam, or misleading content</li>
              <li>
                Copy, reproduce, or commercially exploit our content without
                permission
              </li>
              <li>
                Use the site in any way that could damage our reputation or that
                of our portfolio companies
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-transparent p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white pb-2 border-b border-gray-700/50 mb-4 text-red-200/90">
              3. Intellectual Property
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              All content on this website, including but not limited to text,
              logos, images, graphics, and design, is the property of Energize
              Business Group or its portfolio companies and is protected by
              applicable intellectual property laws. You may not use, reproduce,
              or distribute any content without our prior written consent. Our
              brands, including Energize and our portfolio company names, are
              trademarks of Energize Business Group or its affiliates.
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-transparent p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white pb-2 border-b border-gray-700/50 mb-4 text-red-200/90">
              4. Services & Information
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Information on this website is provided for general purposes only
              and does not constitute professional, legal, or financial advice.
              We strive to keep information accurate and up to date but do not
              warrant that all content is complete or current. Services
              described may be subject to separate agreements with our portfolio
              companies. For specific inquiries, please contact us at{" "}
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
              5. Links to Third-Party Sites
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Our website may contain links to websites of our portfolio
              companies or other third parties. We are not responsible for the
              content, privacy practices, or terms of those sites. Use of
              third-party websites is at your own risk. We encourage you to
              review their terms and privacy policies.
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-transparent p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white pb-2 border-b border-gray-700/50 mb-4 text-red-200/90">
              6. Limitation of Liability
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              To the fullest extent permitted by applicable law, Energize
              Business Group and its affiliates shall not be liable for any
              indirect, incidental, special, or consequential damages arising
              from your use of this website or reliance on its content. Our
              total liability shall not exceed the amount (if any) you have paid
              to us in connection with the use of our services in the twelve
              months preceding the claim. Nothing in these terms excludes or
              limits liability that cannot be excluded or limited under Saudi
              law.
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-transparent p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white pb-2 border-b border-gray-700/50 mb-4 text-red-200/90">
              7. Governing Law & Disputes
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              These Terms & Conditions are governed by the laws of the Kingdom
              of Saudi Arabia. Any dispute arising in connection with these
              terms or the use of our website shall be subject to the exclusive
              jurisdiction of the courts of Saudi Arabia, unless otherwise
              required by mandatory law.
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-transparent p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white pb-2 border-b border-gray-700/50 mb-4 text-red-200/90">
              8. Changes & Contact
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              We may update these Terms & Conditions from time to time. The
              &quot;Last updated&quot; date at the top indicates the latest
              version. Continued use of our website after changes constitutes
              acceptance of the updated terms. For questions about these terms
              or our services, contact us at{" "}
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
