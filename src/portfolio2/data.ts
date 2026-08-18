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


export const referenceProjects: ProjectEntry[] = [
  {
    title: "AI Complaint Engine",
    category: "AI-Powered Complaint Classification & Resolution Recommendation",
    tools: "TypeScript, React, NLP, Python, Machine Learning",
    image: "/images/AI-Powered-Complaint-Classification-Resolution-Recommendation-Engine.png",
    githubUrl: "https://github.com/Rushi0604/AI-Powered-Complaint-Classification-Resolution-Recommendation-Engine",
    liveUrl: "https://ai-powered-complaint-classification.vercel.app",
    link: "https://github.com/Rushi0604/AI-Powered-Complaint-Classification-Resolution-Recommendation-Engine",
    video: "video.webm",
    detailKey: "aiComplaint"
  },
  {
    title: "College Management",
    category: "Full-Stack Web Application (2026)",
    tools: "Python, Django, HTML, CSS, JavaScript, MySQL",
    image: "/images/college_management.png",
    githubUrl: "https://github.com/Rushi0604/College_management",
    link: "https://github.com/Rushi0604/College_management",
    video: "video.webm",
    detailKey: "collegeManagement"
  },
  {
    title: "GameHub Online",
    category: "Online Gaming Platform (2025)",
    tools: "HTML, CSS, JavaScript",
    image: "/images/gamehub.png",
    githubUrl: "https://github.com/Rushi0604/GameHub-online",
    link: "https://github.com/Rushi0604/GameHub-online",
    video: "video.webm",
    detailKey: "gameHub"
  },
  {
    title: "Zomato Clone",
    category: "Food Delivery Web Application",
    tools: "HTML, CSS, JavaScript",
    image: "/images/Zomato.png",
    githubUrl: "https://github.com/Rushi0604/Zomato",
    link: "https://github.com/Rushi0604/Zomato",
    video: "video.webm",
    detailKey: "zomato"
  }
];

export interface ProjectDetailEntry {
  overview: string;
  features: string[];
  technologies: string;
  contribution: string;
}

export const projectDetails: Record<string, ProjectDetailEntry> = {
  aiComplaint: {
    overview:
      "An intelligent AI-powered system that automatically analyzes customer complaints using Natural Language Processing (NLP). It classifies complaints into relevant categories, assigns priority levels based on urgency and sentiment, and recommends appropriate resolutions.",
    features: [
      "Automated complaint classification using NLP",
      "Priority level assignment based on urgency & sentiment",
      "Resolution recommendation engine",
      "Interactive dashboard for complaint tracking"
    ],
    technologies:
      "TypeScript, React, Python, Natural Language Processing, Machine Learning",
    contribution:
      "Full-stack development, NLP model integration, frontend architecture and API design."
  },

  collegeManagement: {
    overview:
      "A comprehensive college management system built with Django and Python. It streamlines administrative tasks, student records, faculty management, and academic workflows for educational institutions.",
    features: [
      "Student & faculty record management",
      "Course and subject management",
      "Admin dashboard with role-based access",
      "Attendance and result tracking"
    ],
    technologies:
      "Python, Django, MySQL, HTML, CSS, JavaScript",
    contribution:
      "Full-stack development, database design, backend API and frontend integration."
  },

  gameHub: {
    overview:
      "An online gaming hub platform featuring a collection of browser-based games. Users can browse, play and enjoy multiple games through a clean and responsive web interface.",
    features: [
      "Multiple browser-based games",
      "Clean and responsive UI",
      "Game selection and navigation",
      "Interactive gameplay experience"
    ],
    technologies:
      "HTML, CSS, JavaScript",
    contribution:
      "Frontend development, game logic implementation and UI/UX design."
  },

  zomato: {
    overview:
      "A Zomato-inspired food delivery web application clone. Features a modern, responsive UI with restaurant listings, food menus, and an intuitive ordering experience.",
    features: [
      "Restaurant listing and search",
      "Food menu browsing",
      "Responsive modern UI",
      "Cart and order flow"
    ],
    technologies:
      "HTML, CSS, JavaScript",
    contribution:
      "Frontend development, UI/UX design and responsive layout implementation."
  }
};
