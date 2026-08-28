"use client";

import { getPlace } from "@/data/places";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/ui/SiteImage";
import { PlaceFacts, TrackBlock } from "./place/PlaceBits2";

/**
 * Saliyakote Malla — a storytelling layout:
 * IMAGE → STORY → IMAGE → LANDSCAPE → LOCAL LIFE
 */
export function SaliyakoteMalla() {
  const place = getPlace("saliyakote-malla")!;
  const [story, landscape, localLife] = place.content;

  return (
    <section id="saliyakote-malla" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeading
          eyebrow="A village in the Kumaon hills"
          title={place.title}
          subtitle={place.subheading}
        />
      </div>

      {/* IMAGE opener */}
      <div className="mx-auto mt-16 max-w-6xl px-6 sm:px-10">
        <Reveal>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl">
            <SiteImage src={place.heroImage} alt={place.heroAlt} fill tilt />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 to-transparent" />
            <p className="absolute bottom-6 left-6 right-6 max-w-2xl font-display text-2xl leading-snug text-mist-white sm:text-3xl">
              {place.tagline}
            </p>
          </div>
        </Reveal>
      </div>

      {/* STORY */}
      <div className="mx-auto mt-16 grid max-w-6xl gap-10 px-6 sm:px-10 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-golden">{story.heading}</p>
            <h3 className="font-display text-3xl leading-snug text-mist-white sm:text-4xl">
              {place.shortDescription}
            </h3>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-base leading-relaxed text-mist/80">{story.body}</p>
          <p className="mt-4 border-l border-golden/40 pl-4 text-sm italic text-mist/60 text-balance">
            This page is built as editable local/community content — the owner knows
            this village best and is invited to refine the words and photographs.
          </p>
        </Reveal>
      </div>

      {/* LANDSCAPE — full bleed */}
      <div className="relative mt-20 h-[70vh] w-full overflow-hidden sm:h-[80vh]">
        <SiteImage src={place.images[2]} alt={`${place.name} landscape`} fill />
        <div className="absolute inset-0 grid place-items-center bg-forest-deep/30">
          <Reveal>
            <p className="max-w-3xl px-8 text-center font-display text-4xl leading-tight text-mist-white sm:text-6xl">
              {landscape.heading}
            </p>
          </Reveal>
        </div>
      </div>

      {/* LANDSCAPE body */}
      <div className="mx-auto mt-16 max-w-6xl px-6 sm:px-10">
        <Reveal>
          <p className="max-w-3xl text-lg leading-relaxed text-mist/85">{landscape.body}</p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {place.gallery.map((g, i) => (
            <Reveal key={g} delay={i * 0.05}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <SiteImage src={g} alt={`${place.name} photograph ${i + 1}`} fill tilt />
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* LOCAL LIFE */}
      <div className="mx-auto mt-20 max-w-6xl px-6 sm:px-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-golden">{localLife.heading}</p>
            <p className="text-base leading-relaxed text-mist/80">{localLife.body}</p>
            <Reveal>
              <PlaceFacts facts={place.facts} />
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <SiteImage src={place.images[1]} alt={`${place.name} local life`} fill tilt />
            </div>
          </Reveal>
        </div>
      </div>

      <TrackBlock place={place} />
    </section>
  );
}
