"use client";

import { MapPin, ArrowRight, ArrowLeft, Cpu, Smartphone, Target, Factory, Sun, Building2, Trees, ShieldCheck, ChevronRight } from "lucide-react";
import { ACTIVITIES_OVERVIEW } from "@/data/saudiMapData";
import { PROJECTS_STATS } from "@/data/projectsData";

interface PresenceActivitiesOverviewProps {
  onSelectRegion: (regionId: string) => void;
  onHoverRegion: (regionId: string | null) => void;
  isRtl?: boolean;
}

export default function PresenceActivitiesOverview({
  onSelectRegion,
  onHoverRegion,
  isRtl = false,
}: PresenceActivitiesOverviewProps) {
  // Helper to map icon types
  const renderIcon = (type: string, key: number) => {
    switch (type) {
      case "bms":
        return (
          <span key={key} title="Smart BMS">
            <Building2 className="w-4 h-4 text-primary" />
          </span>
        );
      case "mobile":
        return (
          <span key={key} title="Systems Integration">
            <Smartphone className="w-4 h-4 text-secondary" />
          </span>
        );
      case "energy":
        return (
          <span key={key} title="Operations & Maintenance">
            <Target className="w-4 h-4 text-slate-500" />
          </span>
        );
      case "network":
        return (
          <span key={key} title="Technical Networks">
            <Cpu className="w-4 h-4 text-primary" />
          </span>
        );
      case "sun":
        return (
          <span key={key} title="Environmental Energy">
            <Sun className="w-4 h-4 text-amber-500" />
          </span>
        );
      case "infrastructure":
        return (
          <span key={key} title="Civil Infrastructure">
            <Factory className="w-4 h-4 text-slate-600" />
          </span>
        );
      default:
        return (
          <span key={key}>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </span>
        );
    }
  };

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-lg p-6 sm:p-10 transition-all duration-300">
      <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8 sm:gap-12">
        {/* Left / Main Column: Activities by Region table (matching Image 1) */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-[2px] bg-secondary" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-secondary">
                {isRtl ? "الأنشطة حسب المنطقة" : "ACTIVITIES BY REGION"}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#001833] tracking-tight mb-6">
              {isRtl
                ? "انتشار استراتيجي وحضور تشغيلي في أهم مناطق المملكة"
                : "Strategic delivery clusters across the Kingdom"}
            </h3>

            {/* Activities Table List */}
            <div className="divide-y divide-slate-100 border-t border-b border-slate-100">
              {ACTIVITIES_OVERVIEW.map((item) => (
                <div
                  key={item.regionId}
                  onClick={() => onSelectRegion(item.regionId)}
                  onMouseEnter={() => onHoverRegion(item.regionId)}
                  onMouseLeave={() => onHoverRegion(null)}
                  className="group flex items-center justify-between py-3.5 px-3 rounded-xl hover:bg-slate-50/80 cursor-pointer transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-secondary group-hover:scale-110 transition-transform duration-200 shrink-0" />
                    <span className="text-sm sm:text-base font-semibold text-slate-800 group-hover:text-primary transition-colors duration-200">
                      {isRtl ? item.nameAr : item.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Activity Type Icons */}
                    <div className="flex items-center gap-2.5 opacity-75 group-hover:opacity-100 transition-opacity">
                      {item.types.map((t, idx) => renderIcon(t, idx))}
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all duration-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-5 text-xs text-slate-400">
            {isRtl
              ? "انقر على أي منطقة لاستعراض المشاريع وقيم العقود ومعدلات الإنجاز."
              : "Click any region row or map zone to inspect project values, status and technical scopes."}
          </p>
        </div>

        {/* Right / Secondary Column: Portfolio Highlights Summary */}
        <div className="lg:w-80 bg-slate-50/70 border border-slate-100 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-4">
              {isRtl ? "نظرة عامة على المحفظة" : "PORTFOLIO AT A GLANCE"}
            </span>

            <div className="grid grid-cols-2 gap-4">
              {PROJECTS_STATS.map((stat, i) => (
                <div key={i} className="bg-white p-3.5 rounded-xl border border-slate-200/60 shadow-2xs">
                  <span className="text-xl sm:text-2xl font-bold text-primary block">
                    {stat.prefix}
                    {stat.target}
                    {stat.suffix}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 leading-tight block mt-1">
                    {isRtl ? stat.labelAr : stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-200/60">
            <button
              type="button"
              onClick={() => onSelectRegion("eastern-province")}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-primary hover:bg-primary/90 text-white transition-colors duration-200 shadow-sm cursor-pointer"
            >
              <span>{isRtl ? "استكشف مشروع مميز" : "Explore Featured Project"}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
