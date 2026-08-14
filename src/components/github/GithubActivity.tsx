import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { useGithubData } from '../../hooks/useGithubData';
import { ContributionGraph } from './ContributionGraph';
import { RepoCard } from './RepoCard';
import { siteConfig } from '../../config/site';
import { Github, Star, GitCommit, GitPullRequest, ArrowUpRight } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';

export const GithubActivity: React.FC = () => {
  const { stats, repos, contributions } = useGithubData();
  const { setCursorVariant, resetCursor } = useCursor();

  return (
    <section
      id="github"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-violet-600/5 rounded-full blur-[140px] pointer-events-none" />

      <SectionHeading
        number="04"
        title="GitHub Activity"
        subtitle="Building, learning, experimenting, and shipping."
      />

      <div className="space-y-8">
        {/* Top Metric Counter Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-5 rounded-xl bg-surface/75 border border-white/[0.06] backdrop-blur-md"
          >
            <div className="flex items-center gap-2 text-violet-400 mb-1">
              <GitCommit className="w-4 h-4" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">Total Commits</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
              {stats.totalContributions}+
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-5 rounded-xl bg-surface/75 border border-white/[0.06] backdrop-blur-md"
          >
            <div className="flex items-center gap-2 text-sky-400 mb-1">
              <Github className="w-4 h-4" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">Public Repos</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
              {stats.totalRepos}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-5 rounded-xl bg-surface/75 border border-white/[0.06] backdrop-blur-md"
          >
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Star className="w-4 h-4" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">Stargazers</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
              {stats.stars}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-5 rounded-xl bg-surface/75 border border-white/[0.06] backdrop-blur-md"
          >
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <GitPullRequest className="w-4 h-4" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">Day Streak</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">
              {stats.streakDays} Days
            </div>
          </motion.div>
        </div>

        {/* 52-Week Purple Contribution Graph */}
        <ContributionGraph
          contributions={contributions}
          totalContributions={stats.totalContributions}
        />

        {/* Selected Repositories Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <span className="text-violet-400">//</span> Featured Repositories
            </h3>
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursorVariant('button')}
              onMouseLeave={resetCursor}
              className="text-xs font-mono text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors"
            >
              <span>View All on GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {repos.map((repo, idx) => (
              <RepoCard key={repo.id} repo={repo} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
