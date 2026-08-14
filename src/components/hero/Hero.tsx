import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown, Sparkles, Terminal } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { ParticlePortrait } from './ParticlePortrait';
import { useCursor } from '../../context/CursorContext';

export const Hero: React.FC = () => {
  const { setCursorVariant, resetCursor } = useCursor();

  const handleScrollDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-radial-glow-hero"
    >
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Hero Typography & Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start text-left space-y-6"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            <span className="font-mono text-xs text-violet-300 tracking-wider uppercase flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-violet-400" />
              {siteConfig.role}
            </span>
          </div>

          {/* Big Name */}
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white uppercase font-display leading-[1.05]">
              Yash <br className="hidden sm:inline" />
              <span className="text-gradient-purple">Kshatriya</span>
            </h1>
            <p className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-slate-400 uppercase pt-2">
              {siteConfig.headline}
            </p>
          </div>

          {/* Statement */}
          <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-normal">
            {siteConfig.statement}
          </p>

          {/* Quick HUD Coordinates */}
          <div className="flex flex-wrap items-center gap-4 py-1 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5 bg-surface/80 border border-white/[0.06] px-3 py-1.5 rounded-lg">
              <span className="text-violet-400">LOC:</span>
              <span>{siteConfig.coordinates.lat}, {siteConfig.coordinates.lon}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-surface/80 border border-white/[0.06] px-3 py-1.5 rounded-lg">
              <span className="text-sky-400">STATUS:</span>
              <span className="text-slate-300">OPEN TO WORK</span>
            </div>
          </div>

          {/* Action CTAs & Socials */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onMouseEnter={() => setCursorVariant('button')}
              onMouseLeave={resetCursor}
              className="group relative inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl shadow-glow-purple transition-all duration-300 hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 text-violet-200" />
              <span>Explore Selected Work</span>
            </a>

            <div className="flex items-center gap-2">
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                onMouseEnter={() => setCursorVariant('link')}
                onMouseLeave={resetCursor}
                className="p-3 text-slate-300 hover:text-white bg-surface/90 hover:bg-violet-950/40 border border-white/10 hover:border-violet-500/40 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                onMouseEnter={() => setCursorVariant('link')}
                onMouseLeave={resetCursor}
                className="p-3 text-slate-300 hover:text-white bg-surface/90 hover:bg-violet-950/40 border border-white/10 hover:border-violet-500/40 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.email}
                aria-label="Send Email"
                onMouseEnter={() => setCursorVariant('link')}
                onMouseLeave={resetCursor}
                className="p-3 text-slate-300 hover:text-white bg-surface/90 hover:bg-violet-950/40 border border-white/10 hover:border-violet-500/40 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: 3D Interactive Particle Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center items-center"
        >
          <ParticlePortrait imageSrc="/images/yash.png" />
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <a
          href="#about"
          onClick={handleScrollDown}
          onMouseEnter={() => setCursorVariant('button')}
          onMouseLeave={resetCursor}
          aria-label="Scroll to About section"
          className="group flex flex-col items-center gap-1 text-slate-400 hover:text-violet-300 transition-colors"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 group-hover:text-violet-300">
            Scroll
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce text-violet-400" />
        </a>
      </motion.div>
    </section>
  );
};
