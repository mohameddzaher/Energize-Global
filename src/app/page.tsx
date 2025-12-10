

import { languages, Lang } from "./i18n";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import CompanyCard from "../components/CompanyCard";
import Stats from "../components/Stats";
import Values from "../components/Values";
import Founder from "../components/Founder";
import ContactCTA from "../components/ContactCTA";
import Footer from "../components/Footer";
import Blog from "../components/Blog";
import Contact from "../components/Contact";

import Newsletter from "../components/Newsletter";
import LocationMap from "../components/LocationMap";


import { companies } from "../data/companies";

// Helper to merge translations safely
function getMergedTranslations(lang: Lang) {
  const base = languages.en;
  const current = languages[lang] || {};
  
  // Deep merge function
  const deepMerge = (target: any, source: any) => {
    const result = { ...target };
    
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = deepMerge(target[key] || {}, source[key]);
      } else {
        result[key] = source[key] !== undefined ? source[key] : target[key];
      }
    }
    
    return result;
  };
  
  return deepMerge(base, current);
}

export default function Home({ searchParams }: any) {
  // Force English language
  const lang: Lang = "en";
  
  // Get merged translations
  const t = getMergedTranslations(lang);
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900">
      {/* Professional Gradient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black"></div>
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-red-500/5 via-transparent to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-amber-500/3 via-transparent to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-gray-900/20 to-black/30 rounded-full blur-3xl"></div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20"></div>
      </div>
      
      <div className="relative z-10">
        <Header lang={lang} />
        <Hero />
        <About />
        <Stats />
        
        {/* Portfolio Companies Section */}
        <section id="companies" className="py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-900/20 to-black">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent"></div>
                <span className="text-red-400 text-sm font-semibold uppercase tracking-wider">
                  {t.companies?.portfolioTag || "Our Portfolio"}
                </span>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
                {t.companies?.title || "Our Companies"}
              </h2>
              <p className="text-gray-400 text-base max-w-2xl mx-auto leading-relaxed">
                {t.companies?.description || "Strategic brands and business units under our management"}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company, index) => (
                <CompanyCard
                  key={company.name}
                  name={company.name}
                  logo={company.logo}
                  url={company.url}
                  description={company.description}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
        
        <Values t={t.values} />
        <Founder t={t.founder} />
        <ContactCTA t={t.contact} />
        <Contact />
        <LocationMap />
        <Blog/>
      <Newsletter />
        
        <Footer lang={lang} />
      </div>
    </main>
  );
}