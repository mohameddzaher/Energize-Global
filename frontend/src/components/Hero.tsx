// "use client";

// import Image from "next/image";

// import Link from "next/link";
// import { CalendarDays, ArrowRight } from "lucide-react";

// export default function Hero({ t }: any) {
//   const heroData = t || {};
//   const title = heroData.title || "Energize Business Group";
//   const description =
//     heroData.description ||
//     "Comprehensive Solutions in Marketing, Event Management, Logistics, and Manufacturing Since 1999";
//   const cta1 = heroData.cta1 || "Explore Our Companies";
//   const cta2 = heroData.cta2 || "Contact Us";

//   // Scroll functions
//   const scrollToCompanies = (e: React.MouseEvent) => {
//     e.preventDefault();
//     const section = document.getElementById("companies");
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   const scrollToContact = (e: React.MouseEvent) => {
//     e.preventDefault();
//     const section = document.getElementById("contact");
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   // Key highlights
//   const highlights = [
//     { value: "+24", label: "Years Experience" },
//     { value: "+9", label: "Portfolio Companies" },
//     { value: "8", label: "Countries" },
//   ];

//   return (
//     <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
//       {/* Full Background Image */}
//       <div className="absolute inset-0 z-0 ">
//         <Image
//           src="/images/mapp.jpeg"
//           alt="Energize Business Group Headquarters"
//           fill
//           className="object-cover"
//           sizes="100vw"
//           priority
//           quality={90}
//         />
        
//         {/* Sophisticated Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/80 to-transparent"></div>
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
//         <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          
//           {/* Left Column - Text Content */}
//           <div className="space-y-4">
//             {/* Badge */}
//             <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
//               <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
//               <span className="text-xs text-white">
//                 Since 1999 • Saudi Arabia
//               </span>
//             </div>

//             {/* Main Title */}
//             <div className="space-y-2">
//               <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
//                 <span className="text-red-400">ENERGIZE</span>
//                 <br />
//                 <span className="text-white">Business Group</span>
//               </h1>
              
//               {/* Accent Line */}
//               <div className="w-16 h-0.5 bg-gradient-to-r from-red-700 to-amber-500"></div>
//             </div>

//             {/* Description */}
//             <p className="text-sm text-white/90 leading-relaxed max-w-md">
//               A leading business conglomerate providing comprehensive solutions across marketing, 
//               event management, logistics, and manufacturing with a legacy of excellence since 1999.
//             </p>

//             {/* Highlights */}
//             <div className="flex items-center gap-5 pt-2">
//               {highlights.map((item, index) => (
//                 <div key={index} className="text-center">
//                   <div className="text-xl font-bold text-white">{item.value}</div>
//                   <div className="text-xs text-white/70 mt-0.5">{item.label}</div>
//                 </div>
//               ))}
//             </div>

//             {/* CTA Buttons */}
// <div className="flex flex-col sm:flex-row gap-2 pt-3">
//   <button
//     onClick={scrollToCompanies}
//     className="cursor-pointer px-3 py-2 bg-gradient-to-r from-red-950 to-gray-800 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 flex items-center justify-center gap-1.5 group"
//   >
//     <span>{cta1}</span>
//     <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//     </svg>
//   </button>
  
//   <button
//     onClick={scrollToContact}
//     className="cursor-pointer px-2 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-lg border border-white/30 hover:bg-white/15 hover:border-white/40 transition-all duration-300 flex items-center justify-center gap-1.5 group"
//   >
//     <span>{cta2}</span>
//     <svg className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//     </svg>
//   </button>

//   {/* Meeting Room Link - نفس الحجم */}
//   <Link
//     href="/display"
//     className="cursor-pointer px-5 py-2 bg-gradient-to-r from-red-950 to-gray-800 text-white text-sm font-medium rounded-lg  border-orange-400/50 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 flex items-center justify-center gap-1.5 group"
//   >
//     <CalendarDays className="w-5 h-5" />
//     <span>Meeting Room</span>
//     <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
//   </Link>
// </div>
//           </div>

//           {/* Right Column - Stats Card Overlay */}
//           <div className="relative mt-6 lg:mt-0">
//             {/* Vision 2030 Card */}
//             <div className="absolute -top-3 -right-3 bg-gradient-to-br from-green-600/90 to-emerald-500/90 text-white p-2 rounded-lg shadow z-20 max-w-[140px] backdrop-blur-sm">
//               <div className="flex items-center gap-1.5">
//                 <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center">
//                   <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                   </svg>
//                 </div>
//                 <div>
//                   <div className="text-xs font-bold">Vision 2030</div>
//                   <div className="text-[9px] text-white/80">Partner</div>
//                 </div>
//               </div>
//             </div>

//             {/* Global Presence Card */}
//             <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
//               <div className="space-y-3">
//                 <div className="flex items-center gap-2">
//                   <div className="w-10 h-10 rounded-md bg-gradient-to-br from-red-500/20 to-amber-500/20 flex items-center justify-center">
//                     <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
//                     </svg>
//                   </div>
//                   <div>
//                     <div className="text-base font-bold text-white">Global Reach</div>
//                     <div className="text-xs text-white/70">4+ Countries</div>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-2">
//                   <div className="bg-white/5 rounded p-2 border border-white/10">
//                     <div className="text-lg font-bold text-white">+1000</div>
//                     <div className="text-xs text-white/70">Projects</div>
//                   </div>
//                   <div className="bg-white/5 rounded p-2 border border-white/10">
//                     <div className="text-lg font-bold text-white">+750</div>
//                     <div className="text-xs text-white/70">Team</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Elegant Scroll Indicator */}
//       {/* <button
//         onClick={scrollToCompanies}
//         className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 "
//         aria-label="Scroll to explore"
//       >
//         <div className="flex flex-col items-center gap-1">
//           <div className="text-xs text-white/70">SCROLL</div>
//           <div className="w-5 h-8 border border-white/30 rounded-lg flex justify-center">
//             <div className="w-1 h-2 bg-gradient-to-b from-white to-transparent rounded-full mt-3 animate-bounce"></div>
//           </div>
//         </div>
//       </button> */}
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowRight } from "lucide-react";

export default function Hero({ t }: any) {
  const heroData = t || {};
  const title = heroData.title || "Energize Business Group";
  const description =
    heroData.description ||
    "Comprehensive Solutions in Marketing, Event Management, Logistics, and Manufacturing Since 1999";
  const cta1 = heroData.cta1 || "Explore Our Companies";
  const cta2 = heroData.cta2 || "Contact Us";

  // Scroll functions
  const scrollToCompanies = (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById("companies");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Key highlights
  const highlights = [
    { value: "+24", label: "Years Experience" },
    { value: "+9", label: "Portfolio Companies" },
    { value: "8", label: "Countries" },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0 ">
        <Image
          src="/images/mapp.jpeg"
          alt="Energize Business Group Headquarters"
          fill
          className="object-cover"
          sizes="100vw"
          priority
          quality={90}
        />
        
        {/* Sophisticated Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/80 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          
          {/* Left Column - Text Content */}
          <div className="space-y-4">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
              <span className="text-xs text-white">
                Since 1999 • Saudi Arabia
              </span>
            </div>

            {/* Main Title */}
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                <span className="text-red-400">ENERGIZE</span>
                <br />
                <span className="text-white">Business Group</span>
              </h1>
              
              {/* Accent Line */}
              <div className="w-16 h-0.5 bg-gradient-to-r from-red-700 to-amber-500"></div>
            </div>

            {/* Description */}
            <p className="text-sm text-white/90 leading-relaxed max-w-md">
              A leading business conglomerate providing comprehensive solutions across marketing, 
              event management, logistics, and manufacturing with a legacy of excellence since 1999.
            </p>

            {/* Highlights */}
            <div className="flex items-center gap-5 pt-2">
              {highlights.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl font-bold text-white">{item.value}</div>
                  <div className="text-xs text-white/70 mt-0.5">{item.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons - Main Left Side */}
            <div className="flex flex-col sm:flex-row gap-2 pt-3">
              <button
                onClick={scrollToCompanies}
                className="cursor-pointer px-3 py-2 bg-gradient-to-r from-red-950 to-gray-800 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 flex items-center justify-center gap-1.5 group"
              >
                <span>{cta1}</span>
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              
              <button
                onClick={scrollToContact}
                className="cursor-pointer px-2 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-lg border border-white/30 hover:bg-white/15 hover:border-white/40 transition-all duration-300 flex items-center justify-center gap-1.5 group"
              >
                <span>{cta2}</span>
                <svg className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column - Stats Card & Meeting Room */}
          <div className="relative mt-6 lg:mt-0">
            {/* Vision 2030 Card */}
            <div className="absolute -top-3 -right-3 bg-gradient-to-br from-green-600/90 to-emerald-500/90 text-white p-2 rounded-lg shadow z-20 max-w-[140px] backdrop-blur-sm">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold">Vision 2030</div>
                  <div className="text-[9px] text-white/80">Partner</div>
                </div>
              </div>
            </div>

            {/* Global Presence Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 mb-3">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-md bg-gradient-to-br from-red-500/20 to-amber-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-base font-bold text-white">Global Reach</div>
                    <div className="text-xs text-white/70">4+ Countries</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white/5 rounded p-2 border border-white/10">
                    <div className="text-lg font-bold text-white">+1000</div>
                    <div className="text-xs text-white/70">Projects</div>
                  </div>
                  <div className="bg-white/5 rounded p-2 border border-white/10">
                    <div className="text-lg font-bold text-white">+750</div>
                    <div className="text-xs text-white/70">Team</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Meeting Room Card - Under Global Reach */}
            <div className="bg-gradient-to-br from-red-950/90 to-gray-800/90 backdrop-blur-sm rounded-lg p-4  border-red-500/30 hover:border-red-400/50 transition-all duration-300 group">
              <Link
                href="/display"
                className="flex flex-col items-center text-center space-y-2"
              >
                <div className="flex items-center justify-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-red-600/30 to-orange-500/30 flex items-center justify-center border border-red-400/30 group-hover:border-red-300/50 transition-colors">
                    <CalendarDays className="w-5 h-5 text-white" />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-base font-bold text-white group-hover:text-red-100 transition-colors">
                    Book Our Meeting Rooms
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Reserve professional meeting spaces at Energize. Perfect for presentations, 
                    client meetings, and team collaborations in a premium business environment.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-1 pt-1">
                  <span className="text-xs font-medium text-red-200">Schedule Now</span>
                  <ArrowRight className="w-3.5 h-3.5 text-red-300 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}