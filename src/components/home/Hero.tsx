import { useLocale, useTranslations } from "next-intl";
import Button from "@/utils/Button";
import SplitReveal from "@/utils/SplitReveal";
import FadeUp from "@/utils/FadeUp";

export default function Hero() {
  const t = useTranslations("Hero");

  const local = useLocale();

  return (
    <>
      <section className="h-screen w-full relative">
        <video
          src="/video/hero-video.mp4"
          autoPlay
          loop
          playsInline
          muted
          className=" absolute inset-0 w-full h-full object-cover"
        />
        <div className=" absolute w-full h-full inset-0 bg-primary/20"></div>

        <div className="container relative h-full w-full">
          <div className="py-50 w-full h-full">
            <div className="w-full h-full flex gap-y-6 justify-center flex-col items-start">
              <div className="w-full">
                <SplitReveal
                  as="h1"
                  className="text-white text-[48px] leading-[105%] md:text-7xl xl:text-8xl uppercase rtl:font-sans rtl:text-[46px] rtl:md:text-6xl rtl:xl:text-7xl rtl:leading-[120%]"
                  stagger={0.06}
                  duration={0.9}
                >
                  {t("titlePart1")} <br />{" "}
                  <span className="text-primary ">{t("titlePart2")}</span>
                </SplitReveal>
              </div>
              <div className={`${local === "en" ? "translate-x-[20%] sm:translate-x-full" : "sm:translate-x-[-50%] translate-x-[-20%]"}`}>
                <FadeUp
                  className="w-full sm:w-auto flex justify-start pt-2"
                  delay={0.2}
                  duration={0.8}
                  y={30}
                >
                  <Button text={t("ctaButton")} href="/" />
                </FadeUp>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
