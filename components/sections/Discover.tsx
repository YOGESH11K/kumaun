"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

type Interest = {
  icon: string;
  label: string;
  desc: string;
  targets: { label: string; href: string }[];
};

const interests: Interest[] = [
  {
    icon: "🌲",
    label: "Forest",
    desc: "Pine and deodar silence",
    targets: [
      { label: "Mukteshwar", href: "#mukteshwar" },
      { label: "Sundarkhal", href: "#sundarkhal" },
      { label: "Saliyakote Malla", href: "#saliyakote-malla" },
    ],
  },
  {
    icon: "🏔️",
    label: "Mountains",
    desc: "The Himalaya on the horizon",
    targets: [
      { label: "Mukteshwar", href: "#mukteshwar" },
      { label: "Sundarkhal", href: "#sundarkhal" },
      { label: "Saliyakote Talla", href: "#saliyakote-talla" },
    ],
  },
  {
    icon: "🌊",
    label: "Lake",
    desc: "Water in the hills",
    targets: [{ label: "Nainital", href: "#nainital" }],
  },
  {
    icon: "🏡",
    label: "Village",
    desc: "Everyday Kumaon life",
    targets: [
      { label: "Saliyakote Malla", href: "#saliyakote-malla" },
      { label: "Saliyakote Talla", href: "#saliyakote-talla" },
      { label: "Dharapani", href: "#dharapani" },
    ],
  },
  {
    icon: "🌅",
    label: "Sunrise",
    desc: "First light on the peaks",
    targets: [
      { label: "Mukteshwar", href: "#mukteshwar" },
      { label: "Saliyakote Talla", href: "#saliyakote-talla" },
    ],
  },
  {
    icon: "📸",
    label: "Photography",
    desc: "Frames worth keeping",
    targets: [{ label: "Gallery", href: "#gallery" }],
  },
];

export function Discover() {
  return (
    <section id="discover" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeading
          eyebrow="Find your Kumaon"
          title="Where do you want to go?"
          subtitle="Choose what draws you, and we will guide you to the right part of the hills."
        />

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {interests.map((it, i) => (
            <Reveal key={it.label} delay={i * 0.05}>
              <Card interest={it} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ interest, index }: { interest: Interest; index: number }) {
  return (
    <div className="group flex h-full flex-col justify-between rounded-2xl border border-mist/10 bg-mist/5 p-5 transition-all duration-300 hover:border-golden/40 hover:bg-mist/10">
      <div>
        <div
          className="grid h-12 w-12 place-items-center rounded-xl bg-forest-deep/60 text-2xl transition-transform duration-300 group-hover:scale-110"
          style={{ transform: index % 2 === 0 ? "rotate(-3deg)" : "rotate(3deg)" }}
        >
          <span aria-hidden>{interest.icon}</span>
        </div>
        <h3 className="mt-4 font-display text-xl text-mist-white">{interest.label}</h3>
        <p className="mt-1 text-xs text-mist/60">{interest.desc}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {interest.targets.map((t) => (
          <a
            key={t.href}
            href={t.href}
            className="rounded-full border border-mist/15 px-2.5 py-1 text-[10px] uppercase tracking-wide text-mist/70 transition-colors hover:border-golden/50 hover:text-mist-white"
          >
            {t.label}
          </a>
        ))}
      </div>
    </div>
  );
}
