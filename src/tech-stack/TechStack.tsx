import "./TechStack.css";
import { techStackCategories } from "./data/technologies";

export const TechStack = () => {
  return (
    <section className="techstack-new" id="stack">
      {/* Video Background */}
      <div className="techstack-video-container">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="techstack-video"
        >
          <source src="/video/video.webm" type="video/webm" />
        </video>
        {/* Dark Overlay */}
        <div className="techstack-overlay"></div>
      </div>

      {/* Content */}
      <div className="techstack-content">
        <h2>Tech Stack</h2>
        
        <div className="techstack-categories">
          {techStackCategories.map((category, catIndex) => (
            <div key={catIndex} className="techstack-category">
              <h3 className="techstack-category-title">{category.title}</h3>
              <div className="techstack-row">
                {category.items.map((tech, techIndex) => (
                  <a
                    key={techIndex}
                    href={tech.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="techstack-item"
                    title={tech.name}
                    data-cursor="disable"
                  >
                    <img src={tech.icon} alt={tech.name} loading="lazy" decoding="async" />
                    <span>{tech.name}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
