import React from 'react';
import { motion } from 'framer-motion';
import { TechItem } from '../../types';
import { useCursor } from '../../context/CursorContext';
import {
  Code,
  Cpu,
  Globe,
  Database,
  Terminal,
  Sparkles,
  Binary,
} from 'lucide-react';

interface TechTileProps {
  tech: TechItem;
  index: number;
}

const getTechIcon = (category: string) => {
  switch (category) {
    case 'languages':
      return <Binary className="w-5 h-5 text-violet-400" />;
    case 'aiml':
      return <Cpu className="w-5 h-5 text-violet-300" />;
    case 'web':
      return <Globe className="w-5 h-5 text-sky-400" />;
    case 'datagis':
      return <Database className="w-5 h-5 text-emerald-400" />;
    case 'tools':
      return <Terminal className="w-5 h-5 text-amber-400" />;
    default:
      return <Code className="w-5 h-5 text-violet-400" />;
  }
};

export const TechTile: React.FC<TechTileProps> = ({ tech, index }) => {
  const { setCursorVariant, resetCursor } = useCursor();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.03 }}
      onMouseEnter={() => setCursorVariant('hover')}
      onMouseLeave={resetCursor}
      className={`group relative p-5 rounded-2xl bg-surface/75 border border-white/[0.07] hover:border-violet-500/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow-purple flex flex-col justify-between overflow-hidden select-none ${
        tech.highlight ? 'bg-gradient-to-b from-surface to-violet-950/20' : ''
      }`}
    >
      {/* Top row: Icon & Highlight Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] group-hover:bg-violet-500/20 group-hover:border-violet-500/40 transition-colors">
          {getTechIcon(tech.category)}
        </div>
        {tech.highlight && (
          <span className="flex items-center gap-1 font-mono text-[10px] text-violet-300 bg-violet-500/10 px-2 py-0.5 rounded-full border border-violet-500/20">
            <Sparkles className="w-2.5 h-2.5" /> Core
          </span>
        )}
      </div>

      {/* Tech Name */}
      <div className="space-y-1">
        <h4 className="text-base font-bold text-white tracking-wide font-display group-hover:text-violet-200 transition-colors">
          {tech.name}
        </h4>
        <div className="text-xs font-mono text-slate-400 group-hover:text-slate-300 transition-colors flex items-center gap-1">
          <span className="text-violet-400">//</span> {tech.role}
        </div>
      </div>

      {/* Subtle corner light bar */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/0 group-hover:via-violet-500/50 to-transparent transition-all duration-500" />
    </motion.div>
  );
};
