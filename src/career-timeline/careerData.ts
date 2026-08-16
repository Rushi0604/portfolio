export interface CareerEntry {
  position: string;
  company: string;
  period: string;
  description: string;
  side: "left" | "right";
}

export const careerData: CareerEntry[] = [
  {
    position: "Completed Class 12",
    company: "Anand Niketan Maninagar",
    period: "2024",
    description: "Completed my Class 12 education and began my journey toward Computer Science and technology.",
    side: "left"
  },
  {
    position: "Started B.Tech CSE",
    company: "LJ University",
    period: "2024",
    description: "Started my B.Tech in Computer Science & Engineering, building a foundation in programming, databases, data structures, and software development.",
    side: "right"
  },
  {
    position: "Full-Stack Development",
    company: "Web Development & Projects",
    period: "2025",
    description: "Started building practical full-stack applications while exploring frontend, backend, databases, APIs, and modern web technologies.",
    side: "left"
  },
  {
    position: "Started AI/ML Journey",
    company: "Artificial Intelligence & Machine Learning",
    period: "2025",
    description: "Began developing my skills in AI and Machine Learning through structured learning, experimentation, and hands-on projects.",
    side: "right"
  },
  {
    position: "Built Multiple Projects",
    company: "Projects & Real-World Development",
    period: "2026",
    description: "Built multiple projects across full-stack development, AI/ML, geospatial applications, and software engineering while applying my skills to practical problems.",
    side: "left"
  },
  {
    position: "Seeking Full-Stack & AI/ML Internship",
    company: "Currently Looking for Opportunities",
    period: "2026",
    description: "Looking for internship opportunities in Full-Stack Development and AI/ML where I can apply my skills to real-world projects, contribute to a development team, and continue growing as a developer.",
    side: "right"
  }
];
