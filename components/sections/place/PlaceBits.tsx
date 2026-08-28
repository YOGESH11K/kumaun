"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/ui/SiteImage";

export function PlaceFacts({ facts }: { facts: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {facts.map((f) => (
        <Reveal key={f.label}>
          <div className="border-l border-golden/40 pl-4">
            <p className="text-[11px] uppercase tracking-[0.25em] text-mist/50">{f.label}</p>
            <p className="mt-1 font-display text-lg text-mist-white">{f.value}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function HighlightsList({
  highlights,
}: {
  highlights: { label: string; description: string }[];
}) {
  return (
    <div className="space-y-6">
      {highlights.map((h, i) => (
        <Reveal key={i} delay={i * 0.06}>
          <div className="flex gap-4">
            <span className="pt-1 font-display text-2xl text-golden">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h4 className="font-display text-xl text-mist-white">{h.label}</h4>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-mist/75">{h.description}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function NearbyChips({ places }: { places: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {places.map((p) => (
        <span
          key={p}
          className="rounded-full border border-mist/15 bg-mist/5 px-4 py-1.5 text-xs tracking-wide text-mist/80"
        >
          {p}
        </span>
      ))}
    </div>
  );
}

export function TravelBlock({ travel }: { travel: { howToReach: string[]; notes?: string; bestTime?: string; duration?: string } }) {
  return (
    <div className="glass rounded-2xl p-6 sm:p-8">
      <h4 className="mb-4 font-display text-xl text-mist-white">Planning your visit</h4>
      <div className="space-y-4 text-sm leading-relaxed text-mist/80">
        {travel.howToReach.map((r, i) => (
          <p key={i} className="flex gap-3">
            <span className="text-golden">→</span>
            <span>{r}</span>
          </p>
        ))}
        {travel.bestTime && (
          <p className="flex gap-3">
            <span className="text-golden">·</span>
            <span>Best time: {travel.bestTime}</span>
          </p>
        )}
        {travel.duration && (
          <p className="flex gap-3">
            <span className="text-golden">·</span>
            <span>Suggested duration: {travel.duration}</span>
          </p>
        )}
        {travel.notes && (
          <p className="flex gap-3 text-mist/60">
            <span className="text-golden">!</span>
            <span>{travel.notes}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export function ImageCard({
  src,
  alt,
  tilt = false,
  className = "",
  aspect = "aspect-[4/3]",
}: {
  src: string;
  alt: string;
  tilt?: boolean;
  className?: string;
  aspect?: string;
}) {
  return (
    <Reveal className={className}>
      <div className={`relative overflow-hidden rounded-2xl ${aspect}`}>
        <SiteImage src={src} alt={alt} fill tilt={tilt} />
      </div>
    </Reveal>
  );
}
