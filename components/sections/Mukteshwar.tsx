"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { getPlace } from "@/data/places";
import { SiteImage } from "@/components/ui/SiteImage";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { PlaceFacts, HighlightsList, TravelBlock } from "./place/PlaceBits";

/**
 * Mukteshwar — the flagship cinematic chapter. A large background image is
 * pinned while the title and story are revealed on scroll.
 */
export function Mukteshwar() {
  const place = getPlace("mukteshwar")!;
  const heroRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.3]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      <div ref={heroRef} className="relative h-[200vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <motion.div className="absolute inset-0" style={reduce ? undefined : { scale: bgScale }}>
            <SiteImage src={place.heroImage} alt={place.heroAlt} fill priority />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/70 via-forest-deep/25 to-forest-deep" />

          <motion.div
            className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-12 lg:px-20"
            style={
              reduce
                ? undefined
                : { y: textY, opacity: textOpacity }
            }
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-4 text-xs uppercase tracking-[0.4em] text-golden"
            >
              The Himalayan hill town
            </motion.p>
            <h2 className="font-display text-6xl leading-none tracking-tight text-mist-white sm:text-8xl lg:text-9xl">
              MUKTESHWAR
            </h2>
            <p className="mt-4 max-w-xl font-display text-xl italic text-mist/90">
              “Where the Himalaya bends toward the sky.”
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-mist/80">
              {place.shortDescription}
            </p>

            <div className="mt-10">
              <MagneticButton
                href="#map"
                className="group rounded-full border border-mist/30 bg-mist-white/10 px-8 py-3.5 text-sm uppercase tracking-[0.2em] text-mist-white backdrop-blur-sm transition-colors hover:bg-mist-white/20"
              >
                Explore Mukteshwar
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </div>

      {/* following content */}
      <div id="mukteshwar" className="relative mx-auto max-w-6xl px-6 py-24 sm:px-10">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-8">
            <PlaceFacts facts={place.facts} />
            <div className="glass rounded-2xl p-6 sm:p-8">
              <h3 className="mb-4 font-display text-2xl text-mist-white">
                The hillside, in its own time
              </h3>
              <p className="text-sm leading-relaxed text-mist/80">
                {place.content.map((c) => c.body).join(" ")}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {place.images.slice(0, 3).map((img, i) => (
                <div key={img} className="relative aspect-square overflow-hidden rounded-xl">
                  <SiteImage src={img} alt={`${place.name} landscape ${i + 1}`} fill tilt />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <HighlightsList highlights={place.highlights} />
            <TravelBlock travel={place.travelInfo} />
          </div>
        </div>
      </div>
    </>
  );
}
