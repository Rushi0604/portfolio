import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from '../../context/CursorContext';

export const CustomCursor: React.FC = () => {
  const { cursorVariant, cursorText } = useCursor();
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth lagging coordinates for the outer ring
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch / coarse pointer devices
    const checkTouch = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
      setIsTouchDevice(isTouch);
    };
    checkTouch();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  // Variant size and style definitions
  const ringVariants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: 'transparent',
      borderColor: 'rgba(167, 139, 250, 0.4)',
      scale: 1,
    },
    hover: {
      width: 48,
      height: 48,
      backgroundColor: 'rgba(139, 92, 246, 0.08)',
      borderColor: 'rgba(139, 92, 246, 0.8)',
      scale: 1.15,
    },
    portrait: {
      width: 76,
      height: 76,
      backgroundColor: 'rgba(139, 92, 246, 0.25)',
      borderColor: '#a78bfa',
      scale: 1.1,
    },
    project: {
      width: 68,
      height: 68,
      backgroundColor: 'rgba(56, 189, 248, 0.2)',
      borderColor: '#38bdf8',
      scale: 1.1,
    },
    button: {
      width: 44,
      height: 44,
      backgroundColor: 'rgba(139, 92, 246, 0.15)',
      borderColor: '#8b5cf6',
      scale: 1.1,
    },
    copy: {
      width: 70,
      height: 70,
      backgroundColor: 'rgba(52, 211, 153, 0.2)',
      borderColor: '#34d399',
      scale: 1.1,
    },
    link: {
      width: 40,
      height: 40,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 255, 255, 0.5)',
      scale: 1.2,
    },
  };

  const isExpandedWithText = cursorText && (cursorVariant === 'portrait' || cursorVariant === 'project' || cursorVariant === 'copy');

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Central Sharp Dot */}
      <motion.div
        className="fixed top-0 left-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-300 shadow-glow-purple"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      />

      {/* Lagging Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-violet-400/40 backdrop-blur-[1px]"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        variants={ringVariants}
        animate={cursorVariant}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {isExpandedWithText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="text-[10px] font-bold tracking-widest text-white uppercase text-center select-none"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
};
