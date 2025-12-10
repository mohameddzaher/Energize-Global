// About.tsx
export default function About({ t }: any) {
  const aboutData = t || {};

  return (
    <section
      id="about"
      className="py-12 px-4 sm:px-6 bg-gradient-to-b from-black via-gray-950/50 to-black relative overflow-hidden"
    >
      {/* redge Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/3 via-transparent to-amber-500/2"></div>
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-10"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-red-500/70 to-transparent"></div>
            <span className="text-redge-400 text-[11px] font-semibold uppercase tracking-wider">
              About Us
            </span>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-red-500/70 to-transparent"></div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
            {aboutData.title || "About Us"}
          </h2>
          <p className="text-gray-300 text-sm max-w-xl mx-auto leading-relaxed">
            Pioneering business solutions in Saudi Arabia and the MENA region
            since 1999
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* Core Values */}
          <div className="space-y-5">
            {/* Vision Card */}
            <div className="group relative p-5 bg-gradient-to-br from-gray-900/40 to-black/30 rounded-lg border border-gray-800/40 hover:border-red-500/50 transition-all duration-300">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-redge-500/10 via-red-500/20 to-amber-500/10 rounded-lg blur opacity-0 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-md bg-gradient-to-br from-redge-500/15 to-amber-500/10 flex items-center justify-center border border-red-500/25">
                    <svg className="w-4 h-4 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {aboutData.visionTitle || "Our Vision"}
                  </h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-xs tracking-normal">
                  {aboutData.visionText ||
                    "We aspire to be the main driver for growth and prosperity in the MENA region, creating sustainable value for our clients and communities through innovative business solutions."}
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="group relative p-5 bg-gradient-to-br from-gray-900/40 to-black/30 rounded-lg border border-gray-800/40 hover:border-red-500/50 transition-all duration-300">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/10 via-red-500/20 to-red-500/10 rounded-lg blur opacity-0 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-md bg-gradient-to-br from-amber-500/15 to-red-500/10 flex items-center justify-center border border-amber-500/25">
                    <svg 
                      className="w-4 h-4 text-red-400" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {aboutData.missionTitle || "Our Mission"}
                  </h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-xs tracking-normal">
                  {aboutData.missionText ||
                    "To empower businesses across Saudi Arabia and the MENA region with comprehensive, innovative solutions that drive growth, efficiency, and competitive advantage in an ever-evolving market landscape."}
                </p>
              </div>
            </div>
          </div>

          {/* Our Differentiators */}
          <div className="relative">
            <div className="p-5 bg-gradient-to-br from-gray-900/40 to-black/30 rounded-lg border border-gray-800/40 group transition-all duration-300">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/5 via-transparent to-amber-500/5 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-md bg-gradient-to-br from-gray-800 to-black flex items-center justify-center border border-gray-700/50">
                    <svg 
                      className="w-4 h-4 text-red-400" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    What Sets Us Apart
                  </h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-xs mb-5 tracking-normal">
                  Distinctive advantages that make Energize Business Group your trusted partner
                </p>

                {/* Differentiators Grid */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-3 p-3 bg-gradient-to-br from-gray-900/40 to-black/30 rounded-md border border-gray-800/30 hover:border-red-500/30 transition-all duration-300">
                    <div className="w-6 h-6 rounded bg-gradient-to-br from-red-900/20 to-black/50 flex items-center justify-center border border-red-500/20 flex-shrink-0">
                      <svg className="w-3 h-3 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-white mb-0.5">
                        End-to-End Solutions
                      </div>
                      <div className="text-[10px] text-gray-400 leading-relaxed">
                        From strategy to execution, we provide comprehensive services across all business functions.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gradient-to-br from-gray-900/40 to-black/30 rounded-md border border-gray-800/30 hover:border-red-500/30 transition-all duration-300">
                    <div className="w-6 h-6 rounded bg-gradient-to-br from-red-900/20 to-black/50 flex items-center justify-center border border-red-500/20 flex-shrink-0">
                      <svg className="w-3 h-3 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13 7H7v6h6V7z" />
                        <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-white mb-0.5">
                        Integrated Ecosystem
                      </div>
                      <div className="text-[10px] text-gray-400 leading-relaxed">
                        Our portfolio companies work synergistically to deliver seamless, coordinated results.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gradient-to-br from-gray-900/40 to-black/30 rounded-md border border-gray-800/30 hover:border-red-500/30 transition-all duration-300">
                    <div className="w-6 h-6 rounded bg-gradient-to-br from-red-900/20 to-black/50 flex items-center justify-center border border-red-500/20 flex-shrink-0">
                      <svg className="w-3 h-3 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-white mb-0.5">
                        Deep Local Expertise
                      </div>
                      <div className="text-[10px] text-gray-400 leading-relaxed">
                        24+ years of in-depth knowledge of Saudi and MENA market dynamics and regulations.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gradient-to-br from-gray-900/40 to-black/30 rounded-md border border-gray-800/30 hover:border-red-500/30 transition-all duration-300">
                    <div className="w-6 h-6 rounded bg-gradient-to-br from-red-900/20 to-black/50 flex items-center justify-center border border-red-500/20 flex-shrink-0">
                      <svg className="w-3 h-3 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-white mb-0.5">
                        Agile Innovation
                      </div>
                      <div className="text-[10px] text-gray-400 leading-relaxed">
                        Continuously adapting and innovating to stay ahead of market trends and technologies.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Founding Year Highlight */}
                <div className="pt-3 border-t border-gray-800/30">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-3 h-3 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.707.293l4 4a1 1 0 01-1.414 1.414L14 5.414V11a1 1 0 11-2 0V5.414l-1.293 1.293a1 1 0 01-1.414-1.414l4-4A1 1 0 0112 2z" clipRule="evenodd" />
                    </svg>
                    <div className="text-[10px] text-gray-400">
                      <span className="font-bold text-red-300">Founded in 1999</span> • Pioneering business excellence for over two decades
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* redge Accent */}
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-redge-500/10 to-amber-500/5 rounded-full blur-md"></div>
          </div>
        </div>
      </div>
    </section>
  );
}