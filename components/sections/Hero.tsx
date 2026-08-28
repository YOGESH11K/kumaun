"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { useScrollY } from "@/lib/hooks";
import { img } from "@/lib/imageSource";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SiteImage } from "@/components/ui/SiteImage";

const HeroExperience = dynamic(
  () => import("@/components/scene/HeroExperience").then((m) => m.HeroExperience),
  { ssr: false }
);

const words = ["Where the mountains", "still feel like home."];

export function Hero() {
  const { capability } = useExperience();
  const reduce = useReducedMotion();
  const y = useScrollY();
  const webgl = capability?.webgl;
  const viewport = typeof window !== "undefined" ? window.innerHeight : 900;
  const progress = Math.min(y / (viewport * 0.8), 1);

  return (
    <section id="home" className="relative h-svh w-full overflow-hidden">
      {/* Background: WebGL scene or 2D cinematic fallback */}
      {webgl ? (
        <div className="absolute inset-0">
          <HeroExperience />
        </div>
      ) : (
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0"
            animate={reduce ? {} : { scale: 1 + progress * 0.15 }}
            style={{ willChange: "transform" }}
          >
            <SiteImage
              src={img("/images/landscapes/hero-panorama")}
              alt="Kumaon Himalayan mountain panorama at dawn"
              fill
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/40 via-transparent to-forest-deep" />
        </div>
      )}

      {/* Overlay gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-forest-deep/60 via-transparent to-forest-deep" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mb-4 text-xs uppercase tracking-[0.4em] text-golden"
        >
          Uttarakhand · The Kumaon Hills
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: reduce ? 1 : 0.96, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[19vw] leading-none tracking-tight text-mist-white sm:text-[15vw] lg:text-[13vw]"
          style={{ textShadow: "0 10px 60px rgba(0,0,0,0.55)" }}
        >
          KUMAON
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: reduce ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="mt-5 font-display text-xl italic text-mist/90 sm:text-2xl"
        >
          “Where the mountains still feel like home.”
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 2.6, duration: 1 }}
          className="mt-3 max-w-xl text-sm tracking-wide text-mist/70 sm:text-base"
        >
          Discover Mukteshwar, Saliyakote, Sundarkhal, Dharapani &amp; Nainital.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.9, duration: 1 }}
          className="mt-10"
        >
          <MagneticButton
            href="#map"
            className="group rounded-full border border-mist/30 bg-mist-white/10 px-8 py-3.5 text-sm uppercase tracking-[0.2em] text-mist-white backdrop-blur-sm transition-colors hover:bg-mist-white/20"
          >
            Explore the Mountains
            <span className="transition-transform duration-300 group-hover:translate-y-1">↓</span>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        animate={reduce ? {} : { y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
      >
        <div className="flex flex-col items-center gap-2 text-mist/50">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-mist/50 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
