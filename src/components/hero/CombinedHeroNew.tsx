import React from "react";
import { ReferenceHeroText } from "./ReferenceHeroText";
import ReferenceImageParticles from "./ReferenceImageParticles";
import MoltenMetal from "./MoltenMetal";
import Ribbons from "../ui/Ribbons";
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
      {/* 0. MoltenMetal background layer */}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: 0,
          pointerEvents: "none"
        }}
      >
        <MoltenMetal
          color1="#5227FF"
          color2="#FF9FFC"
          color3="#FFFFFF"
          speed={0.25}
          scale={6}
          detail={3}
          glow={1.6}
          coreSize={0.1}
          swirl={1}
          fold={-0.2}
          blackPoint={0.05}
          brightness={1.1}
          colorMode="molten"
          grain={true}
          grainIntensity={0.05}
          mouseInteraction={true}
          mouseStrength={0.2}
          opacity={0.85}
        />
      </div>

      {/* 0.1 Ribbons background layer */}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: 0,
          pointerEvents: "none"
        }}
      >
        <Ribbons
          colors={['#8B5CF6']}
          baseSpring={0.03}
          baseFriction={0.92}
          baseThickness={7}
          offsetFactor={0}
          maxAge={600}
          pointCount={60}
          speedMultiplier={0.3}
          enableFade={true}
          enableShaderEffect={true}
          effectAmplitude={1.2}
          backgroundColor={[0, 0, 0, 0]}
        />
      </div>

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
