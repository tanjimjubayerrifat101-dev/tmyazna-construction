"use client";

import Image from "next/image";
import { type CatalogItem } from "@/data/servicesData";

interface ServiceCatalogProps {
  heading?: string;
  items: CatalogItem[];
  isRtl?: boolean;
}

export default function ServiceCatalog({
  heading = "Catalog",
  items,
  isRtl = false,
}: ServiceCatalogProps) {
  if (!items || items.length === 0) return null;

  return (
    <section id="service-catalog" className="w-full mt-16 lg:mt-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12 pb-5 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-secondary block mb-1.5">
            {isRtl ? "الفهرس والحلول" : "EQUIPMENT & SOLUTIONS"}
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#001833] tracking-tight">
            {heading}
          </h3>
        </div>
        <p className="text-sm text-slate-500 max-w-md">
          {isRtl
            ? "نظرة على أهم الأنظمة والحلول والمعدات التابعة لهذا القطاع."
            : "A curated overview of specialized systems, packages, and turnkey assets delivered under this service line."}
        </p>
      </div>

      {/* Grid of Modernized Catalog Cards without Bottom Button */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative flex flex-col bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 hover:-translate-y-1.5"
          >
            {/* Card Image Container with smooth hover zoom */}
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-900">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />

              {/* Gradient Scrim on Image */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none"
              />

              {/* Floating Frosted Pill Badge */}
              {item.badge && (
                <div className="absolute top-3.5 start-3.5 z-10">
                  <span className="inline-block px-3 py-1 text-[11px] font-semibold tracking-wider rounded-full bg-[#001833]/80 text-white backdrop-blur-md border border-white/20 shadow-xs">
                    {item.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Card Content: Title & Short Description only (no bottom button) */}
            <div className="flex flex-col flex-1 p-6">
              <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-secondary transition-colors duration-200 leading-snug mb-3">
                {item.title}
              </h4>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal flex-1">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
