export interface CareerEntry {
  position: string;
  company: string;
  period: string;
  description: string;
}

export interface ProjectEntry {
  title: string;
  category: string;
  tools: string;
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  knowMoreUrl?: string;
  link?: string;
  video?: string;
}

export const referenceExperiences: CareerEntry[] = [
  {
    position: "Computer Analyst",
    company: "CID, West Bengal",
    period: "2025",
    description: "Building production-ready application backends using Node.js, PostgreSQL, MySQL, and MongoDB. Developing applications using Python."
  },
  {
    position: "Master of Computer Applications",
    company: "Meghnad Saha Institute of Technology",
    period: "2025",
    description: "Expected graduation in July 2025."
  },
  {
    position: "BSc in Computer Science",
    company: "University of Calcutta",
    period: "2023",
    description: "Graduated from Narasinha Dutt College."
  },
  {
    position: "Certifications",
    company: "NPTEL & Forage",
    period: "2024-25",
    description: "Privacy and Security in Online Social Media (NPTEL), Introduction to Programming C (NPTEL), Deloitte Australia Data Analytics Job Simulation (Forage)."
  }
];

export const referenceProjects: ProjectEntry[] = [
  {
    title: "Obrix",
    category: "AI-Powered Geospatial Location Intelligence Platform",
    tools: "React, Django REST Framework, PostgreSQL, PostGIS, Leaflet",
    image: "/images/Solidx.png",
    githubUrl: "https://github.com/Yash19k/obrix-geovision",
    link: "https://github.com/Yash19k/obrix-geovision",
    video: "video.webm"
  },
  {
    title: "AI-Powered Learning Platform",
    category: "Web Application (2025)",
    tools: "HTML, CSS, JavaScript, Bootstrap, AI",
    image: "/images/radix.png",
    link: "",
    video: "video.webm"
  },
  {
    title: "Logistics Management System",
    category: "Java Application (2025)",
    tools: "Java, JDBC, MySQL, Google Maps API",
    image: "/images/bond.png",
    link: "",
    video: "video.webm"
  },
  {
    title: "TransitOps",
    category: "Smart Transport Operations Platform",
    tools: "React, TypeScript, Python, FastAPI, WebSockets, PostgreSQL, Tailwind CSS, Scikit-learn",
    image: "/images/placeholder.webp",
    githubUrl: "https://github.com/Yash19k/transitops",
    link: "https://github.com/Yash19k/transitops",
    video: "video.webm"
  }
];
