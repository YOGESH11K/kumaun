"use client";

import { useExperience } from "@/components/providers/ExperienceProvider";
import { SceneCanvas } from "./SceneCanvas";
import { MapScene } from "./MapScene";
import type { Place } from "@/data/places";

export function MapExperience({
  onSelect,
  selectedSlug,
}: {
  onSelect: (p: Place) => void;
  selectedSlug?: string | null;
}) {
  const { capability, atmosphere } = useExperience();
  if (!capability || !capability.webgl) return null;
  return (
    <SceneCanvas camera={{ position: [0, 10, 18], fov: 50 }}>
      <MapScene
        onSelect={onSelect}
        selectedSlug={selectedSlug}
        atmosphere={atmosphere}
        level={capability.level}
        reducedMotion={capability.reducedMotion}
      />
    </SceneCanvas>
  );
}
