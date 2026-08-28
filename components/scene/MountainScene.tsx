"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

type MountainLayerProps = {
  width?: number;
  height?: number;
  segments?: number;
  color: string;
  position: [number, number, number];
  rotationY?: number;
  roughness?: number;
  displacementSeed?: number;
  quality?: "high" | "medium" | "low";
};

/**
 * Generates a low-poly ridge using a 2D height field displaced by value
 * noise. Looks like a distant Himalayan range silhouette.
 */
export function MountainTerrain({
  width = 40,
  height = 30,
  segments = 64,
  color,
  position,
  rotationY = 0,
  roughness = 0.6,
  displacementSeed = 1,
}: MountainLayerProps) {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(width, height, segments, segments);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const nx = x / width + displacementSeed;
      let noise =
        Math.sin(x * 0.5 + displacementSeed * 20) * 0.5 +
        Math.sin(x * 1.3 + displacementSeed * 5) * 0.3 +
        Math.sin(z * 1.7 + x * 0.4) * 0.2;
      noise = noise / 3 + 0.5;
      const centerRidge = 1 - Math.abs(x / width) * 0.25;
      const y = noise * centerRidge * height * roughness * 0.5;
      pos.setY(i, y);
    }
    geo.computeVertexNormals();
    return geo;
  }, [width, height, segments, roughness, displacementSeed]);

  return (
    <mesh geometry={geometry} position={position} rotation={[0, rotationY, 0]}>
      <meshStandardMaterial color={color} flatShading roughness={0.9} metalness={0.02} />
    </mesh>
  );
}

type CloudProps = {
  position: [number, number, number];
  scale?: number;
  speed?: number;
  opacity?: number;
};

const CLOUD_BLOBS = 6;

export function Cloud({ position, scale = 1, speed = 0.02, opacity = 0.85 }: CloudProps) {
  const blobs = useMemo(
    () =>
      Array.from({ length: CLOUD_BLOBS }, (_, i) => ({
        x: (i - CLOUD_BLOBS / 2) * 0.9 + Math.sin(i * 7) * 0.4,
        y: Math.sin(i * 13) * 0.25,
        z: Math.cos(i * 5) * 0.3,
        s: 1 + ((i * 17) % 10) / 8,
      })),
    []
  );

  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g) return;
    g.position.x += speed * delta * 0.6;
    if (g.position.x > 90) g.position.x = -90;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {blobs.map((b, i) => (
        <mesh key={i} position={[b.x, b.y, b.z]} scale={[b.s * 1.6, b.s, b.s * 1.1]}>
          <sphereGeometry args={[1, 14, 10]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={opacity}
            roughness={1}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export function CloudLayer({
  count = 6,
  opacity = 0.85,
  distribution = ["spread", "mid", "close"],
  height = 12,
}: {
  count?: number;
  opacity?: number;
  distribution?: string[];
  height?: number;
}) {
  const clouds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        position: [
          ((i * 61) % 160) - 80,
          height + ((i * 13) % 6) - 3,
          ((i * 37) % 120) - 60,
        ] as [number, number, number],
        scale: 1 + ((i * 7) % 6) / 3,
        speed: 0.01 + ((i * 3) % 10) / 200,
        mode: distribution[i % distribution.length],
      })),
    [count, distribution, height]
  );

  return (
    <group>
      {clouds.map((c, i) => (
        <Cloud
          key={i}
          position={c.position}
          scale={c.scale}
          speed={c.speed}
          opacity={c.mode === "close" ? opacity * 1.1 : opacity * 0.9}
        />
      ))}
    </group>
  );
}

type PineProps = {
  position: [number, number, number];
  scale?: number;
  color?: string;
};

export function Pine({ position, scale = 1, color = "#1c3a2a" }: PineProps) {
  const group = useMemo(() => new THREE.Group(), []);
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.12, 0.16, 0.7, 6]} />
        <meshStandardMaterial color="#33402c" flatShading />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <coneGeometry args={[0.55, 0.8, 7]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
      <mesh position={[0, 1.35, 0]}>
        <coneGeometry args={[0.42, 0.7, 7]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
      <mesh position={[0, 1.85, 0]}>
        <coneGeometry args={[0.28, 0.55, 7]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
    </group>
  );
}

export function ForestLayer({
  count = 120,
  color = "#1c3a2a",
  spread = 60,
  density = 1,
}: {
  count?: number;
  color?: string;
  spread?: number;
  density?: number;
}) {
  const trees = useMemo(
    () =>
      Array.from({ length: Math.floor(count * density) }, (_, i) => ({
        position: [
          ((i * 137) % (spread * 2)) - spread,
          0,
          ((i * 71) % spread) + 2,
        ] as [number, number, number],
        scale: 0.8 + ((i * 11) % 10) / 6,
      })),
    [count, spread, density]
  );

  return (
    <group>
      {trees.map((t, i) => (
        <Pine key={i} position={t.position} scale={t.scale} color={color} />
      ))}
    </group>
  );
}

export function StarField({
  count = 300,
  radius = 90,
  opacity = 1,
}: {
  count?: number;
  radius?: number;
  opacity?: number;
}) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 0.85);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.cos(phi) + 8;
      arr[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, [count, radius]);

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  return (
    <points geometry={geom}>
      <pointsMaterial
        color="#ffffff"
        size={0.35}
        sizeAttenuation={false}
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </points>
  );
}

export function Particles({
  count = 120,
  color = "#ffffff",
  spread = 60,
  opacity = 0.5,
  density = 1,
}: {
  count?: number;
  color?: string;
  spread?: number;
  opacity?: number;
  density?: number;
}) {
  const points = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const n = Math.floor(count * density);
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (Math.random() - 0.5) * spread;
      arr[i * 3 + 1] = Math.random() * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * spread;
    }
    return arr;
  }, [count, spread, density]);

  useFrame((state, delta) => {
    const geo = points.current.geometry;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    if (!pos) return;
    for (let i = 0; i < pos.count; i++) {
      let y = pos.getY(i);
      y += delta * 0.4;
      if (y > 20) y = 0;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.06}
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </points>
  );
}
