import { useEffect, useState } from "react";
import "./MyWork.css";
import WorkImage from "./WorkImage";
import { referenceProjects, projectDetails } from "../data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdArrowOutward, MdInfoOutline } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const MyWork = () => {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  useEffect(() => {
    // Disable pinning on mobile to allow natural vertical scrolling
    if (window.innerWidth <= 768) return;

    let translateX = 0;

    function setTranslateX() {
      const boxes = document.getElementsByClassName("work-box");
      if (boxes.length === 0) return;

      const container = document.querySelector(".work-container");
      if (!container) return;

      const rectLeft = container.getBoundingClientRect().left;
      const rect = boxes[0].getBoundingClientRect();
      const parentWidth = boxes[0].parentElement!.getBoundingClientRect().width;
      const padding = parseInt(window.getComputedStyle(boxes[0]).padding) / 2;

      translateX = rect.width * boxes.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${translateX}`, // Dynamic end with 400px hold buffer
        scrub: true,
        pin: true,
        id: "work-p2",
        invalidateOnRefresh: true,
      },
    });

    timeline.to(".work-flex", {
      x: () => -translateX, // Dynamic target
      ease: "none",
      duration: translateX, // Tween duration scales to horizontal distance
    });

    // Explicitly sequence 400px of vertical hold where no horizontal movement occurs
    timeline.to({}, {
      duration: 400,
    });

    // Handle resize
    const handleResize = () => {
      setTranslateX();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      timeline.kill();
      ScrollTrigger.getById("work-p2")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {referenceProjects.map((project, index) => {
            const isFirstProject = index === 0;
            const isFlipped = !!flippedCards[index];
            const details = projectDetails[project.detailKey];

            return (
              <div className="work-box" key={index}>
                <div className={`work-card-inner ${isFlipped ? "is-flipped" : ""}`}>
                  
                  {/* FRONT FACE */}
                  <div className="work-card-front">
                    <div className="work-info">
                      <div className="work-title">
                        <h3>0{index + 1}</h3>
                        <div>
                          <h4>{project.title}</h4>
                          <p>{project.category}</p>
                        </div>
                      </div>
                    </div>
                    <WorkImage image={project.image} alt={project.title} link={project.link} video={project.video} />
                    
                    <div className="work-tools">
                      <h4>Tools and features</h4>
                      <p>{project.tools}</p>
                    </div>
                    
                    {/* Action links row */}
                    <div className="work-links">
                      {/* GitHub button (left) */}
                      {project.githubUrl ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="work-action-btn github-btn"
                        >
                          <FaGithub style={{ marginRight: '6px', fontSize: '16px' }} />
                          GitHub
                        </a>
                      ) : (
                        <span className="work-action-btn disabled-btn">
                          <FaGithub style={{ marginRight: '6px', fontSize: '16px' }} />
                          GitHub
                        </span>
                      )}

                      {/* Live Demo button (center - first project only) */}
                      {isFirstProject && (
                        project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="work-action-btn live-btn"
                          >
                            <MdArrowOutward style={{ marginRight: '6px', fontSize: '16px' }} />
                            Live Demo
                          </a>
                        ) : (
                          <span className="work-action-btn disabled-btn">
                            <MdArrowOutward style={{ marginRight: '6px', fontSize: '16px' }} />
                            Live Demo
                          </span>
                        )
                      )}

                      {/* Know More button (right) */}
                      <button
                        type="button"
                        onClick={() => setFlippedCards(prev => ({ ...prev, [index]: true }))}
                        className="work-action-btn know-more-btn"
                      >
                        <MdInfoOutline style={{ marginRight: '6px', fontSize: '16px' }} />
                        Know More
                      </button>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div className="work-card-back">
                    <div className="work-back-header">
                      <div className="work-back-title">
                        <h3>0{index + 1}</h3>
                        <h4>{project.title}</h4>
                      </div>
                    </div>

                    <div className="work-back-body">
                      <div className="work-back-section">
                        <h5>Overview</h5>
                        <p>{details.overview}</p>
                      </div>

                      <div className="work-back-section">
                        <h5>Key Features</h5>
                        <ul>
                          {details.features.map((feature, fIdx) => (
                            <li key={fIdx}>• {feature}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="work-back-section">
                        <h5>Tech Stack</h5>
                        <p>{details.technologies}</p>
                      </div>

                      <div className="work-back-section">
                        <h5>Contribution</h5>
                        <p>{details.contribution}</p>
                      </div>
                    </div>

                    <div className="back-actions">
                      <button
                        type="button"
                        onClick={() => setFlippedCards(prev => ({ ...prev, [index]: false }))}
                        className="work-action-btn back-btn"
                      >
                        ↩ Back to Overview
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyWork;
