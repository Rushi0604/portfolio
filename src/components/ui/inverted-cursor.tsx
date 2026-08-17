"use client";

import React, { useEffect, useRef, useCallback } from "react";

interface InvertedCursorProps {
  size?: number;
  containerRef: React.RefObject<HTMLElement | null>;
}

export const InvertedCursor: React.FC<InvertedCursorProps> = ({ size = 60, containerRef }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const previousPos = useRef({ x: -size, y: -size });
  const targetPos = useRef({ x: -size, y: -size });
  const isInsideRef = useRef(false);

  const animate = useCallback(() => {
    if (!cursorRef.current) return;

    const currentX = previousPos.current.x;
    const currentY = previousPos.current.y;
    const targetX = targetPos.current.x - size / 2;
    const targetY = targetPos.current.y - size / 2;

    const deltaX = (targetX - currentX) * 0.2;
    const deltaY = (targetY - currentY) * 0.2;

    const newX = currentX + deltaX;
    const newY = currentY + deltaY;

    previousPos.current = { x: newX, y: newY };
    cursorRef.current.style.transform = `translate(${newX}px, ${newY}px)`;

    requestRef.current = requestAnimationFrame(animate);
  }, [size]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if touch device
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = () => {
      isInsideRef.current = true;
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1';
      }
      container.style.cursor = 'none';
    };

    const handleMouseLeave = () => {
      isInsideRef.current = false;
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
      container.style.cursor = '';
    };

    // Listen to document mousemove so cursor follows smoothly even at edges
    document.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      container.style.cursor = '';
    };
  }, [animate, containerRef]);

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none rounded-full bg-white mix-blend-difference z-50"
      style={{
        width: size,
        height: size,
        opacity: 0,
        transition: 'opacity 0.3s',
        top: 0,
        left: 0,
      }}
      aria-hidden="true"
    />
  );
};

export default InvertedCursor;
