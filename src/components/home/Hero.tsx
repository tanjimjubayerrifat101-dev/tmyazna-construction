"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "@/utils/Button";
import SplitReveal from "@/utils/SplitReveal";
import FadeUp from "@/utils/FadeUp";
import hero1 from "@/assets/home/hero1.png";
import hero2 from "@/assets/home/hero2.png";
import hero3 from "@/assets/home/blog5.png";
import "swiper/css";

const slides = [hero1, hero2, hero3];

export default function Hero() {
  const t = useTranslations("Hero");
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperInstance | null>(null);

  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Swiper
          aria-label="Featured content"
          className="h-full w-full"
          modules={[Autoplay]}
          loop
          speed={900}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
        >
          {slides.map((image, index) => (
            <SwiperSlide key={image.src}>
              <Image
                src={image}
                alt=""
                fill
                sizes="100vw"
                priority={index === 0}
                className="object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="pointer-events-none absolute inset-0 z-10 bg-primary/20" />

      <div className="container relative z-20 h-full w-full">
        <div className="relative flex h-full w-full flex-col items-start justify-center">
          <div className="mb-5 flex items-center gap-2">
            <span className="h-0.75 w-12 bg-primary" />
            <span className="h-0.75 w-5 bg-white/60" />
          </div>
          <div className="w-full max-w-4xl">
            <SplitReveal
              key={activeSlide}
              as="h1"
              className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] text-white uppercase rtl:font-sans rtl:leading-[1.2]"
              stagger={0.06}
              duration={0.9}
            >
              {activeSlide === 1 ? t("slide2TitlePart1") : activeSlide === 2 ? t("slide3TitlePart1") : t("titlePart1")}{" "}
              <br />
              <span className="text-primary">
                {activeSlide === 1 ? t("slide2TitlePart2") : activeSlide === 2 ? t("slide3TitlePart2") : t("titlePart2")}
              </span>
            </SplitReveal>
          </div>
          {activeSlide === 1 || activeSlide === 2 ? (
            <p className="mt-6 border-l-[3px] border-primary py-1 pl-4 text-lg font-semibold italic text-white sm:text-xl rtl:border-r-[3px] rtl:border-l-0 rtl:pl-0 rtl:pr-4">
              {activeSlide === 1 ? t("slide2Subtitle") : t("slide3Subtitle")}
            </p>
          ) : null}
          {/* <div className={`${activeSlide === 0 ? "mt-6" : "mt-4"}`}>
            <FadeUp delay={0.2} duration={0.8} y={30}>
              <Button text={t("ctaButton")} href="/" />
            </FadeUp>
          </div> */}
          <div className="mt-8 flex items-center gap-2">
            {slides.map((image, index) => (
              <button
                key={image.src}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={activeSlide === index}
                onClick={() => swiperRef.current?.slideToLoop(index)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  activeSlide === index ? "w-9 bg-primary" : "w-4 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
