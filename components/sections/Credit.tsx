"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SiteImage } from "@/components/ui/SiteImage";

export function Credit() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="relative overflow-hidden py-28 sm:py-40">
      {/* faint background */}
      <motion.div className="absolute inset-0 opacity-40" style={reduce ? undefined : { y }}>
        <SiteImage src="/images/experiences/himalayan-sky.svg" alt="Distant Himalayan skyline" fill />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep via-forest-deep/85 to-forest-deep" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center sm:px-10">
        <Reveal>
          <p className="font-display text-2xl italic text-mist/90 sm:text-3xl">
            “A digital journey through my home.”
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-5xl tracking-tight text-mist-white sm:text-7xl">
            Yogesh&nbsp;Kumar
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mx-auto mt-8 h-px w-24 bg-golden/50" />
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-8 text-sm uppercase tracking-[0.25em] text-mist/60">
            Want a website this unique?
          </p>
          <p className="mt-2 text-sm uppercase tracking-[0.25em] text-mist/60">
            Contact me to build your website.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-8 flex justify-center">
            <MagneticButton
              href="tel:+918923145213"
              className="group rounded-full bg-golden px-9 py-4 text-sm font-medium uppercase tracking-[0.2em] text-forest-deep transition-colors hover:bg-golden/90"
            >
              Let&apos;s Build Something Amazing
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </MagneticButton>
          </div>
          <p className="mt-4 text-sm text-mist/60">
            Call or WhatsApp{" "}
            <a href="tel:+918923145213" className="text-golden hover:underline">
              89231 45213
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
