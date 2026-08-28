"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type CameraRigProps = {
  depth?: number;
  reducedMotion?: boolean;
  baseHeight?: number;
  lookAt?: [number, number, number];
};

/**
 * Parallax + depth camera. Follows cursor slightly and moves the camera
 * deeper into the valley as the page scrolls, giving the cinematic
 * 'travelling into the mountains' feel. Respects reduced motion.
 */
export function CameraRig({
  depth = 6,
  reducedMotion = false,
  baseHeight = 3.5,
  lookAt = [0, 2.5, 0],
}: CameraRigProps) {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      scroll.current = window.scrollY;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useFrame((state, delta) => {
    const lookVec = new THREE.Vector3(...lookAt);
    const base = new THREE.Vector3(0, baseHeight, 12);
    const t = Math.min(scroll.current / window.innerHeight, 1);

    const target = base.clone();
    target.z -= t * depth;
    target.y += t * 1.2;
    if (!reducedMotion) {
      target.x += mouse.current.x * 0.8;
      target.y += -mouse.current.y * 0.5;
    }

    const damp = reducedMotion ? 1 : 1 - Math.pow(0.01, delta);
    camera.position.lerp(target, Math.min(damp, 1));
    camera.lookAt(lookVec);
  });

  return null;
}
