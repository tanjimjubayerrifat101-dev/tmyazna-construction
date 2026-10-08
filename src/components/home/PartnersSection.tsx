"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import SlideHeadingLeft from "@/utils/SlideHeading";
import SlideHeadingRight from "@/utils/SlideHeadingRight";
import { PARTNER_CATEGORIES } from "@/data/partners";
import partner2 from "@/assets/partner/partner2.png";
import partner3 from "@/assets/partner/partner3.png";
import partner4 from "@/assets/partner/partner4.png";
import partner5 from "@/assets/partner/partner5.png";
import partner6 from "@/assets/partner/partner6.png";

const partnerLogos = [partner2, partner3, partner4, partner5, partner6];

export default function PartnersSection() {
  const t = useTranslations("Partners");

  return (
    <section className="relative w-full overflow-hidden bg-background py-20 md:py-24 lg:py-28">
      <div className="container relative z-10">
        <div className="mb-16 flex w-full flex-col items-center justify-center lg:mb-24">
          <div className="w-full text-center xl:w-[80%] 2xl:w-[60%]">
            <SlideHeadingLeft className="mb-3 text-4xl font-regular uppercase text-primary lg:text-5xl">
              {t("heading")}
            </SlideHeadingLeft>
            <SlideHeadingRight className="text-lg lg:text-xl">
              {t("subheading")}
            </SlideHeadingRight>
          </div>
        </div>

        <div className="mx-auto w-full xl:w-4/5">
          {PARTNER_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="grid grid-cols-1 items-center gap-3 border-t border-border/70 py-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6 md:py-6"
            >
              <h3 className="text-sm font-medium text-foreground/60 md:text-base">
                {t(`categories.${category.titleKey}`)}
              </h3>

              <div className="flex min-h-12 flex-wrap items-center justify-start gap-3">
                {category.partners.map((partner, index) => {
                  const logo = partnerLogos[index % partnerLogos.length];

                  return (
                    <div
                      key={`${category.id}-${index}`}
                      className="flex h-12 w-19 shrink-0 items-center justify-center sm:w-22"
                    >
                      <Image
                        src={logo}
                        alt=""
                        aria-hidden="true"
                        width={120}
                        height={64}
                        sizes="88px"
                        className="h-10 w-full object-contain"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          <div className="border-t border-border/70" />
        </div>
      </div>
    </section>
  );
}
