# Yash Kshatriya — Interactive Creative Developer Portfolio

A production-quality personal portfolio website for **Yash Kshatriya** (Computer Science Engineering student specializing in AI/ML & Full-Stack Development).

Features a signature **interactive 3D particle portrait** powered by Three.js that samples Yash's pixel portrait, scroll-driven typography reveals, a desktop internal project showcase with interactive live simulations (including the flagship **OBRIX GeoVision AI** platform), a categorized tech stack matrix, and live GitHub activity with a 52-week purple contribution heatmap.

---

## 🚀 Live Demo & Tech Stack

- **Core**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, CSS Variables, Glassmorphism, Dark Obsidian Theme
- **3D & Particles**: Three.js (`three`), BufferGeometry particle point cloud, radial physics
- **Animation & Motion**: Framer Motion (scroll-linked word reveal, spring cursor, layout transitions)
- **Icons**: Lucide React
- **Deployment Platform**: Vercel-ready

---

## 📂 Project Architecture

```text
portfolio/
├── public/
│   ├── images/
│   │   └── yash.png              # Source portrait for 3D particle sampling & fallback
│   ├── favicon.svg               # Futuristic monogram SVG favicon
│   └── resume.pdf                # Place your PDF resume here
├── src/
│   ├── config/
│   │   └── site.ts               # ⭐ Centralized personal info, socials, projects, skills
│   ├── context/
│   │   └── CursorContext.tsx     # Context-aware custom cursor provider
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx        # Sticky blur navigation + mobile drawer
│   │   │   ├── Footer.tsx        # Minimalist footer with quick links
│   │   │   ├── CustomCursor.tsx  # Smooth spring lag cursor with morphing badges
│   │   │   └── ScrollProgress.tsx# Top scroll progress indicator
│   │   ├── hero/
│   │   │   ├── Hero.tsx          # Large typography, role badges, action buttons
│   │   │   └── ParticlePortrait.tsx # Three.js 3D pixel particle system & click explosion
│   │   ├── about/
│   │   │   └── About.tsx         # Scroll-driven progressive typography reveal & HUD cards
│   │   ├── projects/
│   │   │   ├── Projects.tsx      # Showcase container with sticky desktop progress tracker
│   │   │   ├── ProjectCard.tsx   # Project cards with tag pills and action links
│   │   │   └── ProjectVisual.tsx # Interactive simulations (Obrix GIS Map, TransitOps WS, etc.)
│   │   ├── stack/
│   │   │   ├── TechStack.tsx     # Combined Tech Stack & Skills with category tabs
│   │   │   └── TechTile.tsx      # Interactive tiles with hover lift & glowing border
│   │   ├── github/
│   │   │   ├── GithubActivity.tsx# GitHub dashboard with metrics & featured repos
│   │   │   ├── ContributionGraph.tsx # Purple 52-week contribution heatmap
│   │   │   └── RepoCard.tsx      # Repository cards with live stars, forks, tags
│   │   ├── contact/
│   │   │   └── Contact.tsx       # Bold statement, one-click email copy & confetti celebration
│   │   └── ui/
│   │       └── SectionHeading.tsx# Section headers with numerical indices
│   ├── hooks/
│   │   ├── useScrollSpy.ts       # Active section tracking for navbar
│   │   └── useGithubData.ts      # GitHub public API fetching with session caching
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces
│   ├── App.tsx                   # Main layout container
│   ├── index.css                 # Theme tokens, custom scrollbar, animations
│   └── main.tsx                  # React DOM root
├── .env.example
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🛠️ Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build Locally
```bash
npm run preview
```

---

## ⚙️ Configuration & Customization Guide

All personal data, links, and content are managed in **one central file**:

👉 **[`src/config/site.ts`](file:///d:/Portfolio/src/config/site.ts)**

### 1. Updating Personal Information & Social Links
Open `src/config/site.ts` to customize:
- `name`: Your full name (`Yash Kshatriya`)
- `role`: Professional title
- `statement`: Hero value proposition
- `email`: Contact email address
- `socials`: URLs for GitHub, LinkedIn, etc.
- `githubUsername`: Your GitHub handle (used for fetching public repositories)
- `resumeUrl`: Link to your resume (e.g. `/resume.pdf` or external Google Drive / cloud URL)

### 2. Updating Profile Image
Place your portrait at:
```text
public/images/yash.png
```
The Three.js particle system will automatically load the image, sample the pixel colors and coordinates, and build the 3D particle system!

### 3. Adding or Modifying Projects
In `src/config/site.ts`, edit the `projectsData` array:
```typescript
{
  id: 'obrix',
  number: '01',
  title: 'OBRIX',
  subtitle: 'GeoVision AI',
  category: 'Geospatial Intelligence • AI / ML • Full-Stack',
  description: '...',
  technologies: ['React', 'Django', 'PostgreSQL', 'PostGIS', 'Leaflet', 'Python'],
  githubUrl: 'https://github.com/yourusername/obrix',
  liveUrl: 'https://your-live-demo.com',
  featured: true,
  visualType: 'map', // 'map' | 'telemetry' | 'vision' | 'pipeline'
}
```

### 4. Environment Variables
Copy `.env.example` to `.env` if you want to override configurations:
```bash
cp .env.example .env
```
Available variables:
- `VITE_GITHUB_USERNAME`
- `VITE_EMAIL`
- `VITE_LINKEDIN_URL`
- `VITE_RESUME_URL`

---

## 🌐 Deploying to Vercel

The portfolio is built to be 100% production-ready for **Vercel**:

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "feat: build interactive creative developer portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/portfolio.git
git push -u origin main
```

### Step 2: Import into Vercel
1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **"Add New..."** → **"Project"**.
3. Select your `portfolio` GitHub repository.
4. Vercel will automatically detect:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. (Optional) Add any environment variables defined in `.env.example`.
6. Click **Deploy**.

Future pushes to `main` will automatically trigger instant deployments!

---

## ♿ Accessibility & Performance

- **Prefers Reduced Motion**: Automatically simplifies animations and disables particle explosion for users who prefer reduced motion.
- **Mobile First & Touch Friendly**: Custom cursor is disabled automatically on touch devices (`pointer: coarse`).
- **WebGL Fallback**: If WebGL is not supported, the page gracefully displays an optimized high-resolution portrait card with zero blank screens.
- **Code Splitting**: Optimized chunks via Vite `manualChunks` for lightning fast load times.

---

## 📄 License
MIT © 2026 Yash Kshatriya.
