// Mock data for the Consulta Technologies website
export const industries = [
  {
    id: 1,
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
    id: 2,
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
    title: "Pharma",
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

// --- Certifications (real image-backed cards) ---
export const certifications = [
  {
    id: "iso-9001",
    title: "ISO 9001:2015",
    subtitle: "Quality Management System",
    body: "United Registrar of Systems (URS), UKAS",
    certificateNo: "48953/A/0001/UK/En",
    issuedOn: "2025-07-01",
    validTill: "2028-06-30",
    badge: "/badges/iso-9001.png",
    issuerLogo: "/badges/urs.png",
    file: "/certs/CE-CTPL_ISO Certificate Exp.dt.300628.pdf",
    note:
      "Scope: Sales, Design, Engineering, Application Software Development, Project Commissioning & Services."
  },
  {
    id: "bnf-channel",
    title: "BNF Technology — Channel Partner",
    subtitle: "Authorized Channel Partner (India)",
    body: "BNF Technology Inc.",
    issuedOn: "2023-01-01",
    badge: "/badges/iso-14001.svg", // just a neutral badge frame; replace if you have BNF mark
    file: "/certs/BNF Technology Channel Partner Certificate.pdf",
    note:
      "Scope: Sales, Design, Engineering, Application Software Development, Project Commissioning & Services."
  }
];

// --- Siemens Solution Partner (with real certificate + dates) ---
export const solutionPartner = {
  name: "Siemens Solution Partner",
  scope: ["PCS 7", "WinCC", "Industrial Communication", "Drives"],
  tier: "Solution Partner – Automation Drives",
  since: 2015,
  certificateId: "Process Control System PCS 7",
  link: "https://www.siemens.com/partnerfinder",
  logo: "/logos/siemens-solution-partner.png",
  certificatePdf: "/certs/Solution_partner.pdf",
  // Pulled from the certificate: valid through October 2025.
  validNote: "Certified through Oct 2025",
  highlights: [
    "PCS 7 project delivery & lifecycle services",
    "CEMAT familiarity (classic ‘000’, Mineral ‘001’)",
    "OPC UA/HDA connectivity & gateways",
    "Validated templates and libraries"
  ]
};

// --- Quality & Safety blurbs (unchanged) ---
export const policies = {
  quality:
    "We operate a documented QMS aligned to ISO 9001:2015. Project delivery uses gated reviews, peer checks, and FAT/SAT records for full traceability.",
  safety:
    "We follow ISO 45001:2018 principles. Work permits, LOTO, and JSA are standard—both in commissioning and ongoing service."
};

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
    hours: "Mon to Sat : 10.00 AM - 06.00 PM"
  },
  social: {
    youtube: "https://www.youtube.com/@YourChannel",
    instagram: "https://www.instagram.com/yourhandle",
    linkedin: "https://www.linkedin.com/company/your-company",
    facebook: "https://www.facebook.com/yourpage",
    twitter: "https://twitter.com/yourhandle",
    github: "https://github.com/yourorg",
  },
  solution_partner: solutionPartner,
  certifications_list: certifications,
  policies,

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
  // --- Core automation & OEMs ---
  {
    id: "siemens",
    name: "Siemens",
    logo: "/logos/siemens.svg",
    website: "https://www.siemens.com",
    blurb: "Technology partner for PCS 7, WinCC, and industrial digitalization initiatives.",
    industries: ["Cement", "Power", "Pharma", "Metals"],
    location: "Global",
    since: 2015,
    tags: ["DCS", "PLC", "Drives"]
  },
  {
    id: "abb",
    name: "ABB",
    logo: "/logos/abb.svg",
    website: "https://new.abb.com",
    blurb: "Electrical & automation solutions for heavy industries and utilities.",
    industries: ["Cement", "Metals", "Chemicals", "Power"],
    location: "Global",
    since: 2018,
    tags: ["Electrical", "Drives", "Protection"]
  },
  {
    id: "loesche",
    name: "Loesche",
    logo: "/logos/loesche.png",
    website: "https://www.loesche.com",
    blurb: "Vertical roller mill engineering and grinding technologies.",
    industries: ["Cement", "Mining"],
    location: "Global",
    since: 2013,
    tags: ["Mills", "Process"]
  },
  {
    id: "thyssenkrupp",
    name: "ThyssenKrupp",
    logo: "/logos/thyssenkrupp.png",
    website: "https://www.thyssenkrupp.com",
    blurb: "Plant engineering & EPC partner for process industries.",
    industries: ["Cement", "Metals", "Mining"],
    location: "Global",
    since: 2012,
    tags: ["EPC", "Process", "Engineering"]
  },
  {
    id: "sandvik",
    name: "Sandvik",
    logo: "/logos/sandvik.png",
    website: "https://www.sandvik.com",
    blurb: "Industrial tooling, mining and rock solutions.",
    industries: ["Mining", "Metals"],
    location: "Global",
    since: 2016,
    tags: ["Mining", "Tools"]
  },
  {
    id: "lechler",
    name: "Lechler",
    logo: "/logos/lechler.png",
    website: "https://www.lechler.com",
    blurb: "Industrial spray and nozzle systems for process control.",
    industries: ["Cement", "Steel", "Chemicals"],
    location: "Global",
    since: 2017,
    tags: ["Cooling", "Process"]
  },

  // --- OPC / Connectivity ---
  {
    id: "matrikon",
    name: "Matrikon (Honeywell)",
    logo: "/logos/matrikon.jfif",
    website: "https://www.matrikon.com",
    blurb: "OPC UA/DA/HDA connectivity stack enabling secure data exchange.",
    industries: ["Cement", "Oil & Gas", "Power"],
    location: "Global",
    since: 2016,
    tags: ["OPC", "Connectivity"]
  },
  {
    id: "kepware",
    name: "Kepware (PTC)",
    logo: "/logos/kepware.png",
    website: "https://www.ptc.com/en/products/kepware",
    blurb: "Industrial connectivity platform for multi-vendor PLCs and historians.",
    industries: ["Cement", "FMCG", "Automotive"],
    location: "Global",
    since: 2017,
    tags: ["OPC", "Connectivity"]
  },

  // --- Cement majors / EPC / Building materials ---
  {
    id: "ultratech",
    name: "UltraTech Cement (Aditya Birla)",
    logo: "/logos/ultratech.svg",
    website: "https://www.ultratechcement.com",
    blurb: "India’s largest cement producer with pan-India presence.",
    industries: ["Cement"],
    location: "India",
    since: 2011,
    tags: ["Cement", "Materials"]
  },
  {
    id: "dalmia",
    name: "Dalmia Cement",
    logo: "/logos/dalmia.png",
    website: "https://www.dalmiacement.com",
    blurb: "Leading Indian cement manufacturer focused on sustainability.",
    industries: ["Cement"],
    location: "India",
    since: 2012,
    tags: ["Cement"]
  },
  {
    id: "indiacements",
    name: "The India Cements Ltd",
    logo: "/logos/indiacements.png",
    website: "https://www.indiacements.co.in",
    blurb: "Major cement producer serving South India and beyond.",
    industries: ["Cement"],
    location: "India",
    since: 2010,
    tags: ["Cement"]
  },
  {
    id: "jaypee",
    name: "Jaypee Cement",
    logo: "/logos/jaypee.png",
    website: "https://www.jalindia.com",
    blurb: "Integrated cement and infrastructure group.",
    industries: ["Cement", "Infrastructure"],
    location: "India",
    since: 2010,
    tags: ["Cement"]
  },
  {
    id: "raysut",
    name: "Raysut Cement",
    logo: "/logos/raysut.png",
    website: "https://www.raysutcement.com",
    blurb: "Oman-based cement manufacturer with regional footprint.",
    industries: ["Cement"],
    location: "GCC",
    since: 2014,
    tags: ["Cement"]
  },
  {
    id: "zuari",
    name: "Zuari Cement (Italcementi/Heidelberg)",
    logo: "/logos/zuari.png",
    website: "https://www.zuaricements.com",
    blurb: "Heidelberg Materials group company in India.",
    industries: ["Cement"],
    location: "India",
    since: 2013,
    tags: ["Cement"]
  },
  {
    id: "wonder",
    name: "Wonder Cement",
    logo: "/logos/wonder.png",
    website: "https://www.wondercement.com",
    blurb: "Rajasthan-based cement producer.",
    industries: ["Cement"],
    location: "India",
    since: 2015,
    tags: ["Cement"]
  },
  {
    id: "mangalam",
    name: "Mangalam Cement",
    logo: "/logos/mangalam.png",
    website: "https://www.mangalamcement.com",
    blurb: "BK Birla Group cement company.",
    industries: ["Cement"],
    location: "India",
    since: 2011,
    tags: ["Cement"]
  },
  {
    id: "deccancement",
    name: "Deccan Cements Ltd",
    logo: "/logos/deccan.png",
    website: "https://www.deccancement.com",
    blurb: "Cement manufacturer from South India.",
    industries: ["Cement"],
    location: "India",
    since: 2012,
    tags: ["Cement"]
  },
  {
    id: "pioneer-cement",
    name: "Pioneer Cement Ltd",
    logo: "/logos/pioneer.png",
    website: "https://www.pioneercement.com",
    blurb: "Cement manufacturer with regional presence.",
    industries: ["Cement"],
    location: "Pakistan",
    since: 2014,
    tags: ["Cement"]
  },
  {
    id: "anjani",
    name: "Anjani Portland Cement",
    logo: "/logos/anjani.png",
    website: "https://www.anjanicement.com",
    blurb: "Andhra Pradesh based cement producer.",
    industries: ["Cement"],
    location: "India",
    since: 2012,
    tags: ["Cement"]
  },
  {
    id: "jindalsp",
    name: "Jindal Steel & Power",
    logo: "/logos/jindalsp.svg",
    website: "https://www.jindalsteelpower.com",
    blurb: "Integrated steel and power producer.",
    industries: ["Steel", "Power"],
    location: "India",
    since: 2016,
    tags: ["Steel", "Power"]
  },
  {
    id: "holcim",
    name: "Holcim",
    logo: "/logos/holcim.svg",
    website: "https://www.holcim.com",
    blurb: "Global building materials leader.",
    industries: ["Cement", "Materials"],
    location: "Global",
    since: 2013,
    tags: ["Cement", "Materials"]
  },

  // --- Industrial houses / EPC / Infra ---
  {
    id: "lnt",
    name: "Larsen & Toubro (L&T)",
    logo: "/logos/lnt.svg",
    website: "https://www.larsentoubro.com",
    blurb: "EPC and industrial solutions across process plants.",
    industries: ["Cement", "Power", "Metals", "Oil & Gas"],
    location: "India",
    since: 2011,
    tags: ["EPC", "Infra"]
  },
  {
    id: "walchandnagar",
    name: "Walchandnagar Industries",
    logo: "/logos/walchandnagar.png",
    website: "https://www.walchandnagar.com",
    blurb: "Engineering & manufacturing for industrial plants.",
    industries: ["Cement", "Power"],
    location: "India",
    since: 2010,
    tags: ["Engineering", "Manufacturing"]
  },
  {
    id: "concast",
    name: "Concast",
    logo: "/logos/concast.png",
    website: "https://www.concast.in",
    blurb: "Industrial engineering & EPC solutions.",
    industries: ["Metals", "Cement"],
    location: "India",
    since: 2012,
    tags: ["EPC", "Metals"]
  },

  // --- Energy & utilities ---
  {
    id: "tata",
    name: "Tata",
    logo: "/logos/tata.svg",
    website: "https://www.tata.com",
    blurb: "Diversified industrial group.",
    industries: ["Power", "Steel", "Automotive"],
    location: "India",
    since: 2010,
    tags: ["Group"]
  },
  {
    id: "tatapower",
    name: "Tata Power",
    logo: "/logos/tatapower.svg",
    website: "https://www.tatapower.com",
    blurb: "India’s largest integrated power company.",
    industries: ["Power", "Utilities"],
    location: "India",
    since: 2013,
    tags: ["Power", "Utilities"]
  },
  {
    id: "gail",
    name: "GAIL (India) Limited",
    logo: "/logos/gail.svg",
    website: "https://www.gailonline.com",
    blurb: "India’s leading natural gas company.",
    industries: ["Oil & Gas", "Power"],
    location: "India",
    since: 2014,
    tags: ["Gas", "Pipelines"]
  },

  // --- Metals / Mining / Engineering brands already above (JSW Cement separately as cement) ---
  {
    id: "jsw-cement",
    name: "JSW Cement",
    logo: "/logos/jswcement.svg",
    website: "https://www.jswcement.in",
    blurb: "Leading manufacturer of green cement in India.",
    industries: ["Cement"],
    location: "India",
    since: 2015,
    tags: ["Cement"]
  },

  // --- Pharma / Chemicals / FMCG ---
  {
    id: "johnson-johnson",
    name: "Johnson & Johnson",
    logo: "/logos/jnj.svg",
    website: "https://www.jnj.com",
    blurb: "Healthcare and consumer health products.",
    industries: ["Pharma", "FMCG"],
    location: "Global",
    since: 2016,
    tags: ["Healthcare"]
  },
  {
    id: "dr-reddys",
    name: "Dr. Reddy’s",
    logo: "/logos/drreddys.svg",
    website: "https://www.drreddys.com",
    blurb: "Global pharmaceutical manufacturer.",
    industries: ["Pharma"],
    location: "India",
    since: 2014,
    tags: ["Pharma"]
  },
  {
    id: "wockhardt",
    name: "Wockhardt",
    logo: "/logos/wockhardt.svg",
    website: "https://www.wockhardt.com",
    blurb: "Pharmaceutical and biotechnology company.",
    industries: ["Pharma"],
    location: "India",
    since: 2013,
    tags: ["Pharma", "Biotech"]
  },
  {
    id: "mylan",
    name: "Mylan (Viatris)",
    logo: "/logos/mylan.svg",
    website: "https://www.viatris.com",
    blurb: "Global generics and specialty pharma (now Viatris).",
    industries: ["Pharma"],
    location: "Global",
    since: 2016,
    tags: ["Pharma"]
  },
  {
    id: "pall",
    name: "Pall Corporation",
    logo: "/logos/pall.svg",
    website: "https://www.pall.com",
    blurb: "Filtration and separation solutions for life sciences and industry.",
    industries: ["Pharma", "Chemicals"],
    location: "Global",
    since: 2017,
    tags: ["Filtration", "Process"]
  },
  {
    id: "nocil",
    name: "NOCIL",
    logo: "/logos/nocil.png",
    website: "https://www.nocil.com",
    blurb: "India’s largest rubber chemicals manufacturer.",
    industries: ["Chemicals"],
    location: "India",
    since: 2015,
    tags: ["Chemicals"]
  },
  {
    id: "solvay",
    name: "Solvay",
    logo: "/logos/solvay.svg",
    website: "https://www.solvay.com",
    blurb: "Materials and specialty chemicals.",
    industries: ["Chemicals"],
    location: "Global",
    since: 2016,
    tags: ["Chemicals", "Materials"]
  },
  {
    id: "cocacola",
    name: "Coca-Cola",
    logo: "/logos/cocacola.svg",
    website: "https://www.coca-cola.com",
    blurb: "Beverages and FMCG manufacturing.",
    industries: ["FMCG"],
    location: "Global",
    since: 2013,
    tags: ["FMCG", "Beverages"]
  },
  {
    id: "godrej",
    name: "Godrej",
    logo: "/logos/godrej.svg",
    website: "https://www.godrej.com",
    blurb: "Diversified Indian conglomerate with FMCG and industrial interests.",
    industries: ["FMCG", "Industrial"],
    location: "India",
    since: 2012,
    tags: ["FMCG", "Industrial"]
  },

  // --- Oil & Gas / Petrochem / Metals / Wires ---
  {
    id: "gipl",
    name: "IG Petrochemicals",
    logo: "/logos/igpetro.svg",
    website: "https://www.igpetro.com",
    blurb: "Phthalic Anhydride and petrochemical products.",
    industries: ["Chemicals"],
    location: "India",
    since: 2015,
    tags: ["Petrochemicals"]
  },
  {
    id: "usha-martin",
    name: "Usha Martin",
    logo: "/logos/ushamartin.svg",
    website: "https://www.ushamartin.com",
    blurb: "Steel wire ropes and specialty wires.",
    industries: ["Steel", "Mining", "Oil & Gas"],
    location: "India",
    since: 2014,
    tags: ["Steel", "Wires"]
  },
  {
    id: "raychemrpg",
    name: "Raychem RPG",
    logo: "/logos/raychemrpg.svg",
    website: "https://www.raychemrpg.com",
    blurb: "Energy, power and infrastructure products.",
    industries: ["Power", "Utilities", "Oil & Gas"],
    location: "India",
    since: 2014,
    tags: ["Power", "Cables"]
  },
  {
    id: "gulf-galaxy-iec",
    name: "Galaxy IEC India Pvt. Ltd.",
    logo: "/logos/galaxy-iec.png",
    website: null,
    blurb: "Industrial electrical and engineering company.",
    industries: ["Industrial"],
    location: "India",
    since: null,
    tags: ["Electrical"]
  },
  {
    id: "gail-bajaja",
    name: "Bajaj Group",
    logo: "/logos/bajaj.svg",
    website: "https://www.bajajgroup.org",
    blurb: "Diversified Indian group (electrical, energy, consumer).",
    industries: ["Industrial", "Energy"],
    location: "India",
    since: 2012,
    tags: ["Industrial"]
  },

  // --- Additional cement & infra brands from the board ---
  {
    id: "ltc",
    name: "L&T Constructions",
    logo: "/logos/ltc.svg",
    website: "https://www.lntecc.com",
    blurb: "EPC for large industrial and infra projects.",
    industries: ["Cement", "Power", "Oil & Gas"],
    location: "India",
    since: 2012,
    tags: ["EPC", "Infra"]
  },
  {
    id: "kcp",
    name: "The KCP Group",
    logo: "/logos/kcp.png",
    website: "https://www.kcp.co.in",
    blurb: "Engineering, cement and sugar group.",
    industries: ["Cement", "Sugar"],
    location: "India",
    since: 2013,
    tags: ["Cement", "Engineering"]
  },
  {
    id: "adhunik",
    name: "Adhunik Group",
    logo: "/logos/adhunik.png",
    website: "https://www.adhunikgroup.com",
    blurb: "Steel and power group.",
    industries: ["Steel", "Power"],
    location: "India",
    since: 2013,
    tags: ["Steel", "Power"]
  },
  {
    id: "zuari-italcementi",
    name: "Italcementi / Heidelberg Materials (Zuari)",
    logo: "/logos/italcementi.svg",
    website: "https://www.heidelbergmaterials.com",
    blurb: "Global building materials & cement group.",
    industries: ["Cement"],
    location: "Global",
    since: 2011,
    tags: ["Cement", "Materials"]
  },

  // --- Government / Municipal / City Utilities seen on the board ---
  {
    id: "mcgm",
    name: "Municipal Corporation of Greater Mumbai",
    logo: "/logos/mcgm.png",
    website: "https://portal.mcgm.gov.in",
    blurb: "Municipal utility and infrastructure administration.",
    industries: ["Utilities", "Water"],
    location: "India",
    since: 2018,
    tags: ["Utilities"]
  },
  {
    id: "hpcl",
    name: "Hindustan Petroleum (HP)",
    logo: "/logos/hpcl.svg",
    website: "https://www.hindustanpetroleum.com",
    blurb: "Oil & gas downstream and retail.",
    industries: ["Oil & Gas"],
    location: "India",
    since: 2015,
    tags: ["Refining", "Retail"]
  },

  // --- Misc / Consulting / To verify logos later ---
  {
    id: "blue-green",
    name: "Blue & Green Consultants",
    logo: "/logos/bluegreen.png",
    website: null,
    blurb: "Industrial consulting partner.",
    industries: ["Industrial"],
    location: "India",
    since: null,
    tags: ["Consulting"]
  },
  {
    id: "eco-team-systems",
    name: "ECO Team Systems",
    logo: "/logos/ecoteam.png",
    website: null,
    blurb: "Environmental & utility systems partner.",
    industries: ["Utilities", "Environment"],
    location: "India",
    since: null,
    tags: ["Environment", "Utilities"]
  },
  {
    id: "komal-industries",
    name: "Komal Industries",
    logo: "/logos/komal.png",
    website: null,
    blurb: "Industrial solutions provider.",
    industries: ["Industrial"],
    location: "India",
    since: null,
    tags: ["Industrial"]
  },
  {
    id: "sprea-misr",
    name: "Sprea Misr",
    logo: "/logos/sprea-misr.png",
    website: "https://www.spreamisr.com",
    blurb: "Egypt-based chemicals manufacturer.",
    industries: ["Chemicals"],
    location: "Egypt",
    since: 2014,
    tags: ["Chemicals"]
  },
  {
    id: "zuari-italcementi-group",
    name: "Italcementi Group (Zuari Cement)",
    logo: "/logos/zuari-italcementi.png",
    website: "https://www.heidelbergmaterials.com",
    blurb: "Global cement and materials.",
    industries: ["Cement"],
    location: "Global",
    since: 2011,
    tags: ["Cement"]
  }
];






// keep your other exports too
// export const sampleAssociates = [ /* … */ ];
// // etc.
