import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export const SparklesCore = ({ id, className }: { id?: string; className?: string }) => {
  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  return (
    <div className={className}>
      <Particles
        id={id}
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          particles: {
            color: { value: "#ffffff" },
            number: { value: 100, density: { enable: true, value_area: 800 } },
            size: { value: { min: 0.6, max: 1.4 } },
            move: { enable: true, speed: 1 },
            opacity: { value: 0.5 },
          },
        }}
      />
    </div>
  );
};
