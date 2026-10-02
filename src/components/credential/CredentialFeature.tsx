"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { createPortal } from "react-dom";
import Image, { type StaticImageData } from "next/image";
import { ExternalLink, X } from "lucide-react";
import FadeUp from "@/utils/FadeUp";

export interface CredentialFeatureProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  description: string;
  image: StaticImageData | string;
  imageAlt: string;
  link?: string;
  lensLabel: string;
  viewImageLabel: string;
  closeImageLabel: string;
  openLinkLabel: string;
}

function CredentialFeature({
  eyebrow,
  title,
  subtitle,
  description,
  image,
  imageAlt,
  link,
  lensLabel,
  viewImageLabel,
  closeImageLabel,
  openLinkLabel,
  imageSide,
}: CredentialFeatureProps & { imageSide: "left" | "right" }) {
  const [isOpen, setIsOpen] = useState(false);
  const lensRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const lens = lensRef.current;
    if (!lens || event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    lens.style.left = `${event.clientX - bounds.left}px`;
    lens.style.top = `${event.clientY - bounds.top}px`;
    lens.style.opacity = "1";
  };

  const contentOrder = imageSide === "left" ? "lg:order-2" : "lg:order-1";
  const imageOrder = imageSide === "left" ? "lg:order-1" : "lg:order-2";
  const imageFit =
    typeof image !== "string" && image.width > image.height
      ? "object-cover"
      : "object-contain";

  return (
    <FadeUp as="section" className="py-5 sm:py-7" duration={0.75} y={32}>
      <div className="container">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)]">
          <div
            className={`flex flex-col justify-center rounded-lg border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(21,65,103,0.07)] sm:p-8 lg:min-h-[350px] lg:p-10 ${contentOrder}`}
          >
            {eyebrow && (
              <div className="mb-4 flex items-center gap-3 text-xs font-bold uppercase text-secondary">
                <span className="h-px w-8 bg-secondary" aria-hidden="true" />
                <span>{eyebrow}</span>
              </div>
            )}
            <h2 className="text-2xl font-bold leading-tight text-primary sm:text-3xl">
              {title}
            </h2>
            <p className="mt-3 text-base font-semibold leading-relaxed text-secondary sm:text-lg">
              {subtitle}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
              {description}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            onPointerMove={handlePointerMove}
            onPointerLeave={() => {
              if (lensRef.current) lensRef.current.style.opacity = "0";
            }}
            aria-label={viewImageLabel}
            className={`group relative block aspect-[4/3] w-full cursor-none overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-4 lg:min-h-[350px] lg:aspect-auto ${imageOrder}`}
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 38vw"
              className={imageFit}
            />
            <span
              ref={lensRef}
              aria-hidden="true"
              className="pointer-events-none absolute z-10 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/25 text-sm font-semibold text-white opacity-0 backdrop-blur-md transition-opacity duration-150"
            >
              {lensLabel}
            </span>
          </button>
        </div>
      </div>

      {isOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-[#061421]/75 p-4 backdrop-blur-xl sm:p-8"
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label={closeImageLabel}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X size={22} />
            </button>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                aria-label={openLinkLabel}
                onClick={(event) => event.stopPropagation()}
                className="absolute right-16 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ExternalLink size={20} />
              </a>
            )}
            <div
              className="relative h-[min(78dvh,720px)] w-[88vw] sm:w-[min(54vw,520px)]"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>,
          document.body,
        )}
    </FadeUp>
  );
}

export function CredentialTextImage(props: CredentialFeatureProps) {
  return <CredentialFeature {...props} imageSide="right" />;
}

export function CredentialImageText(props: CredentialFeatureProps) {
  return <CredentialFeature {...props} imageSide="left" />;
}