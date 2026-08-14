import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { siteConfig, aboutContent } from '../../config/site';
import { Cpu, Globe, Layers, Compass } from 'lucide-react';

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  isHighlighted?: boolean;
}

const Word: React.FC<WordProps> = ({ children, progress, range, isHighlighted = false }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const color = useTransform(
    progress,
    range,
    [
      'rgba(148, 163, 184, 0.25)',
      isHighlighted ? '#a78bfa' : '#f8fafc',
    ]
  );

  return (
    <motion.span
      style={{ opacity, color }}
      className={`inline-block mr-[0.28em] mb-1.5 transition-colors duration-150 ${
        isHighlighted ? 'font-semibold' : ''
      }`}
    >
      {children}
    </motion.span>
  );
};

export const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.3'],
  });

  const statementWords = aboutContent.fullText.split(' ');
  const highlightedTerms = ['Computer', 'Science', 'Engineering', 'software,', 'AI/ML,', 'practical', 'products.', 'intelligence', 'interactive'];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />

      <SectionHeading
        number="01"
        title="About Me"
        subtitle="Bridging data-driven intelligence with modern creative development."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Scroll-Driven Progressive Typography */}
        <div className="lg:col-span-8 space-y-8">
          <div className="p-8 sm:p-10 rounded-2xl bg-surface/70 border border-white/[0.08] backdrop-blur-xl shadow-2xl relative overflow-hidden">
            {/* Ambient corner highlight */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-2 mb-6 font-mono text-xs text-slate-400">
              <Compass className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-violet-400 font-semibold">CORE IDENTITY</span>
              <span>// PERSPECTIVE</span>
            </div>

            {/* Scroll-Revealed Statement */}
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.35] tracking-tight font-display">
              {statementWords.map((word, i) => {
                const start = i / statementWords.length;
                const end = start + 1 / statementWords.length;
                const isHighlight = highlightedTerms.some((t) => word.toLowerCase().includes(t.toLowerCase().replace(/[,.]/g, '')));

                return (
                  <Word
                    key={i}
                    progress={scrollYProgress}
                    range={[start, end]}
                    isHighlighted={isHighlight}
                  >
                    {word}
                  </Word>
                );
              })}
            </h3>

            {/* Sub-Bio */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 pt-6 border-t border-white/[0.06] text-slate-300 text-sm sm:text-base leading-relaxed"
            >
              {aboutContent.subBio}
            </motion.p>
          </div>
        </div>

        {/* Right: Technical HUD Cards */}
        <div className="lg:col-span-4 space-y-4">
          {/* Card 1: Intelligent Systems */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-5 rounded-xl bg-surface/60 border border-white/[0.06] hover:border-violet-500/30 transition-all duration-300 group"
          >
            <div className="flex items-center gap-3 mb-2.5">
              <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20 transition-colors">
                <Cpu className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
                AI & Machine Learning
              </h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Deep neural networks, computer vision on multi-spectral imagery, regression ensembles, and real-time inference optimization.
            </p>
          </motion.div>

          {/* Card 2: Geospatial & Full-Stack */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-5 rounded-xl bg-surface/60 border border-white/[0.06] hover:border-violet-500/30 transition-all duration-300 group"
          >
            <div className="flex items-center gap-3 mb-2.5">
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 group-hover:bg-sky-500/20 transition-colors">
                <Globe className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
                Geospatial Engineering
              </h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              PostGIS spatial indexing, Leaflet/Mapbox interactive vector layers, site suitability analytics, and raster processing pipelines.
            </p>
          </motion.div>

          {/* Card 3: Modern Creative Dev */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-5 rounded-xl bg-surface/60 border border-white/[0.06] hover:border-violet-500/30 transition-all duration-300 group"
          >
            <div className="flex items-center gap-3 mb-2.5">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                <Layers className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
                Interactive Engineering
              </h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              High-performance React/TypeScript applications, Three.js particle dynamics, fluid layout animations, and accessible UX.
            </p>
          </motion.div>

          {/* HUD Metadata Card */}
          <div className="p-4 rounded-xl bg-violet-950/20 border border-violet-500/20 font-mono text-[11px] text-violet-300 space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">STUDENT:</span>
              <span className="font-semibold text-white">CSE @ B.Tech</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">COORDINATES:</span>
              <span>{siteConfig.coordinates.lat}, {siteConfig.coordinates.lon}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">STATUS:</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                AVAILABLE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
