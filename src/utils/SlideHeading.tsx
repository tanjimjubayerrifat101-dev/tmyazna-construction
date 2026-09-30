"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLocale } from "next-intl";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SlideHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  direction?: "left" | "right";
  distance?: number;
  duration?: number;
  delay?: number;
  threshold?: string;
  autoRtl?: boolean; // Automatically mirrors left/right for Arabic RTL
}

/**
 * SlideHeading animates headings or text tags (h1, h2, h3, etc.)
 * sliding in with opacity 0 to 1 from left (or right) based on scroll into view.
 */
export default function SlideHeading({
  children,
  className = "",
  as: Component = "h1",
  direction = "left",
  distance = 70,
  duration = 0.9,
  delay = 0,
  threshold = "top 85%",
  autoRtl = true,
}: SlideHeadingProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const locale = useLocale();
  const isRtl = autoRtl && locale === "ar";

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Determine starting x coordinate based on direction & RTL
      let startX: number;
      if (direction === "left") {
        startX = isRtl ? distance : -distance;
      } else {
        startX = isRtl ? -distance : distance;
      }

      gsap.fromTo(
        containerRef.current,
        {
          x: startX,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: duration,
          delay: delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: threshold,
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [children, isRtl] }
  );

  return (
    <Component ref={containerRef} className={`will-change-transform ${className}`}>
      {children}
    </Component>
  );
}
