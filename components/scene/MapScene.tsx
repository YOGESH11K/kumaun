"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { MountainTerrain, ForestLayer } from "./MountainScene";
import { places, type Place } from "@/data/places";
import { atmospherePalettes } from "@/lib/atmosphere";
import type { AtmosphereMode } from "@/components/providers/ExperienceProvider";
import type { QualityLevel } from "@/lib/capability";

type MapSceneProps = {
  onSelect: (place: Place) => void;
  selectedSlug?: string | null;
  atmosphere: AtmosphereMode;
  level: QualityLevel;
  reducedMotion: boolean;
};

/**
 * A stylised 3D terrain map of the Kumaon hills. Six glowing markers sit
 * on the terrain; clicking one flies the camera toward it and notifies the
 * parent to show the info panel.
 */
export function MapScene({ onSelect, selectedSlug, atmosphere, level, reducedMotion }: MapSceneProps) {
  const controls = useRef<any>(null);
  const { camera } = useThree();
  const [active, setActive] = useState<string | null>(null);
  const flying = useRef(false);
  const flyTarget = useRef<[number, number, number] | null>(null);

  const pal = atmospherePalettes[atmosphere];
  const seg = level === "high" ? 70 : 50;
  const forestCount = level === "high" ? 160 : level === "medium" ? 100 : 50;

  // Map each place to a 3D position on the terrain
  const markers = useMemo(
    () =>
      places.map((p, i) => {
        const angle = (i / places.length) * Math.PI * 2 + Math.PI / 2;
        const x = Math.cos(angle) * 14;
        const z = 10 + Math.sin(angle) * 16;
        return { place: p, x, z };
      }),
    []
  );

  const flyTo = (x: number, z: number) => {
    flying.current = true;
    flyTarget.current = [x * 0.8, 8 + z * 0.1, z * 0.7 + 6];
  };

  const handleSelect = (p: Place, x: number, z: number) => {
    setActive(p.slug);
    onSelect(p);
    flyTo(x, z);
  };

  useFrame((state) => {
    if (flying.current && flyTarget.current) {
      const target = new THREE.Vector3(...flyTarget.current);
      camera.position.lerp(target, 0.05);
      camera.lookAt(0, 2, 4);
      if (camera.position.distanceTo(target) < 0.5) {
        flying.current = false;
        flyTarget.current = null;
      }
    }
  });

  useEffect(() => {
    if (selectedSlug && !flying.current) {
      const m = markers.find((m) => m.place.slug === selectedSlug);
      if (m) setActive(m.place.slug);
    }
  }, [selectedSlug, markers]);

  return (
    <>
      <ambientLight intensity={0.5} color="#ffffff" />
      <hemisphereLight args={[pal.hemisphereSky, "#12241a", 0.8]} />
      <directionalLight position={[30, 40, 20]} intensity={1.2} color="#fff7e6" />

      {/* terrain bowl */}
      <MountainTerrain
        width={60}
        height={60}
        segments={seg}
        color="#1c4030"
        position={[0, -2, 6]}
        displacementSeed={1}
        roughness={0.5}
      />
      <MountainTerrain
        width={80}
        height={55}
        segments={seg}
        color="#163426"
        position={[0, -4, -8]}
        displacementSeed={3}
        roughness={0.6}
      />

      <ForestLayer count={forestCount} spread={40} density={0.6} />
      <ParticleDots />

      <OrbitControls
        ref={controls}
        enablePan={false}
        minDistance={6}
        maxDistance={28}
        maxPolarAngle={Math.PI / 2 - 0.1}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.4}
        enableDamping
        dampingFactor={0.08}
      />

      {markers.map(({ place, x, z }, i) => (
        <Marker
          key={place.slug}
          position={[x, terrainHeight(x, z) + 1.4, z]}
          color={place.color}
          label={place.name}
          active={active === place.slug}
          glow={pal.markerGlow}
          onClick={() => handleSelect(place, x, z)}
          index={i}
        />
      ))}
    </>
  );
}

function terrainHeight(x: number, z: number): number {
  let n = Math.sin(x * 0.5 + 20) * 0.5 + Math.sin(x * 1.3 + 5) * 0.3;
  n = n / 3 + 0.5;
  return n * 1.2;
}

function Marker({
  position,
  color,
  label,
  active,
  glow,
  onClick,
}: {
  position: [number, number, number];
  color: string;
  label: string;
  active: boolean;
  glow: string;
  onClick: (e: ThreeEvent<MouseEvent>) => void;
  index: number;
}) {
  const mesh = useRef<THREE.Mesh>(null!);
  const light = useRef<THREE.PointLight>(null!);
  const hovered = useRef(false);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mesh.current) {
      mesh.current.position.y = position[1] + Math.sin(t * 1.5 + position[0]) * 0.2;
      const s = active ? 1.6 : hovered.current ? 1.35 : 1 + Math.sin(t * 2 + position[0]) * 0.12;
      mesh.current.scale.setScalar(s);
    }
    if (light.current) {
      light.current.intensity = active ? 1.6 : 0.7 + Math.sin(t * 2 + position[0]) * 0.2;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={mesh}
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          hovered.current = true;
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          hovered.current = false;
          document.body.style.cursor = "auto";
        }}
      >
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color={active ? glow : color}
          emissive={active ? glow : color}
          emissiveIntensity={active ? 0.9 : 0.35}
          flatShading
        />
      </mesh>
      <pointLight ref={light} color={glow} intensity={0.8} distance={6} />
    </group>
  );
}

function ParticleDots() {
  const count = 200;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 50;
      arr[i * 3 + 1] = 0.2 + Math.random() * 1;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 40 + 6;
    }
    return arr;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#8fb38f" size={0.12} transparent opacity={0.6} depthWrite={false} />
    </points>
  );
}
