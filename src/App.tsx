import React, { useEffect, useState } from 'react';
import { CursorProvider } from './context/CursorContext';
import { CustomCursor } from './components/layout/CustomCursor';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { Navbar } from './components/layout/Navbar';
import { CombinedHeroNew } from './components/hero/CombinedHeroNew';
import { About } from './components/about/About';
import { Projects } from './components/projects/Projects';
import { TechStack } from './tech-stack';

import { Contact } from './components/contact/Contact';
import { Footer } from './components/layout/Footer';
import { CursorDemoPage } from './components/ui/CursorDemoPage';
import { ClickSpark } from './components/ui/ClickSpark';
import {
  CursorProvider as NewCursorProvider,
  Cursor as NewCursor,
} from './components/ui/cursor';

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const USE_NEW_CURSOR = true; // Set to false to revert back to the old CustomCursor

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  useEffect(() => {
    const checkTouch = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
      setIsTouchDevice(isTouch);
    };
    checkTouch();
  }, []);

  if (currentPath === '/reference-cursor') {
    return <CursorDemoPage />;
  }

  return (
    <CursorProvider>
      <NewCursorProvider className="w-full h-full">
        <div className="relative min-h-screen bg-background text-slate-100 selection:bg-violet-600/30 selection:text-violet-200 overflow-x-hidden font-sans">
          {/* Top Scroll Progress Indicator */}
          <ScrollProgress />

          {/* Click Spark effect layer */}
          <ClickSpark
            sparkColor="#ffffff"
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
            easing="ease-out"
            extraScale={1}
          />

          {/* Custom Cursors */}
          {USE_NEW_CURSOR ? (
            !isTouchDevice && (
              <>
                <NewCursor className="hidden md:block">
                  <svg
                    className="w-5 h-5 text-violet-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 40 40"
                  >
                    <path
                      fill="currentColor"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      d="M1.8 4.4 7 36.2c.3 1.8 2.6 2.3 3.6.8l3.9-5.7c1.7-2.5 4.5-4.1 7.5-4.3l6.9-.5c1.8-.1 2.5-2.4 1.1-3.5L5 2.5c-1.4-1.1-3.5 0-3.3 1.9Z"
                    />
                  </svg>
                </NewCursor>
              </>
            )
          ) : (
            <CustomCursor />
          )}

          {/* Sticky Fixed Navbar */}
          <Navbar />

        {/* Main Content Sections */}
        <main className="relative z-10">
          <CombinedHeroNew />
          <About />
          <Projects />
          <TechStack />

          <Contact />
        </main>

        {/* Minimalist Footer */}
        <Footer />
      </div>
      </NewCursorProvider>
    </CursorProvider>
  );
};

export default App;
