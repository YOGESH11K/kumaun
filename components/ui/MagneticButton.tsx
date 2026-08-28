"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Magnetic hover button — the button gently pulls toward the cursor for a
 * premium, tactile interaction. Fully disabled for reduced-motion users.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  strength = 0.3,
  className = "",
  ariaLabel,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  strength?: number;
  className?: string;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = usePrefersReducedMotion();

  const handleMove = (e: MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
  };

  const Tag: any = href ? "a" : "button";
  return (
    <Tag
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center gap-3 transition-[transform] duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </Tag>
  );
}
