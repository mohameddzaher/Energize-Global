"use client";

import { useState, useEffect } from 'react';

export default function LocationMap() {
  const [activeLocation, setActiveLocation] = useState<
    'jeddah' | 'riyadh' | 'dammam' | 'abha' | 'yanbu' | 'dubai' | 'muscat' | 'cairo'
  >('jeddah');
  const [isPulsing, setIsPulsing] = useState(true);
  
  // Effect للنبضات
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulsing(prev => !prev);
    }, 1500);
    
    return () => clearInterval(interval);
  }, []);

  const locations = {
    jeddah: {
      title: "Jeddah Headquarters",
      address: "Al Madinah Road",
      coordinates: "21.576898°N, 39.16732°E",
      features: [
        "Main Administration",
        "Client Meetings",
        "Regional Hub"
      ],
      operations: ["Marketing", "Logistics", "Management"],
      employeeCount: "400+",
      mapColor: "from-red-900/90 to-black/80",
      borderColor: "",
      pulseColor: "red"
    },
    riyadh: {
      title: "Riyadh Regional Office",
      address: "Olaya District, King Fahd Road",
      coordinates: "24.7136°N, 46.6753°E",
      features: [
        "Business Development",
        "Strategic Planning",
        "Government Relations"
      ],
      operations: ["Consulting", "Planning", "Development"],
      employeeCount: "100+",
      mapColor: "from-blue-900/80 to-blue-800/60",
      borderColor: "",
      pulseColor: "blue"
    },
    dammam: {
      title: "Dammam Eastern Hub",
      address: "Al Khobar, King Abdullah Road",
      coordinates: "26.4207°N, 50.0888°E",
      features: [
        "Eastern Province HQ",
        "Industrial Services",
        "Energy Sector"
      ],
      operations: ["Industrial", "Energy", "Shipping"],
      employeeCount: "60+",
      mapColor: "from-amber-900/80 to-amber-800/60",
      borderColor: "",
      pulseColor: "amber"
    },
    abha: {
      title: "Abha Southern Office",
      address: "Al Salam District, King Faisal Road",
      coordinates: "18.2167°N, 42.5053°E",
      features: [
        "Southern Region HQ",
        "Tourism & Hospitality",
        "Agricultural Services"
      ],
      operations: ["Tourism", "Agriculture", "Hospitality"],
      employeeCount: "20+",
      mapColor: "from-emerald-900/80 to-emerald-800/60",
      borderColor: "",
      pulseColor: "emerald"
    },
    yanbu: {
      title: "Yanbu Industrial Center",
      address: "Industrial City, Royal Commission Area",
      coordinates: "24.0895°N, 38.0618°E",
      features: [
        "Industrial Operations",
        "Petrochemical Services",
        "Port Logistics"
      ],
      operations: ["Industrial", "Logistics", "Petrochemical"],
      employeeCount: "20+",
      mapColor: "from-indigo-900/80 to-indigo-800/60",
      borderColor: "",
      pulseColor: "indigo"
    },
    dubai: {
      title: "Dubai International Hub",
      address: "Business Bay, Sheikh Zayed Road",
      coordinates: "25.2048°N, 55.2708°E",
      features: [
        "International Business",
        "GCC Operations",
        "Global Partnerships"
      ],
      operations: ["International", "Partnerships", "Innovation"],
      employeeCount: "80+",
      mapColor: "from-purple-900/80 to-purple-800/60",
      borderColor: "",
      pulseColor: "purple"
    },
    muscat: {
      title: "Muscat Operations Center",
      address: "Al Khuwair, Sultan Qaboos Road",
      coordinates: "23.5880°N, 58.3829°E",
      features: [
        "Oman Headquarters",
        "Maritime Services",
        "Regional Trade"
      ],
      operations: ["Maritime", "Trade", "Regional Ops"],
      employeeCount: "35+",
      mapColor: "from-rose-900/80 to-rose-800/60",
      borderColor: "",
      pulseColor: "rose"
    },
    cairo: {
      title: "Cairo Operations Center",
      address: "New Cairo, Ring Road",
      coordinates: "30.0444°N, 31.2357°E",
      features: [
        "North Africa HQ",
        "Manufacturing",
        "Distribution Hub"
      ],
      operations: ["Manufacturing", "Supply Chain", "Distribution"],
      employeeCount: "160+",
      mapColor: "from-green-900/80 to-green-800/60",
      borderColor: "",
      pulseColor: "green"
    }
  };

  const activeData = locations[activeLocation];

  // تحديد لون النبض بناءً على الموقع النشط - أخف
  const getPulseColor = () => {
    switch(activeData.pulseColor) {
      case 'blue': return 'bg-blue-400/20';
      case 'red': return 'bg-red-400/20';
      case 'purple': return 'bg-purple-400/20';
      case 'green': return 'bg-green-400/20';
      case 'amber': return 'bg-amber-400/20';
      case 'emerald': return 'bg-emerald-400/20';
      case 'indigo': return 'bg-indigo-400/20';
      case 'rose': return 'bg-rose-400/20';
      default: return 'bg-blue-400/20';
    }
  };

  const getPointColor = () => {
    switch(activeData.pulseColor) {
      case 'blue': return 'bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.4)]';
      case 'red': return 'bg-gradient-to-r from-red-600 to-red-400 shadow-[0_0_8px_rgba(239,68,68,0.4)]';
      case 'purple': return 'bg-gradient-to-r from-purple-600 to-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.4)]';
      case 'green': return 'bg-gradient-to-r from-green-600 to-green-400 shadow-[0_0_8px_rgba(34,197,94,0.4)]';
      case 'amber': return 'bg-gradient-to-r from-amber-600 to-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.4)]';
      case 'emerald': return 'bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.4)]';
      case 'indigo': return 'bg-gradient-to-r from-indigo-600 to-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.4)]';
      case 'rose': return 'bg-gradient-to-r from-rose-600 to-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.4)]';
      default: return 'bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.4)]';
    }
  };

  const getTextColor = () => {
    switch(activeData.pulseColor) {
      case 'blue': return 'text-blue-400';
      case 'red': return 'text-red-400';
      case 'purple': return 'text-purple-400';
      case 'green': return 'text-green-400';
      case 'amber': return 'text-amber-400';
      case 'emerald': return 'text-emerald-400';
      case 'indigo': return 'text-indigo-400';
      case 'rose': return 'text-rose-400';
      default: return 'text-blue-400';
    }
  };

  const getBadgeColor = () => {
    switch(activeData.pulseColor) {
      case 'blue': return 'bg-blue-900/30 text-blue-300';
      case 'red': return 'bg-red-900/30 text-red-300';
      case 'purple': return 'bg-purple-900/30 text-purple-300';
      case 'green': return 'bg-green-900/30 text-green-300';
      case 'amber': return 'bg-amber-900/30 text-amber-300';
      case 'emerald': return 'bg-emerald-900/30 text-emerald-300';
      case 'indigo': return 'bg-indigo-900/30 text-indigo-300';
      case 'rose': return 'bg-rose-900/30 text-rose-300';
      default: return 'bg-blue-900/30 text-blue-300';
    }
  };

  return (
    <section className="py-10 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 mb-2">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent"></div>
            <span className="text-red-600 text-[11px] font-semibold uppercase tracking-wider">Global Network</span>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent"></div>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 tracking-tight">
            Our Strategic Locations
          </h2>
          <p className="text-gray-600 text-xs max-w-md mx-auto leading-relaxed">
            Operating from key business hubs across the region
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {/* Interactive Map Visualization */}
          <div className="lg:col-span-2">
            <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-lg p-4 h-full">
              {/* Simplified MENA Map */}
              <div className="relative h-[260px] bg-gradient-to-br from-gray-900/90 to-black/90 rounded-md overflow-hidden">
                {/* Map Background Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:25px_25px]"></div>
                
                {/* Country Labels */}
                <div className="absolute top-[45%] left-[45%] text-[15px] text-gray-200 font-bold">KSA</div>
                <div className="absolute top-[20%] left-[80%] text-[15px] text-gray-200 font-bold">UAE</div>
                <div className="absolute top-[35%] left-[85%] text-[15px] text-gray-200 font-bold">Oman</div>
                <div className="absolute top-[20%] left-[15%] text-[15px] text-gray-200 font-bold">Egypt</div>
                
                {/* Interactive Location Points with Pulsing Effect */}
                {Object.entries(locations).map(([key, location]) => {
                  // تحديد المواقع على الخريطة بدقة أعلى
                  const positions: Record<string, { top: string; left: string }> = {
                    jeddah: { top: '55%', left: '35%' },   // غرب السعودية
                    riyadh: { top: '30%', left: '50%' },   // وسط السعودية
                    dammam: { top: '25%', left: '60%' },   // شرق السعودية
                    abha: { top: '70%', left: '40%' },     // جنوب السعودية
                    yanbu: { top: '40%', left: '32%' },    // غرب السعودية شمال جدة
                    dubai: { top: '35%', left: '68%' },    // الإمارات
                    muscat: { top: '45%', left: '75%' },   // عمان
                    cairo: { top: '15%', left: '20%' }     // مصر
                  };

                  const isActive = activeLocation === key;
                  
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveLocation(key as any)}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                        isActive ? 'scale-110 z-10' : 'hover:scale-105'
                      }`}
                      style={positions[key]}
                    >
                      <div className="relative group">
                        {/* Pulsing Outer Ring */}
                        {isActive && isPulsing && (
                          <div className={`absolute -inset-4 rounded-full ${getPulseColor()} animate-ping`}></div>
                        )}
                        
                        {/* Pulsing Middle Ring */}
                        {isActive && (
                          <div className={`absolute -inset-3 rounded-full ${getPulseColor().replace('/20', '/10')} animate-pulse`}></div>
                        )}
                        
                        {/* Main Point */}
                        <div className={`relative w-3 h-3 rounded-full ${
                          isActive 
                            ? getPointColor()
                            : 'bg-gray-500 group-hover:bg-gray-400 group-hover:shadow-[0_0_6px_rgba(156,163,175,0.3)]'
                        } transition-all duration-300`}></div>
                        
                        {/* City Label */}
                        <div className={`absolute -top-5 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[13px] font-medium ${
                          isActive 
                            ? `${getTextColor()} font-semibold`
                            : 'text-gray-400 group-hover:text-gray-300'
                        } transition-colors duration-300`}>
                          {location.title.split(' ')[0]}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              
              {/* Location Indicators */}
              <div className="mt-3 grid grid-cols-4 gap-1.5">
                {Object.entries(locations).map(([key, location]) => (
                  <button
                    key={key}
                    onClick={() => setActiveLocation(key as any)}
                    className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md text-[10px] transition-all duration-300 ${
                      activeLocation === key
                        ? `bg-gradient-to-r ${location.mapColor} text-white`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      key === 'jeddah' ? 'bg-red-500' :
                      key === 'riyadh' ? 'bg-blue-500' :
                      key === 'dammam' ? 'bg-amber-500' :
                      key === 'abha' ? 'bg-emerald-500' :
                      key === 'yanbu' ? 'bg-indigo-500' :
                      key === 'dubai' ? 'bg-purple-500' :
                      key === 'muscat' ? 'bg-rose-500' :
                      'bg-green-500'
                    }`}></div>
                    {location.title.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Location Details */}
          <div className="space-y-3">
            <div className={`p-4 bg-gradient-to-br ${activeData.mapColor} rounded-lg transition-all duration-300`}>
              <div className="flex items-center gap-2.5 mb-3">
                <div className={`w-8 h-8 rounded-md bg-gradient-to-br ${activeData.mapColor.replace('/80', '/60')} flex items-center justify-center animate-pulse-slow`}>
                  <span className="text-sm">📍</span>
                </div>
                <div>
                  <h3 className={`text-white text-sm font-bold leading-tight ${getTextColor()}`}>
                    {activeData.title}
                  </h3>
                  <p className="text-gray-300 text-[11px] mt-0.5">{activeData.address}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-gray-400 text-[10px] mb-0.5">Coordinates</div>
                    <div className="text-white text-xs font-mono">{activeData.coordinates}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-400 text-[10px] mb-0.5">Team Size</div>
                    <div className={`text-sm font-bold ${getTextColor()}`}>{activeData.employeeCount}</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-gray-400 text-[10px] mb-1.5">Key Operations</div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeData.operations.map((op, index) => (
                      <span 
                        key={index} 
                        className={`px-2 py-0.5 text-[10px] rounded ${getBadgeColor()}`}
                      >
                        {op}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="text-gray-400 text-[10px] mb-1">Facilities</div>
                  <ul className="space-y-1">
                    {activeData.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-1.5">
                        <div className={`mt-0.5 text-[10px] ${getTextColor()}`}>•</div>
                        <span className="text-gray-300 text-[11px]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Google Maps Link */}
            <div className={`p-3 bg-gradient-to-br from-gray-900/90 to-black/40 rounded-lg transition-all duration-100 ${isPulsing ? 'opacity-90' : 'opacity-100'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white text-xs font-bold mb-0.5">View on Google Maps</div>
                  <div className="text-gray-300 text-[10px]">Get directions to this location</div>
                </div>
                <a
                  href={`https://www.google.com/maps?q=${activeData.coordinates}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-gradient-to-r from-gray-800 to-black text-white text-[11px] rounded hover:scale-105 transition-all flex items-center gap-1"
                >
                  <span>Open</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animation */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}