"use client";

import dynamic from "next/dynamic";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { getPlace } from "@/data/places";
import { Reveal } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/ui/SiteImage";
import { PlaceFacts, HighlightsList, NearbyChips, TravelBlock } from "./place/PlaceBits";

const LakeExperience = dynamic(
  () => import("@/components/scene/LakeExperience").then((m) => m.LakeExperience),
  { ssr: false }
);

export function Nainital() {
  const place = getPlace("nainital")!;
  const { capability } = useExperience();
  const webgl = capability?.webgl;

  return (
    <section id="nainital" className="relative">
      {/* 3D lake landscape (or 2D fallback) */}
      <div className="relative h-[80vh] w-full overflow-hidden sm:h-[100vh]">
        {webgl ? (
          <div className="absolute inset-0">
            <LakeExperience />
          </div>
        ) : (
          <div className="absolute inset-0">
            <SiteImage src={place.heroImage} alt={place.heroAlt} fill priority />
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-forest-deep/50 via-transparent to-forest-deep" />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
          <Reveal>
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-golden">The Lake District</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl leading-none tracking-tight text-mist-white sm:text-7xl lg:text-8xl">
              NAINITAL
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-xl font-display text-xl italic text-mist/90 sm:text-2xl">
              {place.tagline}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-mist/75 sm:text-base">
              {place.shortDescription}
            </p>
          </Reveal>
        </div>

        <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-mist/50">
          {webgl ? "The lake settles as you arrive" : "Naini Lake at dusk"}
        </div>
      </div>

      {/* content */}
      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Reveal>
              <h3 className="font-display text-3xl text-mist-white sm:text-4xl">
                {place.content[0].heading}
              </h3>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-mist/80">
                {place.longDescription}
              </p>
            </Reveal>

            <div className="mt-10 space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-golden">Things to experience</p>
              <ul className="space-y-2">
                {place.activities.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-sm text-mist/80">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-golden" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <PlaceFacts facts={place.facts} />
            <HighlightsList highlights={place.highlights} />
            <TravelBlock travel={place.travelInfo} />
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-mist/50">Nearby destinations</p>
              <NearbyChips places={place.nearbyPlaces} />
            </div>
          </div>
        </div>

        {/* gallery */}
        <div className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {place.gallery.map((g, i) => (
            <Reveal key={g} delay={(i % 3) * 0.05}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <SiteImage src={g} alt={`${place.name} photograph ${i + 1}`} fill tilt />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
