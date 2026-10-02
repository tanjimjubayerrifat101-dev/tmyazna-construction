"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { BlogPost } from "@/data/blog";

interface BlogCardProps {
  post: BlogPost;
}

/**
 * BlogCard — reusable card component for news/blog posts.
 *
 * Anatomy (top→bottom):
 *  1. Card shell  — white surface, 24px radius, 1px hairline border
 *  2. Media area  — 4:3 aspect ratio, overflow:hidden, image scales on hover
 *  3. Floating bar — glassmorphic, absolutely positioned over the image bottom
 *  4. Body        — title (3-line clamp) + "Read more" row
 *
 * Hover (pointer devices only via @media hover:hover):
 *  - Card lifts 6px, border → brand-blue, soft blue shadow
 *  - Image scales to 1.1 (900ms ease)
 *  - Title color → brand-blue
 *  - Glass bar grows from ~22% to ~30% of image height (550ms ease-out)
 *  - Arrow button → brand-blue filled with glow, arrow nudges 3px
 *
 * Touch (@media hover:none): bar stays at 26%, no lift, no scale.
 *
 * RTL: all logical CSS props used (ps-*, pe-*, ms-*, me-*, start-*, end-*).
 * Dates: formatted with Intl.DateTimeFormat for the active locale.
 * Reduced-motion: scale/lift disabled, simple fade only.
 */
export default function BlogCard({ post }: BlogCardProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("Blog");

  // Localise date
  const dateObj = new Date(post.date);
  const dayStr = new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-GB", {
    day: "numeric",
  }).format(dateObj);
  const monthYearStr = new Intl.DateTimeFormat(
    locale === "ar" ? "ar-SA" : "en-GB",
    { month: "short", year: "numeric" }
  ).format(dateObj);

  const title    = locale === "ar" ? post.title.ar    : post.title.en;
  const category = locale === "ar" ? post.category.ar : post.category.en;

  // Detail page — /media/[slug]
  const href = `/media/${post.slug}`;

  return (
    <article
      className="
        blog-card group
        relative flex flex-col
        bg-background rounded-2xl
        border border-gray-100
        p-4 sm:p-5
        motion-safe:transition-all motion-safe:duration-300
        hover:border-secondary
        hover:-translate-y-1.5
        hover:shadow-[0_12px_40px_rgba(0,134,255,0.15)]
        focus-within:border-secondary
        focus-within:-translate-y-1.5
        focus-within:shadow-[0_12px_40px_rgba(0,134,255,0.15)]
        overflow-hidden
        h-full
      "
    >
      {/* ── Media area ── */}
      <div
        className="relative overflow-hidden rounded-xl isolate"
        style={{ aspectRatio: "4 / 3" }}
      >
        {/* Dark scrim for text legibility on bright images */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.10) 45%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Image — scales on card hover only, clipped by overflow:hidden */}
        <Image
          src={post.image}
          alt={locale === "ar" ? post.title.ar : post.title.en}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="
            object-cover
            motion-safe:transition-transform motion-safe:duration-[900ms] motion-safe:ease-out
            group-hover:scale-110
          "
          loading="lazy"
          placeholder="blur"
        />

        {/* ── Floating glassmorphic bar ── */}
        <div
          className="
            blog-card-bar
            absolute inset-x-3 bottom-3 z-20
            flex items-center justify-between
            px-4 py-3
            rounded-xl
            border border-white/25
            bg-neutral-950/45
            backdrop-blur-xl saturate-150
            shadow-[0_8px_25px_rgba(0,0,0,0.28)]
            motion-safe:transition-all motion-safe:duration-[550ms] motion-safe:ease-out
          "
        >
          {/* Date block — start side */}
          <div className="flex flex-col leading-none shrink-0">
            <span
              className={`
                text-white font-bold
                text-2xl leading-none
                ${!isRtl ? "uppercase tracking-tight" : ""}
              `}
            >
              {dayStr}
            </span>
            <span
              className={`
                text-white/80 text-[11px] font-medium mt-1
                ${!isRtl ? "uppercase tracking-wider" : ""}
              `}
            >
              {monthYearStr}
            </span>
          </div>

          {/* Premium Category badge — end side with indicator dot */}
          <div
            className="
              inline-flex items-center gap-1.5
              px-3 py-1.5 rounded-full
              bg-white/15 border border-white/25
              text-white text-xs font-medium
              backdrop-blur-md shadow-sm shrink-0
              motion-safe:transition-all motion-safe:duration-300
              group-hover:bg-secondary/25 group-hover:border-secondary/60
              whitespace-nowrap
            "
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(0,134,255,0.9)] shrink-0"
              aria-hidden="true"
            />
            <span>{category}</span>
          </div>
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-col flex-1 pt-5 pb-2 px-1 gap-4 sm:gap-5">
        {/* Title — 3-line clamp, turns brand-blue on hover */}
        <h3
          className="
            text-base lg:text-lg font-bold leading-snug
            text-foreground
            line-clamp-3
            motion-safe:transition-colors motion-safe:duration-300
            group-hover:text-primary
            rtl:leading-relaxed
            flex-1
          "
        >
          {title}
        </h3>

        {/* Read more row with left-to-right animated underline */}
        <div className="flex items-center justify-between pt-2 mt-auto">
          <Link
            href={href}
            aria-label={`${t("readMore")} — ${title}`}
            className="
              stretched-link group/link
              relative inline-flex items-center gap-2
              text-sm font-semibold text-primary
              transition-colors duration-300
              hover:text-secondary
              focus-visible:outline-none
            "
          >
            <span className="relative inline-block py-0.5">
              <span>{t("readMore")}</span>
              {/* Smooth animated underline starting exactly from the start of "Read more" text */}
              <span
                className="
                  absolute -bottom-0.5 left-0 rtl:left-auto rtl:right-0
                  h-[2px] w-0 bg-primary
                  transition-all duration-300 ease-out
                  group-hover:w-full group-hover/link:w-full
                  group-hover:bg-secondary
                "
                aria-hidden="true"
              />
            </span>

            <ArrowRight
              className="
                w-4 h-4 text-primary
                transition-all duration-300 ease-out
                group-hover:translate-x-1.5 group-hover:text-secondary
                rtl:rotate-180 rtl:group-hover:-translate-x-1.5
              "
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
