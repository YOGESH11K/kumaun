"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { places, type Place } from "@/data/places";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteImage } from "@/components/ui/SiteImage";
import { MagneticButton } from "@/components/ui/MagneticButton";

const MapExperience = dynamic(
  () => import("@/components/scene/MapExperience").then((m) => m.MapExperience),
  { ssr: false }
);

export function MapSection() {
  const { capability } = useExperience();
  const webgl = capability?.webgl;
  const [selected, setSelected] = useState<Place>(places[0]);

  const selectFromList = (slug: string) => {
    const p = places.find((x) => x.slug === slug);
    if (p) setSelected(p);
  };

  return (
    <section id="map" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading
          eyebrow="Interactive terrain"
          title="The Kumaon Hills, Explorable"
          subtitle="Rotate, zoom and tap the glowing markers to travel between the places of this digital journey."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {/* Map / fallback */}
          <div className="relative h-[60vh] overflow-hidden rounded-3xl lg:col-span-2 lg:h-auto lg:min-h-[560px]">
            {webgl ? (
              <MapExperience onSelect={setSelected} selectedSlug={selected.slug} />
            ) : (
              <div className="grid h-full grid-cols-2 gap-3 p-4 sm:grid-cols-3">
                {places.map((p) => (
                  <button
                    key={p.slug}
                    onClick={() => setSelected(p)}
                    className={`relative overflow-hidden rounded-xl border transition-all ${
                      selected.slug === p.slug
                        ? "border-golden"
                        : "border-mist/10 hover:border-mist/30"
                    }`}
                  >
                    <div className="absolute inset-0">
                      <SiteImage src={p.heroImage} alt={p.heroAlt} />
                    </div>
                    <span className="absolute bottom-2 left-2 rounded-full bg-forest-deep/70 px-3 py-1 text-xs text-mist-white backdrop-blur-sm">
                      {p.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-mist/10" />
          </div>

          {/* Info panel */}
          <div className="relative">
            <PlacePanel place={selected} />
          </div>
        </div>

        {/* quick place list below */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {places.map((p) => (
            <button
              key={p.slug}
              onClick={() => selectFromList(p.slug)}
              className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.15em] transition-colors ${
                selected.slug === p.slug
                  ? "bg-golden text-forest-deep"
                  : "border border-mist/15 text-mist/70 hover:bg-mist/5"
              }`}
            >
              {p.slug.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlacePanel({ place }: { place: Place }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={place.slug}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
        className="glass scroll-area max-h-[560px] overflow-y-auto rounded-3xl p-6 no-scrollbar"
      >
        <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-2xl">
          <SiteImage src={place.heroImage} alt={place.heroAlt} fill />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 to-transparent" />
          <h3 className="absolute bottom-4 left-4 right-4 font-display text-2xl text-mist-white">
            {place.name}
          </h3>
        </div>

        <p className="text-sm leading-relaxed text-mist/80">{place.shortDescription}</p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {place.facts.map((f) => (
            <div key={f.label} className="rounded-lg bg-mist/5 px-3 py-2">
              <p className="text-[10px] uppercase tracking-[0.2em] text-mist/50">{f.label}</p>
              <p className="mt-0.5 text-sm text-mist-white">{f.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <p className="mb-2 text-xs uppercase tracking-[0.25em] text-golden">Highlights</p>
          <ul className="space-y-1.5">
            {place.highlights.map((h) => (
              <li key={h.label} className="flex items-start gap-2 text-sm text-mist/75">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-golden" />
                {h.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-xs uppercase tracking-[0.25em] text-mist/50">Approx. position</p>
          <p className="text-sm text-mist/75">
            {place.coordinates.lat.toFixed(3)}° N, {place.coordinates.lng.toFixed(3)}° E
          </p>
        </div>

        <div className="mt-6">
          <MagneticButton
            href={`#${place.slug}`}
            className="w-full justify-center rounded-full border border-mist/30 bg-mist-white/10 px-6 py-3 text-sm uppercase tracking-[0.2em] text-mist-white transition-colors hover:bg-mist-white/20"
          >
            Visit {place.name} section
          </MagneticButton>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
