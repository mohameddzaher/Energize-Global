import Image from "next/image";
import { useMemo } from "react";

interface CompanyCardProps {
  name: string;
  logo: string;
  url: string;
  description?: string;
  index: number;
}

const COLORS = [
  "from-red-500/20 to-amber-500/15",
  "from-red-500/15 to-amber-500/10",
  "from-red-500/10 to-amber-500/5",
  "from-red-500/20 to-amber-500/15",
  "from-red-500/15 to-amber-500/10",
  "from-red-500/10 to-amber-500/5",
] as const;

const BORDER_COLORS = [
  "hover:border-red-500/50",
  "hover:border-red-500/40",
  "hover:border-red-500/30",
  "hover:border-red-500/50",
  "hover:border-red-500/40",
  "hover:border-red-500/30",
] as const;

export default function CompanyCard({
  name,
  logo,
  url,
  description,
  index,
}: CompanyCardProps) {
  const colorIndex = useMemo(() => index % COLORS.length, [index]);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative p-3 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-gray-700/50 ${BORDER_COLORS[colorIndex]} transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-red-500/15`}
      style={{ minHeight: "150px" }}
    >
      {/* Glow effect */}
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${COLORS[colorIndex]} rounded-lg blur opacity-0 group-hover:opacity-60 transition duration-500`}
      ></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {/* Logo area - قبل الاسم */}
        <div className="w-32 h-20 mb-4 relative">
          <Image
            src={logo}
            alt={`${name} logo`}
            fill
            className="object-contain brightness-0 invert"
            sizes="(max-width: 640px) 96px, (max-width: 1024px) 112px, 128px"
            priority={index < 3}
            loading={index < 3 ? "eager" : "lazy"}
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
