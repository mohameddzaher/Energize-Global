// Stats.tsx
import { 
  FaCalendarAlt, 
  FaProjectDiagram, 
  FaBuilding, 
  FaGlobeAmericas 
} from 'react-icons/fa';

export default function Stats({ t }: any) {
  // الداتا الافتراضية بالايقونات
  const defaultStats = [
    { 
      value: "24+", 
      label: "Years Experience", 
      icon: <FaCalendarAlt className="w-6 h-6" /> 
    },
    { 
      value: "500+", 
      label: "Projects Delivered", 
      icon: <FaProjectDiagram className="w-6 h-6" /> 
    },
    { 
      value: "10+", 
      label: "Portfolio Companies", 
      icon: <FaBuilding className="w-6 h-6" /> 
    },
    { 
      value: "4+", 
      label: "Countries Presence", 
      icon: <FaGlobeAmericas className="w-6 h-6" /> 
    }
  ];

  // الداتا النهائية
  const statsData = (t?.items && t.items.length > 0) 
    ? defaultStats.map((defaultStat, index) => ({
        ...defaultStat,
        value: t.items[index]?.value || defaultStat.value,
        label: t.items[index]?.label || defaultStat.label,
      }))
    : defaultStats;

  return (
    <section id='achievements' className="py-12 px-4 sm:px-6 bg-gradient-to-b from-black via-gray-950/30 to-black relative overflow-hidden">
      {/* Red Gradient Waves */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-amber-500/3"></div>
      {/* Diagonal Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_49%,rgba(251,146,60,0.03)_50%,transparent_51%)] bg-[size:20px_20px]"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-red-500/70 to-transparent"></div>
            <span className="text-red-400 text-[11px] font-semibold uppercase tracking-wider">
              {t?.tag || "Our Achievements"}
            </span>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-red-500/70 to-transparent"></div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
            {t?.title || "Achievements in Numbers"}
          </h2>
          <p className="text-gray-300 text-sm max-w-lg mx-auto leading-relaxed">
            {t?.subtitle || "A legacy of excellence and measurable success"}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {statsData.map((stat: any, index: number) => (
            <div
              key={index}
              className="group relative p-4 bg-gradient-to-br from-gray-900/40 to-black/30 rounded-lg border border-gray-800/40 hover:border-red-500/50 transition-all duration-300"
            >
              {/* Red Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/0 via-red-500/10 to-amber-500/0 rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-500"></div>
              
              <div className="relative z-10 text-center">
                <div className="flex justify-center mb-2">
                  <div className="text-red-400/80 group-hover:text-red-300 transition-colors">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1.5 tracking-tight group-hover:text-red-300 transition-colors">
                  {stat.value}
                </div>
                <div className="text-gray-300 text-[11px] font-medium tracking-wider uppercase">
                  {stat.label}
                </div>
              </div>
              
              {/* Decorative Corner */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-br from-red-500/20 to-amber-500/20 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}