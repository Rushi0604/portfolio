export interface CareerEntry {
  position: string;
  company: string;
  period: string;
  description: string;
  side: "left" | "right";
}

export const careerData: CareerEntry[] = [
  {
    position: "Computer Analyst",
    company: "CID, West Bengal",
    period: "2025",
    description: "Building production-ready application backends using Node.js, PostgreSQL, MySQL, and MongoDB. Developing applications using Python.",
    side: "left"
  },
  {
    position: "Master of Computer Applications",
    company: "Meghnad Saha Institute of Technology",
    period: "2025",
    description: "Expected graduation in July 2025.",
    side: "right"
  },
  {
    position: "BSc in Computer Science",
    company: "University of Calcutta",
    period: "2023",
    description: "Graduated from Narasinha Dutt College.",
    side: "left"
  },
  {
    position: "Certifications",
    company: "NPTEL & Forage",
    period: "2024-25",
    description: "Privacy and Security in Online Social Media (NPTEL), Introduction to Programming C (NPTEL), Deloitte Australia Data Analytics Job Simulation (Forage).",
    side: "right"
  }
];
