import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import "./ReferenceHeroText.css";

// Register the SplitText plugin
gsap.registerPlugin(SplitText);

export interface ReferenceHeroTextProps {
  greeting?: string;
  name?: string;
  subtitle?: string;
  titles?: string[];
}

export const ReferenceHeroText = ({
  greeting = "Hello! I'm",
  name = "YASH KSHATRIYA",
  subtitle = "An Aspiring",
  titles = ["AI/ML ENGINEER", "FULL STACK DEVELOPER"],
}: ReferenceHeroTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    // Use gsap.context to ensure scoping and cleanup
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(containerRef.current);

      const landingText = new SplitText(
        [
          ...q(".landing-info h3"),
          ...q(".landing-intro h2"),
          ...q(".landing-intro h1"),
        ] as any,
        {
          type: "chars,lines",
          linesClass: "split-line",
        }
      );

      gsap.fromTo(
        landingText.chars,
        { opacity: 0, y: 80, filter: "blur(5px)" },
        {
          opacity: 1,
          duration: 1.2,
          filter: "blur(0px)",
          ease: "power3.inOut",
          y: 0,
          stagger: 0.025,
          delay: 0.3,
        }
      );

      const TextProps = { type: "chars,lines", linesClass: "split-h2" };

      const landingText2 = new SplitText(q(".landing-h2-info") as any, TextProps);
      gsap.fromTo(
        landingText2.chars,
        { opacity: 0, y: 80, filter: "blur(5px)" },
        {
          opacity: 1,
          duration: 1.2,
          filter: "blur(0px)",
          ease: "power3.inOut",
          y: 0,
          stagger: 0.025,
          delay: 0.3,
        }
      );

      gsap.fromTo(
        q(".landing-info-h2") as any,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          duration: 1.2,
          ease: "power1.inOut",
          y: 0,
          delay: 0.8,
        }
      );

      const landingText3 = new SplitText(q(".landing-h2-info-1") as any, TextProps);
      const landingText4 = new SplitText(q(".landing-h2-1") as any, TextProps);
      const landingText5 = new SplitText(q(".landing-h2-2") as any, TextProps);

      const LoopText = (Text1: any, Text2: any) => {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
        const delay = 4;
        const delay2 = delay * 2 + 1; // 9

        tl.fromTo(
          Text2.chars,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            duration: 1.2,
            ease: "power3.inOut",
            y: 0,
            stagger: 0.1,
            delay: delay,
          },
          0
        )
          .fromTo(
            Text1.chars,
            { y: 80 },
            {
              duration: 1.2,
              ease: "power3.inOut",
              y: 0,
              stagger: 0.1,
              delay: delay2,
            },
            1
          )
          .fromTo(
            Text1.chars,
            { y: 0 },
            {
              y: -80,
              duration: 1.2,
              ease: "power3.inOut",
              stagger: 0.1,
              delay: delay,
            },
            0
          )
          .to(
            Text2.chars,
            {
              y: -80,
              duration: 1.2,
              ease: "power3.inOut",
              stagger: 0.1,
              delay: delay2,
            },
            1
          );
      };

      LoopText(landingText2, landingText3);
      LoopText(landingText4, landingText5);
    }, containerRef);

    return () => ctx.revert();
  }, [greeting, name, subtitle, titles]);

  // Split name by space.
  const nameParts = name.trim().split(/\s+/);
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <div ref={containerRef} className="landing-section-new">
      <div className="landing-container-new">
        <div className="landing-intro">
          <h2>{greeting}</h2>
          <h1>
            {firstName}
            <br />
            <span>{lastName}</span>
          </h1>
        </div>
        <div className="landing-info">
          <h3>{subtitle}</h3>
          <h2 className="landing-info-h2">
            <div className="landing-h2-1">{titles[0]}</div>
            <div className="landing-h2-2">{titles[1]}</div>
          </h2>
          <h2>
            <div className="landing-h2-info">{titles[1]}</div>
            <div className="landing-h2-info-1">{titles[0]}</div>
          </h2>
        </div>
      </div>
    </div>
  );
};
