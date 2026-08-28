"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { MountainTerrain, CloudLayer, StarField } from "./MountainScene";
import type { AtmosphereMode } from "@/components/providers/ExperienceProvider";
import type { QualityLevel } from "@/lib/capability";

type LakeSceneProps = {
  atmosphere: AtmosphereMode;
  level: QualityLevel;
  reducedMotion: boolean;
};

const LAKE_RADIUS = 6.5;

/**
 * Nainital's lake scene. Camera starts above the surrounding hills and
 * slowly descends toward the lake; boats drift, clouds move over the
 * hills, and lights appear on the shore at dusk/night.
 */
export function LakeScene({ atmosphere, level, reducedMotion }: LakeSceneProps) {
  const high = level === "high";
  const isNight = atmosphere === "night";

  return (
    <>
      <ambientLight intensity={0.45} color="#ffffff" />
      <hemisphereLight args={[isNight ? "#16233a" : "#9fc0d8", "#12241a", 0.9]} />
      <directionalLight
        position={[20, 30, 20]}
        intensity={isNight ? 0.2 : 1.4}
        color={isNight ? "#9ab0e0" : "#fff6e0"}
      />

      <StarField count={high ? 260 : 120} opacity={isNight ? 1 : 0} />
      <CloudLayer count={high ? 5 : 3} opacity={isNight ? 0.4 : 0.75} height={14} />

      {/* surrounding hills */}
      <MountainTerrain
        width={70}
        height={52}
        segments={high ? 80 : 48}
        color="#2c4a3c"
        position={[0, -5, -16]}
        displacementSeed={1.2}
        roughness={0.6}
      />
      <MountainTerrain
        width={70}
        height={52}
        segments={high ? 80 : 48}
        color="#234333"
        position={[0, -6, -20]}
        displacementSeed={4.3}
        roughness={0.6}
      />

      {/* lake water */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[LAKE_RADIUS, high ? 48 : 32]} />
        <meshStandardMaterial color={isNight ? "#1a2a3c" : "#4f82a0"} roughness={0.15} metalness={0.35} />
      </mesh>
      {/* reflections */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[LAKE_RADIUS - 0.3, 40]} />
        <meshStandardMaterial color={isNight ? "#6a8fbb" : "#a9c8de"} roughness={0.1} metalness={0.6} transparent opacity={0.45} />
      </mesh>

      {/* forested bank ring */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[LAKE_RADIUS, LAKE_RADIUS + 7, 64]} />
        <meshStandardMaterial color="#1d4230" roughness={1} />
      </mesh>

      <Boats count={level === "high" ? 6 : 4} night={isNight} reducedMotion={reducedMotion} />

      <LakeRig reducedMotion={reducedMotion} />
    </>
  );
}

function Boats({
  count,
  night,
  reducedMotion,
}: {
  count: number;
  night: boolean;
  reducedMotion: boolean;
}) {
  const refs = useRef<THREE.Group[]>([]);

  const boats = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        startX: -3 + ((i * 2.4) % 5),
        startZ: -2.2 + ((i * 1.8) % 4),
        speed: 0.05 + i * 0.03,
        phase: i * 2.4,
      })),
    [count]
  );

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.elapsedTime;
    refs.current.forEach((g, i) => {
      if (!g) return;
      const b = boats[i];
      if (!b) return;
      g.position.x = b.startX + Math.sin(t * b.speed + b.phase) * 1.8;
      g.position.z = b.startZ + Math.cos(t * b.speed * 0.7 + b.phase) * 1.2;
      g.rotation.y = Math.sin(t * b.speed + b.phase) * 0.5;
    });
  });

  return (
    <group>
      {boats.map((b, i) => (
        <group
          key={i}
          ref={(g) => {
            if (g) refs.current[i] = g;
          }}
          position={[b.startX, 0.12, b.startZ]}
        >
          <mesh>
            <boxGeometry args={[1.0, 0.16, 0.3]} />
            <meshStandardMaterial color="#6b4f35" />
          </mesh>
          {night && (
            <pointLight color="#ffd9a0" intensity={0.06} distance={3} position={[0, 0.3, 0]} />
          )}
        </group>
      ))}
    </group>
  );
}

function LakeRig({ reducedMotion }: { reducedMotion: boolean }) {
  const camera = useThree((s) => s.camera);
  const start = useRef(performance.now());

  useFrame(() => {
    const t = (performance.now() - start.current) / 1000;
    const eased = Math.min(t / (reducedMotion ? 1 : 9), 1);
    const progress = 1 - Math.pow(1 - eased, 2);

    camera.position.set(
      Math.sin(progress * Math.PI * 0.5) * 16,
      14 - progress * 12,
      16 - progress * 14
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}
