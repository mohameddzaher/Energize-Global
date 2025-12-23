import { 
  FaShieldAlt, 
  FaLightbulb, 
  FaFire, 
  FaUsers, 
  FaChartLine, 
  FaLeaf 
} from 'react-icons/fa';

// Values.tsx
export default function Values({ t }: any) {
  // الداتا الافتراضية
  const defaultValues = [
    {
      title: "Commitment & Reliability",
      description: "We commit to making our word a promise and our quality a standard.",
      icon: <FaShieldAlt className="w-4 h-4 text-red-400" />,
      color: "from-red-500/20 to-red-600/10"
    },
    {
      title: "Excellence & Innovation",
      description: "We place creativity at the heart of every project, delivering innovative solutions.",
      icon: <FaLightbulb className="w-4 h-4 text-red-400" />,
      color: "from-red-500/20 to-red-600/10"
    },
    {
      title: "Passion for Achievement",
      description: "We work with passion and accomplish with pride. Every challenge is an opportunity.",
      icon: <FaFire className="w-4 h-4 text-red-400" />,
      color: "from-red-500/20 to-red-600/10"
    },
    {
      title: "Team Spirit",
      description: "We believe true success is collective work toward one goal.",
      icon: <FaUsers className="w-4 h-4 text-red-400" />,
      color: "from-red-500/20 to-red-600/10"
    },
    {
      title: "Continuous Development",
      description: "We continue learning to stay at the forefront of change.",
      icon: <FaChartLine className="w-4 h-4 text-red-400" />,
      color: "from-red-500/20 to-red-600/10"
    },
    {
      title: "Responsibility & Sustainability",
      description: "We ensure our work positively impacts society and the environment.",
      icon: <FaLeaf className="w-4 h-4 text-red-400" />,
      color: "from-red-500/20 to-red-600/10"
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
    <section className="py-12 px-4 sm:px-6 bg-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent"></div>
            <span className="text-red-600 text-xs font-semibold uppercase tracking-wider">{t?.tag || "Our Values"}</span>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent"></div>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            {t?.title || "Core Values"}
          </h2>
          <p className="text-gray-600 text-sm max-w-md mx-auto">
            {t?.subtitle || "Principles that guide our decisions and drive our excellence"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {valuesData.map((value: any, index: number) => (
            <div
              key={index}
              className="group relative p-3 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 hover:border-red-500/40 transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Red Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/10 to-amber-500/5 rounded-lg blur opacity-0 group-hover:opacity-60 transition duration-300 "></div>
              
              <div className="relative p-1 cursor-pointer">
                <div className="flex items-start gap-2  mb-2">
                  <div className={`w-8 h-8 rounded-md bg-gradient-to-br ${value.color} border border-gray-700 flex items-center justify-center flex-shrink-0`}>
                    <span className="group-hover:scale-110 transition-transform duration-300">
                      {value.icon}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white text-xs font-bold mt-2 group-hover:text-red-300 transition-colors">
                      {value.title}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-300 text-xs leading-relaxed mb-2">
                  {value.description}
                </p>
                
                {/* Decorative Line */}
                <div className="pt-2 border-t border-gray-700 group-hover:border-red-500/30 transition-colors">
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider">
                    Core Principle
                  </div>
                </div>
              </div>
              
              {/* Corner Accent */}
              <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-red-700/90 to-amber-500/10 group-hover:scale-150 transition-transform duration-300"></div>
            </div>
          ))}
        </div>
        
        {/* Bottom Quote - أصغر */}
        <div className="mt-6 p-3 bg-gradient-to-r from-red-500/10 to-amber-500/5 rounded-lg border border-red-500/20 max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            <div className="text-red-400">
              <FaLightbulb className="w-4 h-4" />
            </div>
            <p className="text-gray-800 text-xs italic">
              Our values are the foundation of everything we do, guiding us towards excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}