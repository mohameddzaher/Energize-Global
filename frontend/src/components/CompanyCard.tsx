

// import Image from "next/image";

// interface CompanyCardProps {
//   name: string;
//   logo: string;
//   url: string;
//   description?: string;
//   index: number;
// }

// export default function CompanyCard({
//   name,
//   logo,
//   url,
//   description,
//   index,
// }: CompanyCardProps) {
//   const colors = [
//     "from-red-500/10 to-amber-500/10",
//     "from-red-500/8 to-amber-500/8",
//     "from-red-500/6 to-amber-500/6",
//     "from-red-500/10 to-amber-500/10",
//     "from-red-500/8 to-amber-500/8",
//     "from-red-500/6 to-amber-500/6",
//   ];

//   const borderColors = [
//     "hover:border-red-500/40",
//     "hover:border-red-500/35",
//     "hover:border-red-500/30",
//     "hover:border-red-500/40",
//     "hover:border-red-500/35",
//     "hover:border-red-500/30",
//   ];

//   const colorIndex = index % colors.length;

//   return (
//     <a
    
//       href={url}
//       target="_blank"
//       rel="noopener noreferrer"
//       className={`group relative p-4 bg-gradient-to-br from-gray-900/40 to-black/30 rounded-lg border border-gray-800/40 ${borderColors[colorIndex]} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-red-500/10`}
//     >
//       {/* Glow effect */}
//       <div
//         className={`absolute -inset-0.5 bg-gradient-to-r ${colors[colorIndex]} rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-500`}
//       ></div>

//       <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[180px]">
//         {/* Logo area - Centered and larger */}
//         <div className="w-30 h-20 mb-4 relative">
//           <Image
//             src={logo}
//             alt={name}
//             fill
//             className="object-contain invert(1)"
//             sizes="(max-width: 768px) 80px, 80px"
//             priority={index < 3} // Prioritize first 3 logos
//           />
//         </div>

//         {/* Content - Centered */}
//         <div className="space-y-2 text-center flex-1 flex flex-col justify-center">
//           <h3 className="text-sm font-bold text-white group-hover:text-red-300 transition-colors line-clamp-2">
//             {name}
//           </h3>

//           {description && (
//             <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
//               {description}
//             </p>
//           )}

//           {/* Visit button - Centered at bottom */}
//           <div className="pt-3 mt-auto">
//             <div className="inline-flex items-center gap-1 text-xs font-medium text-red-400 group-hover:text-red-400 transition-colors">
//               <span>Visit</span>
//               <svg
//                 className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M17 8l4 4m0 0l-4 4m4-4H3"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Corner accent */}
//       <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 bg-gradient-to-br from-red-500/10 to-amber-500/5 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
//     </a>
//   );
// }

import Image from "next/image";

interface CompanyCardProps {
  name: string;
  logo: string;
  url: string;
  description?: string;
  index: number;
}

export default function CompanyCard({
  name,
  logo,
  url,
  description,
  index,
}: CompanyCardProps) {
  const colors = [
    "from-red-500/20 to-amber-500/15",
    "from-red-500/15 to-amber-500/10",
    "from-red-500/10 to-amber-500/5",
    "from-red-500/20 to-amber-500/15",
    "from-red-500/15 to-amber-500/10",
    "from-red-500/10 to-amber-500/5",
  ];

  const borderColors = [
    "hover:border-red-500/50",
    "hover:border-red-500/40",
    "hover:border-red-500/30",
    "hover:border-red-500/50",
    "hover:border-red-500/40",
    "hover:border-red-500/30",
  ];

  const colorIndex = index % colors.length;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative p-3 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-gray-700/50 ${borderColors[colorIndex]} transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-red-500/15`}
      style={{ minHeight: '150px' }} // أصغر حجم
    >
      {/* Glow effect */}
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${colors[colorIndex]} rounded-lg blur opacity-0 group-hover:opacity-60 transition duration-500`}
      ></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {/* Logo area - أصغر حجم */}
        <div className="w-35 h-15 mb-3 relative">
          <Image
            src={logo}
            alt={name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 60px, 60px"
            priority={index < 3}
          />
        </div>

        {/* Content - Centered */}
        <div className="space-y-1.5 text-center flex-1 flex flex-col justify-center">
          <h3 className="text-md font-bold text-white group-hover:text-red-300 transition-colors line-clamp-2">
            {name}
          </h3>

          {description && (
            <p className="text-gray-300 text-[10px] leading-relaxed line-clamp-2">
              {description}
            </p>
          )}

          {/* Visit button - أصغر */}
          <div className=" mt-auto">
            <div className="inline-flex items-center gap-1 text-[12px] text-red-400 group-hover:text-red-300 transition-colors">
              <span>Visit</span>
              <svg
                className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform"
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
          </div>
        </div>
      </div>
      
      {/* Corner accent - أصغر */}
      <div className="absolute bottom-1 right-1 w-1 h-1 bg-gradient-to-br from-red-500/30 to-amber-500/20 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
    </a>
  );
}