"use client";

import { useExperience } from "@/components/providers/ExperienceProvider";

export function SoundToggle() {
  const { soundOn, toggleSound } = useExperience();
  return (
    <button
      onClick={toggleSound}
      aria-label={soundOn ? "Turn sound off" : "Turn ambient sound on"}
      aria-pressed={soundOn}
      className="glass flex h-11 w-11 items-center justify-center rounded-full text-mist transition-colors hover:bg-mist/10"
    >
      {soundOn ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M11 5L6 9H2v6h4l5 4V5z" fill="#f2f6f4" />
          <path d="M15 9l6 6M21 9l-6 6" stroke="#f2f6f4" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M11 5L6 9H2v6h4l5 4V5z" fill="#f2f6f4" />
          <path d="M16 9l4 4M20 9l-4 4" stroke="#f2f6f4" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}
