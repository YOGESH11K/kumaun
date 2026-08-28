"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/ui/SiteImage";
import { useExperience, atmosphereLabels, type AtmosphereMode } from "@/components/providers/ExperienceProvider";

const modes: { key: AtmosphereMode; color: string; desc: string }[] = [
  { key: "morning", color: "#f0cf9c", desc: "Mist lifts, peaks catch the first gold." },
  { key: "day", color: "#bcd7df", desc: "Clear air, blue sky, the full range in view." },
  { key: "golden", color: "#e8a85c", desc: "Warm light floods the valleys before dusk." },
  { key: "evening", color: "#8a7a9c", desc: "The light softens, silhouettes deepen." },
  { key: "night", color: "#141f3a", desc: "A sea of stars over the silent peaks." },
];

export function AtmosphereSection() {
  const { atmosphere, setAtmosphere } = useExperience();
  const labels: Record<string, string> = atmosphereLabels;

  return (
    <section id="atmosphere" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeading
          eyebrow="The light of the hills"
          title="A Day In The Mountains"
          subtitle="The 3D environment breathes with the day. Use the night-to-morning dock on the opening scene to shift the light, the sky and the stars yourself."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {modes.map((m, i) => {
            const active = atmosphere === m.key;
            return (
              <Reveal key={m.key} delay={i * 0.05}>
                <button
                  onClick={() => setAtmosphere(m.key)}
                  className={`relative aspect-[3/4] w-full overflow-hidden rounded-2xl border transition-all ${
                    active ? "border-golden" : "border-mist/10 hover:border-mist/30"
                  }`}
                  aria-label={`View ${m.key} atmosphere`}
                  aria-pressed={active}
                >
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(180deg, ${m.color}, #0a1410)` }}
                  />
                  <SiteImageFill i={i} />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-forest-deep/80 to-transparent p-3 text-left">
                    <span className="font-display text-lg text-mist-white">{labels[m.key]}</span>
                    <span className="mt-1 text-[10px] leading-tight text-mist/70">{m.desc}</span>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-10 text-center text-xs text-mist/40">
          Atmospheric modes currently affect the 3D hero and lake scenes. Modes are labeled
          Morning, Day, Golden Hour, Evening and Night.
        </p>
      </div>
    </section>
  );
}

function SiteImageFill({ i }: { i: number }) {
  const imgs = [
    "/images/mukteshwar/sunrise-peaks.svg",
    "/images/landscapes/hero-panorama.svg",
    "/images/sundarkhal/mountain-views.svg",
    "/images/saliyakote-talla/sunset.svg",
    "/images/experiences/himalayan-sky.svg",
    "/images/nainital/lake-hills.svg",
  ];
  if (i >= imgs.length) return null;
  return (
    <div className="absolute inset-0 opacity-40">
      <SiteImage src={imgs[i]} alt={`Atmosphere ${i}`} fill />
    </div>
  );
}
