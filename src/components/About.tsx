// About.tsx
export default function About({ t }: any) {
  const aboutData = t || {};
  const stats = aboutData.stats || {
    years: "24+ Years",
    projects: "500+ Projects",
    companies: "50+ Companies",
    countries: "3+ Countries",
  };

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
          {/* Vision & Mission Cards */}
          <div className="space-y-5">
            {/* Vision Card */}
            <div className="group relative p-5 bg-gradient-to-br from-gray-900/40 to-black/30 rounded-lg border border-gray-800/40 hover:border-red-500/50 transition-all duration-300">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-redge-500/10 via-red-500/20 to-amber-500/10 rounded-lg blur opacity-0 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-md bg-gradient-to-br from-redge-500/15 to-amber-500/10 flex items-center justify-center border border-red-500/25">
                    {/* Vision Icon - Eye Droplet (رمزية للرؤية) */}
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
                    "We aspire to be the main driver for growth and prosperity..."}
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="group relative p-5 bg-gradient-to-br from-gray-900/40 to-black/30 rounded-lg border border-gray-800/40 hover:border-red-500/50 transition-all duration-300">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/10 via-red-500/20 to-red-500/10 rounded-lg blur opacity-0 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-md bg-gradient-to-br from-amber-500/15 to-red-500/10 flex items-center justify-center border border-amber-500/25">
                    {/* Mission Icon - Target */}
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
                    "To be the leading provider of innovative business solutions..."}
                </p>
              </div>
            </div>
          </div>

          {/* Story Card */}
          <div className="relative">
            <div className="p-5 bg-gradient-to-br from-gray-900/40 to-black/30 rounded-lg border border-gray-800/40 group hover:border-red-500/50 transition-all duration-300">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/5 via-transparent to-amber-500/5 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-md bg-gradient-to-br from-gray-800 to-black flex items-center justify-center border border-gray-700/50">
                    {/* Story Icon - Document Text */}
                    <svg 
                      className="w-4 h-4 text-red-400" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {aboutData.storyTitle || "Our Journey"}
                  </h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-xs mb-5 tracking-normal">
                  {aboutData.storyText ||
                    "Since our establishment in 1999, we have been delivering comprehensive solutions..."}
                </p>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(stats).map(([key, value]) => (
                    <div
                      key={key}
                      className="p-3 bg-gradient-to-br from-gray-900/50 to-black/40 rounded-md border border-gray-800/30 hover:border-red-500/40 transition-colors group/stat"
                    >
                      <div className="text-lg font-bold text-white mb-1 group-hover/stat:text-red-300 transition-colors">
                        {String(value)}
                      </div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </div>
                    </div>
                  ))}
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