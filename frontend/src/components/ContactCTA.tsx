export default function ContactCTA({ t }: any) {
  const contactData = t || {};
  
  return (
    <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-gray-950 to-black">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-gradient-to-br from-gray-900/80 to-black/90 rounded-2xl  p-8 md:p-10 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.1)_1px,_transparent_0)] bg-[size:40px_40px]"></div>
          </div>
          
          {/* Subtle red gradient overlay */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-red-600/3 via-transparent to-transparent rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-white text-2xl md:text-2xl font-bold mb-5 tracking-tight">
              {contactData.title || "Ready to Start Your Next Project?"}
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8 text-sm leading-relaxed">
              {contactData.subtitle || "Contact us today to discuss how we can help you achieve your business goals."}
            </p>
            
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href={`mailto:${contactData.email || "Info@energize-sa.com"}`}
                className="px-7 py-3 bg-gradient-to-r from-gray-900 to-black border border-gray-800 text-white font-semibold rounded-xl hover:border-red-900 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300 text-xs tracking-wide"
              >
                {contactData.ctaEmail || "Send Email"}
              </a>
              <a
                href={`tel:${contactData.phone || "0126825858"}`}
                className="px-7 py-3 bg-gradient-to-r from-red-600/20 to-amber-600/10 backdrop-blur-sm border border-red-500/30 text-white font-semibold rounded-xl hover:border-red-900 hover:text-red-300 transition-all duration-300 text-xs tracking-wide"
              >
                {contactData.ctaCall || "Call Now"}
              </a>
            </div>
            
            <div className="mt-10 pt-7 border-t border-gray-800/50">
              <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                <div className="text-center">
                  <div className="text-gray-500 text-xs mb-1 tracking-wide">EMAIL</div>
                  <div className="text-white text-sm font-medium">{contactData.email || "Info@energize-sa.com"}</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-500 text-xs mb-1 tracking-wide">PHONE</div>
                  <div className="text-white text-sm font-medium">{contactData.phone || "0126825858"}</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-500 text-xs mb-1 tracking-wide">HEADQUARTERS</div>
                  <div className="text-white text-sm font-medium">{contactData.address || "Jeddah, Saudi Arabia"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}