import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeading } from '../ui/SectionHeading';
import { aboutContent } from '../../config/site';
import { Cpu, Globe, Layers, Compass, Database } from 'lucide-react';
import { InvertedCursor } from '../ui/inverted-cursor';

gsap.registerPlugin(ScrollTrigger);

const highlightedTerms = ['Turning', 'curiosity', 'code,', 'ideas', 'products,', 'challenges', 'opportunities.'];

const fadeRight = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

const cardContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);

  const paragraph1Words = aboutContent.fullText.split(' ');
  const paragraph2Words = (aboutContent as Record<string, string>).secondParagraph.split(' ');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const wordEls = wordsRef.current?.querySelectorAll('.about-word');
      if (!wordEls || wordEls.length === 0) return;

      gsap.set(wordEls, { opacity: 0.15 });

      gsap.to(wordEls, {
        opacity: 1,
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 40%',
          scrub: true,
          id: 'about-text-reveal',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Scoped inverted cursor — only active inside About */}
      <InvertedCursor containerRef={sectionRef} />

      {/* Background radial accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />

      <SectionHeading
        number="01"
        title="About Me"
        subtitle="Building intelligent, scalable, and user-focused software solutions."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Scroll-Revealed Statement */}
        <div className="lg:col-span-8 space-y-8">
          <div className="p-8 sm:p-10 rounded-2xl bg-surface/70 border border-white/[0.08] backdrop-blur-xl shadow-2xl relative overflow-hidden">
            {/* Ambient corner highlight */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-2 mb-6 font-mono text-xs text-slate-400">
              <Compass className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-violet-400 font-semibold">CORE IDENTITY</span>
              <span>// PERSPECTIVE</span>
            </div>

            {/* Scroll-Scrubbed Word Reveal */}
            <div ref={wordsRef}>
              {/* Paragraph 1 — Main statement */}
              <h3 className="font-normal leading-[1.35] tracking-tight font-display" style={{ fontSize: 'clamp(1.8rem, 3.2vw, 3rem)' }}>
                {paragraph1Words.map((word, i) => {
                  const isHighlight = highlightedTerms.some((t) =>
                    word.toLowerCase() === t.toLowerCase() ||
                    word.toLowerCase().replace(/[,.]/g, '') === t.toLowerCase().replace(/[,.]/g, '')
                  );

                  return (
                    <span
                      key={`p1-${i}`}
                      className={`about-word inline-block mr-[0.28em] mb-1.5 ${
                        isHighlight
                          ? 'font-semibold text-violet-400'
                          : 'text-slate-50'
                      }`}
                    >
                      {word}
                    </span>
                  );
                })}
              </h3>

              {/* Paragraph 2 — Supporting statement (new line, smaller) */}
              <p className="mt-5 leading-[1.6] text-slate-300" style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)' }}>
                {paragraph2Words.map((word, i) => (
                  <span
                    key={`p2-${i}`}
                    className="about-word inline-block mr-[0.25em] mb-1"
                  >
                    {word}
                  </span>
                ))}
              </p>
            </div>

            {/* Sub-Bio */}
            <p className="mt-8 pt-6 border-t border-white/[0.06] text-slate-400 text-[15px] leading-relaxed">
              {aboutContent.subBio}
            </p>
          </div>
        </div>

        {/* Right: Focus Areas */}
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="lg:col-span-4 space-y-4"
        >
          {/* Card 1: Full-Stack Development */}
          <motion.div
            variants={fadeRight}
            className="p-5 rounded-xl bg-surface/60 border border-white/[0.06] hover:border-violet-500/30 transition-all duration-300 group"
          >
            <div className="flex items-center gap-3 mb-2.5">
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 group-hover:bg-sky-500/20 transition-colors">
                <Globe className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
                Full-Stack Development
              </h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Building responsive web applications with React, TypeScript, REST APIs, Django, and modern backend technologies.
            </p>
          </motion.div>

          {/* Card 2: AI & Machine Learning */}
          <motion.div
            variants={fadeRight}
            className="p-5 rounded-xl bg-surface/60 border border-white/[0.06] hover:border-violet-500/30 transition-all duration-300 group"
          >
            <div className="flex items-center gap-3 mb-2.5">
              <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20 transition-colors">
                <Cpu className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
                AI & Machine Learning
              </h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Exploring machine learning, computer vision, predictive modeling, and practical AI applications.
            </p>
          </motion.div>

          {/* Card 3: Software Engineering */}
          <motion.div
            variants={fadeRight}
            className="p-5 rounded-xl bg-surface/60 border border-white/[0.06] hover:border-violet-500/30 transition-all duration-300 group"
          >
            <div className="flex items-center gap-3 mb-2.5">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                <Layers className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
                Software Engineering
              </h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Designing maintainable systems, working with databases and APIs, and developing reliable, production-oriented applications.
            </p>
          </motion.div>

          {/* Card 4: Data & Database Engineering */}
          <motion.div
            variants={fadeRight}
            className="p-5 rounded-xl bg-surface/60 border border-white/[0.06] hover:border-violet-500/30 transition-all duration-300 group"
          >
            <div className="flex items-center gap-3 mb-2.5">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                <Database className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
                Data & Database Engineering
              </h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Working with PostgreSQL, MySQL, MongoDB, and data-driven applications, with a focus on efficient data modeling, querying, and backend integration.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
