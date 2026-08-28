"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

export type LightboxItem = {
  src: string;
  alt: string;
  label?: string;
  width?: number;
  height?: number;
};

/**
 * Cinematic fullscreen photo viewer. Supports keyboard navigation,
 * swipe on touch, and click-to-toggle zoom. Esc closes.
 */
export function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const reduce = usePrefersReducedMotion();
  const [zoom, setZoom] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const open = index !== null && index >= 0 && index < items.length;

  const go = useCallback(
    (dir: number) => {
      if (index === null) return;
      const next = (index + dir + items.length) % items.length;
      if (items.length) onNavigate(next);
      setZoom(false);
    },
    [index, items.length, onNavigate]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        go(1);
      } else if (e.key === "ArrowLeft") {
        go(-1);
      } else if (e.key === "z" || e.key === "Z") {
        setZoom((z) => !z);
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, go]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
      go(dx < 0 ? 1 : -1);
    }
    touchStart.current = null;
  };

  return (
    <AnimatePresence>
      {open && index !== null && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col bg-forest-deep/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.4 }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label={items[index]?.alt}
        >
          <div className="flex items-center justify-between px-5 py-4">
            <span className="text-sm tracking-[0.2em] text-mist/70">
              {index + 1} / {items.length}
            </span>
            <button
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-full glass"
              aria-label="Close viewer"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 2l14 14M16 2L2 16" stroke="#f2f6f4" strokeWidth="1.5" />
              </svg>
            </button>
          </div>

          <div
            className="relative flex-1 cursor-zoom-in overflow-hidden"
            onClick={() => setZoom((z) => !z)}
          >
            <motion.div
              key={index}
              className="flex h-full w-full items-center justify-center p-4"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: zoom ? 1.7 : 1 }}
              transition={{ duration: reduce ? 0 : 0.4 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={items[index].src}
                alt={items[index].alt}
                className="max-h-[80vh] w-auto max-w-full object-contain select-none"
                draggable={false}
              />
            </motion.div>
          </div>

          {items[index].label && (
            <p className="pb-5 text-center text-sm text-mist/70">{items[index].label}</p>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full glass"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full glass"
            aria-label="Next image"
          >
            ›
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
