import React, { useEffect, useRef } from "react";
import { ImageAtomizer } from "./ImageAtomizer";
import "./ReferenceImageParticles.css";

interface ReferenceImageParticlesProps {
  src: string;
  alt?: string;
  className?: string;
  imageWidth?: number;
  imageHeight?: number;
}

export const ReferenceImageParticles: React.FC<ReferenceImageParticlesProps> = ({
  src,
  alt = "Image Particles",
  className = "",
  imageWidth,
  imageHeight
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const atomizerRef = useRef<ImageAtomizer | null>(null);
  const containerId = useRef(`image-atomizer-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize ImageAtomizer on the canvas element inside this container
    const instance = new ImageAtomizer(src, {
      elementId: containerId.current,
      particleGap: 0,
      particleSize: 2,
      restless: false,
      timeScale: 0.5,
      enableOffscreenWorker: false,
      enablePerfLog: false,
      imageWidth,
      imageHeight,
      onInitialized: () => {
        if (containerRef.current) {
          containerRef.current.classList.add("has-initialized");
        }
      }
    });

    atomizerRef.current = instance;

    // Handle window resize events to recalculate canvas dimensions
    const handleResize = () => {
      if (atomizerRef.current) {
        atomizerRef.current.resize();
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (atomizerRef.current) {
        atomizerRef.current.destroy();
        atomizerRef.current = null;
      }
    };
  }, [src, imageWidth, imageHeight]);

  return (
    <div
      ref={containerRef}
      id={containerId.current}
      className={`image-atomizer-container ${className}`}
    >
      <canvas className="atomizer" aria-label={alt}></canvas>
      <span className="atomizer-loader"></span>
    </div>
  );
};

export default ReferenceImageParticles;
