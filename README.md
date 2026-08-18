# Rushi Patel — Portfolio

Personal developer portfolio for Rushi Patel, showcasing software engineering, machine learning, and interactive WebGL experiences.

## Overview

This website serves as a personal developer portfolio designed to showcase Rushi Patel's technical capabilities, projects, and design aesthetics. Rushi is a Computer Science Engineering student focused on building software that bridges data-driven intelligence (AI/ML) with modern interactive user interfaces.

## Features

- **Interactive Hero Section**: A WebGL-powered 3D point cloud utilizing Three.js that samples your profile portrait, complete with cursor repulsion physics.
- **Animated Typography**: Smooth typographic entry effects and character-level reveal animations using GSAP.
- **HUD Project Showcase**: A selected work grid containing interactive HUD widgets (interactive maps and telemetry feeds).
- **Categorized Tech Stack**: An interactive grid system displaying technical competencies grouped by category tabs.
- **Responsive Layout**: Designed to adapt natively to all desktop, laptop, tablet, and mobile device screen viewports.
- **Custom Cursor**: A context-aware custom cursor that morphs fluidly to match hovered elements.
- **Confetti Contact Success**: A contact card featuring single-click email copy capabilities celebrated by confetti animations.
- **Resume Download**: Secure, instant local download of the resume document.

## Tech Stack

### Frontend
- React 18
- Vite
- TypeScript / JavaScript

### Styling
- Tailwind CSS (v3)
- CSS Variables (Obsidian Dark & Neon Violet theme)

### Animation & Interaction
- Three.js (WebGL rendering)
- GSAP (typographic entry reveals)
- Framer Motion (layout transitions and scroll-driven page elements)
- Canvas Confetti (contact action success trigger)

### Tools
- Git
- GitHub

## Projects

- **OBRIX (GeoVision AI)**: An intelligent site-readiness platform utilizing Leaflet, PostgreSQL, and PostGIS for spatial catchment analytics. Includes multi-criteria site readiness indices and GIS layer projections.
- **TransitOps (Smart Transport Operations Platform)**: A smart transit operations interface featuring low-latency vehicle telemetry simulation, delay forecasting, and multi-stop optimization routes.

## Design & Experience

The portfolio employs a dark obsidian visual aesthetic accented by deep purple and neon violet gradients. It leverages interactive cursor states, scroll-linked progressive reveals, and WebGL rendering to deliver a modern, HUD-inspired visual experience.

## Resume

The portfolio supports direct offline downloading for the professional resume document:
- **File name**: `Rushi_Patel_Resume.pdf` (saved statically under the web-accessible `public/` directory).

## Connect

- [GitHub](https://github.com/Yash19k)
- [LinkedIn](https://www.linkedin.com/in/yashkshatriya19/)
- [Email](mailto:kshatriyayash19@gmail.com)

## Getting Started

To run the portfolio website locally:

```bash
npm install
npm run dev
```

## Build

To compile and package the portfolio website for production:

```bash
npm run build
```

To preview the production bundle locally:

```bash
npm run preview
```

## Deployment

The project is structured to deploy natively to **Vercel** as a client-side Single Page Application (SPA):
1. Push the repository to GitHub.
2. Log in to Vercel and import the repository.
3. Vercel automatically detects the Vite configuration preset.
4. Click **Deploy** to publish the website.

## Project Structure

```text
src/
├── components/
│   ├── about/
│   ├── contact/
│   ├── hero/
│   ├── layout/
│   ├── projects/
│   └── ui/
├── config/
├── context/
├── hooks/
├── types/
├── utils/
├── App.tsx
├── index.css
└── main.tsx

public/
├── images/
├── video/
├── favicon.svg
└── Rushi_Patel_Resume.pdf
```

## Responsive Design

The portfolio layout is fully responsive and optimized to render correctly across:
- **Desktop**
- **Tablet**
- **Mobile**
