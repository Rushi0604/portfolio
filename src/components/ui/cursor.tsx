'use client';

import * as React from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
  type HTMLMotionProps,
  type SpringOptions,
} from 'motion/react';

import { cn } from '@/utils/cn';

type CursorContextType = {
  cursorPos: { x: number; y: number };
  isActive: boolean;
  isHoveringClickable: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  cursorRef: React.RefObject<HTMLDivElement | null>;
};

const CursorContext = React.createContext<CursorContextType | undefined>(
  undefined,
);

const useCursor = (): CursorContextType => {
  const context = React.useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};

type CursorProviderProps = React.ComponentPropsWithoutRef<'div'> & {
  children: React.ReactNode;
};

const CursorProvider = React.forwardRef<HTMLDivElement, CursorProviderProps>(
  ({ children, ...props }, ref) => {
    const [cursorPos, setCursorPos] = React.useState({ x: 0, y: 0 });
    const [isActive, setIsActive] = React.useState(false);
    const [isHoveringClickable, setIsHoveringClickable] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const cursorRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    React.useEffect(() => {
      if (!containerRef.current) return;

      const parent = containerRef.current.parentElement;
      if (!parent) return;

      if (getComputedStyle(parent).position === 'static') {
        parent.style.position = 'relative';
      }

      const handleMouseMove = (e: MouseEvent) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
        setIsActive(true);
      };
      
      const handleMouseLeave = () => {
        setIsActive(false);
        setIsHoveringClickable(false);
      };

      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target) return;

        const clickable = target.closest('a, button, input, select, textarea, [role="button"], .cursor-pointer');
        const isPointerStyle = window.getComputedStyle(target).cursor === 'pointer';

        setIsHoveringClickable(!!clickable || isPointerStyle);
      };

      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
      parent.addEventListener('mouseover', handleMouseOver);

      return () => {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
        parent.removeEventListener('mouseover', handleMouseOver);
      };
    }, []);

    return (
      <CursorContext.Provider
        value={{ cursorPos, isActive, isHoveringClickable, containerRef, cursorRef }}
      >
        <div ref={containerRef} data-slot="cursor-provider" {...props}>
          {children}
        </div>
      </CursorContext.Provider>
    );
  }
);
CursorProvider.displayName = 'CursorProvider';

type CursorProps = HTMLMotionProps<'div'> & {
  children: React.ReactNode;
};

const Cursor = React.forwardRef<HTMLDivElement, CursorProps>(
  ({ children, className, style, ...props }, ref) => {
    const { cursorPos, isActive, isHoveringClickable, containerRef, cursorRef } = useCursor();
    React.useImperativeHandle(ref, () => cursorRef.current as HTMLDivElement);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    React.useEffect(() => {
      const parentElement = containerRef.current?.parentElement;

      if (parentElement && isActive) parentElement.style.cursor = 'none';

      return () => {
        if (parentElement) parentElement.style.cursor = 'default';
      };
    }, [containerRef, cursorPos, isActive]);

    React.useEffect(() => {
      x.set(cursorPos.x);
      y.set(cursorPos.y);
    }, [cursorPos, x, y]);

    return (
      <AnimatePresence>
        {isActive && (
          <motion.div
            ref={cursorRef as any}
            data-slot="cursor"
            className={cn(
              'transform-[translate(-50%,-50%)] pointer-events-none z-[9999] fixed',
              className,
            )}
            style={{ top: y, left: x, ...style }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            {...props}
          >
            <motion.div
              animate={{
                color: isHoveringClickable ? '#c2a4ff' : '#8b5cf6',
                scale: isHoveringClickable ? 0.95 : 1,
                filter: isHoveringClickable 
                  ? 'drop-shadow(0 0 6px rgba(194, 164, 255, 0.8))' 
                  : 'drop-shadow(0 0 6px rgba(139, 92, 246, 0.65))',
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ['--cursor-stroke' as any]: isHoveringClickable ? '#c2a4ff' : '#ffffff',
              }}
              transition={{ duration: 0.18, ease: 'easeInOut' }}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);
Cursor.displayName = 'Cursor';

type Align =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'right'
  | 'center';

type CursorFollowProps = HTMLMotionProps<'div'> & {
  sideOffset?: number;
  align?: Align;
  transition?: SpringOptions;
  children: React.ReactNode;
};

const CursorFollow = React.forwardRef<HTMLDivElement, CursorFollowProps>(
  (
    {
      sideOffset = 15,
      align = 'bottom-right',
      children,
      className,
      style,
      transition = { stiffness: 500, damping: 50, bounce: 0 },
      ...props
    },
    ref
  ) => {
    const { cursorPos, isActive, cursorRef } = useCursor();
    const cursorFollowRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(
      ref,
      () => cursorFollowRef.current as HTMLDivElement,
    );

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, transition);
    const springY = useSpring(y, transition);

    const calculateOffset = React.useCallback(() => {
      const rect = cursorFollowRef.current?.getBoundingClientRect();
      const width = rect?.width ?? 0;
      const height = rect?.height ?? 0;

      let newOffset;

      switch (align) {
        case 'center':
          newOffset = { x: width / 2, y: height / 2 };
          break;
        case 'top':
          newOffset = { x: width / 2, y: height + sideOffset };
          break;
        case 'top-left':
          newOffset = { x: width + sideOffset, y: height + sideOffset };
          break;
        case 'top-right':
          newOffset = { x: -sideOffset, y: height + sideOffset };
          break;
        case 'bottom':
          newOffset = { x: width / 2, y: -sideOffset };
          break;
        case 'bottom-left':
          newOffset = { x: width + sideOffset, y: -sideOffset };
          break;
        case 'bottom-right':
          newOffset = { x: -sideOffset, y: -sideOffset };
          break;
        case 'left':
          newOffset = { x: width + sideOffset, y: height / 2 };
          break;
        case 'right':
          newOffset = { x: -sideOffset, y: height / 2 };
          break;
        default:
          newOffset = { x: 0, y: 0 };
      }

      return newOffset;
    }, [align, sideOffset]);

    React.useEffect(() => {
      const offset = calculateOffset();
      const cursorRect = cursorRef.current?.getBoundingClientRect();
      const cursorWidth = cursorRect?.width ?? 20;
      const cursorHeight = cursorRect?.height ?? 20;

      x.set(cursorPos.x - offset.x + cursorWidth / 2);
      y.set(cursorPos.y - offset.y + cursorHeight / 2);
    }, [calculateOffset, cursorPos, cursorRef, x, y]);

    return (
      <AnimatePresence>
        {isActive && (
          <motion.div
            ref={cursorFollowRef as any}
            data-slot="cursor-follow"
            className={cn(
              'transform-[translate(-50%,-50%)] pointer-events-none z-[9998] fixed',
              className,
            )}
            style={{ top: springY, left: springX, ...style }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            {...props}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);
CursorFollow.displayName = 'CursorFollow';

export {
  CursorProvider,
  Cursor,
  CursorFollow,
  useCursor,
  type CursorContextType,
  type CursorProviderProps,
  type CursorProps,
  type CursorFollowProps,
};
