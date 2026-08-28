"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { galleryPhotos, galleryCategories, type GalleryPhoto } from "@/data/gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteImage } from "@/components/ui/SiteImage";
import { Lightbox, type LightboxItem } from "@/components/gallery/Lightbox";

export function PhotoExperience() {
  const [category, setCategory] = useState<(typeof galleryCategories)[number]>("All");
  const [active, setActive] = useState<number | null>(null);

  const photos = useMemo(
    () =>
      category === "All"
        ? galleryPhotos
        : galleryPhotos.filter((p) => p.category === category || p.place === category),
    [category]
  );

  const items: LightboxItem[] = useMemo(
    () => photos.map((p) => ({ src: p.src, alt: p.alt, label: `${p.place ?? p.category}` })),
    [photos]
  );

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading
          eyebrow="The photography experience"
          title="Frames From The Hills"
          subtitle="A premium gallery of the mountains, villages, forests and light of Kumaon — tap any frame to open it fullscreen."
        />

        {/* category filter */}
        <div className="no-scrollbar mt-12 flex gap-2 overflow-x-auto pb-2">
          {galleryCategories.map((c) => (
            <button
              key={c}
              onClick={() => {
                setCategory(c);
                setActive(null);
              }}
              className={`shrink-0 rounded-full px-4 py-2 text-xs uppercase tracking-[0.15em] transition-colors ${
                category === c
                  ? "bg-golden text-forest-deep"
                  : "border border-mist/15 text-mist/70 hover:bg-mist/5"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* masonry */}
        <div className="mt-8 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
          {photos.map((p, i) => (
            <GalleryTile key={`${p.src}-${i}`} photo={p} index={i} onOpen={() => setActive(i)} />
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-mist/40">
          Placeholder landscape artwork is used until the owner&apos;s own photographs are added.
          Real local photos can be dropped into <code className="text-mist/60">/public/images/</code>.
        </p>
      </div>

      <Lightbox
        items={items}
        index={active}
        onClose={() => setActive(null)}
        onNavigate={setActive}
      />
    </section>
  );
}

function GalleryTile({
  photo,
  index,
  onOpen,
}: {
  photo: GalleryPhoto;
  index: number;
  onOpen: () => void;
}) {
  const aspect = photo.width > photo.height ? "aspect-[4/3]" : photo.height > photo.width ? "aspect-[3/4]" : "aspect-square";
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <button onClick={onOpen} className="group relative block w-full overflow-hidden rounded-xl" aria-label={photo.alt}>
        <div className={`relative ${aspect}`}>
          <SiteImage src={photo.src} alt={photo.alt} fill />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="text-xs text-mist-white">{photo.place ?? photo.category}</span>
            <span className="text-mist/70">+</span>
          </span>
        </div>
      </button>
    </motion.div>
  );
}
