import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { techStackData, techCategories } from '../../config/site';
import { TechTile } from './TechTile';
import { useCursor } from '../../context/CursorContext';

export const TechStack: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { setCursorVariant, resetCursor } = useCursor();

  const filteredTech = activeCategory === 'all'
    ? techStackData
    : techStackData.filter((item) => item.category === activeCategory);

  return (
    <section
      id="stack"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-violet-600/5 rounded-full blur-[130px] pointer-events-none" />

      <SectionHeading
        number="03"
        title="Tech Stack & Skills"
        subtitle="Tools and technologies I use to build, analyze, and ship."
      />

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        {techCategories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              onMouseEnter={() => setCursorVariant('button')}
              onMouseLeave={resetCursor}
              className={`px-4 py-2 text-xs font-mono font-medium uppercase tracking-wider rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-violet-600 text-white shadow-glow-purple border border-violet-400/50'
                  : 'bg-surface/80 text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-white/[0.06]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid of Interactive Tech Tiles */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
      >
        <AnimatePresence mode="popLayout">
          {filteredTech.map((tech, index) => (
            <TechTile key={tech.name} tech={tech} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
