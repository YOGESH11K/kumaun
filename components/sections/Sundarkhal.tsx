"use client";

import { getPlace } from "@/data/places";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/ui/SiteImage";
import { TrackBlock } from "./place/PlaceBits2";

/**
 * Sundarkhal — a 'hidden gem'. Cinematic full-bleed bands take the visitor
 * from forest, through valley, to a quiet village.
 */
export function Sundarkhal() {
  const place = getPlace("sundarkhal")!;
  const [intro, transition, views] = place.content;

  return (
    <section id="sundarkhal" className="relative py-24 sm:py-32">
      {/* forest opener — full bleed */}
      <div className="relative h-[60vh] w-full overflow-hidden sm:h-[75vh]">
        <SiteImage src={place.images[0]} alt={`${place.name} forest valley`} fill />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/60 via-transparent to-forest-deep/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <SectionHeading eyebrow="A hidden corner of Kumaon" title={place.title} />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-golden">{intro.heading}</p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-mist/85">{intro.body}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <blockquote className="border-l-2 border-golden/50 pl-6 font-display text-2xl italic leading-snug text-mist-white sm:text-3xl">
              “Not every journey ends at a viewpoint. Some of the best ones are the
              stretches in between.”
            </blockquote>
          </Reveal>
        </div>
      </div>

      {/* valley transition band */}
      <div className="relative h-[50vh] w-full overflow-hidden sm:h-[65vh]">
        <SiteImage src={place.images[3]} alt={`${place.name} green valley`} fill />
        <div className="absolute inset-0 grid place-items-end bg-forest-deep/30">
          <Reveal className="w-full">
            <p className="max-w-3xl px-6 pb-10 font-display text-3xl leading-tight text-mist-white sm:px-12 sm:text-5xl">
              {transition.heading}
            </p>
          </Reveal>
        </div>
      </div>

      {/* details */}
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-golden">{transition.heading}</p>
            <p className="text-base leading-relaxed text-mist/80">{transition.body}</p>
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <SiteImage src={place.images[1]} alt={`${place.name} valley village`} fill tilt />
              </div>
            </Reveal>
          </div>
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-golden">{views.heading}</p>
            <p className="text-base leading-relaxed text-mist/80">{views.body}</p>
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <SiteImage src={place.images[2]} alt={`${place.name} roads through hills`} fill tilt />
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <TrackBlock place={place} />
    </section>
  );
}
