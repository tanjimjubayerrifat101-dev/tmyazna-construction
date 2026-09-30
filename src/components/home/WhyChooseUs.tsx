"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import WhyChooseUsItem from "./WhyChooseUsItem";
import SlideHeadingLeft from "@/utils/SlideHeading";
import SlideHeadingRight from "@/utils/SlideHeadingRight";

import img from "@/assets/home/why-choose.png"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function WhyChooseUs() {
  const container = useRef<HTMLDivElement>(null);
  const t = useTranslations("WhyChooseUs");

  const listData = [
    {
      title: t("items.item1.title"),
      description: t("items.item1.description"),
    },
    {
      title: t("items.item2.title"),
      description: t("items.item2.description"),
    },
    {
      title: t("items.item3.title"),
      description: t("items.item3.description"),
    },
    {
      title: t("items.item4.title"),
      description: t("items.item4.description"),
    },
    {
      title: t("items.item5.title"),
      description: t("items.item5.description"),
    }
  ];
  
  useGSAP(() => {
    // Keep the image visible immediately; only add subtle scroll parallax.
    gsap.to(".why-inner-image", {
      yPercent: 9,
      ease: "none",
      scrollTrigger: {
        trigger: ".why-image-wrapper",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    // 4. List rows
    const rows = gsap.utils.toArray<HTMLElement>(".why-list-row");
    rows.forEach((row) => {
      const tlRow = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: "top 90%",
        }
      });

      tlRow
        .fromTo(row,
          { borderTopColor: "rgba(0,0,0,0)" },
          { borderTopColor: "var(--color-primary)", duration: 0.5, clearProps: "borderTopColor" }
        )
        .fromTo(row.querySelector(".row-title"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "<0.1"
        )
        .fromTo(row.querySelector(".row-desc"),
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "<0.1"
        )
        .fromTo(row.querySelector(".row-arrow"),
          { scale: 0 },
          { scale: 1, duration: 0.5, ease: "back.out(1.7)" },
          "<0.1"
        );
    });

    // 5. Background glow drift
    gsap.to(".why-bg-glow", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    ScrollTrigger.refresh();

  }, { scope: container });

  return (
    <section 
      ref={container} 
      className="py-20 md:py-24 lg:py-28 w-full relative overflow-clip bg-background"
    >
      {/* Background Glow */}
      <div className="why-bg-glow absolute top-0 -left-1/4 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        
        {/* Header Section (Matched with Service Component) */}
        <div className="flex justify-center items-center flex-col w-full mb-16 lg:mb-24">
          <div className="text-center w-full xl:w-[80%] 2xl:w-[60%]">
            <SlideHeadingLeft className="text-4xl lg:text-5xl text-primary font-regular uppercase mb-3">
              {t("eyebrow")}
            </SlideHeadingLeft>
            <SlideHeadingRight className="text-lg lg:text-xl">
              {t("heading")}
            </SlideHeadingRight>
          </div>
        </div>

        {/* Two Column Grid */}
        <div className="why-grid-container grid grid-cols-1 lg:grid-cols-[0.82fr_1.18fr] gap-12 lg:gap-24 relative">
          
          {/* LEFT: Sticky Media & Text */}
          <div className="relative">
            <div className="lg:sticky lg:top-[120px] flex flex-col gap-8">
              <div className="why-image-wrapper relative w-full h-[40vh] min-h-[240px] max-h-[460px] overflow-hidden rounded-md">
                <Image
                  src={img}
                  alt="Partnership"
                  fill
                  priority
                  sizes="(max-width: 1023px) 100vw, 42vw"
                  placeholder="blur"
                  className="why-inner-image object-cover grayscale brightness-90 contrast-125"
                />
              </div>
              <p className="text-lg lg:text-xl leading-relaxed text-foreground/80 font-medium text-center lg:text-start">
                {t("paragraph")}
              </p>
            </div>
          </div>

          {/* RIGHT: List */}
          <div className="flex flex-col border-t border-primary/20">
            {listData.map((item, index) => (
              <WhyChooseUsItem 
                key={index} 
                title={item.title} 
                description={item.description} 
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
