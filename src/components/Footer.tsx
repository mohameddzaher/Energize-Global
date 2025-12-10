"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface FooterProps {
  lang: string;
}

export default function Footer({ lang }: FooterProps) {
  const router = useRouter();

  const currentYear = new Date().getFullYear();

  // البيانات مباشرة في الكومبوننت
  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Our Companies", href: "/business" },
    { name: "Insights", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const vision2030Pillars = [
    { name: "National Economy", description: "Supporting economic growth initiatives" },
    { name: "Sustainable Future", description: "Environmental and social responsibility" },
    { name: "Innovative Society", description: "Technology and digital transformation" },
    { name: "Prosperous Nation", description: "Contributing to national development" },
  ];

  const ksaAlignment = [
    { name: "Vision 2030 Partner", description: "Aligned with national goals" },
    { name: "Local Content Champion", description: "Supporting local industries" },
    { name: "Saudization Advocate", description: "Developing Saudi talent" },
    { name: "Strategic Investor", description: "Economic growth contributor" },
  ];

  return (
    <footer className="bg-black border-t border-gray-900/50">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          
          {/* Logo & Description */}
          <div className="space-y-4 md:space-y-5">
            <div className="flex justify-center md:justify-start">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/Red comma.png"
                  alt="Energize Business Group Logo"
                  width={100}
                  height={40}
                  className="object-contain w-24 md:w-32"
                />
              </Link>
            </div>
            
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed tracking-normal text-center md:text-left">
              Leading business conglomerate in Saudi Arabia & MENA since 1999.
            </p>
            
            {/* Vision 2030 Alignment */}
            <div className="pt-3 border-t border-gray-800/50">
              <h5 className="text-gray-300 text-sm font-medium mb-3 text-center md:text-left">Vision 2030 Alignment</h5>
              <div className="space-y-2">
                {ksaAlignment.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-red-800 rounded-full mt-1.5 flex-shrink-0"></div>
                    <div>
                      <div className="text-gray-300 text-xs font-medium">{item.name}</div>
                      <div className="text-gray-500 text-[10px]">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-4 md:mt-0">
            <h4 className="text-white text-base font-bold mb-4 md:mb-5 pb-2 border-b border-gray-800/50 tracking-wide text-center md:text-left">
              Quick Links
            </h4>
            <ul className="space-y-2 md:space-y-2.5">
              {navigationLinks.map((link, index) => (
                <li key={index} className="flex justify-center md:justify-start">
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-red-400 transition-colors duration-300 flex items-center gap-2 text-xs md:text-sm group"
                  >
                    <div className="w-1.5 h-1.5 bg-gray-700 rounded-full group-hover:bg-red-500 transition-all duration-300"></div>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Vision 2030 Pillars */}
          <div className="mt-4 md:mt-0">
            <h4 className="text-white text-base font-bold mb-4 md:mb-5 pb-2 border-b border-gray-800/50 tracking-wide text-center md:text-left">
              Vision 2030 Pillars
            </h4>
            <ul className="space-y-2 md:space-y-2.5">
              {vision2030Pillars.map((pillar, index) => (
                <li key={index} className="text-center md:text-left">
                  <div className="flex items-start gap-2 p-2 md:p-0">
                    <div className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></div>
                    <div className="mt-0 md:mt-0">
                      <div className="text-gray-300 text-xs md:text-sm font-medium">{pillar.name}</div>
                      <div className="text-gray-500 text-[10px] md:text-xs mt-0.5">{pillar.description}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="mt-4 md:mt-0">
            <h4 className="text-white text-base font-bold mb-4 md:mb-5 pb-2 border-b border-gray-800/50 tracking-wide text-center md:text-left">
              Get In Touch
            </h4>
            <div className="space-y-3 md:space-y-4">
              <div>
                <p className="text-gray-500 text-xs mb-1 tracking-wide text-center md:text-left">EMAIL</p>
                <a 
                  href="mailto:Info@energize-sa.com" 
                  className="text-white hover:text-red-400 transition-colors text-xs md:text-sm flex items-center gap-2 group justify-center md:justify-start"
                >
                  <span className="text-gray-500 group-hover:text-red-400 hidden md:inline">✉</span>
                  <span>Info@energize-sa.com</span>
                </a>
              </div>
              
              <div>
                <p className="text-gray-500 text-xs mb-1 tracking-wide text-center md:text-left">PHONE</p>
                <a 
                  href="tel:0126825858" 
                  className="text-white hover:text-red-400 transition-colors text-xs md:text-sm flex items-center gap-2 group justify-center md:justify-start"
                >
                  <span className="text-gray-500 group-hover:text-red-400 hidden md:inline">📞</span>
                  <span>0126825858</span>
                </a>
              </div>
              
              <div>
                <p className="text-gray-500 text-xs mb-1 tracking-wide text-center md:text-left">HEADQUARTERS</p>
                <p className="text-white text-xs md:text-sm flex items-center gap-2 justify-center md:justify-start">
                  <span className="text-gray-500 hidden md:inline">📍</span>
                  <span>Jeddah, Saudi Arabia</span>
                </p>
              </div>

              {/* Subscription */}
              <div className="pt-3">
                <p className="text-gray-500 text-xs mb-2 tracking-wide text-center md:text-left">STAY UPDATED</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 bg-gray-900/50 border border-gray-800 rounded-lg text-white text-xs md:text-sm placeholder-gray-500 focus:outline-none focus:border-red-500/50 text-center md:text-left"
                  />
                  <button className="px-3 py-2 bg-gradient-to-r from-red-950 to-red-900 text-white text-xs md:text-sm rounded-lg hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
                <p className="text-gray-500 text-[10px] mt-2 text-center md:text-left">
                  Receive latest insights and updates
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gradient-to-r from-gray-900/50 to-black/50 border-t border-gray-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 md:py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-gray-500 text-xs text-center md:text-left tracking-wide order-2 md:order-1">
              © {currentYear} Energize Business Group. All rights reserved.
            </div>
            
            {/* Legal Links */}
            <div className="flex items-center gap-3 md:gap-5 order-1 md:order-2 mb-2 md:mb-0">
              <Link 
                href="/privacy" 
                className="text-gray-400 hover:text-white text-xs transition-colors tracking-wide"
              >
                Privacy Policy
              </Link>
              <div className="text-gray-600">|</div>
              <Link 
                href="/terms" 
                className="text-gray-400 hover:text-white text-xs transition-colors tracking-wide"
              >
                Terms & Conditions
              </Link>
            </div>

            {/* Back to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1.5 text-gray-400 hover:text-red-400 transition-colors text-xs tracking-wide group order-3"
            >
              <span>Back to Top</span>
              <span className="transform group-hover:-translate-y-0.5 transition-transform hidden sm:inline">
                ↑
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}