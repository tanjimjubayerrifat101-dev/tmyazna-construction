"use client";

import { useRef, useState, useEffect, useCallback, useId } from "react";
import { useTranslations, useLocale } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SlideHeadingLeft from "@/utils/SlideHeading";
import SlideHeadingRight from "@/utils/SlideHeadingRight";
import PartnerRow from "./PartnerRow";
import PartnerItem from "./PartnerItem";
import { PARTNER_CATEGORIES } from "@/data/partners";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const AUTO_ADVANCE_MS = 6000;
const BREAKPOINT_MOBILE = 860;

export default function PartnersSection() {
  const t = useTranslations("Partners");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPausedRef = useRef(false);

  const [activeId, setActiveId] = useState(PARTNER_CATEGORIES[0].id);
  const [openId, setOpenId] = useState<string | null>(null); // mobile accordion
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const panelId = useId();

  // ── Detect mobile & prefers-reduced-motion ──────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${BREAKPOINT_MOBILE}px)`);
    const rmMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleSize = () => setIsMobile(mq.matches);
    const handleMotion = () => setReducedMotion(rmMq.matches);

    handleSize();
    handleMotion();

    mq.addEventListener("change", handleSize);
    rmMq.addEventListener("change", handleMotion);

    return () => {
      mq.removeEventListener("change", handleSize);
      rmMq.removeEventListener("change", handleMotion);
    };
  }, []);

  // ── Auto-advance (desktop only, respects reduced-motion) ─────────────────
  const startTimer = useCallback(() => {
    if (isMobile || reducedMotion) return;
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      if (isPausedRef.current) return;
      setActiveId((prev) => {
        const idx = PARTNER_CATEGORIES.findIndex((c) => c.id === prev);
        return PARTNER_CATEGORIES[(idx + 1) % PARTNER_CATEGORIES.length].id;
      });
    }, AUTO_ADVANCE_MS);
  }, [isMobile, reducedMotion]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  // Pause on pointer enter / resume on leave
  const handleSectionEnter = useCallback(() => {
    isPausedRef.current = true;
  }, []);
  const handleSectionLeave = useCallback(() => {
    isPausedRef.current = false;
  }, []);

  // ── Activate a category (desktop) ────────────────────────────────────────
  const handleActivate = useCallback(
    (id: string) => {
      setActiveId(id);
      startTimer(); // reset timer on explicit click
    },
    [startTimer]
  );

  // ── Mobile accordion toggle ───────────────────────────────────────────────
  const handleToggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  // Scroll active accordion row into view on mobile
  useEffect(() => {
    if (!openId || !isMobile) return;
    const el = sectionRef.current?.querySelector<HTMLElement>(
      `[aria-controls="partners-panel-${openId}"]`
    );
    if (!el) return;
    const HEADER_H = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_H;
    window.scrollTo({ top, behavior: "smooth" });
  }, [openId, isMobile]);

  // ── GSAP: staggered fade-up for partner items when activeId changes ───────
  useEffect(() => {
    if (!itemsRef.current || isMobile) return;
    const items = itemsRef.current.querySelectorAll<HTMLElement>(".partner-item-anim");
    if (!items.length) return;

    if (reducedMotion) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      items,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
        clearProps: "opacity,transform",
      }
    );
  }, [activeId, isMobile, reducedMotion]);

  // ── GSAP: scroll-triggered entrance for rows ─────────────────────────────
  useGSAP(
    () => {
      if (reducedMotion) return;
      const rows = gsap.utils.toArray<HTMLElement>(".partners-list-row");
      rows.forEach((row) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 90%" },
        });
        tl.fromTo(row, { borderTopColor: "rgba(0,0,0,0)" }, { borderTopColor: "var(--color-primary)", duration: 0.5, clearProps: "borderTopColor" })
          .fromTo(row.querySelector(".row-title"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "<0.1")
          .fromTo(row.querySelector(".row-desc"),  { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "<0.1")
          .fromTo(row.querySelector(".row-arrow"), { scale: 0 },          { scale: 1, duration: 0.5, ease: "back.out(1.7)" }, "<0.1");
      });

      ScrollTrigger.refresh();
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  // ── Active category data ──────────────────────────────────────────────────
  const activeCategory =
    PARTNER_CATEGORIES.find((c) => c.id === activeId) ?? PARTNER_CATEGORIES[0];

  const activeNum = String(
    PARTNER_CATEGORIES.findIndex((c) => c.id === activeId) + 1
  ).padStart(2, "0");

  const activeTitleTranslated = t(`categories.${activeCategory.titleKey}`);
  const activeCountLabel = t("partnerCount", { count: activeCategory.partners.length });

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-24 lg:py-28 w-full relative overflow-clip bg-background"
      onMouseEnter={handleSectionEnter}
      onMouseLeave={handleSectionLeave}
    >
      {/* Background glow — mirrors WhyChooseUs */}
      <div
        className="why-bg-glow absolute top-0 -end-1/4 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative z-10">
        {/* ── Section header ── */}
        <div className="flex justify-center items-center flex-col w-full mb-16 lg:mb-24">
          <div className="text-center w-full xl:w-[80%] 2xl:w-[60%]">
            <SlideHeadingLeft className="text-4xl lg:text-5xl text-primary font-regular uppercase mb-3">
              {t("heading")}
            </SlideHeadingLeft>
            <SlideHeadingRight className="text-lg lg:text-xl">
              {t("subheading")}
            </SlideHeadingRight>
          </div>
        </div>

        {/* ── Two-column grid (desktop) / single-column (mobile) ── */}
        {/* RTL: panel is visually on the right, list on the left — achieved via order utilities */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-20 relative">
          {/*
           * LEFT (LTR) / RIGHT (RTL): sticky detail panel.
           * Hidden completely on mobile.
           */}
          {/* sticky detail panel — order-2 in RTL so it appears on the right side */}
          <div
            className={`hidden lg:block ${isRtl ? "lg:order-2" : ""}`}
            aria-hidden={isMobile}
            id={`${panelId}-panel`}
          >
            <div
              ref={panelRef}
              className="lg:sticky lg:top-[120px]"
            >
              {/* Rounded card panel */}
              <div
                className="
                  relative rounded-2xl border border-primary/10
                  bg-background/80 backdrop-blur-sm
                  p-8 xl:p-10
                  overflow-hidden
                  min-h-[360px]
                "
              >
                {/* Subtle panel glow */}
                <div
                  className="absolute -top-20 -start-20 w-64 h-64 rounded-full bg-secondary/8 blur-[80px] pointer-events-none"
                  aria-hidden="true"
                />

                {/* Large outlined category number */}
                <div
                  className="
                    text-[80px] xl:text-[96px] leading-none font-bold
                    text-transparent bg-clip-text select-none
                    transition-all duration-400
                  "
                  style={{
                    WebkitTextStroke: "1.5px var(--color-primary)",
                    opacity: 0.15,
                  }}
                  aria-hidden="true"
                >
                  {activeNum}
                </div>

                {/* Category label + count */}
                <div className="mt-4 mb-6">
                  <h3
                    className="text-2xl xl:text-3xl font-bold text-foreground leading-tight"
                    key={activeId + "-title"}
                  >
                    {activeTitleTranslated}
                  </h3>
                  <p className="text-sm text-foreground/50 mt-1">
                    {activeCountLabel}
                  </p>
                </div>

                {/* Partner items grid */}
                <div
                  ref={itemsRef}
                  className="flex flex-wrap gap-3"
                  key={activeId}
                >
                  {activeCategory.partners.map((partner) => (
                    <div key={partner.id} className="partner-item-anim">
                      <PartnerItem
                        partner={partner}
                        name={t(`partners.${partner.nameKey}`)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT (LTR) / LEFT (RTL): category list */}
          <div className="flex flex-col border-t border-primary/20">
            {PARTNER_CATEGORIES.map((cat, idx) => (
              <PartnerRow
                key={cat.id}
                category={cat}
                index={idx}
                isActive={!isMobile && activeId === cat.id}
                isOpen={isMobile && openId === cat.id}
                isMobile={isMobile}
                onActivate={handleActivate}
                onToggle={handleToggle}
              >
                {/* Partner items injected for mobile accordion */}
                {cat.partners.map((partner) => (
                  <div key={partner.id} className="partner-item-anim">
                    <PartnerItem
                      partner={partner}
                      name={t(`partners.${partner.nameKey}`)}
                    />
                  </div>
                ))}
              </PartnerRow>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
