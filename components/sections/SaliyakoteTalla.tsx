"use client";

import { useState } from "react";
import { getPlace } from "@/data/places";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/ui/SiteImage";
import { Lightbox } from "@/components/gallery/Lightbox";
import { TrackBlock } from "./place/PlaceBits2";

/**
 * Saliyakote Talla — a distinct identity: a cinematic photo wall that opens
 * into a fullscreen viewer. Greener, warmer and lower than the Malla ridge.
 */
export function SaliyakoteTalla() {
  const place = getPlace("saliyakote-talla")!;
  const [active, setActive] = useState<number | null>(null);

  const items = place.gallery.map((src, i) => ({
    src,
    alt: `${place.name} photograph ${i + 1}`,
    label: place.name,
  }));

  const [story, greenery, light] = place.content;

  return (
    <section id="saliyakote-talla" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeading eyebrow="The lower village" title={place.title} subtitle={place.subheading} />
      </div>

      {/* distinct identity: warm green intro */}
      <div className="mx-auto mt-16 max-w-6xl px-6 sm:px-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-golden">{story.heading}</p>
              <h3 className="font-display text-3xl leading-snug text-mist-white sm:text-4xl">
                {story.body}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-mist/70">{greenery.body}</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-4">
            <Reveal>
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <SiteImage src={place.images[1]} alt={`${place.name} greenery`} fill tilt />
              </div>
            </Reveal>
            <div className="mt-10">
              <Reveal delay={0.1}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                  <SiteImage src={place.images[2]} alt={`${place.name} houses`} fill tilt />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* interactive photo wall */}
      <div className="mx-auto mt-24 max-w-6xl px-6 sm:px-10">
        <Reveal>
          <p className="mb-8 text-center text-xs uppercase tracking-[0.3em] text-mist/50">
            {light.heading} — tap any photograph to open the full view
          </p>
        </Reveal>

        <div className="columns-2 gap-4 sm:columns-3 [&>*]:mb-4">
          {place.gallery.map((src, i) => (
            <Reveal key={src} delay={(i % 3) * 0.06}>
              <button
                onClick={() => setActive(i)}
                className="group relative block w-full overflow-hidden rounded-xl"
                aria-label={`Open ${place.name} photograph ${i + 1}`}
              >
                <div className={`relative ${i % 2 === 0 ? "aspect-[3/4]" : "aspect-[4/5]"}`}>
                  <SiteImage src={src} alt={`${place.name} photograph ${i + 1}`} fill />
                  <div className="absolute inset-0 bg-forest-deep/0 transition-colors duration-300 group-hover:bg-forest-deep/20" />
                  <span className="absolute right-3 top-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="glass flex h-9 w-9 items-center justify-center rounded-full text-mist-white">
                      +
                    </span>
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <TrackBlock place={place} />

      <Lightbox items={items} index={active} onClose={() => setActive(null)} onNavigate={setActive} />
    </section>
  );
}
