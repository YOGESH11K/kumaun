"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SiteImage } from "@/components/ui/SiteImage";
import { img } from "@/lib/imageSource";

const statements = [
  { text: "For the mountains.", img: img("/images/experiences/mountain-silence"), alt: "Himalayan mountain ridge in the distance" },
  { text: "For the silence.", img: img("/images/experiences/mountain-morning"), alt: "Quiet misty Himalayan morning landscape" },
  { text: "For the forests.", img: img("/images/experiences/forest-light"), alt: "Green pine forest in morning light" },
  { text: "For the villages.", img: img("/images/experiences/village-calm"), alt: "Kumaon village among the hills" },
  { text: "For the mornings.", img: img("/images/mukteshwar/sunrise-peaks"), alt: "Sunrise over the Himalayan peaks" },
  { text: "For the Himalayan sky.", img: img("/images/experiences/himalayan-sky"), alt: "Clear Himalayan mountain sky" },
  { text: "For the feeling you cannot explain.", img: img("/images/experiences/why-mornings"), alt: "Golden light through the Kumaon morning" },
];

export function WhyCome() {
  const reduce = useReducedMotion();
  return (
    <section id="why" className="relative">
      {statements.map((s, i) => (
        <FullStatement key={i} text={s.text} img={s.img} alt={s.alt} reduce={!!reduce} />
      ))}
    </section>
  );
}

function FullStatement({
  text,
  img,
  alt,
  reduce,
}: {
  text: string;
  img: string;
  alt: string;
  reduce: boolean;
}) {
  return (
    <div className="relative flex h-svh items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: reduce ? 1 : 1.08 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ amount: 0.4 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <SiteImage src={img} alt={alt} fill />
      </motion.div>
      <div className="absolute inset-0 bg-forest-deep/45" />

      <div className="relative z-10 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: reduce ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.6 }}
          transition={{ duration: 0.9 }}
          className="font-display text-4xl leading-tight text-mist-white sm:text-6xl lg:text-7xl"
        >
          {text}
        </motion.p>
      </div>
    </div>
  );
}
