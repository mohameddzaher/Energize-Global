import Link from "next/link";
import { notFound } from "next/navigation";

const COMPANY_MAP: Record<
  string,
  { name: string; tagline: string; sector: string }
> = {
  "al-dewan": {
    name: "Al Dewan",
    tagline: "Cultural and governmental advisory services",
    sector: "Consulting",
  },
  "energize-agency": {
    name: "Energize Agency",
    tagline: "Creative branding and advertising agency",
    sector: "Advertising",
  },
  "kit-factory": {
    name: "Kit Factory",
    tagline: "Modular construction and building systems",
    sector: "Construction",
  },
};

type PageProps = {
  params: { company: string };
};

export function generateMetadata({ params }: PageProps) {
  const company = COMPANY_MAP[params.company];
  if (!company) {
    return { title: "Under Construction" };
  }
  return {
    title: `${company.name} | Under Construction`,
    description: `A new premium experience for ${company.name} is in progress.`,
  };
}

export function generateStaticParams() {
  return Object.keys(COMPANY_MAP).map((company) => ({ company }));
}

export default function UnderConstructionPage({ params }: PageProps) {
  const company = COMPANY_MAP[params.company];

  if (!company) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black"></div>
        <div className="absolute -top-40 -right-40 w-[520px] h-[520px] bg-gradient-to-br from-red-500/10 via-transparent to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-[520px] h-[520px] bg-gradient-to-tr from-amber-500/10 via-transparent to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-[420px] h-[420px] bg-gradient-to-br from-gray-900/30 to-black/40 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20"></div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-red-500/30 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-red-300/90">
          Energize Global
          <span className="h-1.5 w-1.5 rounded-full bg-red-400"></span>
          Portfolio Company
        </div>

        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.4em] text-amber-200/80">
          {company.sector}
        </p>
        <h1 className="text-4xl font-semibold text-white sm:text-5xl">
          {company.name}
        </h1>
        <p className="mt-3 text-lg text-gray-300">{company.tagline}</p>

        <div className="mt-10 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent px-8 py-7 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
          <p className="text-2xl font-semibold text-white">
            Under Construction
          </p>
          <p className="mt-3 max-w-2xl text-sm text-gray-300">
            We&apos;re crafting a premium digital experience that matches the
            quality of our portfolio. Launching soon.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Back to Home
          </Link>
          <Link
            href="/#companies"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 transition hover:-translate-y-0.5 hover:border-red-400/60 hover:text-red-200"
          >
            Explore Our Companies
          </Link>
        </div>
      </div>
    </main>
  );
}
