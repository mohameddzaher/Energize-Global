import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { languages } from '@/lib/languages';
import Newsletter from '@/components/Newsletter';
import Image from 'next/image';

export default function InsightsPage() {
  const t = languages.en;
  
  const insights = [
    {
      id: 1,
      title: "The Future of Business in Saudi Arabia",
      category: "Industry Analysis",
      description: "Exploring how Vision 2030 is reshaping the business landscape and creating new opportunities for growth and innovation.",
      date: "March 15, 2024",
      readTime: "5 min read",
      image: "/images/insights/saudi-business.jpg",
    },
    {
      id: 2,
      title: "Sustainable Business Practices in MENA",
      category: "Sustainability",
      description: "How companies are integrating environmental responsibility into their business models while maintaining profitability.",
      date: "March 10, 2024",
      readTime: "4 min read",
      image: "/images/insights/sustainability.jpg",
    },
    {
      id: 3,
      title: "Digital Transformation Success Stories",
      category: "Technology",
      description: "Case studies of Saudi companies that successfully navigated digital transformation and achieved remarkable results.",
      date: "March 5, 2024",
      readTime: "6 min read",
      image: "/images/insights/digital.jpg",
    },
    {
      id: 4,
      title: "Building Resilient Supply Chains",
      category: "Logistics",
      description: "Strategies for creating supply chains that can withstand disruptions and maintain operational continuity.",
      date: "February 28, 2024",
      readTime: "7 min read",
      image: "/images/insights/supply-chain.jpg",
    },
    {
      id: 5,
      title: "Innovation in Saudi Manufacturing",
      category: "Industry",
      description: "How Saudi manufacturers are adopting cutting-edge technologies to compete on a global scale.",
      date: "February 20, 2024",
      readTime: "5 min read",
      image: "/images/insights/manufacturing.jpg",
    },
    {
      id: 6,
      title: "Leadership in Times of Change",
      category: "Leadership",
      description: "Insights from top executives on navigating economic shifts and leading teams through transformation.",
      date: "February 15, 2024",
      readTime: "4 min read",
      image: "/images/insights/leadership.jpg",
    },
  ];

  const featuredInsight = insights[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
      <Header t={t.nav} lang="en" />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 px-4 sm:px-6 bg-gradient-to-b from-black via-red-950/10 to-black">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-gradient-to-r from-transparent via-red-500/70 to-transparent"></div>
              <span className="text-red-400 text-xs font-semibold uppercase tracking-wider">Business Insights</span>
              <div className="w-8 h-px bg-gradient-to-r from-transparent via-red-500/70 to-transparent"></div>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
              Strategic Insights & Analysis
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
              Expert perspectives on business trends, market analysis, and strategic thinking for the Saudi and MENA markets.
            </p>
          </div>
        </section>

        {/* Featured Insight */}
        <section className="py-12 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Featured Insight
              </h2>
              <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                In-depth analysis of the most important business trends
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900/40 to-black/30 rounded-2xl overflow-hidden border border-gray-800/40 hover:border-red-500/30 transition-all duration-300">
              <div className="grid md:grid-cols-2">
                {/* Image */}
                <div className="h-64 md:h-full bg-gradient-to-br from-red-900/20 to-black/40 flex items-center justify-center">
                  <div className="text-5xl text-red-400/50">📊</div>
                </div>
                
                {/* Content */}
                <div className="p-6 md:p-8">
                  <div className="inline-block px-3 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded-full mb-4">
                    {featuredInsight.category}
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                    {featuredInsight.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-4">
                    {featuredInsight.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <span>{featuredInsight.date}</span>
                    <span>{featuredInsight.readTime}</span>
                  </div>
                  
                  <button className="px-5 py-2.5 bg-gradient-to-r from-red-950 to-red-900 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300">
                    Read Full Analysis
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All Insights Grid */}
        <section className="py-12 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Latest Insights
              </h2>
              <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                Stay updated with our latest research and analysis
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {insights.slice(1).map((insight) => (
                <div 
                  key={insight.id}
                  className="bg-gradient-to-br from-gray-900/40 to-black/30 rounded-xl border border-gray-800/40 hover:border-red-500/30 transition-all duration-300 overflow-hidden group"
                >
                  {/* Image */}
                  <div className="h-40 bg-gradient-to-br from-red-900/20 to-black/40 flex items-center justify-center">
                    <div className="text-4xl text-red-400/50">📈</div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-5">
                    <div className="inline-block px-3 py-1 bg-gray-800/50 text-gray-300 text-xs font-semibold rounded-full mb-3">
                      {insight.category}
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                      {insight.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {insight.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{insight.date}</span>
                      <span>{insight.readTime}</span>
                    </div>
                    
                    <button className="w-full mt-4 py-2 text-red-400 hover:text-red-300 text-sm font-medium transition-colors">
                      Read More →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-12 px-4 sm:px-6 bg-gradient-to-b from-black via-gray-950/30 to-black">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                By The Numbers
              </h2>
              <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                Data-driven insights that matter
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "85%", label: "Market Growth Prediction", description: "Saudi non-oil sector by 2030" },
                { value: "$100B", label: "Investment Opportunity", description: "In Saudi tech sector" },
                { value: "45%", label: "Digital Adoption Increase", description: "Across MENA businesses" },
                { value: "60+", label: "Economic Initiatives", description: "Under Vision 2030" },
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="text-center p-4 bg-gradient-to-br from-gray-900/40 to-black/30 rounded-xl border border-gray-800/40"
                >
                  <div className="text-2xl md:text-3xl font-bold text-red-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-300 text-sm font-medium mb-1">
                    {stat.label}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <Newsletter />
      </main>
      
      <Footer t={t.footer} lang="en" />
    </div>
  );
}