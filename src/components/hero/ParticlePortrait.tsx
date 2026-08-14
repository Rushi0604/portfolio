import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useCursor } from '../../context/CursorContext';
import { Sparkles, RefreshCw } from 'lucide-react';

interface ParticlePortraitProps {
  imageSrc?: string;
  className?: string;
}

export const ParticlePortrait: React.FC<ParticlePortraitProps> = ({
  imageSrc = '/images/yash.png',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setCursorVariant, resetCursor } = useCursor();

  const [hasWebGL, setHasWebGL] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isExploded, setIsExploded] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Click to explode');
  const [pointCount, setPointCount] = useState<number>(0);

  // Animation & state refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Particle data arrays
  const particleCountRef = useRef<number>(0);
  const targetPositionsRef = useRef<Float32Array | null>(null);
  const currentPositionsRef = useRef<Float32Array | null>(null);
  const scatterPositionsRef = useRef<Float32Array | null>(null);
  const explosionVectorsRef = useRef<Float32Array | null>(null);
  const colorsRef = useRef<Float32Array | null>(null);

  // Interaction physics state
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const scrollRef = useRef<number>(0);
  const assembleProgressRef = useRef<number>(0);
  const explodeFactorRef = useRef<number>(0);
  const isExplodingRef = useRef<boolean>(false);
  const isReconstructingRef = useRef<boolean>(false);

  // Generate a circular soft particle texture
  const createParticleTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.35, 'rgba(255, 255, 255, 0.95)');
    grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.5)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
  };

  // Sample image and build particle data
  const sampleImageAndCreateParticles = useCallback((img: HTMLImageElement) => {
    const sampleCanvas = document.createElement('canvas');
    // High-definition sampling grid
    const sampleWidth = 110;
    const sampleHeight = Math.round((img.height / img.width) * sampleWidth);
    sampleCanvas.width = sampleWidth;
    sampleCanvas.height = sampleHeight;

    const ctx = sampleCanvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return false;

    ctx.drawImage(img, 0, 0, sampleWidth, sampleHeight);
    const imgData = ctx.getImageData(0, 0, sampleWidth, sampleHeight);
    const data = imgData.data;

    const targetPos: number[] = [];
    const scatterPos: number[] = [];
    const currentPos: number[] = [];
    const explosionVec: number[] = [];
    const cols: number[] = [];

    const scale = 0.052;
    const offsetX = (sampleWidth * scale) / 2;
    const offsetY = (sampleHeight * scale) / 2;

    for (let y = 0; y < sampleHeight; y++) {
      for (let x = 0; x < sampleWidth; x++) {
        const index = (y * sampleWidth + x) * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        const a = data[index + 3];

        // Background filter: only strip near-white background
        const isPureBg = r > 240 && g > 240 && b > 240 && Math.abs(r - g) < 10 && Math.abs(g - b) < 10;
        if (a < 60 || isPureBg) {
          continue;
        }

        // Target 3D Position
        const posX = x * scale - offsetX;
        const posY = -(y * scale - offsetY);

        // Tactile depth relief based on luminance
        const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
        const posZ = (brightness - 0.45) * 0.55;

        targetPos.push(posX, posY, posZ);

        // Cosmic Scatter Position (initial entrance)
        const scatterRadius = 10 + Math.random() * 14;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const sx = scatterRadius * Math.sin(phi) * Math.cos(theta);
        const sy = scatterRadius * Math.sin(phi) * Math.sin(theta);
        const sz = scatterRadius * Math.cos(phi) + (Math.random() - 0.5) * 6;

        scatterPos.push(sx, sy, sz);
        currentPos.push(sx, sy, sz);

        // Radial Explosion Direction & Velocity
        const distFromCenter = Math.sqrt(posX * posX + posY * posY) + 0.1;
        const expX = (posX / distFromCenter) * (2.0 + Math.random() * 2.8) + (Math.random() - 0.5) * 1.5;
        const expY = (posY / distFromCenter) * (2.0 + Math.random() * 2.8) + (Math.random() - 0.5) * 1.5;
        const expZ = (Math.random() - 0.2) * 5.0;
        explosionVec.push(expX, expY, expZ);

        // Color grading for dark background visibility
        let normR = r / 255;
        let normG = g / 255;
        let normB = b / 255;

        // Enhance dark hair & hoodie luminance so they stand out boldly
        if (brightness < 0.22) {
          normR = Math.min(1, normR + 0.12);
          normG = Math.min(1, normG + 0.10);
          normB = Math.min(1, normB + 0.25); // Subtle violet-blue tone on dark hair/hoodie
        }

        // Slight saturation boost for skin & hoodie
        cols.push(normR, normG, normB);
      }
    }

    const count = targetPos.length / 3;
    particleCountRef.current = count;
    setPointCount(count);
    targetPositionsRef.current = new Float32Array(targetPos);
    scatterPositionsRef.current = new Float32Array(scatterPos);
    currentPositionsRef.current = new Float32Array(currentPos);
    explosionVectorsRef.current = new Float32Array(explosionVec);
    colorsRef.current = new Float32Array(cols);

    return true;
  }, []);

  // Trigger Explode & Auto-Reconstruct
  const triggerExplosion = useCallback(() => {
    if (isExplodingRef.current || isReconstructingRef.current) return;

    isExplodingRef.current = true;
    explodeFactorRef.current = 1.0;
    setIsExploded(true);
    setStatusMessage('Reconstructing...');

    // Explode for 850ms then reconstruct
    setTimeout(() => {
      isExplodingRef.current = false;
      isReconstructingRef.current = true;

      setTimeout(() => {
        isReconstructingRef.current = false;
        setIsExploded(false);
        setStatusMessage('Click to explode');
      }, 1500);
    }, 850);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL not supported, falling back to static portrait:', e);
      setHasWebGL(false);
      setIsLoading(false);
      return;
    }

    rendererRef.current = renderer;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.z = 6.2; // Closer for crisp prominence
    cameraRef.current = camera;

    // Load Portrait Image
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageSrc;

    img.onload = () => {
      const success = sampleImageAndCreateParticles(img);
      if (!success || !targetPositionsRef.current || !colorsRef.current) {
        setIsLoading(false);
        return;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(currentPositionsRef.current!, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colorsRef.current, 3));

      const particleTexture = createParticleTexture();

      const material = new THREE.PointsMaterial({
        size: 0.105,
        vertexColors: true,
        transparent: true,
        opacity: 0.98,
        map: particleTexture || undefined,
        blending: THREE.NormalBlending,
        depthWrite: false,
      });

      const points = new THREE.Points(geometry, material);
      pointsRef.current = points;
      scene.add(points);

      setIsLoading(false);
    };

    img.onerror = () => {
      console.error('Failed to load portrait image for particle generation');
      setIsLoading(false);
      setHasWebGL(false);
    };

    // Scroll listener
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Cinematic Assembly Entrance on Load
      if (assembleProgressRef.current < 1.0) {
        assembleProgressRef.current += 0.016;
        if (assembleProgressRef.current > 1.0) assembleProgressRef.current = 1.0;
      }

      const points = pointsRef.current;
      if (
        points &&
        currentPositionsRef.current &&
        targetPositionsRef.current &&
        scatterPositionsRef.current &&
        explosionVectorsRef.current
      ) {
        const posAttr = points.geometry.attributes.position as THREE.BufferAttribute;
        const currentArr = currentPositionsRef.current;
        const targetArr = targetPositionsRef.current;
        const scatterArr = scatterPositionsRef.current;
        const expVecArr = explosionVectorsRef.current;
        const count = particleCountRef.current;

        const assembleEase = 1 - Math.pow(1 - assembleProgressRef.current, 3);
        const mouseX = mouseRef.current.x;
        const mouseY = mouseRef.current.y;
        const mouseActive = mouseRef.current.active;

        for (let i = 0; i < count; i++) {
          const i3 = i * 3;

          // Target resting coordinates
          const tx = targetArr[i3];
          const ty = targetArr[i3 + 1];
          const tz = targetArr[i3 + 2];

          // Initial scatter interpolation
          let destX = scatterArr[i3] + (tx - scatterArr[i3]) * assembleEase;
          let destY = scatterArr[i3 + 1] + (ty - scatterArr[i3 + 1]) * assembleEase;
          let destZ = scatterArr[i3 + 2] + (tz - scatterArr[i3 + 2]) * assembleEase;

          // Ambient idle breathing & floating wave
          const wave = Math.sin(elapsedTime * 1.5 + tx * 2.0 + ty * 2.0) * 0.04;
          destZ += wave;

          // Mouse Hover Interaction (gentle repulsion and depth wave)
          if (mouseActive && assembleProgressRef.current >= 0.95 && !isExplodingRef.current) {
            const dx = destX - mouseX;
            const dy = destY - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const mouseRadius = 1.6;

            if (dist < mouseRadius && dist > 0.01) {
              const force = (1 - dist / mouseRadius) * 0.35;
              destX += (dx / dist) * force;
              destY += (dy / dist) * force;
              destZ += Math.sin(dist * 5 - elapsedTime * 4) * force * 0.6;
            }
          }

          // Explosion Physics
          if (isExplodingRef.current) {
            const expVx = expVecArr[i3];
            const expVy = expVecArr[i3 + 1];
            const expVz = expVecArr[i3 + 2];

            destX += expVx * explodeFactorRef.current * 3.5;
            destY += expVy * explodeFactorRef.current * 3.5;
            destZ += expVz * explodeFactorRef.current * 3.5;
          }

          // Smooth interpolation towards destination
          const lerpSpeed = isReconstructingRef.current ? 0.09 : isExplodingRef.current ? 0.16 : 0.12;
          currentArr[i3] += (destX - currentArr[i3]) * lerpSpeed;
          currentArr[i3 + 1] += (destY - currentArr[i3 + 1]) * lerpSpeed;
          currentArr[i3 + 2] += (destZ - currentArr[i3 + 2]) * lerpSpeed;
        }

        posAttr.needsUpdate = true;

        // Scroll response (subtle tilt and scale down as user scrolls)
        const scrollY = scrollRef.current;
        const scrollProgress = Math.min(scrollY / 700, 1);
        points.rotation.y = Math.sin(elapsedTime * 0.5) * 0.08 + (mouseX * 0.15);
        points.rotation.x = -mouseY * 0.12;
        points.scale.setScalar(1 - scrollProgress * 0.25);
        points.position.y = -scrollProgress * 0.8;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [imageSrc, sampleImageAndCreateParticles]);

  // Mouse Move over Canvas in 3D Space
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !cameraRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

    const distance = cameraRef.current.position.z;
    const vFov = (cameraRef.current.fov * Math.PI) / 180;
    const planeHeight = 2 * Math.tan(vFov / 2) * distance;
    const planeWidth = planeHeight * (rect.width / rect.height);

    mouseRef.current = {
      x: (nx * planeWidth) / 2,
      y: (ny * planeHeight) / 2,
      active: true,
    };
  };

  const handleMouseEnter = () => {
    setCursorVariant('portrait', isExploded ? 'REBUILD' : 'EXPLODE');
    mouseRef.current.active = true;
  };

  const handleMouseLeave = () => {
    resetCursor();
    mouseRef.current.active = false;
  };

  const handleClick = () => {
    triggerExplosion();
  };

  if (!hasWebGL) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="relative group p-2 rounded-2xl bg-gradient-to-b from-violet-500/20 to-transparent border border-violet-500/30 backdrop-blur-md shadow-2xl shadow-violet-950/40">
          <img
            src={imageSrc}
            alt="Yash Kshatriya Portrait"
            className="w-72 h-72 md:w-96 md:h-96 object-cover rounded-xl pixelated shadow-inner"
            style={{ imageRendering: 'pixelated' }}
          />
          <div className="absolute inset-0 rounded-xl bg-violet-500/10 pointer-events-none mix-blend-overlay" />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`relative flex items-center justify-center cursor-pointer select-none group ${className}`}
      style={{ touchAction: 'none' }}
    >
      {/* Background ambient halo disc behind particles for silhouette contrast */}
      <div className="absolute w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-tr from-violet-600/25 via-purple-500/15 to-sky-500/15 blur-[60px] pointer-events-none transition-all duration-700 group-hover:bg-violet-600/35 group-hover:scale-110" />
      
      {/* Subtle outer geometric orbit ring */}
      <div className="absolute w-72 h-72 sm:w-88 sm:h-88 md:w-[410px] md:h-[410px] rounded-full border border-violet-500/20 border-dashed animate-[spin_40s_linear_infinite] pointer-events-none opacity-60" />

      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="relative z-10 w-80 h-80 sm:w-96 sm:h-96 md:w-[440px] md:h-[440px] lg:w-[480px] lg:h-[480px]"
      />

      {/* Loading state indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 space-y-2">
          <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
          <span className="font-mono text-xs text-violet-300 tracking-wider uppercase">
            Sampling Pixels...
          </span>
        </div>
      )}

      {/* Interactive Micro-badge HUD */}
      {!isLoading && (
        <div className="absolute -bottom-2 md:bottom-2 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d0d16]/90 border border-white/15 text-[11px] font-mono text-slate-300 backdrop-blur-md shadow-xl group-hover:border-violet-500/50 group-hover:text-violet-200 transition-all duration-300">
          {isExploded ? (
            <RefreshCw className="w-3.5 h-3.5 text-violet-400 animate-spin" />
          ) : (
            <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
          )}
          <span className="tracking-wide font-medium">{statusMessage}</span>
          <span className="text-white/30">•</span>
          <span className="text-violet-400 font-semibold">{pointCount || '7,800+'} pts</span>
        </div>
      )}
    </div>
  );
};
