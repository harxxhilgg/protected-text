"use client";

import SideRays from "./SideRays";

interface SideRaysBgProps {
  origin: "top-left" | "top-right" | "bottom-left" | "bottom-right";
};

export default function SideRaysBg({ origin }: SideRaysBgProps) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <SideRays
        speed={2.5}
        rayColor1="#C084FC"
        rayColor2="#F3E8FF"
        intensity={2}
        spread={2}
        origin={origin}
        tilt={0}
        saturation={1.5}
        blend={0.75}
        falloff={1.6}
        opacity={1}
      />
    </div>
  );
};