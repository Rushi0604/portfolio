import React from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, BookOpen, ArrowUpRight } from 'lucide-react';
import { GithubRepo } from '../../types';
import { useCursor } from '../../context/CursorContext';

interface RepoCardProps {
  repo: GithubRepo;
  index: number;
}

export const RepoCard: React.FC<RepoCardProps> = ({ repo, index }) => {
  const { setCursorVariant, resetCursor } = useCursor();

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onMouseEnter={() => setCursorVariant('project', 'OPEN')}
      onMouseLeave={resetCursor}
      className="group relative p-6 rounded-2xl bg-surface/75 border border-white/[0.07] hover:border-violet-500/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-purple flex flex-col justify-between"
    >
      <div className="space-y-3">
        {/* Top bar: Repo icon & Link arrow */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-violet-400">
            <BookOpen className="w-4 h-4" />
            <span className="font-mono text-xs text-slate-400 font-semibold">Repository</span>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-violet-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>

        {/* Title */}
        <h4 className="text-base font-bold text-white font-mono tracking-tight group-hover:text-violet-300 transition-colors">
          {repo.name}
        </h4>

        {/* Description */}
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
          {repo.description}
        </p>

        {/* Topics Pills if any */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {repo.topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="px-2 py-0.5 text-[10px] font-mono text-violet-300/80 bg-violet-500/10 rounded"
              >
                #{topic}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom bar: Language, Stars, Forks */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/[0.06] text-xs font-mono text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-violet-400" />
          <span>{repo.language || 'Python'}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 hover:text-white">
            <Star className="w-3.5 h-3.5 text-amber-400" />
            {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1 hover:text-white">
            <GitFork className="w-3.5 h-3.5 text-slate-400" />
            {repo.forks_count}
          </span>
        </div>
      </div>
    </motion.a>
  );
};
