"use client";

import DotField from "./DotField";

interface DotFieldBgProps {
  sparkle: boolean;
  dotSpacing: number;
}

export default function DotFieldBg({ sparkle, dotSpacing }: DotFieldBgProps) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <DotField
        dotRadius={1.5}
        dotSpacing={dotSpacing}
        cursorRadius={500}
        cursorForce={0.10}
        bulgeOnly={true}
        bulgeStrength={67}
        glowRadius={160}
        sparkle={sparkle}
        waveAmplitude={0}
      />
    </div>
  );
};