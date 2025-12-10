"use client";

import { 
  FaChartLine, 
  FaBuilding, 
  FaUsers,
  FaStar,
  FaQuoteLeft,
  FaUserCircle
} from 'react-icons/fa';
import Image from 'next/image';
import { useState } from 'react';

export default function Founder({ t }: any) {
  const founderData = t || {};
  const [imageError, setImageError] = useState(false);
  
  return (
    <section className="py-12 px-4 sm:px-6 bg-gradient-to-b from-gray-950 to-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent"></div>
            <span className="text-red-400 text-xs font-semibold uppercase tracking-wider">
              {founderData.tag || "Leadership"}
            </span>
            <div className="w-10 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent"></div>
          </div>
          <h2 className="text-2xl md:text-2xl font-bold text-white mb-3 tracking-tight">
            {founderData.title || "Founder & Chairman"}
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
            Visionary leadership driving innovation and growth
          </p>
        </div>
        
        {/* التقسيمة الجديدة: صورة بورتريه على اليسار، الاسم والمسمى على اليمين */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 items-center">
          
          {/* الصورة بورتريه */}
          <div className="md:col-span-1 flex justify-center">
            <div className="relative w-full max-w-[300px] sm:max-w-[250px] md:max-w-full aspect-[4/5] rounded-xl overflow-hidden border border-gray-800/60 bg-gradient-to-br from-gray-900 to-black">
              {!imageError ? (
                <Image
                  src="/images/dulaim.jpeg"
                  alt="Mr. Dalem Al Nasher - Founder & Chairman of Energize Global Group"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80vw, 33vw"
                  priority
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-red-400">
                    <FaUserCircle className="w-32 h-32" />
                  </div>
                </div>
              )}
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>
          </div>
          
          {/* الاسم والمسمى على اليمين */}
          <div className="md:col-span-2 flex flex-col justify-center">
            <div className="bg-gradient-to-br from-gray-900/60 to-black/50 rounded-xl border border-gray-800/60 p-6 md:p-8">
              <h3 className="text-white text-2xl md:text-2xl font-bold mb-2">
                {founderData.name || "Mr. Dalem Al Nasher"}
              </h3>
              <p className="text-red-400 text-md mb-4">
                {founderData.role || "Founder & Chairman of the Board"}
              </p>
              
              <p className="text-gray-300 text-sm leading-relaxed">
                A visionary leader with over two decades of experience in business development, 
                strategic leadership, and driving innovation across multiple industries in Saudi Arabia 
                and the MENA region.
              </p>
              
              {/* Experience highlights */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                {[
                  { value: "25+", label: "Years Experience", icon: <FaChartLine className="w-4 h-4 text-red-400" /> },
                  { value: "9+", label: "Companies", icon: <FaBuilding className="w-4 h-4 text-amber-400" /> },
                  { value: "750+", label: "Team Members", icon: <FaUsers className="w-4 h-4 text-emerald-400" /> },
                  { value: "6+", label: "Awards", icon: <FaStar className="w-4 h-4 text-cyan-400" /> }
                ].map((item, index) => (
                  <div key={index} className="p-3 bg-gradient-to-br from-gray-900/40 to-black/40 rounded-lg border border-gray-800/40">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="p-1.5 rounded-md bg-gradient-to-br from-gray-800 to-gray-900">
                        {item.icon}
                      </div>
                      <div className="text-lg font-bold text-white tracking-tight">
                        {item.value}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 tracking-wide ml-10">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bio ومحتوى إضافي */}
        <div className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gray-900/50 to-black/40 rounded-xl border border-gray-800/50">
            <h4 className="text-white text-lg font-bold mb-4 ">Leadership Profile</h4>
            <div className="space-y-4">
              <p className="text-gray-300 text-base leading-relaxed tracking-normal text-sm">
                {founderData.bio1 || "Mr. Dalem Al Nasher is the founder and chairman of Energize Global Group with extensive experience in business development and strategic leadership across Saudi Arabia and the MENA region."}
              </p>
              <p className="text-gray-300 text-base leading-relaxed tracking-normal text-sm">
                {founderData.bio2 || "With an entrepreneurial vision aimed at enabling companies to achieve growth and sustainability through innovative solutions and integrated services, he has established a strong presence in multiple industries."}
              </p>
              <p className="text-gray-300 text-base leading-relaxed tracking-normal text-sm">
                {founderData.bio3 || "Through his extensive network and diverse experience, he has built a trusted brand that reflects professionalism, quality values, and commitment to excellence in all business endeavors."}
              </p>
            </div>
          </div>
          
          {/* Quote */}
          <div className="p-4 bg-gradient-to-r from-red-500/10 to-amber-500/5 rounded-xl border border-red-500/20">
            <div className="flex items-start gap-3">
              <div className="text-red-400 mt-1">
                <FaQuoteLeft className="w-5 h-5" />
              </div>
              <div>
                <p className="text-gray-300 text-sm md:text-sm italic leading-relaxed tracking-normal">
                  Success is not just about achieving goals, but about creating sustainable value that benefits all stakeholders and contributes to regional growth.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-8 h-px bg-gradient-to-r from-red-500/50 to-transparent"></div>
                  <span className="text-gray-500 text-xs uppercase tracking-wider">Founder's Vision</span>
                  <div className="w-8 h-px bg-gradient-to-r from-transparent to-red-500/50"></div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}