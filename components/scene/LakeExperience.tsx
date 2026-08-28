"use client";

import { useExperience } from "@/components/providers/ExperienceProvider";
import { SceneCanvas } from "./SceneCanvas";
import { LakeScene } from "./LakeScene";

export function LakeExperience() {
  const { capability, atmosphere } = useExperience();
  if (!capability || !capability.webgl) return null;
  return (
    <SceneCanvas camera={{ position: [0, 14, 16], fov: 50 }}>
      <LakeScene
        atmosphere={atmosphere}
        level={capability.level}
        reducedMotion={capability.reducedMotion}
      />
    </SceneCanvas>
  );
}
