export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  features?: string[];
  metrics?: { label: string; value: string }[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  visualType: 'map' | 'telemetry' | 'vision' | 'pipeline';
}

export interface TechItem {
  name: string;
  category: 'languages' | 'aiml' | 'web' | 'datagis' | 'tools';
  role: string; // e.g. "ML • Data • Backend"
  iconName: string;
  level?: string;
  highlight?: boolean;
}

export interface SiteConfig {
  name: string;
  firstName: string;
  lastName: string;
  headline: string;
  role: string;
  subrole: string;
  statement: string;
  email: string;
  socials: {
    github: string;
    linkedin: string;
    email: string;
    twitter?: string;
  };
  githubUsername: string;
  resumeUrl: string;
  coordinates: {
    lat: string;
    lon: string;
    status: string;
    focus: string;
  };
}
