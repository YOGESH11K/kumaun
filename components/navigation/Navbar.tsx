"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { useScrollY } from "@/lib/hooks";

export function Navbar() {
  const y = useScrollY();
  const scrolled = y > 40;
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 transition-all duration-500 ${
            scrolled ? "glass mx-4 max-w-[calc(100vw-2rem)] rounded-full py-2.5 sm:mx-6" : ""
          }`}
          aria-label="Main navigation"
        >
          <a
            href="#home"
            className="font-display text-xl tracking-[0.25em] text-mist-white"
            onClick={() => setOpen(false)}
          >
            {siteConfig.shortTitle}
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {siteConfig.nav.slice(1).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[13px] uppercase tracking-[0.18em] text-mist/75 transition-colors hover:text-mist-white"
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            className="flex h-11 w-11 items-center justify-center rounded-full glass md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <div className="flex flex-col gap-1.5">
              <span className="block h-px w-5 bg-mist-white" />
              <span className="block h-px w-5 bg-mist-white" />
              <span className="block h-px w-5 bg-mist-white" />
            </div>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col bg-forest-deep/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.4 }}
          >
            <div className="flex items-center justify-between px-5 py-6">
              <span className="font-display text-xl tracking-[0.25em] text-mist-white">
                {siteConfig.shortTitle}
              </span>
              <button
                className="flex h-11 w-11 items-center justify-center rounded-full glass"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M2 2l14 14M16 2L2 16" stroke="#f2f6f4" strokeWidth="1.5" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-center justify-center gap-6">
              {siteConfig.nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i }}
                  className="font-display text-3xl tracking-wide text-mist-white"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <p className="pb-10 text-center text-xs tracking-[0.3em] text-mist/40">
              KUMAON — THE MOUNTAINS ARE CALLING
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
