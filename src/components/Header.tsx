"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface HeaderProps {
  lang: string;
}

export default function Header({ lang }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPastHeroImage, setIsPastHeroImage] = useState(false);
  const pathname = usePathname();

  // Check if past hero image (not entire hero section)
  useEffect(() => {
    const handleScroll = () => {
      // Get viewport height
      const viewportHeight = window.innerHeight;

      // Check if we've scrolled past 70% of viewport (where hero image typically ends)
      const scrollThreshold = viewportHeight * 0.7;
      setIsPastHeroImage(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get current section from URL hash or pathname
  const getCurrentSection = () => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash === "#about") return "about";
      if (hash === "#companies") return "business";
      if (hash === "#achievements") return "achievements";
      if (hash === "#contact") return "contact";
    }
    if (pathname === "/") return "home";
    return "home";
  };

  const currentSection = getCurrentSection();

  // Navigation items
  const navItems = [
    {
      id: "home",
      name: "Home",
      href: "/",
      sectionId: "home",
    },
    {
      id: "about",
      name: "About Us",
      href: "/#about",
      sectionId: "about",
    },
    {
      id: "achievements",
      name: "Insights",
      href: "/#achievements",
      sectionId: "achievements",
    },
    {
      id: "business",
      name: "Our Companies",
      href: "/#companies",
      sectionId: "business",
    },
    {
      id: "contact",
      name: "Contact",
      href: "/#contact",
      sectionId: "contact",
    },
  ];

  // Handle smooth scroll to section
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (href.startsWith("/#")) {
      const sectionId = href.split("#")[1];
      const section = document.getElementById(sectionId);

      if (section) {
        window.scrollTo({
          top: section.offsetTop - 80,
          behavior: "smooth",
        });
        window.history.pushState(null, "", href);
      } else if (href === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", "/");
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", href);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isPastHeroImage
          ? "bg-white shadow-sm"
          : "bg-transparent-lg backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <div className="flex items-center">
            {/* <Link
              href="/"
              className="flex items-center"
              onClick={(e) => handleNavClick(e, "/")}
            >
              <Image
                src="/images/Red comma.png"
                alt="Company Logo"
                width={100}
                height={40}
                className={`object-contain transition-all duration-300 ${
                  isPastHeroImage ? "invert" : ""
                }`}
              />
            </Link> */}

            <Link 
  href="/" 
  className="flex items-center"
  onClick={(e) => handleNavClick(e, '/')}
>
  {isPastHeroImage ? (
    // ✅ الصورة السوداء/الملونة بعد التمرير
    <Image
      src="/images/logo.png"
      alt="Company Logo"
      width={120}
      height={40}
      className="object-contain transition-all duration-300"
    />
  ) : (
    // ✅ الصورة الحمراء قبل التمرير
    <Image
      src="/images/Red comma.png"
      alt="Company Logo"
      width={100}
      height={40}
      className="object-contain transition-all duration-300"
    />
  )}
</Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-0">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm cursor-pointer ${
                  currentSection === item.id
                    ? isPastHeroImage
                      ? "text-red-600 font-bold text-base"
                      : "text-red-400 font-bold text-base"
                    : isPastHeroImage
                    ? "text-gray-800 hover:text-red-600 font-medium"
                    : "text-gray-200 hover:text-white font-medium"
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Right Section - Contact Button */}
          <div className="flex items-center space-x-2">
            {/* Contact Button */}
            <a
              href="/#contact"
              onClick={(e) => handleNavClick(e, "/#contact")}
              className={`px-4 py-1.5 md:px-5 md:py-2 font-medium text-xs md:text-sm rounded-lg transition-all duration-300 cursor-pointer ${
                isPastHeroImage
                  ? currentSection === "contact"
                    ? "bg-gradient-to-r from-red-700 to-red-900 text-white font-bold hover:shadow-lg"
                    : "bg-gradient-to-r from-red-950 to-red-900 text-white hover:shadow-lg hover:shadow-red-500/20"
                  : currentSection === "contact"
                  ? "bg-gradient-to-r from-red-700 to-red-900 text-white font-bold hover:shadow-lg"
                  : "bg-gradient-to-r from-red-950 to-red-900 text-white hover:shadow-lg hover:shadow-red-500/20"
              }`}
            >
              Contact
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-1.5 md:p-2 rounded-lg transition-colors ${
                isPastHeroImage
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-gray-200 hover:text-white"
              }`}
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
            className={`lg:hidden rounded-lg md:rounded-xl mt-2 p-3 md:p-4 transition-all duration-300 ${
              isPastHeroImage
                ? "bg-white shadow-lg"
                : "bg-gray-900/95 backdrop-blur-xl border border-gray-800"
            }`}
          >
            <div className="flex flex-col space-y-1 md:space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3 py-2 md:px-4 md:py-3 rounded-lg transition-all duration-200 font-medium text-sm md:text-base text-center ${
                    currentSection === item.id
                      ? isPastHeroImage
                        ? "text-red-600 font-bold"
                        : "text-red-400 font-bold"
                      : isPastHeroImage
                      ? "text-gray-800 hover:text-red-600"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.name}
                </a>
              ))}

              <div
                className={`pt-3 md:pt-4 mt-3 md:mt-4 ${
                  isPastHeroImage
                    ? "border-t border-gray-200"
                    : "border-t border-gray-800"
                }`}
              >
                <a
                  href="/#contact"
                  onClick={(e) => handleNavClick(e, "/#contact")}
                  className={`w-full py-2 md:py-3 font-medium text-sm md:text-base rounded-lg hover:shadow-lg transition-all duration-300 text-center block ${
                    currentSection === "contact"
                      ? isPastHeroImage
                        ? "bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold"
                        : "bg-gradient-to-r from-red-700 to-red-900 text-white font-bold"
                      : isPastHeroImage
                      ? "bg-gradient-to-r from-red-600 to-amber-600 text-white"
                      : "bg-gradient-to-r from-red-950 to-red-900 text-white"
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
