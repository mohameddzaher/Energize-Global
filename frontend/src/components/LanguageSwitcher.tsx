"use client";

import { useRouter } from "next/navigation";

interface LanguageSwitcherProps {
  lang: string;
}

export default function LanguageSwitcher({ lang }: LanguageSwitcherProps) {
  const router = useRouter();
  const isArabic = lang === "ar";

  const toggleLanguage = () => {
    const newLang = isArabic ? "en" : "ar";
    // Preserve current URL path while changing language
    router.push(`/?lang=${newLang}`);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="relative group px-4 py-2.5 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-blue-500 transition-all duration-300 overflow-hidden"
      aria-label={`Switch to ${isArabic ? 'English' : 'Arabic'} language`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10 flex items-center gap-3">
        <span className="text-sm font-medium text-gray-300 group-hover:text-white">
          {isArabic ? "English" : "العربية"}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isArabic 
            ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30' 
            : 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30'
        }`}>
          <span className="text-sm font-medium">
            {isArabic ? "EN" : "AR"}
          </span>
        </div>
      </div>
    </button>
  );
}