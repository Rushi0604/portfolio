import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { useCursor } from '../../context/CursorContext';

export const Footer: React.FC = () => {
  const { setCursorVariant, resetCursor } = useCursor();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.06] bg-[#060609] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand Identity */}
        <div className="space-y-1 text-center md:text-left">
          <div className="text-sm font-bold tracking-wider text-white uppercase font-display flex items-center justify-center md:justify-start gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-500" />
            <span>{siteConfig.name}</span>
          </div>
          <p className="text-xs font-mono text-slate-400">
            {siteConfig.headline}
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-4">
          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={resetCursor}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={resetCursor}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={siteConfig.socials.email}
            aria-label="Email"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={resetCursor}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href={siteConfig.resumeUrl}
            download="Rushi_Patel_Resume.pdf"
            aria-label="Resume"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={resetCursor}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <FileText className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Copyright & Back to Top */}
        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <span>&copy; {new Date().getFullYear()} {siteConfig.name}</span>
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            onMouseEnter={() => setCursorVariant('button')}
            onMouseLeave={resetCursor}
            className="p-2 rounded-lg bg-surface/80 hover:bg-violet-600/20 border border-white/10 hover:border-violet-500/40 text-slate-300 hover:text-white transition-all"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
