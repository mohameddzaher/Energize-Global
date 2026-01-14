"use client";

import { 
  FaChartLine, 
  FaBuilding, 
  FaUsers,
  FaStar,
  FaQuoteLeft,
  FaUserCircle,
  FaCrown,
  FaLightbulb,
  FaGlobe
} from 'react-icons/fa';
import Image from 'next/image';
import { useState } from 'react';

export default function Founder({ t }: any) {
  const founderData = t || {};
  const [imageError, setImageError] = useState(false);
  
  return (
    <section className="py-10 px-4 sm:px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent"></div>
            <span className="text-red-700 text-xs font-semibold uppercase tracking-wider">
              {founderData.tag || "Leadership"}
            </span>
            <div className="w-10 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent"></div>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            {founderData.title || "Founder & Chairman"}
          </h2>
          <p className="text-gray-600 text-sm max-w-md mx-auto">
            Visionary leadership driving innovation and growth
          </p>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
          
          {/* Left Column - Portrait Image */}
          <div className="lg:col-span-1">
            <div className="space-y-3">
              <div className="relative aspect-[3/4] max-w-[250px] mx-auto rounded-lg overflow-hidden shadow-md border border-gray-200">
                {!imageError ? (
                  <Image
                    src="/images/dulaim.jpeg"
                    alt="Mr. Dulaim Al Nasher - Founder & Chairman"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 200px, 200px"
                    priority
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                    <div className="text-red-400">
                      <FaUserCircle className="w-16 h-16" />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Quick Stats - مستطيل أصغر */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-gradient-to-r from-red-500/20 to-transparent rounded-xl text-center">
                  <div className="text-base font-bold text-gray-900">29+</div>
                  <div className="text-xs text-gray-600">Years of Experience</div>
                </div>
                <div className="p-2 bg-gradient-to-br from-gray-500 to-black rounded-xl text-center">
                  <div className="text-base font-bold text-white">9+</div>
                  <div className="text-xs text-gray-300">Owned Companies</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Name & Title */}
            <div className="space-y-1">
              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                {founderData.name || "Mr. Dulaim Al Nasher"}
              </h3>
              <div className="flex items-center gap-2">
                <div className="w-8 h-px bg-gradient-to-r from-red-500 to-amber-500"></div>
                <p className="text-red-700 text-sm font-semibold">
                  {founderData.role || "Founder & Chairman"}
                </p>
                <div className="w-8 h-px bg-gradient-to-r from-amber-500 to-red-500"></div>
              </div>
            </div>
            
            {/* Highlights - مستطيلات أفقية أصغر */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                {
                  icon: <FaLightbulb className="w-3 h-3" />,
                  title: "Visionary Leadership",
                  desc: "Driving innovation and growth"
                },
                {
                  icon: <FaGlobe className="w-3 h-3" />,
                  title: "Regional Expertise",
                  desc: "MENA markets specialist"
                },
                {
                  icon: <FaBuilding className="w-3 h-3" />,
                  title: "Portfolio Builder",
                  desc: "Established 9+ companies"
                },
                {
                  icon: <FaUsers className="w-3 h-3" />,
                  title: "Team Leader",
                  desc: "Leading 750+ professionals"
                }
              ].map((item, index) => (
                <div key={index} 
                  className="group p-3 bg-white rounded border border-gray-200 hover:border-red-300 transition-all duration-200 hover:shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded bg-gradient-to-br from-red-500/10 to-amber-500/10 text-red-700">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-gray-900 mb-0.5 truncate">{item.title}</h4>
                      <p className="text-[10px] text-gray-600 truncate">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Bio Section */}
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 to-amber-500"></div>
                <div className="pl-3">
                  <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-1.5">
                    <FaCrown className="w-3 h-3 text-amber-600" />
                    Leadership Profile
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                    {founderData.bio1 || "Mr. Dulaim Al Nasher is the founder and chairman of Energize Global Group with extensive experience in business development and strategic leadership across Saudi Arabia and the MENA region."}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Impact Metrics - مستطيلات أفقية */}
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-gradient-to-br from-gray-500 to-black rounded-lg  border-gray-800">
                <div className="text-base font-bold text-white">861+</div>
                <div className="text-xs text-gray-300">Team</div>
              </div>
              <div className="text-center p-2 bg-gradient-to-r from-red-500/20 to-transparent rounded-lg border-red-100">
                <div className="text-base font-bold text-gray-900">500+</div>
                <div className="text-xs text-gray-600">Projects</div>
              </div>
              <div className="text-center p-2 bg-gradient-to-br from-gray-500 to-black rounded-lg border-gray-800">
                <div className="text-base font-bold text-white">6+</div>
                <div className="text-xs text-gray-300">Awards</div>
              </div>
            </div>
            
            {/* Vision Quote - مستطيل */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-500 to-black rounded-lg"></div>
              <div className="relative p-3">
                <div className="flex items-start gap-2">
                  <div className="p-2 rounded-full bg-gradient-to-br from-red-500/10 to-amber-500/10 flex-shrink-0">
                    <FaQuoteLeft className="w-3 h-3 text-red-700" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white italic leading-relaxed line-clamp-3">
                      Success is creating sustainable value that benefits all stakeholders.
                    </p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <div className="w-6 h-px bg-gradient-to-r from-red-500/90 to-transparent"></div>
                      <span className="text-red-700 text-xs font-semibold">Vision</span>
                      <div className="w-6 h-px bg-gradient-to-r from-transparent to-red-500/90"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}