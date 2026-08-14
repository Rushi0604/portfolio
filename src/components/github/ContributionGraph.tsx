import React, { useState } from 'react';
import { ContributionDay } from '../../types';
import { useCursor } from '../../context/CursorContext';

interface ContributionGraphProps {
  contributions: ContributionDay[];
  totalContributions: number;
}

export const ContributionGraph: React.FC<ContributionGraphProps> = ({
  contributions,
  totalContributions,
}) => {
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const { setCursorVariant, resetCursor } = useCursor();

  // Group contributions by weeks (each column has 7 days)
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  const getCellColor = (level: number) => {
    switch (level) {
      case 4:
        return 'bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.6)]';
      case 3:
        return 'bg-violet-600';
      case 2:
        return 'bg-violet-700/80';
      case 1:
        return 'bg-violet-900/60';
      default:
        return 'bg-white/[0.04] hover:bg-white/10';
    }
  };

  const handleCellHover = (e: React.MouseEvent, day: ContributionDay) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
    });
    setHoveredDay(day);
    setCursorVariant('hover');
  };

  const handleCellLeave = () => {
    setHoveredDay(null);
    resetCursor();
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-surface/80 border border-white/[0.08] backdrop-blur-xl shadow-2xl relative">
      {/* Top Header stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-400" />
            Activity Matrix
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            {totalContributions} contributions in the last year
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400">
          <span>Less</span>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-[2px] bg-white/[0.04]" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-violet-900/60" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-violet-700/80" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-violet-600" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-violet-400" />
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Calendar Grid Container (scrollable on smaller devices) */}
      <div className="overflow-x-auto pb-2 scrollbar-none">
        <div className="min-w-[680px]">
          {/* Month labels */}
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-2 px-1">
            {months.map((m, idx) => (
              <span key={idx}>{m}</span>
            ))}
          </div>

          {/* 52 Columns */}
          <div className="flex gap-[3.5px]">
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-[3.5px]">
                {week.map((day, dIdx) => (
                  <div
                    key={dIdx}
                    onMouseEnter={(e) => handleCellHover(e, day)}
                    onMouseLeave={handleCellLeave}
                    className={`w-2.5 h-2.5 rounded-[2px] transition-all duration-150 cursor-pointer ${getCellColor(
                      day.level
                    )}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hover Floating Tooltip */}
      {hoveredDay && (
        <div
          className="fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-full px-2.5 py-1 rounded-md bg-[#0a0a14] border border-violet-500/40 text-[11px] font-mono text-violet-200 shadow-xl backdrop-blur-md whitespace-nowrap"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
          }}
        >
          <span className="font-bold text-white">{hoveredDay.count} contribution{hoveredDay.count !== 1 ? 's' : ''}</span>
          <span className="text-slate-400"> on {hoveredDay.date}</span>
        </div>
      )}
    </div>
  );
};
