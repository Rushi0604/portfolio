import { useEffect } from "react";
import MyWork from "./MyWork/MyWork";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const ReferencePortfolio2 = () => {
  useEffect(() => {
    // Reset scroll to top before instantiating ScrollSmoother
    window.scrollTo(0, 0);

    // Save original overflow styles
    const originalBodyOverflow = document.body.style.overflowY;
    const originalDocOverflow = document.documentElement.style.overflowY;

    document.body.style.overflowY = "auto";
    document.documentElement.style.overflowY = "auto";

    // Create ScrollSmoother
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(false);

    // Refresh ScrollTrigger to recalculate everything with ScrollSmoother active
    ScrollTrigger.refresh();

    // Clean up
    return () => {
      smoother.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      document.body.style.overflowY = originalBodyOverflow;
      document.documentElement.style.overflowY = originalDocOverflow;
    };
  }, []);

  const pageStyle: React.CSSProperties = {
    // @ts-ignore
    "--accentColor": "#c2a4ff",
    "--backgroundColor": "#0b080c",
    color: "#eae5ec",
    backgroundColor: "#0b080c",
    fontFamily: '"Geist", sans-serif',
    width: "100%",
    minHeight: "100vh",
    overflow: "hidden",
  };

  return (
    <div id="smooth-wrapper" style={pageStyle}>
      <div id="smooth-content" style={{ width: "100%", position: "relative" }}>
        <div style={{ padding: "50px 20px" }}>
          <MyWork />
        </div>
      </div>
    </div>
  );
};

export default ReferencePortfolio2;
