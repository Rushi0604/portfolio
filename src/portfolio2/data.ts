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
  detailKey: string;
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
    githubUrl: "https://github.com/Yash19k/Obrix-Location-Intelligence-Platform",
    liveUrl: "https://obrix-frontend.onrender.com/",
    link: "https://github.com/Yash19k/Obrix-Location-Intelligence-Platform",
    video: "video.webm",
    detailKey: "obrix"
  },
  {
    title: "AI-Powered Learning Platform",
    category: "Web Application (2025)",
    tools: "HTML, CSS, JavaScript, Bootstrap, AI",
    image: "/images/radix.png",
    githubUrl: "https://github.com/Yash19k/Academix",
    link: "https://github.com/Yash19k/Academix",
    video: "video.webm",
    detailKey: "learningPlatform"
  },
  {
    title: "Logistics Management System",
    category: "Java Application (2025)",
    tools: "Java, JDBC, MySQL, Google Maps API",
    image: "/images/bond.png",
    githubUrl: "https://github.com/Yash19k/LMS",
    link: "https://github.com/Yash19k/LMS",
    video: "video.webm",
    detailKey: "logistics"
  },
  {
    title: "TransitOps",
    category: "Smart Transport Operations Platform",
    tools: "React, TypeScript, Python, FastAPI, WebSockets, PostgreSQL, Tailwind CSS, Scikit-learn",
    image: "/images/placeholder.webp",
    githubUrl: "https://github.com/Yash19k/TransitOps-Smart-Transport-Operations-Platform",
    link: "https://github.com/Yash19k/TransitOps-Smart-Transport-Operations-Platform",
    video: "video.webm",
    detailKey: "transitOps"
  }
];

export interface ProjectDetailEntry {
  overview: string;
  features: string[];
  technologies: string;
  contribution: string;
}

export const projectDetails: Record<string, ProjectDetailEntry> = {
  obrix: {
    overview:
      "An AI-powered geospatial platform designed to analyze locations and provide intelligent site-readiness insights.",
    features: [
      "Geospatial site analysis",
      "Location intelligence",
      "Interactive map visualization",
      "AI-generated insights"
    ],
    technologies:
      "React, Django REST Framework, PostgreSQL, PostGIS, Leaflet",
    contribution:
      "Full-stack development, geospatial integration, frontend architecture and API integration."
  },

  learningPlatform: {
    overview:
      "A smart learning platform designed to provide students with structured learning resources and AI-assisted learning.",
    features: [
      "Video learning",
      "Notes",
      "Quizzes",
      "AI chatbot"
    ],
    technologies:
      "HTML, CSS, JavaScript, Bootstrap, AI",
    contribution:
      "Frontend development and application architecture."
  },

  logistics: {
    overview:
      "A Java-based logistics management application for managing users, logistics operations and distance-based fare calculations.",
    features: [
      "Admin and user roles",
      "Logistics management",
      "Database integration",
      "Distance-based fare calculation"
    ],
    technologies:
      "Java, JDBC, MySQL, Google Maps API",
    contribution:
      "Application development, database integration and API integration."
  },

  transitOps: {
    overview:
      "A smart transportation operations platform designed to improve visibility and management of transport operations.",
    features: [
      "Transport operation management",
      "Route monitoring",
      "Operational insights",
      "Interactive dashboard"
    ],
    technologies:
      "React, Django, PostgreSQL",
    contribution:
      "Full-stack development and system integration."
  }
};
