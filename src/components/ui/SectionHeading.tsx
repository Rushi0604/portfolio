import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  number: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  title,
  subtitle,
  align = 'left',
  className = '',
}) => {
  return (
    <div
      className={`space-y-2 mb-12 md:mb-16 ${
        align === 'center' ? 'text-center mx-auto' : 'text-left'
      } ${className}`}
    >
      {/* Section index indicator */}
      <div className={`flex items-center gap-2 font-mono text-xs text-violet-400 tracking-widest uppercase ${
        align === 'center' ? 'justify-center' : ''
      }`}>
        <span className="text-violet-500">//</span>
        <span>{number}</span>
        <span className="w-8 h-[1px] bg-violet-500/30" />
      </div>

      {/* Main Title */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase font-display"
      >
        {title}
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm sm:text-base text-slate-400 max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
