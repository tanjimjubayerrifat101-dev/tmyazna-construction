"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import type { LocalizedProjectItem } from "@/data/projectsData";

interface PresenceProjectCardProps {
  projects: LocalizedProjectItem[];
  regionName: string;
  isRtl?: boolean;
}

export default function PresenceProjectCard({
  projects,
  regionName,
  isRtl = false,
}: PresenceProjectCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!projects || projects.length === 0) {
    return null;
  }

  // Safe index bounds
  const activeIndex = Math.min(currentIndex, projects.length - 1);
  const project = projects[activeIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
  };

  // Status text color helper
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "ongoing":
      case "قيد التنفيذ":
        return "text-emerald-600";
      case "completed":
      case "مكتمل":
        return "text-blue-600";
      case "planning":
      case "قيد التخطيط":
        return "text-amber-600";
      default:
        return "text-emerald-600";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
        {/* Left Column: Project Hero Image with Sector Pill (matching Image 3) */}
        <div className="relative md:col-span-6 h-64 sm:h-80 md:h-full min-h-[260px] overflow-hidden bg-slate-900">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out hover:scale-105"
            priority
          />

          {/* Scrim overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none"
          />

          {/* Sector Badge Pill (top-left, matching Image 3) */}
          <div className="absolute top-4 start-4 z-10">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary/90 text-white backdrop-blur-md shadow-sm border border-white/20">
              {project.sector}
            </span>
          </div>

          {/* Multiple projects indicator on image if > 1 */}
          {projects.length > 1 && (
            <div className="absolute bottom-4 start-4 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-white/90 border border-white/10">
              <span>{isRtl ? `مشروع ${activeIndex + 1} من ${projects.length}` : `Project ${activeIndex + 1} of ${projects.length}`}</span>
            </div>
          )}
        </div>

        {/* Right Column: Project Details & Key Metrics (matching Image 3) */}
        <div className="md:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div>
            {/* Location row */}
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary mb-2.5">
              <MapPin className="w-4 h-4 text-secondary shrink-0" />
              <span>{regionName}</span>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-[#001833] leading-snug tracking-tight mb-3">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
              {project.description}
            </p>
          </div>

          {/* Metrics & Progress Section */}
          <div className="pt-5 border-t border-slate-100 flex flex-col gap-4">
            {/* 3 Columns Metrics (matching Image 3: VALUE, YEAR, STATUS) */}
            <div className="grid grid-cols-3 gap-2 text-start">
              <div>
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {isRtl ? "القيمة" : "VALUE"}
                </span>
                <span className="text-base sm:text-lg font-bold text-[#001833]">
                  {project.value}
                </span>
              </div>

              <div>
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {isRtl ? "السنة" : "YEAR"}
                </span>
                <span className="text-base sm:text-lg font-semibold text-slate-700">
                  {project.year}
                </span>
              </div>

              <div>
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {isRtl ? "الحالة" : "STATUS"}
                </span>
                <span className={`text-base sm:text-lg font-bold ${getStatusColor(project.statusText)}`}>
                  {project.statusText}
                </span>
              </div>
            </div>

            {/* Pagination Controls when region has multiple projects */}
            <div className="flex items-center justify-between pt-2">
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-secondary transition-colors"
              >
                <span>{isRtl ? "استكشف في المشاريع" : "Explore Portfolio"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              {projects.length > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous project"
                    className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 hover:text-primary transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next project"
                    className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 hover:text-primary transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
