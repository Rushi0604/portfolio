import React, { useEffect, useRef } from "react";
import { careerData } from "./careerData";
import { lerp } from "./timelineUtils";
import "./CareerTimeline.css";

const CareerTimeline: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let animationFrameId: number;
    let targetProgress = 0;
    let currentProgress = 0;

    const handleScroll = () => {
      const line = lineRef.current;
      if (!line) return;

      const rect = line.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate trigger line (center of viewport)
      const triggerY = windowHeight * 0.5;

      // Distance from trigger line to top of timeline
      const distance = triggerY - rect.top;
      
      // Calculate progress (0 when top is at trigger, 1 when bottom is at trigger)
      const progress = Math.max(0, Math.min(1, distance / rect.height));
      targetProgress = progress;
    };

    const updateLoop = () => {
      // Smooth interpolation
      currentProgress = lerp(currentProgress, targetProgress, 0.15);

      // Update line height
      if (activeLineRef.current) {
        activeLineRef.current.style.height = `${currentProgress * 100}%`;
      }

      // Update ball position
      if (ballRef.current && lineRef.current) {
        const lineRect = lineRef.current.getBoundingClientRect();
        const ballY = currentProgress * lineRect.height;
        ballRef.current.style.top = `${ballY}px`;
      }

      // Calculate active items based on distance to the trigger line
      const windowHeight = window.innerHeight;
      const triggerY = windowHeight * 0.5;
      
      let closestIdx = -1;
      let minDistance = Infinity;

      rowRefs.current.forEach((row, index) => {
        if (!row) return;
        const rowRect = row.getBoundingClientRect();
        const rowCenter = rowRect.top + rowRect.height / 2;
        const dist = Math.abs(rowCenter - triggerY);

        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = index;
        }
      });

      // Update classes directly for maximum 60fps/120fps performance
      rowRefs.current.forEach((row, index) => {
        if (!row) return;
        if (index === closestIdx) {
          row.classList.add("is-active");
          row.classList.remove("is-inactive");
        } else {
          row.classList.remove("is-active");
          row.classList.add("is-inactive");
        }
      });

      animationFrameId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();
    
    // Start animation loop
    updateLoop();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="new-career-section" ref={sectionRef}>
      <h2 className="new-career-title">
        Experience, <span>education</span> &<br /> certifications
      </h2>

      <div className="new-timeline-wrapper">
        {/* Center Line and Ball */}
        <div className="new-timeline-line-container" ref={lineRef}>
          <div className="new-timeline-active-line" ref={activeLineRef}></div>
          <div className="new-timeline-ball" ref={ballRef}></div>
        </div>

        {/* Timeline Rows */}
        {careerData.map((item, index) => (
          <div
            key={index}
            className="new-timeline-row"
            ref={(el) => (rowRefs.current[index] = el)}
          >
            {/* Left Column: Role Details & Period */}
            <div className="new-timeline-left">
              <div className="new-timeline-role-container">
                <h4>{item.position}</h4>
                <h5>{item.company}</h5>
              </div>
              <div className="new-timeline-period">{item.period}</div>
            </div>

            {/* Right Column: Description */}
            <div className="new-timeline-right">
              <p className="new-timeline-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CareerTimeline;
