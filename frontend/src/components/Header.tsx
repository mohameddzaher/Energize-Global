// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";

// interface HeaderProps {
//   lang: string;
// }

// export default function Header({ lang }: HeaderProps) {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isPastHeroImage, setIsPastHeroImage] = useState(false);
//   const [activeSection, setActiveSection] = useState("hero");

//   const navItems = [
//     { id: "hero", name: "Home", href: "#hero" },
//     { id: "about", name: "About Us", href: "#about" },
//     { id: "achievements", name: "Insights", href: "#achievements" },
//     { id: "companies", name: "Our Companies", href: "#companies" },
//     { id: "contact", name: "Contact", href: "#contact" },
//   ];

//   useEffect(() => {
//     const handleScroll = () => {
//       const viewportHeight = window.innerHeight;
//       setIsPastHeroImage(window.scrollY > viewportHeight * 0.7);

//       let current = "hero";
//       navItems.forEach((item) => {
//         const el = document.getElementById(item.id);
//         if (el) {
//           const offsetTop = el.offsetTop - 100;
//           if (window.scrollY >= offsetTop) current = item.id;
//         }
//       });
//       setActiveSection(current);
//     };

//     window.addEventListener("scroll", handleScroll);
//     handleScroll();
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleNavClick = (e: React.MouseEvent, id: string) => {
//     e.preventDefault();
//     setIsMenuOpen(false);
//     setActiveSection(id); // تحديث فورى للـ active link

//     const section = document.getElementById(id);
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//     } else if (id === "hero") {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   return (
//     <header
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         isPastHeroImage
//           ? "bg-white shadow-sm"
//           : "bg-transparent backdrop-blur-3xl"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16 md:h-18">
//           {/* Logo */}
//           <div className="flex items-center">
//             <a
//               href="#hero"
//               onClick={(e) => handleNavClick(e, "hero")}
//               className="flex items-center"
//             >
//               {isPastHeroImage ? (
//                 <Image
//                   src="/images/logo.png"
//                   alt="Company Logo"
//                   width={150}
//                   height={40}
//                   className="object-contain transition-all duration-300"
//                 />
//               ) : (
//                 <Image
//                   src="/images/Red comma.png"
//                   alt="Company Logo"
//                   width={140}
//                   height={40}
//                   className="object-contain transition-all duration-300"
//                 />
//               )}
//             </a>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden lg:flex items-center space-x-0">
//             {navItems.map((item) => (
//               <a
//                 key={item.id}
//                 href={item.href}
//                 onClick={(e) => handleNavClick(e, item.id)}
//                 className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm cursor-pointer ${
//                   activeSection === item.id
//                     ? isPastHeroImage
//                       ? "text-red-600 font-bold text-base"
//                       : "text-red-400 font-bold text-base"
//                     : isPastHeroImage
//                     ? "text-gray-800 hover:text-red-600 font-medium"
//                     : "text-gray-200 hover:text-white font-medium"
//                 }`}
//               >
//                 {item.name}
//               </a>
//             ))}
//           </nav>

//           {/* Right Section - Contact Button + Mobile */}
//           <div className="flex items-center space-x-2">
//             <a
//               href="#contact"
//               onClick={(e) => handleNavClick(e, "contact")}
//               className={`px-4 py-1.5 md:px-5 md:py-2 font-medium text-xs md:text-sm rounded-lg transition-all duration-300 cursor-pointer ${
//                 activeSection === "contact"
//                   ? "bg-gradient-to-r from-red-700 to-red-900 text-white font-bold hover:shadow-lg"
//                   : "bg-gradient-to-r from-red-950 to-red-900 text-white hover:shadow-lg hover:shadow-red-500/20"
//               }`}
//             >
//               Contact
//             </a>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className={`lg:hidden p-1.5 md:p-2 rounded-lg transition-colors ${
//                 isPastHeroImage
//                   ? "text-gray-700 hover:text-gray-900"
//                   : "text-gray-200 hover:text-white"
//               }`}
//               aria-label="Toggle menu"
//             >
//               <svg
//                 className="w-5 h-5 md:w-6 md:h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 {isMenuOpen ? (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 ) : (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div
//             className={`lg:hidden rounded-lg md:rounded-xl mt-2 p-3 md:p-4 transition-all duration-300 ${
//               isPastHeroImage
//                 ? "bg-white shadow-lg"
//                 : "bg-gray-900/95 backdrop-blur-xl border border-gray-800"
//             }`}
//           >
//             <div className="flex flex-col space-y-1 md:space-y-2">
//               {navItems.map((item) => (
//                 <a
//                   key={item.id}
//                   href={item.href}
//                   onClick={(e) => handleNavClick(e, item.id)}
//                   className={`px-3 py-2 md:px-4 md:py-3 rounded-lg transition-all duration-200 font-medium text-sm md:text-base text-center ${
//                     activeSection === item.id
//                       ? isPastHeroImage
//                         ? "text-red-600 font-bold"
//                         : "text-red-400 font-bold"
//                       : isPastHeroImage
//                       ? "text-gray-800 hover:text-red-600"
//                       : "text-gray-300 hover:text-white"
//                   }`}
//                 >
//                   {item.name}
//                 </a>
//               ))}

//               <div
//                 className={`pt-3 md:pt-4 mt-3 md:mt-4 ${
//                   isPastHeroImage ? "border-t border-gray-200" : "border-t border-gray-800"
//                 }`}
//               >
//                 <a
//                   href="#contact"
//                   onClick={(e) => handleNavClick(e, "contact")}
//                   className={`w-full py-2 md:py-3 font-medium text-sm md:text-base rounded-lg hover:shadow-lg transition-all duration-300 text-center block ${
//                     activeSection === "contact"
//                       ? isPastHeroImage
//                         ? "bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold"
//                         : "bg-gradient-to-r from-red-700 to-red-900 text-white font-bold"
//                       : isPastHeroImage
//                       ? "bg-gradient-to-r from-red-600 to-amber-600 text-white"
//                       : "bg-gradient-to-r from-red-950 to-red-900 text-white"
//                   }`}
//                 >
//                   Contact
//                 </a>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }


// -------

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  lang: string;
}

export default function Header({ lang }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPastHeroImage, setIsPastHeroImage] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navItems = [
    { id: "hero", name: "Home", href: "#hero" },
    { id: "about", name: "About Us", href: "#about" },
    { id: "achievements", name: "Insights", href: "#achievements" },
    { id: "companies", name: "Our Companies", href: "#companies" },
    { id: "contact", name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const hero = document.getElementById("hero");
      if (hero) {
        setIsPastHeroImage(scrollY >= hero.offsetHeight - 80);
      }

      let current = "hero";
      navItems.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) {
          const offsetTop = el.offsetTop - 100;
          if (scrollY >= offsetTop) current = item.id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isPastHeroImage
          ? "bg-white shadow-sm"
          : "bg-transparent backdrop-blur-3xl"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" legacyBehavior>
              <a className="flex items-center">
                {isPastHeroImage ? (
                  <Image
                    src="/images/logo.png"
                    alt="Company Logo"
                    width={150}
                    height={40}
                    className="object-contain transition-all duration-300"
                  />
                ) : (
                  <Image
                    src="/images/Red comma.png"
                    alt="Company Logo"
                    width={140}
                    height={40}
                    className="object-contain transition-all duration-300"
                  />
                )}
              </a>
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
                  activeSection === item.id
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

          {/* Right Section - Contact Button + Mobile */}
          <div className="flex items-center space-x-2">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact")}
              className={`px-4 py-1.5 md:px-5 md:py-2 font-medium text-xs md:text-sm rounded-lg transition-all duration-300 cursor-pointer ${
                activeSection === "contact"
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
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`px-3 py-2 md:px-4 md:py-3 rounded-lg transition-all duration-200 font-medium text-sm md:text-base text-center ${
                    activeSection === item.id
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
                  isPastHeroImage ? "border-t border-gray-200" : "border-t border-gray-800"
                }`}
              >
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "contact")}
                  className={`w-full py-2 md:py-3 font-medium text-sm md:text-base rounded-lg hover:shadow-lg transition-all duration-300 text-center block ${
                    activeSection === "contact"
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