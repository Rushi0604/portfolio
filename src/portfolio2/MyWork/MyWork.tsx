import { useEffect } from "react";
import "./MyWork.css";
import WorkImage from "./WorkImage";
import { referenceProjects } from "../data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdArrowOutward, MdInfoOutline, MdCode } from 'react-icons/md';

gsap.registerPlugin(ScrollTrigger);

const MyWork = () => {
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
          {referenceProjects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
                <div className="work-links">
                  {project.knowMoreUrl && (
                    <a
                      href={project.knowMoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work-action-btn"
                    >
                      <MdInfoOutline style={{ marginRight: '6px', fontSize: '16px' }} />
                      Know More
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work-action-btn"
                    >
                      <MdArrowOutward style={{ marginRight: '6px', fontSize: '16px' }} />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work-action-btn"
                    >
                      <MdCode style={{ marginRight: '6px', fontSize: '16px' }} />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
              <WorkImage image={project.image} alt={project.title} link={project.link} video={project.video} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyWork;
