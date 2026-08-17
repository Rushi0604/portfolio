import React, { useState } from 'react';
import { Mail, Copy, Check, Github, Linkedin, FileText, ArrowUpRight, Sparkles } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { useCursor } from '../../context/CursorContext';
import confetti from 'canvas-confetti';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { setCursorVariant, resetCursor } = useCursor();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setCursorVariant('copy', 'COPIED');

    // Trigger subtle confetti celebration
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#8b5cf6', '#a78bfa', '#38bdf8', '#ffffff'],
    });

    setTimeout(() => {
      setCopied(false);
      resetCursor();
    }, 2400);
  };

  return (
    <section
      id="contact"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Background ambient radial light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 p-8 sm:p-12 lg:p-16 rounded-3xl bg-surface/80 border border-white/[0.08] backdrop-blur-xl shadow-2xl text-center space-y-8 overflow-hidden">
        {/* Subtle decorative grid lines */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-mono text-violet-300">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span className="uppercase tracking-widest">// 05. CONTACT & COLLABORATION</span>
        </div>

        {/* Big Bold Statement */}
        <div className="space-y-3 max-w-3xl mx-auto">
          <h2
            className="cursor-target text-[70px] font-normal tracking-tight uppercase leading-[1.1]"
            style={{
              background: 'linear-gradient(180deg, #ffffff 0%, #c2a4ff 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}
          >
            Let&apos;s Build <br />
            Something Great.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            Have an idea, opportunity, or project worth discussing? My inbox is always open.
          </p>
        </div>

        {/* Email Copy Card & Direct Mail Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href={siteConfig.socials.email}
            onMouseEnter={() => setCursorVariant('button')}
            onMouseLeave={resetCursor}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl shadow-glow-purple transition-all duration-200 hover:scale-[1.02]"
          >
            <Mail className="w-4 h-4" />
            <span>Send Direct Email</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <button
            onClick={handleCopyEmail}
            onMouseEnter={() => setCursorVariant('button')}
            onMouseLeave={resetCursor}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm font-mono text-slate-200 bg-surface/90 hover:bg-white/5 border border-white/10 hover:border-violet-500/40 rounded-xl transition-all duration-200"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Email Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-violet-400" />
                <span>{siteConfig.email}</span>
              </>
            )}
          </button>
        </div>

        {/* Social / Profile Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-6 border-t border-white/[0.06]">
          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setCursorVariant('link')}
            onMouseLeave={resetCursor}
            className="flex items-center gap-2 px-4 py-2 text-xs font-mono text-slate-400 hover:text-white bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-violet-500/30 rounded-lg transition-all"
          >
            <Github className="w-3.5 h-3.5 text-violet-400" />
            <span>GitHub</span>
          </a>

          <a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setCursorVariant('link')}
            onMouseLeave={resetCursor}
            className="flex items-center gap-2 px-4 py-2 text-xs font-mono text-slate-400 hover:text-white bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-violet-500/30 rounded-lg transition-all"
          >
            <Linkedin className="w-3.5 h-3.5 text-sky-400" />
            <span>LinkedIn</span>
          </a>

          <a
            href={siteConfig.resumeUrl}
            download="Yash_Kshatriya_Resume.pdf"
            onMouseEnter={() => setCursorVariant('link')}
            onMouseLeave={resetCursor}
            className="flex items-center gap-2 px-4 py-2 text-xs font-mono text-slate-400 hover:text-white bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-violet-500/30 rounded-lg transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>Resume</span>
          </a>
        </div>
      </div>
    </section>
  );
};
