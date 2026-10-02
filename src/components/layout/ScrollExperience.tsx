"use client";

import Lenis from "lenis";
import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const circumference = 2 * Math.PI * 25;

export default function ScrollExperience({ locale }: { locale: string }) {
  const lenisRef = useRef<Lenis | null>(null);
  const progressCircleRef = useRef<SVGCircleElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const updateVisibility = (scrollY: number) => {
      setIsVisible(scrollY > 320);

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;
      if (progressCircleRef.current) {
        progressCircleRef.current.style.strokeDashoffset = String(
          circumference * (1 - progress),
        );
      }
    };

    if (prefersReducedMotion) {
      const handleScroll = () => updateVisibility(window.scrollY);
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();

      return () => window.removeEventListener("scroll", handleScroll);
    }

    const lenis = new Lenis({ autoRaf: true, anchors: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ({ scroll }) => updateVisibility(scroll));
    updateVisibility(window.scrollY);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0);
      return;
    }

    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={locale === "ar" ? "العودة إلى الأعلى" : "Back to top"}
      title={locale === "ar" ? "العودة إلى الأعلى" : "Back to top"}
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      className={`scroll-top-button fixed bottom-20 right-20 z-60 flex size-12 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${isVisible ? "is-visible" : ""}`}
    >
      <span className="scroll-top-water" aria-hidden="true" />
      <ArrowUp className="relative z-20" aria-hidden="true" size={21} strokeWidth={2.25} />
      <svg
        className="pointer-events-none absolute -inset-1 z-10 size-14 -rotate-90 overflow-visible"
        viewBox="0 0 56 56"
        aria-hidden="true"
      >
        <circle cx="28" cy="28" r="25" fill="none" stroke="#9ca3af" strokeOpacity="0.8" strokeWidth="1.5" />
        <circle
          ref={progressCircleRef}
          cx="28"
          cy="28"
          r="25"
          fill="none"
          stroke="#6b7280"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          strokeWidth="1.75"
        />
      </svg>
    </button>
  );
}