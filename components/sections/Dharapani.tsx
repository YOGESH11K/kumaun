"use client";

import { getPlace } from "@/data/places";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/ui/SiteImage";
import { PlaceFacts, TrackBlock } from "./place/PlaceBits2";

/**
 * Dharapani — a special section within the local-area experience. An
 * editorial split layout framed by the surrounding mountains.
 */
export function Dharapani() {
  const place = getPlace("dharapani")!;
  const [valley, life, mountains] = place.content;

  return (
    <section id="dharapani" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeading eyebrow="Within the local area" title={place.title} subtitle={place.subheading} />

        {/* editorial split */}
        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <SiteImage src={place.heroImage} alt={place.heroAlt} fill tilt />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <p className="text-xs uppercase tracking-[0.3em] text-golden">{valley.heading}</p>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mist/85">{valley.body}</p>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <Reveal delay={0.15}>
                <p className="border-t border-mist/15 pt-4 text-xs uppercase tracking-[0.25em] text-mist/50">
                  {life.heading}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-mist/75">{life.body}</p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="border-t border-mist/15 pt-4 text-xs uppercase tracking-[0.25em] text-mist/50">
                  {mountains.heading}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-mist/75">{mountains.body}</p>
              </Reveal>
            </div>
          </div>
        </div>

        {/* photo band */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {place.gallery.map((g, i) => (
            <Reveal key={g} delay={(i % 4) * 0.05}>
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <SiteImage src={g} alt={`${place.name} photograph ${i + 1}`} fill tilt />
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16">
          <PlaceFacts facts={place.facts} />
        </div>

        <TrackBlock place={place} />
      </div>
    </section>
  );
}
