"use client";

import Image, { type ImageProps } from "next/image";
import { useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

export type SiteImageProps = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  rounded?: boolean;
  /** enable 3D tilt on hover (desktop) */
  tilt?: boolean;
  width?: number;
  height?: number;
};

/**
 * Image with graceful handling of SVG placeholders (which are not content,
 * so we render them as plain <img> to avoid Next.js optimization errors),
 * plus optional premium tilt/parallax micro-interactions.
 */
export function SiteImage({
  src,
  alt,
  className = "",
  fill = false,
  priority = false,
  sizes = "(max-width: 900px) 100vw, 900px",
  rounded = false,
  tilt = false,
  width,
  height,
}: SiteImageProps) {
  const reduce = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const isSvg = src.endsWith(".svg");

  const imgProps: ImageProps = {
    src,
    alt,
    priority,
    sizes,
    className: `h-full w-full object-cover ${className}`,
    ...(fill ? { fill: true } : width && height ? { width, height } : { fill: true }),
  };

  const enableTilt = tilt && !reduce;

  const handleMove = (e: React.MouseEvent) => {
    if (!enableTilt) return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTiltStyle({
      transform: `perspective(900px) rotateX(${-py * 6}deg) rotateY(${px * 6}deg) scale(1.03)`,
    });
  };

  const handleLeave = () => setTiltStyle({});

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative overflow-hidden ${rounded ? "rounded-2xl" : ""} ${fill ? "absolute inset-0" : ""}`}
      style={tiltStyle}
    >
      {isSvg ? (
        // SVG placeholders are decorative; avoid Next Image optimizer
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className={fill ? "absolute inset-0 h-full w-full object-cover" : `h-auto w-full object-cover ${className}`}
          loading={priority ? "eager" : "lazy"}
        />
      ) : (
        <Image {...imgProps} />
      )}
    </div>
  );
}
