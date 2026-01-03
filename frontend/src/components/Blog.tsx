"use client";

import { useState } from 'react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  content?: string;
  tags?: string[];
}

export default function BlogHighlights() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Digital Transformation in Saudi Arabia",
      excerpt: "How Vision 2030 is shaping the future of business technology in the Kingdom...",
      category: "Technology",
      date: "Mar 15, 2024",
      readTime: "5 min read",
      author: "Ahmed Al-Ghamdi",
      content: "Vision 2030 is revolutionizing Saudi Arabia's business landscape through technological innovation and digital infrastructure development. This transformation is creating unprecedented opportunities for growth and efficiency across all sectors, from finance to healthcare.",
      tags: ["Technology", "Vision 2030", "Digital", "Innovation"]
    },
    {
      id: 2,
      title: "Sustainable Business Practices",
      excerpt: "Implementing green initiatives while maintaining profitability and growth...",
      category: "Sustainability",
      date: "Feb 28, 2024",
      readTime: "4 min read",
      author: "Sarah Al-Mansour",
      content: "Modern businesses can achieve both environmental responsibility and financial success through strategic sustainable practices. This article explores practical approaches to green business operations.",
      tags: ["Sustainability", "Green", "Eco-friendly", "Business"]
    },
    {
      id: 3,
      title: "MENA Market Expansion Strategies",
      excerpt: "Key insights for successful business expansion across Middle Eastern markets...",
      category: "Business",
      date: "Feb 10, 2024",
      readTime: "6 min read",
      author: "Khalid Al-Zahrani",
      content: "The MENA region offers diverse opportunities for business expansion. Understanding cultural nuances and market dynamics is key to successful market entry and sustainable growth.",
      tags: ["Business", "MENA", "Expansion", "Strategy"]
    },
    {
      id: 4,
      title: "Logistics Innovation 2024",
      excerpt: "Latest trends in supply chain management and logistics optimization...",
      category: "Logistics",
      date: "Jan 25, 2024",
      readTime: "3 min read",
      author: "Mohammed Al-Rashid",
      content: "From AI-powered routing to sustainable packaging, logistics innovation is transforming supply chains. Discover the latest trends shaping the industry.",
      tags: ["Logistics", "Supply Chain", "Innovation", "Technology"]
    },
    {
      id: 5,
      title: "AI in Business Decision Making",
      excerpt: "How artificial intelligence is revolutionizing corporate strategy and operations...",
      category: "Technology",
      date: "Apr 5, 2024",
      readTime: "7 min read",
      author: "Noura Al-Faisal",
      content: "Artificial intelligence is no longer just a buzzword - it's actively transforming how businesses make decisions and optimize operations across various sectors.",
      tags: ["AI", "Technology", "Decision Making", "Automation"]
    },
    {
      id: 6,
      title: "Economic Diversification in GCC",
      excerpt: "Strategies for reducing oil dependency and building resilient economies...",
      category: "Business",
      date: "Mar 28, 2024",
      readTime: "5 min read",
      author: "Faisal Al-Khalifa",
      content: "GCC countries are successfully diversifying their economies through strategic investments in technology, tourism, and renewable energy sectors.",
      tags: ["GCC", "Economy", "Diversification", "Investment"]
    }
  ];

  const categories = ['All', 'Technology', 'Business', 'Logistics', 'Sustainability', 'Marketing'];

  const filteredPosts = blogPosts.filter(post => 
    activeCategory === 'All' || post.category === activeCategory
  );

  // Function to handle post selection
  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
  };

  // Function to close post details
  const handleCloseDetails = () => {
    setSelectedPost(null);
  };

  // Function to show more posts (يمكن تطويرها لاحقاً)
  const handleShowMore = () => {
    // بدلاً من alert، يمكننا إضافة منطق لتحميل المزيد
    // أو يمكننا تغييرها لزر يفتح الـ modal مع رسالة
    setSelectedPost({
      id: 0,
      title: "More Articles Coming Soon",
      excerpt: "We're constantly updating our insights with the latest industry analysis and expert opinions.",
      category: "Updates",
      date: "Coming Soon",
      readTime: "Stay Tuned",
      author: "Editorial Team",
      content: "Our team is working hard to bring you more valuable insights and analysis. Check back regularly for new articles covering the latest trends in business, technology, and innovation across the MENA region.",
      tags: ["Coming Soon", "Updates", "Stay Tuned"]
    });
  };

  return (
    <section className="py-12 px-4 sm:px-6 bg-gradient-to-b from-black to-gray-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent"></div>
            <span className="text-red-400 text-xs font-semibold uppercase tracking-wider">Insights</span>
            <div className="w-10 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent"></div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
            Latest Insights
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
            Expert perspectives on business, technology, and innovation
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setSelectedPost(null);
              }}
              className={`px-4 py-1.5 rounded-full text-xs transition-all ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-red-800 to-red-950 text-white'
                  : 'bg-gray-900/30 text-gray-400 border border-gray-800/30 hover:border-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Modal for Post Details */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative max-w-2xl w-full bg-gradient-to-br from-gray-900 to-black rounded-lg border border-gray-800 p-6">
              {/* Close Button */}
              <button
                onClick={handleCloseDetails}
                className="absolute top-4 right-4 text-gray-400  hover:text-white transition-colors"
              >
                <span className="text-2xl">×</span>
              </button>

              {/* Modal Content */}
              <div className="mb-4">
                <span className="text-red-400 text-xs bg-red-500/10 px-2 py-0.5 rounded inline-block mb-3">
                  {selectedPost.category}
                </span>
                <h3 className="text-white text-xl font-bold mb-4">{selectedPost.title}</h3>
                
                <div className="flex items-center gap-4 mb-6 text-gray-400 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-800 to-black border border-gray-800/50 flex items-center justify-center">
                      {selectedPost.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span>{selectedPost.author}</span>
                  </div>
                  <span>{selectedPost.date}</span>
                  <span>{selectedPost.readTime}</span>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 mb-6">{selectedPost.content}</p>
                  
                  {selectedPost.tags && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedPost.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-full border border-gray-700"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-800">
                <button
                  onClick={handleCloseDetails}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl border border-gray-700 hover:border-gray-500 transition-all duration-300 cursor-pointer"
                >
                  {selectedPost.id === 0 ? 'Back to Articles' : 'Close'}
                </button>
                <button
                  onClick={() => {
                    // يمكن إضافة وظيفة المشاركة هنا
                    if (navigator.share) {
                      navigator.share({
                        title: selectedPost.title,
                        text: selectedPost.excerpt,
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success('Link copied to clipboard!');
                    }
                  }}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-950 to-red-900 text-white rounded-xl border border-red-700 hover:border-red-500 transition-all duration-300 cursor-pointer"
                >
                  Share Article
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredPosts.slice(0, 3).map((post) => (
            <button
              key={post.id}
              onClick={() => handlePostClick(post)}
              className="group text-left p-5 bg-gradient-to-br from-gray-900/50 to-black/40 rounded-lg border border-gray-800/50 hover:border-red-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-red-900/10"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-red-400 text-xs bg-red-500/10 px-2 py-0.5 rounded">
                  {post.category}
                </span>
                <span className="text-gray-500 text-xs">{post.date}</span>
              </div>
              
              <h3 className="text-white text-base font-bold mb-2 group-hover:text-red-300 transition-colors duration-300 line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-gray-400 text-xs mb-4 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-800/30">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-800 to-black border border-gray-800/50 flex items-center justify-center text-xs">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-gray-400 text-xs">{post.author}</span>
                </div>
                <div className="text-gray-500 text-xs flex items-center gap-1">
                  <span>⏱️</span>
                  {post.readTime}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Additional Posts List - Now as clickable items */}
        <div className="space-y-3">
          {filteredPosts.slice(3).map((post) => (
            <button
              key={post.id}
              onClick={() => handlePostClick(post)}
              className="w-full text-left p-4 bg-gradient-to-br from-gray-900/30 to-black/20 rounded-lg border border-gray-800/30 hover:border-gray-700/50 hover:bg-gray-900/50 transition-all duration-300 hover:shadow-md hover:shadow-gray-900/20"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-red-400 text-xs bg-red-500/10 px-2 py-0.5 rounded">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-xs">{post.date}</span>
                  </div>
                  <h4 className="text-white text-sm font-bold mb-1 line-clamp-2 group-hover:text-red-300 transition-colors duration-300">
                    {post.title}
                  </h4>
                  <p className="text-gray-400 text-xs line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
                <div className="text-gray-500 text-xs ml-4 flex items-center gap-1">
                  <span>⏱️</span>
                  {post.readTime}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Explore Insights Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleShowMore}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-900 to-black border border-gray-800 text-white text-sm font-semibold rounded-lg hover:border-red-900 hover:shadow-lg hover:shadow-red-900/20 transition-all duration-300 group"
          >
            <span>Explore More Insights</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}