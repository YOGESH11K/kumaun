"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { getCapability, type Capability, type QualityLevel } from "@/lib/capability";

export type AtmosphereMode = "morning" | "day" | "golden" | "evening" | "night";

export const atmosphereModes: AtmosphereMode[] = [
  "morning",
  "day",
  "golden",
  "evening",
  "night",
];

export const atmosphereLabels: Record<AtmosphereMode, string> = {
  morning: "Morning",
  day: "Day",
  golden: "Golden Hour",
  evening: "Evening",
  night: "Night",
};

type ExperienceContextValue = {
  capability: Capability | null;
  level: QualityLevel;
  atmosphere: AtmosphereMode;
  setAtmosphere: (m: AtmosphereMode) => void;
  soundOn: boolean;
  toggleSound: () => void;
  webglFailed: boolean;
};

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [capability, setCapability] = useState<Capability | null>(null);
  const [webglFailed, setWebglFailed] = useState(false);
  const [atmosphere, setAtmosphere] = useState<AtmosphereMode>("day");
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    try {
      setCapability(getCapability());
    } catch {
      setCapability({
        level: "low",
        webgl: false,
        reducedMotion: true,
        isMobile: true,
        pixelRatio: 1,
        isTouch: true,
      });
    }
  }, []);

  useEffect(() => {
    if (!capability) return;
    if (!capability.webgl || capability.reducedMotion) {
      setWebglFailed(!capability.webgl);
    }
  }, [capability]);

  const toggleSound = useCallback(() => {
    setSoundOn((prev) => {
      const next = !prev;
      if (next) {
        if (!audioRef.current) {
          const audio = new Audio("/audio/forest-ambience.mp3");
          audio.loop = true;
          audio.volume = 0.5;
          audioRef.current = audio;
        }
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current?.pause();
      }
      return next;
    });
  }, []);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const value = useMemo<ExperienceContextValue>(
    () => ({
      capability,
      level: capability?.level ?? "high",
      atmosphere,
      setAtmosphere,
      soundOn,
      toggleSound,
      webglFailed,
    }),
    [capability, atmosphere, soundOn, toggleSound, webglFailed]
  );

  return (
    <ExperienceContext.Provider value={value}>
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperience() {
  const ctx = useContext(ExperienceContext);
  if (!ctx) throw new Error("useExperience must be used within ExperienceProvider");
  return ctx;
}
