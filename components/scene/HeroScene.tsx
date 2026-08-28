"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MountainTerrain, ForestLayer, Particles } from "./MountainScene";
import { AtmosphereController } from "./AtmosphereController";
import { CameraRig } from "./CameraRig";
import type { AtmosphereMode } from "@/components/providers/ExperienceProvider";
import type { QualityLevel } from "@/lib/capability";

/**
 * The cinematic opening environment: layered mountain ranges, forest,
 * drifting cloud, mist and floating particles. The camera travels deeper
 * as the visitor scrolls.
 */
export function HeroScene({
  atmosphere,
  level,
  reducedMotion,
}: {
  atmosphere: AtmosphereMode;
  level: QualityLevel;
  reducedMotion: boolean;
}) {
  const quality = useMemo(() => {
    if (level === "high") return "high" as const;
    if (level === "medium") return "medium" as const;
    return "low" as const;
  }, [level]);

  const forestCount = quality === "high" ? 140 : quality === "medium" ? 80 : 40;
  const particleCount = quality === "high" ? 140 : quality === "medium" ? 80 : 30;

  return (
    <>
      <AtmosphereController mode={atmosphere} quality={quality} />
      <CameraRig depth={quality === "low" ? 4 : 7} reducedMotion={reducedMotion} />

      {/* Distant snow peaks */}
      <MountainTerrain
        width={70}
        height={46}
        segments={quality === "high" ? 96 : 48}
        color={quality === "high" ? "#dce8ea" : "#c9d9dc"}
        position={[0, -4, -34]}
        displacementSeed={1.4}
        roughness={1.1}
      />
      <MountainTerrain
        width={90}
        height={60}
        segments={quality === "high" ? 80 : 40}
        color={quality === "high" ? "#c8dade" : "#b6cbd0"}
        position={[0, -7, -42]}
        displacementSeed={4}
        roughness={1.2}
      />

      {/* Mid ranges - blue-green forested hills */}
      <MountainTerrain
        width={80}
        height={40}
        segments={64}
        color="#1e4634"
        position={[-4, -8, -22]}
        displacementSeed={2.2}
        roughness={0.7}
      />
      <MountainTerrain
        width={80}
        height={40}
        segments={64}
        color="#173c2c"
        position={[10, -9, -18]}
        displacementSeed={5.1}
        roughness={0.7}
      />

      {/* Ground plane / valley floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.5, -6]}>
        <planeGeometry args={[160, 120]} />
        <meshStandardMaterial color="#122a1e" roughness={1} />
      </mesh>

      <ForestLayer
        count={forestCount}
        color={quality === "high" ? "#1a3a28" : "#1c3c2a"}
        density={quality === "low" ? 0.6 : 1}
      />

      <Particles count={particleCount} density={quality === "low" ? 0.5 : 1} />

      {/* foreground mist band */}
      <mesh position={[0, -3.5, 8]}>
        <planeGeometry args={[160, 4]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={quality === "high" ? 0.18 : 0.12}
          depthWrite={false}
        />
      </mesh>

      <Birds count={quality === "high" ? 12 : 5} reducedMotion={reducedMotion} />
    </>
  );
}

function Birds({
  count,
  reducedMotion,
}: {
  count: number;
  reducedMotion: boolean;
}) {
  const refs = useRef<THREE.Group[]>([]);

  const birds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        position: [
          (i * 47) % 80 - 40,
          10 + ((i * 19) % 6),
          -30 - ((i * 23) % 20),
        ] as [number, number, number],
        speed: 0.4 + ((i * 7) % 10) / 20,
        amp: 0.5 + ((i * 13) % 8) / 10,
        phase: i * 1.7,
      })),
    [count]
  );

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.elapsedTime;
    refs.current.forEach((g, i) => {
      if (!g) return;
      const b = birds[i];
      if (!b) return;
      g.position.x = b.position[0] + Math.sin(t * b.speed + b.phase) * b.amp * 4;
      g.position.y = b.position[1] + Math.sin(t * b.speed * 1.4 + b.phase) * b.amp * 1.5;
      g.rotation.z = Math.sin(t * b.speed * 1.6 + b.phase) * 0.3;
    });
  });

  return (
    <group>
      {birds.map((b, i) => (
        <group
          key={i}
          position={b.position}
          ref={(g) => {
            if (g) refs.current[i] = g;
          }}
        >
          <mesh>
            <boxGeometry args={[0.7, 0.12, 0.05]} />
            <meshBasicMaterial color="#23292e" />
          </mesh>
          <mesh position={[-0.35, 0, 0]} rotation={[0, 0, 0.5]}>
            <boxGeometry args={[0.3, 0.06, 0.05]} />
            <meshBasicMaterial color="#23292e" />
          </mesh>
        </group>
      ))}
    </group>
  );
}
