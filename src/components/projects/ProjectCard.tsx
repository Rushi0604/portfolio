import React from 'react';
import { Github, ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';
import { ProjectItem } from '../../types';
import { ProjectVisual } from './ProjectVisual';
import { useCursor } from '../../context/CursorContext';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  isActive?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, isActive = false }) => {
  const { setCursorVariant, resetCursor } = useCursor();
  const isEven = index % 2 === 0;

  return (
    <div
      id={`project-${project.id}`}
      className={`p-6 sm:p-8 lg:p-10 rounded-2xl bg-surface/80 border backdrop-blur-xl shadow-2xl transition-all duration-300 relative overflow-hidden group ${
        isActive ? 'border-violet-500/50 shadow-glow-purple' : 'border-white/[0.08] hover:border-violet-500/30'
      }`}
    >
      {/* Ambient background glow for featured projects */}
      {project.featured && (
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
      )}

      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center ${
        isEven ? '' : 'lg:flex-row-reverse'
      }`}>
        {/* Visual Interactive Preview Column */}
        <div
          className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
          onMouseEnter={() => setCursorVariant('project', 'EXPLORE')}
          onMouseLeave={resetCursor}
        >
          <ProjectVisual type={project.visualType} title={project.title} />
        </div>

        {/* Project Details Column */}
        <div className={`lg:col-span-6 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
          {/* Header Metadata */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-violet-400 font-semibold tracking-widest uppercase flex items-center gap-2">
                <span className="text-violet-500">//</span> {project.number}
                {project.featured && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 text-[10px]">
                    <Sparkles className="w-2.5 h-2.5" /> Flagship
                  </span>
                )}
              </span>
              <span className="font-mono text-[11px] text-slate-400">
                {project.category.split('•')[0]}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white uppercase font-display">
              {project.title}
            </h3>
            <p className="font-mono text-xs sm:text-sm font-semibold text-violet-400 uppercase tracking-wide">
              {project.subtitle}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {project.description}
          </p>

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-2 pt-1">
              {project.features.slice(0, 3).map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          )}

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-[11px] font-mono text-slate-300 bg-white/[0.03] border border-white/[0.08] rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={resetCursor}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-200 bg-white/[0.04] hover:bg-violet-600/20 border border-white/10 hover:border-violet-500/50 rounded-xl transition-all duration-200"
              >
                <Github className="w-3.5 h-3.5 text-violet-400" />
                <span>Source Code</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={resetCursor}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-violet-600 hover:bg-violet-500 rounded-xl shadow-glow-purple transition-all duration-200"
              >
                <span>Live Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
