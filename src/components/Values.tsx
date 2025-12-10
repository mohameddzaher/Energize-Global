import { 
  FaShieldAlt,        // بدل Handshake
  FaLightbulb, 
  FaFire, 
  FaUsers, 
  FaChartLine, 
  FaLeaf 
} from 'react-icons/fa';

// Values.tsx
export default function Values({ t }: any) {
  // الداتا الافتراضية بالايقونات الملونة بشكل احترافي
  const defaultValues = [
    {
      title: "Commitment & Reliability",
      description: "We commit to making our word a promise and our quality a standard. We build trust through precise, transparent project execution.",
      icon: <FaShieldAlt className="w-4 h-4 text-red-400" />,
      color: "from-red-500/20 to-red-600/10"
    },
    {
      title: "Excellence & Innovation",
      description: "We place creativity at the heart of every project, delivering innovative solutions with non-traditional ideas.",
      icon: <FaLightbulb className="w-4 h-4 text-amber-400" />,
      color: "from-amber-500/20 to-yellow-600/10"
    },
    {
      title: "Passion for Achievement",
      description: "We work with passion and accomplish with pride. Every challenge is a new opportunity to demonstrate our capabilities.",
      icon: <FaFire className="w-4 h-4 text-orange-400" />,
      color: "from-orange-500/20 to-red-600/10"
    },
    {
      title: "Team Spirit",
      description: "We believe true success is collective work. Our team strength lies in collaboration and working toward one goal.",
      icon: <FaUsers className="w-4 h-4 text-emerald-400" />,
      color: "from-emerald-500/20 to-green-600/10"
    },
    {
      title: "Continuous Development",
      description: "We continue learning and renewing to stay at the forefront of change, constantly developing our tools and knowledge.",
      icon: <FaChartLine className="w-4 h-4 text-cyan-400" />,
      color: "from-cyan-500/20 to-blue-600/10"
    },
    {
      title: "Responsibility & Sustainability",
      description: "We ensure our work positively impacts society and the environment, building a more balanced future aligned with Vision 2030.",
      icon: <FaLeaf className="w-4 h-4 text-green-400" />,
      color: "from-green-500/20 to-emerald-600/10"
    },
  ];

  // الداتا النهائية
  const valuesData = (t?.items && t.items.length > 0) 
    ? defaultValues.map((defaultItem, index) => ({
        ...defaultItem,
        title: t.items[index]?.title || defaultItem.title,
        description: t.items[index]?.description || defaultItem.description,
      }))
    : defaultValues;

  return (
    <section className="py-12 px-4 sm:px-6 bg-gradient-to-b from-black via-gray-950/40 to-black relative overflow-hidden">
      {/* Black/Red Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/5 via-transparent to-black"></div>
      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-10"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-red-500/70 to-transparent"></div>
            <span className="text-red-400 text-[11px] font-semibold uppercase tracking-wider">{t?.tag || "Our Values"}</span>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-red-500/70 to-transparent"></div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
            {t?.title || "Core Values"}
          </h2>
          <p className="text-gray-300 text-sm max-w-xl mx-auto leading-relaxed">
            {t?.subtitle || "Principles that guide our decisions and drive our excellence"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {valuesData.map((value: any, index: number) => (
            <div
              key={index}
              className="group relative p-4 bg-gradient-to-br from-gray-900/60 to-black/50 rounded-lg border border-gray-800/60 hover:border-red-500/30 transition-all duration-300"
            >
              {/* Red Glow Background على الهافر فقط */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-red-500/0 via-red-500/5 to-amber-500/0 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
              
              <div className="relative">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-md bg-gradient-to-br ${value.color} border border-gray-800/60 flex items-center justify-center flex-shrink-0 transition-all duration-300`}>
                    <span className="group-hover:scale-105 transition-transform duration-300">
                      {value.icon}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white text-sm font-bold mb-2 group-hover:text-red-300 transition-colors tracking-tight leading-tight">
                      {value.title}
                    </h3>
                    <p className="text-gray-300 text-xs leading-relaxed tracking-normal line-clamp-3">
                      {value.description}
                    </p>
                  </div>
                </div>
                
                {/* Decorative Line */}
                <div className="mt-3 pt-3 border-t border-gray-800/50 group-hover:border-red-500/20 transition-colors">
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">
                    Core Principle
                  </div>
                </div>
              </div>
              
              {/* Corner Accent */}
              <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br from-red-500/20 to-amber-500/10 group-hover:bg-gradient-to-br group-hover:from-red-500/40 group-hover:to-amber-500/20 transition-all duration-300"></div>
            </div>
          ))}
        </div>
        
        {/* Bottom Quote */}
        <div className="mt-8 p-4 bg-gradient-to-r from-red-500/10 to-amber-500/5 rounded-lg border border-red-500/20 max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="text-red-400 text-lg">
              <FaLightbulb className="w-5 h-5" />
            </div>
            <p className="text-gray-300 text-xs italic">
              Our values are the foundation of everything we do, guiding us towards excellence and meaningful impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}