// Mock data for the Consulta Technologies website

export const industries = [
  {
    id: 1,
    title: "Power",
    description: "The power industry is the generation, transmission, distribution and sale of electric power to general public.",
    icon: "⚡",
    slug: "power",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=300&fit=crop",
    features: [
      "Smart Grid Solutions",
      "Renewable Energy Integration", 
      "Power Distribution Automation",
      "Energy Management Systems"
    ]
  },
  {
    id: 2,
    title: "Cement",
    description: "Cement is a binder, a substance used in construction that sets and hardens and can bind other materials together.",
    icon: "🏗️",
    slug: "cement", 
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
    features: [
      "Production Line Automation",
      "Quality Control Systems",
      "Kiln Process Optimization", 
      "Raw Material Handling"
    ]
  },
  {
    id: 3,
    title: "Material Handling",
    description: "Material handling is the movement, storage, control and protection of material during their manufacturing, distribution, consumption and disposal.",
    icon: "📦",
    slug: "material-handling",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop", 
    features: [
      "Conveyor Systems",
      "Robotic Sorting",
      "Warehouse Automation",
      "Inventory Management"
    ]
  },
  {
    id: 4,
    title: "Steel",
    description: "It is a business of processing iron ore into steel, which in its simplest form is an iron-carbon alloy and turning that metal into partially finished products.",
    icon: "🏭",
    slug: "steel",
    image: "https://tse2.mm.bing.net/th/id/OIP.-nI2jL474hmnI1HnP1nWFgHaE8?pid=Api",
    features: [
      "Blast Furnace Control",
      "Rolling Mill Automation", 
      "Quality Testing Systems",
      "Scrap Processing"
    ]
  },
  {
    id: 5,
    title: "Water",
    description: "It provides drinking water and waste water services to residential, commercial and industrial sectors of the economy.",
    icon: "💧",
    slug: "water",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
    features: [
      "Water Treatment Plants",
      "Distribution Networks",
      "Quality Monitoring", 
      "Wastewater Management"
    ]
  },
  {
    id: 6, 
    title: "Chemical / Pharmaceutical",
    description: "These industries are basic industries and it is vital to the economy of the nation. It also provides household chemical and medicine for the national pharmaceutical service.",
    icon: "🧪",
    slug: "chemical-pharmaceutical",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop",
    features: [
      "Process Control Systems",
      "Batch Manufacturing",
      "Compliance Monitoring",
      "Safety Systems"
    ]
  },
  {
    id: 7,
    title: "Food & Beverages", 
    description: "Food and beverage industry produce a consistent quality product with low operating costs.",
    icon: "🍽️",
    slug: "food-beverages",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    features: [
      "Production Line Control",
      "Packaging Automation",
      "Quality Assurance",
      "Cold Chain Management"
    ]
  },
  {
    id: 8,
    title: "Oil & Gas",
    description: "An oil & gas industry is a business entity that engages in the exploration, production, refinement and distribution of oil and gas products.",
    icon: "🛢️", 
    slug: "oil-gas",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    features: [
      "Pipeline Monitoring",
      "Refinery Automation",
      "Safety Systems",
      "Distribution Networks"
    ]
  }
];

export const companyInfo = {
  name: "Consulta Technologies Pvt. Ltd.",
  tagline: "We are an Experienced & Affordable Automation Company!",
  description: "Leading provider of industrial automation solutions with expertise across multiple industries.",
  address: {
    building: "Tower 5, K-Block",
    area: "International Technology Park", 
    location: "Belapur Railway Station Building",
    city: "Navi Mumbai",
    state: "Maharashtra",
    pincode: "400 614"
  },
  contact: {
    phone: "+91 22 27560593",
    email: "info@consulta.in",
    hours: "Mon to Sat :: 10.00 AM - 06.00 PM"
  }
};

export const stats = [
  {
    number: "25+",
    label: "Years of Experience",
    description: "Delivering automation solutions"
  },
  {
    number: "500+", 
    label: "Projects Completed",
    description: "Across various industries"
  },
  {
    number: "50+",
    label: "Expert Engineers", 
    description: "Skilled automation specialists"
  },
  {
    number: "99%",
    label: "Client Satisfaction",
    description: "Proven track record"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    position: "Plant Manager",
    company: "Steel Industries Ltd.",
    message: "Consulta's automation solutions have significantly improved our production efficiency and reduced operational costs.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 2, 
    name: "Priya Sharma",
    position: "Operations Director",
    company: "Chemical Works Pvt.",
    message: "Their expertise in chemical process automation is unmatched. Excellent service and support.",
    image: "https://tse3.mm.bing.net/th/id/OIP.Cf3rSUAqoBhMkJ-HTHq2aAHaLH?r=0&pid=Api"
  },
  {
    id: 3,
    name: "Michael Rodriguez", 
    position: "Chief Engineer",
    company: "Power Solutions Inc.",
    message: "Professional team with deep technical knowledge. They delivered our project on time and within budget.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"
  }
];
export const sampleAssociates = [
  {
    id: "siemens",
    name: "Siemens",
    logo: "/logos/siemens.svg",
    website: "https://www.siemens.com",
    blurb:
      "Technology partner for PCS 7, WinCC, and industrial digitalization initiatives.",
    industries: ["Cement", "Power", "Pharma"],
    location: "Global",
    since: 2015,
    tags: ["DCS", "PLC", "Drives"],
  },
  {
    id: "abb",
    name: "ABB",
    logo: "/logos/abb.svg",
    website: "https://new.abb.com",
    blurb:
      "Electrical & automation solutions for heavy industries and utilities.",
    industries: ["Cement", "Metals", "Chemicals"],
    location: "Global",
    since: 2018,
    tags: ["Electrical", "Drives"],
  },
  {
    id: "matrikon",
    name: "Matrikon (Honeywell)",
    logo: "/logos/matrikon.svg",
    website: "https://www.matrikon.com",
    blurb: "OPC UA/DA/HDA connectivity stack enabling secure data exchange.",
    industries: ["Cement", "Oil & Gas", "Power"],
    location: "Global",
    since: 2016,
    tags: ["OPC", "Connectivity"],
  },
  {
    id: "kepware",
    name: "Kepware (PTC)",
    logo: "/logos/kepware.svg",
    website: "https://www.ptc.com/en/products/kepware",
    blurb:
      "Industrial connectivity platform for multi-vendor PLCs and historians.",
    industries: ["Cement", "FMCG", "Automotive"],
    location: "Global",
    since: 2017,
    tags: ["OPC", "Connectivity"],
  },
];



// keep your other exports too
// export const sampleAssociates = [ /* … */ ];
// // etc.
