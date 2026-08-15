import { ProjectItem, TechItem, SiteConfig } from '../types';

export const siteConfig: SiteConfig = {
  name: 'Yash Kshatriya',
  firstName: 'Yash',
  lastName: 'Kshatriya',
  headline: 'AI / ML • FULL-STACK • COMPUTER SCIENCE',
  role: 'AI / ML & Full-Stack Developer',
  subrole: 'Computer Science Engineering Student',
  statement: 'Building intelligent software, exploring AI, and turning ideas into real-world products.',
  email: import.meta.env.VITE_EMAIL || 'kshatriyayash19@gmail.com',
  githubUsername: import.meta.env.VITE_GITHUB_USERNAME || 'Yash19k',
  resumeUrl: import.meta.env.VITE_RESUME_URL || '/Yash_Kshatriya_Resume.pdf',
  socials: {
    github: import.meta.env.VITE_GITHUB_URL || 'https://github.com/Yash19k',
    linkedin: import.meta.env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/in/yashkshatriya19/',
    email: `mailto:${import.meta.env.VITE_EMAIL || 'kshatriyayash19@gmail.com'}`,
  },
  coordinates: {
    lat: '19.0760° N',
    lon: '72.8777° E',
    status: 'AVAILABLE FOR COLLABORATION',
    focus: 'INTELLIGENT SYSTEMS & FULL-STACK',
  },
};

export const aboutContent = {
  quoteLead: "I'm a Computer Science Engineering student",
  quoteMiddle: "focused on building software, exploring AI/ML,",
  quoteEnd: "and turning ideas into practical products.",
  fullText: "I'm a Computer Science Engineering student focused on building software, exploring AI/ML, and turning ideas into practical products. I bridge data-driven intelligence with modern interactive interfaces.",
  subBio: "I thrive at the intersection of machine learning algorithms, geospatial intelligence, and sleek frontend engineering. Passionate about architecting scalable systems that solve tangible spatial and data engineering challenges.",
};

export const projectsData: ProjectItem[] = [
  {
    id: 'obrix',
    number: '01',
    title: 'OBRIX',
    subtitle: 'GeoVision AI',
    category: 'Geospatial Intelligence • AI / ML • Full-Stack',
    description:
      'An intelligent site-readiness and location-intelligence platform that analyzes geographic, accessibility, infrastructure, and surrounding-area data to help evaluate candidate locations.',
    longDescription:
      'Engineered with a full geospatial stack, Obrix processes spatial datasets using PostGIS and Leaflet to compute composite readiness indices, infrastructure catchment zones, and multi-factor location scoring in real-time.',
    technologies: [
      'React',
      'Django',
      'Django REST Framework',
      'PostgreSQL',
      'PostGIS',
      'Leaflet',
      'OpenStreetMap',
      'Python',
      'Geospatial Processing',
    ],
    features: [
      'Automated site suitability scoring with multi-criteria spatial weights',
      'Dynamic radius catchment analysis & amenity proximity calculation',
      'Interactive raster & vector GIS layers with Leaflet / OpenStreetMap',
      'REST API backend for geospatial queries and GeoJSON payloads',
    ],
    metrics: [
      { label: 'Suitability Index', value: '94.8%' },
      { label: 'Spatial Latency', value: '< 85ms' },
      { label: 'Layers Processed', value: '12+ GIS' },
    ],
    liveUrl: '', // Add live URL when deployed
    githubUrl: 'https://github.com/Yash19k/obrix-geovision',
    featured: true,
    visualType: 'map',
  },
  {
    id: 'transitops',
    number: '02',
    title: 'TransitOps',
    subtitle: 'Smart Transport Operations Platform',
    category: 'Real-Time Telemetry • Fleet Analytics • Full-Stack',
    description:
      'A comprehensive smart transport platform engineered for real-time fleet tracking, delay prediction models, congestion telemetry, and dynamic route optimization.',
    longDescription:
      'Built to handle continuous GPS feeds with low-latency WebSocket communication. Integrates predictive machine learning models to forecast junction delays and provide intelligent dispatch recommendations.',
    technologies: [
      'React',
      'TypeScript',
      'Python',
      'FastAPI',
      'WebSockets',
      'PostgreSQL',
      'Tailwind CSS',
      'Scikit-learn',
    ],
    features: [
      'Sub-second live vehicle telemetry broadcasting via WebSockets',
      'Historical delay prediction pipeline using regression ensembles',
      'Dynamic multi-stop dispatch routing with live traffic simulation',
    ],
    metrics: [
      { label: 'Telemetry Ping', value: '50ms' },
      { label: 'Delay Accuracy', value: '91.2%' },
      { label: 'Fleet Capacity', value: '500+ Units' },
    ],
    liveUrl: '',
    githubUrl: 'https://github.com/Yash19k/transitops',
    featured: true,
    visualType: 'telemetry',
  },
];

export const techStackData: TechItem[] = [
  // Languages
  { name: 'Python', category: 'languages', role: 'ML • Data • Backend', iconName: 'python', highlight: true },
  { name: 'Java', category: 'languages', role: 'OOP • Core Architecture', iconName: 'java' },
  { name: 'C', category: 'languages', role: 'Systems • Algorithms', iconName: 'c' },
  { name: 'JavaScript', category: 'languages', role: 'Frontend • Interactive Web', iconName: 'javascript' },
  { name: 'TypeScript', category: 'languages', role: 'Type-Safe Applications', iconName: 'typescript', highlight: true },
  { name: 'SQL', category: 'languages', role: 'Relational Queries • PostGIS', iconName: 'sql', highlight: true },

  // AI / ML
  { name: 'PyTorch', category: 'aiml', role: 'Deep Learning • Neural Nets', iconName: 'pytorch', highlight: true },
  { name: 'TensorFlow', category: 'aiml', role: 'Model Training • ML', iconName: 'tensorflow' },
  { name: 'Scikit-learn', category: 'aiml', role: 'Classical ML • Pipelines', iconName: 'scikitlearn', highlight: true },
  { name: 'Pandas', category: 'aiml', role: 'Data Manipulation', iconName: 'pandas' },
  { name: 'NumPy', category: 'aiml', role: 'Numerical Computing', iconName: 'numpy' },

  // Web
  { name: 'React', category: 'web', role: 'Interactive SPAs • UI', iconName: 'react', highlight: true },
  { name: 'Django', category: 'web', role: 'Full-Stack Backend', iconName: 'django', highlight: true },
  { name: 'Django REST Framework', category: 'web', role: 'API Engineering', iconName: 'drf' },
  { name: 'Tailwind CSS', category: 'web', role: 'Modern UI Styling', iconName: 'tailwind', highlight: true },
  { name: 'Three.js / WebGL', category: 'web', role: '3D Graphics & Particles', iconName: 'threejs', highlight: true },
  { name: 'HTML5 & CSS3', category: 'web', role: 'Modern Web Standards', iconName: 'htmlcss' },

  // Data / GIS
  { name: 'PostgreSQL', category: 'datagis', role: 'Relational Database', iconName: 'postgresql', highlight: true },
  { name: 'PostGIS', category: 'datagis', role: 'Spatial Database Extension', iconName: 'postgis', highlight: true },
  { name: 'Leaflet / OSM', category: 'datagis', role: 'Interactive Mapping', iconName: 'leaflet', highlight: true },
  { name: 'QGIS', category: 'datagis', role: 'Spatial Data Analysis', iconName: 'qgis' },
  { name: 'Google Earth Engine', category: 'datagis', role: 'Planetary Geospatial Data', iconName: 'gee' },
  { name: 'GDAL & Rasterio', category: 'datagis', role: 'Geospatial Raster/Vector', iconName: 'gdal' },

  // Tools / DevOps
  { name: 'Git', category: 'tools', role: 'Version Control', iconName: 'git', highlight: true },
  { name: 'GitHub', category: 'tools', role: 'CI/CD & Collaboration', iconName: 'github', highlight: true },
  { name: 'Docker', category: 'tools', role: 'Containerization', iconName: 'docker', highlight: true },
  { name: 'VS Code', category: 'tools', role: 'Primary Development IDE', iconName: 'vscode' },
  { name: 'Figma', category: 'tools', role: 'UI / UX Prototyping', iconName: 'figma' },
];

export const techCategories = [
  { id: 'all', label: 'All Technologies' },
  { id: 'languages', label: 'Languages' },
  { id: 'aiml', label: 'AI / ML' },
  { id: 'web', label: 'Web & 3D' },
  { id: 'datagis', label: 'Data & GIS' },
  { id: 'tools', label: 'Tools & DevOps' },
] as const;
