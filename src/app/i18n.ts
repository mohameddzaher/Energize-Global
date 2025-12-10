export type Lang = "en" | "ar";

export const languages: Record<Lang, any> = {
  en: {
    // === NAVIGATION ===
    nav: {
      home: "Home",
      about: "About Us",
      services: "Services",
      clients: "Clients",
      business: "Our Companies",
      jobs: "Careers",
      blog: "Insights",
      contact: "Contact",
    },

    // === HERO SECTION ===
    hero: {
      title: "Energize Business Group",
      subtitle: "Driving Growth in Saudi Arabia & MENA Region",
      description:
        "Comprehensive Solutions in Marketing, Event Management, Logistics, and Manufacturing Since 1999",
      cta1: "Explore Our Companies",
      cta2: "Get in Touch",
    },

    // === ABOUT SECTION ===
    aboutPage: {
      title: "About Us",
      description:
        "Pioneering business solutions in Saudi Arabia and the MENA region since 1999",
      visionTitle: "Our Vision",
      visionText:
        "To be the primary catalyst for growth and prosperity of our partners and companies across Saudi Arabia and the Middle East through innovative marketing solutions, impactful events, and integrated logistics and industrial services.",
      missionTitle: "Our Mission",
      missionText:
        "To deliver exceptional value as the leading provider of innovative marketing solutions, brand experiences, event management, logistics, and industrial services in Saudi Arabia and the Middle East.",
      storyTitle: "Our Journey",
      storyText:
        "Since our establishment in 1999, Energize Group has been at the forefront of delivering comprehensive business solutions. We focus on maximizing ROI, enhancing economic growth, and empowering clients with innovative strategies aligned with Vision 2030.",
      stats: {
        years: "24+ Years",
        projects: "500+ Projects",
        companies: "50+ Companies",
        countries: "3+ Countries",
      },
    },

    // === COMPANIES SECTION ===
    companies: {
      title: "Our Portfolio Companies",
      description: "Strategic brands and business units under Energize Group",
      portfolioTag: "Our Portfolio",
    },

    // === STATS SECTION ===
    stats: {
      title: "Achievements in Numbers",
      subtitle: "A legacy of excellence and measurable success",
      items: [
        { value: "24+", label: "Years Experience" },
        { value: "900+", label: "Projects Delivered" },
        { value: "10+", label: "Portfolio Companies" },
        { value: "4+", label: "Countries Presence" },
      ],
    },

    // === VALUES SECTION ===
    values: {
      title: "Core Values",
      subtitle: "Principles that guide our decisions and drive our excellence",
      tag: "Our Values",
      items: [
        {
          title: "Commitment & Reliability",
          description:
            "We commit to making our word a promise and our quality a standard. We build trust through precise, transparent project execution.",
          //   icon: "🤝"
        },
        {
          title: "Excellence & Innovation",
          description:
            "We place creativity at the heart of every project, delivering innovative solutions with non-traditional ideas.",
          //   icon: "💡"
        },
        {
          title: "Passion for Achievement",
          description:
            "We work with passion and accomplish with pride. Every challenge is a new opportunity to demonstrate our capabilities.",
          //   icon: "🔥"
        },
        {
          title: "Team Spirit",
          description:
            "We believe true success is collective work. Our team strength lies in collaboration and working toward one goal.",
          //   icon: "👥"
        },
        {
          title: "Continuous Development",
          description:
            "We continue learning and renewing to stay at the forefront of change, constantly developing our tools and knowledge.",
          //   icon: "📈"
        },
        {
          title: "Responsibility & Sustainability",
          description:
            "We ensure our work positively impacts society and the environment, building a more balanced future aligned with Vision 2030.",
          //   icon: "🌱"
        },
      ],
    },

    // === FOUNDER SECTION ===
    founder: {
      title: "Founder & Chairman",
      tag: "Leadership",
      name: "Mr. Dulaim Al Nasher",
      role: "Founder & Chairman of the Board",
      bio1: "Mr. Dulaim Al Nasher is the founder and chairman of Energize Business with extensive experience in business development and strategic leadership.",
      bio2: "With an entrepreneurial vision aimed at enabling companies to achieve growth and sustainability through innovative solutions and integrated services.",
      bio3: "Thanks to his extensive network and diverse experience, he has built a strong brand that reflects professionalism and quality values.",
    },

    // === CONTACT SECTION ===
    contact: {
      title: "Ready to Start Your Next Project?",
      subtitle:
        "Contact us today to discuss how we can help you achieve your business goals and reach new horizons of success.",
      email: "Info@energize-sa.com",
      phone: "0126825858",
      address: "Jeddah, Saudi Arabia",
      ctaEmail: "Send Email",
      ctaCall: "Call Now",
    },

    // === FOOTER ===
    footer: {
      rights: "All rights reserved",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      quickLinks: "Quick Links",
      ourServices: "Our Services",
      getInTouch: "Get In Touch",
      followUs: "Follow Us",
      subscribeTitle: "Subscribe to Our Newsletter",
      subscribeText:
        "Be the first to know about our latest news and special offers",
      subscribePlaceholder: "Your email address",
      subscribeButton: "Subscribe",
      backToTop: "Back to Top",
    },
  },

  ar: {
    // Empty Arabic translations to ensure only English shows
    nav: {},
    hero: {},
    aboutPage: {},
    companies: {},
    stats: {},
    values: {},
    founder: {},
    contact: {},
    footer: {},
  },
};
