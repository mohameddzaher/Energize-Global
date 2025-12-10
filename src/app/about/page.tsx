import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Values from '@/components/Values';
import Stats from '@/components/Stats';
import Founder from '@/components/Founder';
import Newsletter from '@/components/Newsletter';

export default function AboutPage() {
  // البيانات الأساسية للصفحة فقط
  const pageData = {
    title: "About Us",
    description: "Pioneering business solutions in Saudi Arabia and the MENA region since 1999",
    visionTitle: "Our Vision",
    visionText: "To be the primary catalyst for growth and prosperity of our partners and companies across Saudi Arabia and the Middle East through innovative marketing solutions, impactful events, and integrated logistics and industrial services.",
    missionTitle: "Our Mission",
    missionText: "To deliver exceptional value as the leading provider of innovative marketing solutions, brand experiences, event management, logistics, and industrial services in Saudi Arabia and the Middle East.",
    storyTitle: "Our Journey",
    storyText: "Since our establishment in 1999, Energize Group has been at the forefront of delivering comprehensive business solutions. We focus on maximizing ROI, enhancing economic growth, and empowering clients with innovative strategies aligned with Vision 2030.",
    stats: {
      years: "24+ Years",
      projects: "500+ Projects",
      companies: "50+ Companies",
      countries: "3+ Countries"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
      <Header lang="en" />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 px-4 sm:px-6 bg-gradient-to-b from-black via-red-950/10 to-black">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-gradient-to-r from-transparent via-red-500/70 to-transparent"></div>
              <span className="text-red-400 text-xs font-semibold uppercase tracking-wider">About Our Group</span>
              <div className="w-8 h-px bg-gradient-to-r from-transparent via-red-500/70 to-transparent"></div>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
              {pageData.title}
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
              {pageData.description}
            </p>
            
            {/* Stats Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {Object.entries(pageData.stats).map(([key, value]: [string, any]) => (
                <div key={key} className="text-center p-4 bg-gradient-to-br from-gray-900/40 to-black/30 rounded-xl border border-gray-800/40">
                  <div className="text-2xl md:text-3xl font-bold text-red-400 mb-1">
                    {value.split(' ')[0]}
                  </div>
                  <div className="text-gray-300 text-sm">
                    {value.split(' ').slice(1).join(' ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-12 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="p-6 bg-gradient-to-br from-gray-900/50 to-black/40 rounded-xl border border-gray-800/50 hover:border-red-500/30 transition-all duration-300">
              <div className="text-red-400 text-sm font-semibold uppercase tracking-wider mb-3">
                {pageData.visionTitle}
              </div>
              <p className="text-gray-300 leading-relaxed">
                {pageData.visionText}
              </p>
            </div>
            
            {/* Mission */}
            <div className="p-6 bg-gradient-to-br from-gray-900/50 to-black/40 rounded-xl border border-gray-800/50 hover:border-red-500/30 transition-all duration-300">
              <div className="text-red-400 text-sm font-semibold uppercase tracking-wider mb-3">
                {pageData.missionTitle}
              </div>
              <p className="text-gray-300 leading-relaxed">
                {pageData.missionText}
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-12 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {pageData.storyTitle}
              </h2>
            </div>
            
            <div className="p-6 md:p-8 bg-gradient-to-br from-gray-900/40 to-black/30 rounded-xl border border-gray-800/40">
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {pageData.storyText}
              </p>
              
              <div className="mt-8 p-4 bg-gradient-to-r from-red-500/10 to-amber-500/5 rounded-lg border border-red-500/20">
                <p className="text-gray-300 text-sm italic">
                  "We believe in building lasting partnerships that drive mutual growth and contribute to the prosperity of our region."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <Values />
        
        {/* Stats Section */}
        <Stats />
        
        {/* Founder Section */}
        <Founder />
        
        {/* Newsletter */}
        <Newsletter />
      </main>
      
      <Footer lang="en" />
    </div>
  );
}