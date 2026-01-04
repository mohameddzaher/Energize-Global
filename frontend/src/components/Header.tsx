"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  lang: string;
}

export default function Header({ lang = "en" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMeetingRoomPage, setIsMeetingRoomPage] = useState(false);

  const navItems = [
    { id: "hero", name: "Home", href: "#hero" },
    { id: "about", name: "About Us", href: "#about" },
    { id: "achievements", name: "Insights", href: "#achievements" },
    { id: "companies", name: "Our Companies", href: "#companies" },
    { id: "contact", name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    // Check if we're on a meeting room system page
    const path = window.location.pathname;
    const meetingRoomPages = ['/meeting-room', '/display', '/my-bookings', '/admin-dashboard', '/user-management', '/analytics'];
    const isOnMeetingRoomPage = meetingRoomPages.some(page => path.startsWith(page));
    setIsMeetingRoomPage(isOnMeetingRoomPage);
    
    // If on meeting room page, don't set active section to hero
    if (isOnMeetingRoomPage) {
      setActiveSection("");
    }

    const handleScroll = () => {
      // Only handle scroll for home page
      if (window.location.pathname === '/' && !isOnMeetingRoomPage) {
        let current = "hero";
        navItems.forEach((item) => {
          const el = document.getElementById(item.id);
          if (el) {
            const offsetTop = el.offsetTop - 100;
            if (scrollY >= offsetTop) current = item.id;
          }
        });
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    if (window.location.pathname === '/' && !isOnMeetingRoomPage) {
      handleScroll();
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    // لو ضغط على Home ومش في الصفحة الرئيسية
    if (id === "hero" && window.location.pathname !== "/") {
      window.location.href = "/";
      return;
    }

    setActiveSection(id);

    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 bg-gradient-to-r from-gray-900 to-gray shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/Red comma.png"
                alt="Energize Business Group Logo"
                width={140}
                height={40}
                className="object-contain transition-all duration-300"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-0">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm cursor-pointer ${
                  activeSection === item.id && !isMeetingRoomPage
                    ? "text-red-400 font-bold text-base bg-white/10 px-4 py-2 rounded-lg"
                    : "text-gray-300 hover:text-white font-medium hover:bg-white/5 px-4 py-2 rounded-lg"
                }`}
              >
                {item.name}
              </a>
            ))}
            <Link
              href="/meeting-room"
              className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm cursor-pointer font-medium flex items-center gap-2 ${
                isMeetingRoomPage
                  ? "text-red-400 font-bold text-base bg-white/10 px-4 py-2 rounded-lg"
                  : "text-gray-300 hover:text-white hover:bg-white/5 px-4 py-2 rounded-lg"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Meeting Room
            </Link>
          </nav>

          {/* Right Section - Contact Button + Mobile */}
          <div className="flex items-center space-x-2">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact")}
              className={`px-4 py-1.5 md:px-5 md:py-2 font-medium text-xs md:text-sm rounded-lg transition-all duration-300 cursor-pointer ${
                activeSection === "contact"
                  ? "bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold hover:shadow-lg"
                  : "bg-gradient-to-r from-red-700 to-red-900 text-white hover:shadow-lg hover:shadow-red-500/20"
              }`}
            >
              Contact
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-1.5 md:p-2 rounded-lg transition-colors text-gray-300 hover:text-white hover:bg-white/10`}
              aria-label="Toggle menu"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={`lg:hidden rounded-lg md:rounded-xl mt-2 p-3 md:p-4 transition-all duration-300 bg-gray-900/95 backdrop-blur-xl border border-gray-800`}
          >
            <div className="flex flex-col space-y-1 md:space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`px-3 py-2 md:px-4 md:py-3 rounded-lg transition-all duration-200 font-medium text-sm md:text-base text-center ${
                    activeSection === item.id && !isMeetingRoomPage
                      ? "text-red-400 font-bold bg-white/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </a>
              ))}

              <Link
                href="/meeting-room"
                className={`px-3 py-2 md:px-4 md:py-3 rounded-lg transition-all duration-200 font-medium text-sm md:text-base text-center flex items-center justify-center gap-2 ${
                  isMeetingRoomPage
                    ? "text-red-400 font-bold bg-white/10"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Meeting Room
              </Link>
              <div
                className={`pt-3 md:pt-4 mt-3 md:mt-4 border-t border-gray-800`}
              >
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "contact")}
                  className={`w-full py-2 md:py-3 font-medium text-sm md:text-base rounded-lg hover:shadow-lg transition-all duration-300 text-center block ${
                    activeSection === "contact"
                      ? "bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold"
                      : "bg-gradient-to-r from-red-700 to-red-900 text-white"
                  }`}
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}