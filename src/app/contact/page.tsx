import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { languages } from '@/lib/languages';
import Newsletter from '@/components/Newsletter';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';

export default function ContactPage() {
  const t = languages.en;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    console.log('Contact form submitted:', data);
    form.reset();
    alert('Thank you for your message! We will contact you soon.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
      <Header t={t.nav} lang="en" />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 px-4 sm:px-6 bg-gradient-to-b from-black via-red-950/10 to-black">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-gradient-to-r from-transparent via-red-500/70 to-transparent"></div>
              <span className="text-red-400 text-xs font-semibold uppercase tracking-wider">Get in Touch</span>
              <div className="w-8 h-px bg-gradient-to-r from-transparent via-red-500/70 to-transparent"></div>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
              {t.contact.title || "Ready to Start Your Next Project?"}
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
              {t.contact.subtitle || "Contact us today to discuss how we can help you achieve your business goals."}
            </p>
          </div>
        </section>

        {/* Contact Grid */}
        <section className="py-12 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="bg-gradient-to-br from-gray-900/40 to-black/30 rounded-2xl border border-gray-800/40 p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-2">Send Us a Message</h2>
                <p className="text-gray-400 text-sm mb-6">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 transition-colors"
                      placeholder="+966 500 000 000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 transition-colors"
                      placeholder="Your Company Name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Message *</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 transition-colors resize-none"
                      placeholder="Tell us about your project or inquiry..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-red-950 to-red-900 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FaPaperPlane className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              </div>
              
              {/* Contact Info & Map */}
              <div className="space-y-6">
                {/* Contact Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="bg-gradient-to-br from-gray-900/40 to-black/30 rounded-xl border border-gray-800/40 p-5 hover:border-red-500/30 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-900/30 to-black/40 flex items-center justify-center">
                        <FaEnvelope className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Email</h3>
                        <p className="text-gray-400 text-sm">Drop us a line</p>
                      </div>
                    </div>
                    <a 
                      href="mailto:Info@energize-sa.com" 
                      className="text-gray-300 hover:text-red-400 transition-colors text-sm"
                    >
                      Info@energize-sa.com
                    </a>
                  </div>
                  
                  {/* Phone */}
                  <div className="bg-gradient-to-br from-gray-900/40 to-black/30 rounded-xl border border-gray-800/40 p-5 hover:border-red-500/30 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-900/30 to-black/40 flex items-center justify-center">
                        <FaPhone className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Phone</h3>
                        <p className="text-gray-400 text-sm">Call us directly</p>
                      </div>
                    </div>
                    <a 
                      href="tel:0126825858" 
                      className="text-gray-300 hover:text-red-400 transition-colors text-sm"
                    >
                      0126825858
                    </a>
                  </div>
                </div>
                
                {/* Location */}
                <div className="bg-gradient-to-br from-gray-900/40 to-black/30 rounded-xl border border-gray-800/40 p-5 hover:border-red-500/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-900/30 to-black/40 flex items-center justify-center">
                      <FaMapMarkerAlt className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Headquarters</h3>
                      <p className="text-gray-400 text-sm">Visit our office</p>
                    </div>
                  </div>
                  <div className="text-gray-300 text-sm">
                    <p className="mb-1">Riyadh, Saudi Arabia</p>
                    <p className="text-gray-400 text-xs">Kingdom of Saudi Arabia</p>
                  </div>
                  
                  {/* Map Placeholder */}
                  <div className="mt-4 h-48 bg-gradient-to-br from-gray-900 to-black rounded-lg border border-gray-800/50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-red-400 text-3xl mb-2">📍</div>
                      <p className="text-gray-400 text-sm">Location Map</p>
                      <p className="text-gray-500 text-xs mt-1">Interactive map would appear here</p>
                    </div>
                  </div>
                </div>
                
                {/* Working Hours */}
                <div className="bg-gradient-to-br from-gray-900/40 to-black/30 rounded-xl border border-gray-800/40 p-5 hover:border-red-500/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-900/30 to-black/40 flex items-center justify-center">
                      <FaClock className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Working Hours</h3>
                      <p className="text-gray-400 text-sm">When we're available</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Sunday - Thursday</span>
                      <span className="text-gray-300">8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Friday - Saturday</span>
                      <span className="text-gray-300">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
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