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
    url: "https://energize-sa.com/",
    description: "A marketing agency driving growth through strategy and creative branding.",
    industry: "Marketing"
  },
  {
    name: "Energize Events",
    logo: "/images/Energize Event.png",
    url: "https://eevent-sa.com/",
    description: "Premium event management and production",
    industry: "Events"
  },
  {
    name: "Energize Logistics",
    logo: "/images/Energize logistic logo.png",
    url: "https://energize-logistics.com",
    description: "Smart supply chain and distribution solutions",
    industry: "Logistics"
  },
  {
    name: "Energize Design",
    logo: "/images/Energize Design.png",
    url: "https://energize-designs.com",
    description: "Interior design combines function with style",
    industry: "Design"
  },
  {
    name: "Kit Factory",
    logo: "/images/Kit Factory.png",
    url: "/under-construction/kit-factory",
    description: "Modular construction and building systems",
    industry: "Construction"
  },
  {
    name: "Al Dewan",
    logo: "/images/Diwan Adly.png",
    url: "/under-construction/al-dewan",
    description: "Cultural and governmental advisory services",
    industry: "Consulting"
  },
  {
    name: "Energize Agency",
    logo: "/images/Energize Agency.png",
    url: "/under-construction/energize-agency",
    description: "Creative branding and advertising agency",
    industry: "Advertising"
  },
  {
    name: "Little Leaders",
    logo: "/images/Little Leaders.png",
    url: "https://little-leaders.org/",
    description: "Nurturing young minds to become tomorrow's role models",
    industry: "Education"
  },
  {
    name: "Energize Tech Solutions",
    logo: "/images/ets.png",
    url: "https://ets-ksa.com/",
    description: "Technology solutions and digital transformation services",
    industry: "Technology"
  },
];
