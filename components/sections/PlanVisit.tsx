"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const sections = [
  {
    title: "How to reach",
    icon: "🚌",
    items: [
      "Kumaon is reached by road through the hill towns of Uttarakhand; Kathgodam is the nearest railhead and Pantnagar the nearest major airport.",
      "From there, the journey climbs through forested hills to Nainital, Mukteshwar and the villages beyond.",
      "Hill roads are winding — leave generous travel time and confirm conditions locally.",
    ],
  },
  {
    title: "Nearby destinations",
    icon: "🗺️",
    items: [
      "Nainital — the lake town and gateway to the region.",
      "Mukteshwar — the high ridge town with Himalayan views.",
      "Sundarkhal, Saliyakote and Dharapani — the quieter villages of the local-area experience.",
    ],
  },
  {
    title: "Things to experience",
    icon: "✨",
    items: [
      "Sunrise and sunset light on the Himalayan peaks.",
      "Walks through pine, deodar and oak forest.",
      "Village lanes, orchard seasons and the pace of hillside life.",
      "Photography at lake, ridge and valley viewpoints.",
    ],
  },
  {
    title: "Suggested duration",
    icon: "⏳",
    items: [
      "2–4 days allows a comfortable loop: lake town, ridge town, and the quiet villages in between.",
      "Longer stays reward those who slow down — the hills open up the more time you give them.",
    ],
  },
  {
    title: "Photography spots",
    icon: "📷",
    items: [
      "Mukteshwar viewpoint toward the snow peaks.",
      "Nainital lake at first light.",
      "The village roads and fields around Saliyakote and Sundarkhal.",
      "Golden hour over the valleys from the hill ridges.",
    ],
  },
  {
    title: "Nature & local exploration",
    icon: "🌿",
    items: [
      "Forest walks and birdwatching in the quieter hills.",
      "Visiting the temples and local markets with respect.",
      "Supporting small local businesses and homestays.",
    ],
  },
];

export function PlanVisit() {
  return (
    <section id="plan" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeading
          eyebrow="Practical notes"
          title="Plan Your Visit"
          subtitle="Considered, honest guidance for travelling the Kumaon hills — with only information we can stand behind."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.07}>
              <div className="h-full rounded-2xl border border-mist/10 bg-mist/5 p-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl" aria-hidden>
                    {s.icon}
                  </span>
                  <h3 className="font-display text-xl text-mist-white">{s.title}</h3>
                </div>
                <ul className="mt-4 space-y-3">
                  {s.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm leading-relaxed text-mist/75">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-golden" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <p className="mx-auto max-w-2xl text-center text-xs leading-relaxed text-mist/40">
            Distances, timings and prices are not specified unless publicly documented and verified.
            Please confirm current road conditions, opening hours and travel options with local
            sources before your journey.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
