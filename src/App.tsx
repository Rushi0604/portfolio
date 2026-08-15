import React from 'react';
import { CursorProvider } from './context/CursorContext';
import { CustomCursor } from './components/layout/CustomCursor';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { Navbar } from './components/layout/Navbar';
import { CombinedHeroNew } from './reference-image-particles-new/CombinedHeroNew';
import { About } from './components/about/About';
import { Projects } from './components/projects/Projects';
import { TechStack } from './tech-stack';

import { Contact } from './components/contact/Contact';
import { Footer } from './components/layout/Footer';

export const App: React.FC = () => {
  return (
    <CursorProvider>
      <div className="relative min-h-screen bg-background text-slate-100 selection:bg-violet-600/30 selection:text-violet-200 overflow-x-hidden font-sans">
        {/* Top Scroll Progress Indicator */}
        <ScrollProgress />

        {/* Desktop Custom Follow Cursor */}
        <CustomCursor />

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
    </CursorProvider>
  );
};

export default App;
