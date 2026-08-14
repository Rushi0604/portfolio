import React, { useState, useRef, useEffect } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { projectsData } from '../../config/site';
import { ProjectCard } from './ProjectCard';
import { useCursor } from '../../context/CursorContext';

export const Projects: React.FC = () => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const { setCursorVariant, resetCursor } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      if (!showcaseRef.current) return;
      const cards = showcaseRef.current.querySelectorAll('[id^="project-"]');
      const scrollPos = window.scrollY + window.innerHeight / 3;

      cards.forEach((card, index) => {
        const htmlCard = card as HTMLElement;
        const top = htmlCard.offsetTop;
        const height = htmlCard.offsetHeight;

        if (scrollPos >= top && scrollPos < top + height) {
          setActiveProjectIndex(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProject = (id: string, index: number) => {
    const element = document.getElementById(`project-${id}`);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveProjectIndex(index);
    }
  };

  return (
    <section
      id="projects"
      ref={showcaseRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-sky-600/5 rounded-full blur-[120px] pointer-events-none" />

      <SectionHeading
        number="02"
        title="Selected Work"
        subtitle="A few things I've built, explored, and shipped."
      />

      {/* Showcase Container Layout with Sticky Navigation Indicator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sticky Desktop Progress Tracker (Left) */}
        <div className="hidden lg:block lg:col-span-3 sticky top-28 space-y-6 p-6 rounded-2xl bg-surface/50 border border-white/[0.06] backdrop-blur-md">
          <div className="font-mono text-xs text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-400" />
            <span>SHOWCASE NAV</span>
          </div>

          <div className="space-y-4">
            {projectsData.map((project, idx) => {
              const isActive = activeProjectIndex === idx;
              return (
                <button
                  key={project.id}
                  onClick={() => scrollToProject(project.id, idx)}
                  onMouseEnter={() => setCursorVariant('button')}
                  onMouseLeave={resetCursor}
                  className={`w-full flex items-center justify-between text-left p-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-violet-600/20 border border-violet-500/40 text-white shadow-glow-purple'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-xs font-bold ${isActive ? 'text-violet-300' : 'text-slate-500'}`}>
                      {project.number}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider font-display truncate">
                      {project.title}
                    </span>
                  </div>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-white/[0.06] font-mono text-[11px] text-slate-400">
            <span>Scroll through showcase or select a project.</span>
          </div>
        </div>

        {/* Project Cards Stream (Right / Full on Mobile) */}
        <div className="lg:col-span-9 space-y-12">
          {projectsData.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              isActive={activeProjectIndex === idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
