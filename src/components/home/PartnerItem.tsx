"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import type { Partner } from "@/data/partners";

interface PartnerItemProps {
  partner: Partner;
  name: string;
}

/**
 * Renders a single partner as either:
 *  - A white logo tile (when partner.logo or partner.logoAr is set), or
 *  - A text chip with a monogram avatar (brand-blue gradient) + partner name.
 *
 * The white tile is always white (not inverted in dark mode) so dark logos
 * stay visible.
 */
export default function PartnerItem({ partner, name }: PartnerItemProps) {
  const locale = useLocale();

  // Pick Arabic variant if available, otherwise fall back to default logo
  const logoSrc = locale === "ar" && partner.logoAr ? partner.logoAr : partner.logo;

  if (logoSrc) {
    return (
      <div
        className="
          inline-flex items-center justify-center
          bg-white rounded-xl
          px-4
          h-16 min-w-[80px]
          border border-gray-100
          shadow-sm
          transition-all duration-300
          hover:-translate-y-1
          hover:border-secondary
          hover:shadow-[0_4px_16px_rgba(0,134,255,0.15)]
        "
        style={{ height: "64px" }}
      >
        <Image
          src={logoSrc}
          alt={name}
          width={120}
          height={36}
          className="object-contain max-h-9 w-auto"
          loading="lazy"
        />
      </div>
    );
  }

  // Text chip fallback
  return (
    <div
      className="
        inline-flex items-center gap-2
        bg-white rounded-full
        ps-1 pe-4 py-1
        border border-gray-100
        shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:border-secondary
        hover:shadow-[0_4px_16px_rgba(0,134,255,0.15)]
      "
    >
      {/* Monogram avatar */}
      <div
        className="
          w-8 h-8 rounded-full
          flex items-center justify-center
          text-white text-xs font-bold shrink-0
          select-none
        "
        style={{
          background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
        }}
        aria-hidden="true"
      >
        {partner.initials}
      </div>
      <span className="text-sm font-medium text-foreground whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}
