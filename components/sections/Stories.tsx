"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { stories } from "@/data/stories";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/ui/SiteImage";

export function Stories() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const open = stories.find((s) => s.slug === openSlug) ?? null;

  return (
    <section id="stories" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeading
          eyebrow="Stories from the hills"
          title="Stories From The Hills"
          subtitle="Village history, traditions, memories and interviews — a space for the owner to grow with local voices."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {stories.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.07}>
              <article
                className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-mist/10 bg-mist/5 transition-all duration-300 hover:border-golden/40"
                onClick={() => setOpenSlug(s.slug)}
                tabIndex={0}
                role="button"
                aria-label={`Open story: ${s.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setOpenSlug(s.slug);
                }}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <SiteImage src={`${s.image}.svg`} alt={s.imageAlt} fill />
                  <span className="absolute left-3 top-3 rounded-full bg-forest-deep/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-golden backdrop-blur-sm">
                    {s.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-mist/50">{s.place}</p>
                  <h3 className="mt-2 font-display text-xl leading-snug text-mist-white">
                    {s.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-mist/70">
                    {s.excerpt}
                  </p>
                  <span className="mt-auto pt-4 text-xs uppercase tracking-[0.2em] text-golden">
                    Read story →
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* story reader */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] overflow-y-auto bg-forest-deep/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mx-auto max-w-3xl px-6 py-10">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.3em] text-mist/50">
                  {open.place} · {open.tag}
                </span>
                <button
                  onClick={() => setOpenSlug(null)}
                  className="flex h-11 w-11 items-center justify-center rounded-full glass"
                  aria-label="Close story"
                >
                  <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                    <path d="M2 2l14 14M16 2L2 16" stroke="#f2f6f4" strokeWidth="1.5" />
                  </svg>
                </button>
              </div>
              <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl">
                <SiteImage src={`${open.image}.svg`} alt={open.imageAlt} fill />
              </div>
              <h2 className="mt-8 font-display text-3xl leading-tight text-mist-white sm:text-4xl">
                {open.title}
              </h2>
              <p className="mt-2 text-xs text-mist/50">
                {open.author} · {open.date}
              </p>
              <div className="mt-6 space-y-5">
                {open.body.map((p, i) => (
                  <p key={i} className="leading-relaxed text-mist/80">
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-10 border-l border-golden/40 pl-4 text-sm text-mist/50">
                This is an editable story placeholder. The owner can replace the words with their
                own village histories, traditions and memories.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
