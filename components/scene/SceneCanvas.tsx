"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import { Suspense } from "react";
import { useExperience } from "@/components/providers/ExperienceProvider";

/**
 * Shared WebGL Canvas wrapper. Adapts DPR and shadows to the detected
 * device capability, rendering nothing until capability is known.
 */
export function SceneCanvas({
  children,
  camera,
  gl,
}: {
  children: React.ReactNode;
  camera?: CanvasProps["camera"];
  gl?: CanvasProps["gl"];
}) {
  const { capability } = useExperience();

  if (!capability) return null;

  const dpr = capability.pixelRatio;
  const low = capability.level === "low";

  return (
    <Canvas
      dpr={dpr}
      camera={camera ?? { position: [0, 3.5, 12], fov: 45, near: 0.5, far: 300 }}
      gl={{
        antialias: !low,
        powerPreference: "high-performance",
        ...(gl as object),
      }}
      shadows={!low}
      frameloop={capability.reducedMotion ? "demand" : "always"}
      className="!absolute !inset-0"
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
