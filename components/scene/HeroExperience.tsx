"use client";

import { useExperience } from "@/components/providers/ExperienceProvider";
import { SceneCanvas } from "./SceneCanvas";
import { HeroScene } from "./HeroScene";

export function HeroExperience() {
  const { capability, atmosphere } = useExperience();
  if (!capability || !capability.webgl) return null;
  return (
    <SceneCanvas>
      <HeroScene
        atmosphere={atmosphere}
        level={capability.level}
        reducedMotion={capability.reducedMotion}
      />
    </SceneCanvas>
  );
}
