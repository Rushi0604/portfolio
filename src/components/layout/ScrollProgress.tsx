import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent">
      <motion.div
        className="h-full bg-gradient-to-r from-violet-500 via-purple-400 to-sky-400 origin-left shadow-[0_0_8px_rgba(139,92,246,0.8)]"
        style={{ scaleX }}
      />
    </div>
  );
};
