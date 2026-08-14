import { ProjectItem, TechItem, SiteConfig } from '../types';

export const siteConfig: SiteConfig = {
  name: 'Yash Kshatriya',
  firstName: 'Yash',
  lastName: 'Kshatriya',
  headline: 'AI / ML • FULL-STACK • COMPUTER SCIENCE',
  role: 'AI / ML & Full-Stack Developer',
  subrole: 'Computer Science Engineering Student',
  statement: 'Building intelligent software, exploring AI, and turning ideas into real-world products.',
  email: import.meta.env.VITE_EMAIL || 'yashkshatriya@example.com',
  githubUsername: import.meta.env.VITE_GITHUB_USERNAME || 'yashkshatriya',
  resumeUrl: import.meta.env.VITE_RESUME_URL || '/resume.pdf',
  socials: {
    github: import.meta.env.VITE_GITHUB_URL || 'https://github.com/yashkshatriya',
    linkedin: import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com/in/yashkshatriya',
    email: `mailto:${import.meta.env.VITE_EMAIL || 'yashkshatriya@example.com'}`,
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
    githubUrl: 'https://github.com/yashkshatriya/obrix-geovision',
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
    githubUrl: 'https://github.com/yashkshatriya/transitops',
    featured: true,
    visualType: 'telemetry',
  },
  {
    id: 'neurovision',
    number: '03',
    title: 'NeuroVision AI',
    subtitle: 'Edge Vision & Imagery Intelligence',
    category: 'Computer Vision • Deep Learning • PyTorch',
    description:
      'An accelerated computer vision pipeline designed for automated satellite imagery classification, feature extraction, and high-accuracy object segmentation.',
    longDescription:
      'Implements custom convolutional architectures and transfer learning backbones (ResNet, UNet) optimized with ONNX runtime for rapid inference on high-resolution multi-spectral imagery.',
    technologies: [
      'Python',
      'PyTorch',
      'OpenCV',
      'FastAPI',
      'Docker',
      'React',
      'NumPy',
      'GDAL',
    ],
    features: [
      'Multi-spectral satellite image normalization & cloud mask removal',
      'Semantic segmentation for land-use and infrastructure detection',
      'Optimized ONNX inference backend wrapped in containerized REST API',
    ],
    metrics: [
      { label: 'mIoU Score', value: '88.4%' },
      { label: 'Inference Speed', value: '28ms/frame' },
      { label: 'Model Params', value: '14.2M' },
    ],
    liveUrl: '',
    githubUrl: 'https://github.com/yashkshatriya/neurovision-ai',
    featured: false,
    visualType: 'vision',
  },
  {
    id: 'datapulse',
    number: '04',
    title: 'DataPulse Studio',
    subtitle: 'Stream Processing & ETL Studio',
    category: 'Data Engineering • Analytics • Real-Time Systems',
    description:
      'A streamlined event processing studio for constructing high-throughput data pipelines, schema validation, real-time metrics aggregation, and anomaly alerts.',
    longDescription:
      'Designed to ingest structured telemetry streams, execute sliding-window aggregations, detect statistical outliers, and provide visual observability dashboards.',
    technologies: [
      'Python',
      'PostgreSQL',
      'Docker',
      'React',
      'Tailwind CSS',
      'Chart.js',
      'Pandas',
    ],
    features: [
      'Sliding window aggregations for continuous streaming metrics',
      'Z-score & Isolation Forest statistical anomaly detection',
      'Interactive pipeline DAG visualizer with throughput monitoring',
    ],
    metrics: [
      { label: 'Throughput', value: '10k events/s' },
      { label: 'Alert Latency', value: '< 120ms' },
    ],
    liveUrl: '',
    githubUrl: 'https://github.com/yashkshatriya/datapulse-studio',
    featured: false,
    visualType: 'pipeline',
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
