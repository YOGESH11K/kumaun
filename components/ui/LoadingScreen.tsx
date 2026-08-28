"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const MESSAGES = [
  "Entering Kumaun…",
  "Finding the mountains…",
  "Welcome to Kumaun.",
];

/**
 * Cinematic loading overlay. Sequences a set of messages with a rising
 * progress bar, then fades out smoothly.
 */
export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const start = performance.now();
    const duration = 2600;
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setProgress(p);
      setStep(Math.min(Math.floor(p * MESSAGES.length), MESSAGES.length - 1));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setShow(false);
          setTimeout(onDone, 600);
        }, 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-forest-deep"
          exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
        >
          <div className="flex flex-col items-center px-6">
            <AnimatePresence mode="wait">
              <motion.p
                key={step}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.5 }}
                className="mb-8 text-center font-display text-2xl tracking-wide text-mist sm:text-3xl"
              >
                {MESSAGES[step]}
              </motion.p>
            </AnimatePresence>
            <div className="h-px w-56 overflow-hidden bg-mist/20 sm:w-72">
              <motion.div
                className="h-full bg-golden"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <p className="mt-4 text-xs tracking-[0.3em] text-mist/40">
              {Math.round(progress * 100)}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
