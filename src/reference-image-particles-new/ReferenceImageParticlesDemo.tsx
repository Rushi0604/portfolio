import React from "react";
import ReferenceImageParticles from "./ReferenceImageParticles";
import yashImg from "./yash.png";

export const ReferenceImageParticlesDemo: React.FC = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#05050c",
        color: "#ffffff",
        fontFamily: "'Inter', sans-serif",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          zIndex: 10,
          pointerEvents: "none"
        }}
      >
        <h1 style={{ margin: "0 0 10px 0", fontWeight: 300, letterSpacing: "1px" }}>
          Image Hover Particle Effect
        </h1>
        <p style={{ margin: 0, color: "#888899", fontSize: "14px" }}>
          Hover over the image to break it into particles. Move mouse to interact.
        </p>
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          left: 0,
          top: 0
        }}
      >
        <ReferenceImageParticles 
          src={yashImg} 
          alt="Yash Kshatriya" 
          imageWidth={300}
          imageHeight={300}
        />
      </div>
    </div>
  );
};

export default ReferenceImageParticlesDemo;
