"use client";

import { Reveal } from "@/components/ui/Reveal";
import { getPlace } from "@/data/places";

export function PlaceFacts({
  facts,
}: {
  facts: { label: string; value: string }[];
}) {
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

export function TrackBlock({ place }: { place: { slug: string } }) {
  const data = getPlace(place.slug);
  if (!data) return null;
  return (
    <div className="mx-auto mt-20 grid max-w-6xl gap-6 px-6 sm:px-10 lg:grid-cols-2">
      <div className="glass rounded-2xl p-6 sm:p-8">
        <h4 className="mb-4 font-display text-xl text-mist-white">Nearby places</h4>
        <div className="flex flex-wrap gap-2">
          {data.nearbyPlaces.map((p) => (
            <span
              key={p}
              className="rounded-full border border-mist/15 bg-mist/5 px-4 py-1.5 text-xs tracking-wide text-mist/80"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
      <div className="glass rounded-2xl p-6 sm:p-8">
        <h4 className="mb-4 font-display text-xl text-mist-white">Getting there</h4>
        <div className="space-y-3 text-sm leading-relaxed text-mist/80">
          {data.travelInfo.howToReach.map((r, i) => (
            <p key={i} className="flex gap-3">
              <span className="text-golden">→</span>
              <span>{r}</span>
            </p>
          ))}
          {data.travelInfo.notes && (
            <p className="flex gap-3 text-mist/60">
              <span className="text-golden">!</span>
              <span>{data.travelInfo.notes}</span>
            </p>
          )}
        </div>
      </div>
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
