"use client";

import { useState, useEffect, useRef } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  delay: number;
}

export default function Hero({ t }: any) {
  const heroData = t || {};
  const title = heroData.title || "Energize Business Group";
  const description =
    heroData.description ||
    "Comprehensive Solutions in Marketing, Event Management, Logistics, and Manufacturing Since 1999";
  const cta1 = heroData.cta1 || "Explore Our Companies";
  const cta2 = heroData.cta2 || "Contact Us";

  // Split title safely
  const titleWords = title.split(" ");
  const firstWord = titleWords[0] || "Energize";
  const remainingWords = titleWords.slice(1).join(" ") || "Business Group";

  // Refs for animation
  const containerRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<Star[]>([]);

  // Initialize stars on mount
  useEffect(() => {
    const generateStars = () => {
      const starCount = 40;
      const newStars: Star[] = [];

      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.3 + 0.1,
          speed: Math.random() * 0.5 + 0.2,
          delay: Math.random() * 2000,
        });
      }

      setStars(newStars);
    };

    generateStars();
  }, []);

  // Function for companies scroll
  const scrollToCompanies = (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById("companies");

    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });
      window.history.pushState(null, "", "/#companies");
    }
  };

  // Function for contact scroll
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById("contact");

    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });
      window.history.pushState(null, "", "/#contact");
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-6"
    >
      {/* Main Background with Depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-gray-900">
        {/* Animated Nebula Effect */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-red-600/15 via-red-100/10 to-transparent rounded-full blur-3xl animate-pulse-slow opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-amber-500/12 via-blue-500/8 to-transparent rounded-full blur-3xl animate-pulse-slower opacity-30"></div>
        </div>

        {/* Dynamic Particle System */}
        <div className="absolute inset-0">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-gradient-to-r from-white to-gray-300"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                animation: `twinkle ${3 + star.speed}s ease-in-out ${
                  star.delay
                }ms infinite alternate`,
              }}
            ></div>
          ))}
        </div>

        {/* Geometric Web Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        {/* Holographic Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-15"></div>

        {/* Floating Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gradient-to-br from-red-500/30 to-red-300/15 rounded-full blur-sm animate-float-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-gradient-to-br from-amber-500/20 to-amber-300/15 rounded-full blur-sm animate-float-slower animation-delay-500"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-gradient-to-br from-blue-500/20 to-cyan-300/15 rounded-full blur-sm animate-float-medium animation-delay-700"></div>
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-gradient-to-br from-purple-500/25 to-pink-300/15 rounded-full blur-sm animate-float-slow animation-delay-300"></div>
      </div>

      {/* Background Image Layer */}
      <div className="absolute inset-0 opacity-5 mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-gradient-to-r from-black/50 to-gray-900/50 backdrop-blur-sm rounded-full border border-gray-800/40 group hover:border-red-500/40 transition-all duration-300">
            <div className="relative">
              <div className="w-1.5 h-1.5 bg-gradient-to-r from-red-900 via-red-500 to-red-300 rounded-full animate-pulse"></div>
            </div>
            <span className="text-[10px] text-gray-300 font-medium tracking-wider group-hover:text-red-300 transition-colors duration-300">
              Since 1999 • Jeddah, Saudi Arabia
            </span>
          </div>

          {/* Main Headline */}
          <div className="relative mb-6 mt-4">
            <div className="absolute -inset-x-10 -inset-y-5 bg-gradient-to-r from-red-600/10 via-purple-600/5 to-amber-600/10 blur-2xl opacity-20 rounded-full"></div>

            <h1 className="relative text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
              <span className="block text-white leading-tight mb-1">
                {firstWord}
              </span>
              <span className="block">
                <span className="bg-gradient-to-r from-gray-200 via-red-900 to-gray-200 bg-clip-text text-transparent animate-gradient">
                  {remainingWords}
                </span>
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="max-w-lg mx-auto mb-6">
            <p className="text-sm md:text-base text-gray-300 leading-relaxed font-light">
              {description}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 justify-center items-center mb-8">
            {/* Primary CTA */}
            <a
              href="/#companies"
              onClick={scrollToCompanies}
              className="group relative px-5 py-3 bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-lg border border-gray-800 hover:border-red-500 transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 via-red-500/25 to-amber-600/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative flex items-center gap-1.5">
                <span className="text-xs font-medium text-white tracking-wide group-hover:text-red-100 transition-colors duration-300">
                  {cta1}
                </span>
                <svg
                  className="w-3.5 h-3.5 text-red-400 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </a>

            {/* Secondary CTA */}
            <a
              href="/#contact"
              onClick={scrollToContact}
              className="group px-5 py-2.5 bg-gradient-to-r from-red-600/10 to-amber-600/5 backdrop-blur-sm rounded-lg border border-red-500/30 hover:border-red-400 hover:bg-gradient-to-r hover:from-red-600/15 hover:to-amber-600/10 transition-all duration-300 cursor-pointer"
            >
              <span className="text-xs font-medium text-red-300 tracking-wide group-hover:text-red-200 transition-colors duration-300">
                {cta2}
              </span>
            </a>
          </div>

          {/* Industry Pillars */}
          <div className="max-w-xl mx-auto">
            <div className="flex flex-wrap justify-center gap-1.5">
              {[
                {
                  label: "Marketing",
                  icon: (
                    <svg className="w-2.5 h-2.5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  ),
                },
                {
                  label: "Events",
                  icon: (
                    <svg className="w-2.5 h-2.5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  ),
                },
                {
                  label: "Logistics",
                  icon: (
                    <svg className="w-2.5 h-2.5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h4v1a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H20a1 1 0 001-1v-4a1 1 0 00-1-1h-1V5a1 1 0 00-1-1h-1V3a1 1 0 00-1-1H8a1 1 0 00-1 1v1H5a1 1 0 00-1 1v1H3zm11 3v2h2V7h-2zm-2 0H8v2h4V7z" />
                    </svg>
                  ),
                },
                {
                  label: "Design",
                  icon: (
                    <svg className="w-2.5 h-2.5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  ),
                },
                {
                  label: "Manufacturing",
                  icon: (
                    <svg className="w-2.5 h-2.5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.5a1 1 0 01-1 1h-1a1 1 0 010-2h.5V3a1 1 0 011-1zm7 0a1 1 0 011 1v2.5a1 1 0 01-1 1h-1a1 1 0 010-2h.5V3a1 1 0 011-1zm4 0a1 1 0 011 1v2.5a1 1 0 01-1 1h-1a1 1 0 010-2h.5V3a1 1 0 011-1zM2 8a1 1 0 011-1h14a1 1 0 011 1v5a1 1 0 01-1 1h-1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3H2a1 1 0 01-1-1V8zm2 6v4h12v-4H4zm12-1V9H4v4h12z" clipRule="evenodd" />
                    </svg>
                  ),
                },
                {
                  label: "Consulting",
                  icon: (
                    <svg className="w-2.5 h-2.5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                    </svg>
                  ),
                },
              ].map((pillar, index) => (
                <div
                  key={index}
                  className="group relative px-2.5 py-1.5 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-lg border border-gray-800/40 hover:border-red-500/50 transition-all duration-300 flex items-center gap-1.5"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-amber-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    {pillar.icon}
                  </div>
                  <span className="text-[10px] text-gray-300 font-medium tracking-wide group-hover:text-red-200 transition-colors duration-300">
                    {pillar.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="/#companies"
        onClick={(e) => scrollToCompanies(e)}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 focus:outline-none group"
        aria-label="Scroll to companies section"
      >
        <div className="w-4 h-6 border border-red-800 rounded-full flex justify-center group-hover:border-red-500/50 transition-all duration-300">
          <div className="w-1 h-2 bg-gradient-to-b from-red-400 to-transparent rounded-full mt-2 group-hover:from-red-400 group-hover:to-transparent transition-all duration-300 animate-bounce"></div>
        </div>
      </a>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-8px) translateX(8px);
          }
          66% {
            transform: translateY(6px) translateX(-6px);
          }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        @keyframes float-medium {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-6px) translateX(6px);
          }
          66% {
            transform: translateY(4px) translateX(-4px);
          }
        }
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }

        @keyframes float-slower {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-4px) translateX(4px);
          }
          66% {
            transform: translateY(3px) translateX(-3px);
          }
        }
        .animate-float-slower {
          animation: float-slower 10s ease-in-out infinite;
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        @keyframes pulse-slower {
          0%,
          100% {
            opacity: 0.15;
          }
          50% {
            opacity: 0.3;
          }
        }
        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite;
        }

        .animation-delay-300 {
          animation-delay: 300ms;
        }
        .animation-delay-500 {
          animation-delay: 500ms;
        }
        .animation-delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </section>
  );
}