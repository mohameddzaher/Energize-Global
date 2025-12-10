// data/companies.ts
export interface Company {
  name: string;
  logo: string;
  url: string;
  description: string;
  industry: string;
}

export const companies: Company[] = [
  {
    name: "Energize Your Business",
    logo: "/images/Energize Your Business.png",
    url: "https://marketing.energize.com",
    description: "Full-service digital marketing agency specializing in Saudi market",
    industry: "Marketing"
  },
  {
    name: "Energize Events",
    logo: "/images/Energize Event.png",
    url: "https://events.energize.com",
    description: "Premium event management and corporate experiences",
    industry: "Events"
  },
  {
    name: "Energize Logistics",
    logo: "/images/Energize Logistics.png",
    url: "https://energize-logistics.com",
    description: "End-to-end logistics and supply chain solutions",
    industry: "Logistics"
  },
  {
    name: "Energize Design",
    logo: "/images/Energize Design.png",
    url: "https://manufacturing.energize.com",
    description: "Industrial manufacturing and production services",
    industry: "Manufacturing"
  },
  {
    name: "Kit Factory",
    logo: "/images/kit Factory.png",
    url: "https://consulting.energize.com",
    description: "Business strategy and management consulting",
    industry: "Consulting"
  },
  {
    name: "Al Dewan",
    logo: "/images/Diwan Adly.png",
    url: "https://tech.energize.com",
    description: "Technology solutions and digital transformation",
    industry: "Technology"
  },
  {
    name: "Energize Agency",
    logo: "/images/Energize Agency.png",
    url: "https://consulting.energize.com",
    description: "Business strategy and management consulting",
    industry: "Consulting"
  },
  {
    name: "Little Leaders",
    logo: "/images/little Leaders.png",
    url: "https://little-leaders.org/",
    description: "Business strategy and management consulting",
    industry: "Consulting"
  },
  {
    name: "Vision",
    logo: "/images/Vision.png",
    url: "https://consulting.energize.com",
    description: "Business strategy and management consulting",
    industry: "Consulting"
  },
];