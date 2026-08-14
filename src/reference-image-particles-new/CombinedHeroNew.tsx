import React from "react";
import { ReferenceHeroText } from "../reference-hero-text-new/ReferenceHeroText";
import ReferenceImageParticles from "./ReferenceImageParticles";
import yashImg from "./yash.png";

export const CombinedHeroNew: React.FC = () => {
  return (
    <div
      id="hero"
      className="combined-hero-new-container"
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#0a0e17",
        overflow: "hidden"
      }}
    >
      {/* 1. Infinite particle canvas layer */}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: 1
        }}
      >
        <ReferenceImageParticles
          src={yashImg}
          alt="Yash Kshatriya"
          imageWidth={300}
          imageHeight={300}
        />
      </div>

      {/* 2. Hero Text Overlay */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          left: 0,
          top: 0,
          zIndex: 2,
          pointerEvents: "none"
        }}
      >
        <style>{`
          .landing-section-new {
            background-color: transparent !important;
            pointer-events: none !important;
          }
          .landing-intro, .landing-info {
            pointer-events: auto !important;
          }
        `}</style>
        <ReferenceHeroText />
      </div>
    </div>
  );
};

export default CombinedHeroNew;
