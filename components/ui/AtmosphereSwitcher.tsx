"use client";

import { useExperience, atmosphereModes, atmosphereLabels } from "@/components/providers/ExperienceProvider";

export function AtmosphereSwitcher() {
  const { atmosphere, setAtmosphere } = useExperience();
  return (
    <div
      className="glass flex flex-col items-center gap-1 rounded-full p-1.5"
      role="group"
      aria-label="Change atmosphere time of day"
    >
      {atmosphereModes.map((m) => (
        <button
          key={m}
          onClick={() => setAtmosphere(m)}
          aria-label={`${atmosphereLabels[m]} atmosphere`}
          aria-pressed={atmosphere === m}
          title={atmosphereLabels[m]}
          className={`flex h-9 w-9 items-center justify-center rounded-full transition-all ${
            atmosphere === m ? "bg-golden/80 text-forest-deep" : "text-mist/60 hover:bg-mist/10"
          }`}
        >
          {m === "morning" && "☀"}
          {m === "day" && "◐"}
          {m === "golden" && "🌅"}
          {m === "evening" && "🌇"}
          {m === "night" && "✦"}
        </button>
      ))}
    </div>
  );
}
