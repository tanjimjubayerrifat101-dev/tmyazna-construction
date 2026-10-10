"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { CAREER_DEPARTMENTS, JOB_POSITIONS, type JobPosition } from "@/data/careersData";
import FadeUp from "@/utils/FadeUp";

export default function OpenPositionsSection() {
  const t = useTranslations("Careers");
  const locale = useLocale();
  const isAr = locale === "ar";
  const [activeDepartment, setActiveDepartment] = useState<string>("all");

  const filteredPositions = activeDepartment === "all"
    ? JOB_POSITIONS
    : JOB_POSITIONS.filter((pos) => pos.departmentId === activeDepartment);

  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <section id="open-positions" className="relative w-full py-16 sm:py-24 bg-slate-50/60 dark:bg-card/40 scroll-mt-24">
      <div className="container relative z-10">
        {/* Section Header (Centered) */}
        <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-14">
          <FadeUp delay={0.1} y={20}>
            <div className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-secondary mb-3">
              <span className="w-8 h-0.5 bg-secondary" />
              <span>{t("openPositionsEyebrow")}</span>
              <span className="w-8 h-0.5 bg-secondary" />
            </div>
          </FadeUp>

          <FadeUp delay={0.2} y={25}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[120%] mb-3">
              {isAr ? "استكشف الفرص المهنية المناسبة لخبرتك" : "Explore Careers Shaping the Kingdom"}
            </h2>
          </FadeUp>

          <FadeUp delay={0.3} y={20}>
            <p className="text-sm sm:text-base text-muted-foreground">
              {t("filterByDept")}
            </p>
          </FadeUp>
        </div>

        {/* ExploreTabNav-Style Department Filter Tabs (Matching Service Page Design - Centered) */}
        <div className="w-full mb-10 sm:mb-14">
          <div className="flex items-center justify-start sm:justify-center gap-2.5 sm:gap-3 overflow-x-auto py-2 px-1 scrollbar-none scroll-smooth">
            {CAREER_DEPARTMENTS.map((dept) => {
              const Icon = dept.icon;
              const isActive = activeDepartment === dept.id;
              const label = isAr ? dept.ar : dept.en;

              return (
                <button
                  key={dept.id}
                  type="button"
                  onClick={() => setActiveDepartment(dept.id)}
                  className={`
                    relative flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold
                    whitespace-nowrap transition-all duration-200 ease-out cursor-pointer select-none shrink-0 border
                    ${
                      isActive
                        ? "bg-secondary border-secondary text-white shadow-md shadow-secondary/20 scale-[1.02]"
                        : "bg-white dark:bg-card hover:bg-slate-100 dark:hover:bg-card/80 text-foreground/80 hover:text-foreground border-gray-200 dark:border-white/10 shadow-xs"
                    }
                  `}
                >
                  <Icon
                    className={`w-4 h-4 transition-colors duration-200 ${
                      isActive ? "text-white" : "text-muted-foreground"
                    }`}
                    strokeWidth={2}
                  />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Job Positions List (Engineered to match 1st Image layout with Secondary Hover state) */}
        <div className="space-y-4 sm:space-y-5">
          {filteredPositions.map((job, idx) => {
            const title = isAr ? job.title.ar : job.title.en;
            const department = isAr ? job.department.ar : job.department.en;
            const location = isAr ? job.location.ar : job.location.en;
            const empType = isAr ? job.type.ar : job.type.en;

            return (
              <FadeUp key={job.id} delay={0.06 * (idx % 6)} y={20}>
                <Link
                  href={`/careers/${job.id}`}
                  className="group block w-full rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 bg-white dark:bg-card border border-gray-200/90 dark:border-white/10 shadow-sm transition-all duration-300 ease-out hover:bg-secondary hover:border-secondary hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
                    {/* Left: Job Title & Department */}
                    <div className="md:col-span-5 flex flex-col justify-center">
                      <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold tracking-tight text-foreground group-hover:text-white transition-colors duration-200 leading-snug">
                        {title}
                      </h3>
                      <p className="text-sm font-medium text-muted-foreground group-hover:text-white/85 transition-colors duration-200 mt-1">
                        {department}
                      </p>
                    </div>

                    {/* Middle: Location */}
                    <div className="md:col-span-3 flex flex-col justify-center">
                      <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-white/75 transition-colors duration-200 mb-0.5">
                        {t("locationLabel")}
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-foreground group-hover:text-white transition-colors duration-200">
                        {location}
                      </span>
                    </div>

                    {/* Right: Employment Type */}
                    <div className="md:col-span-3 flex flex-col justify-center">
                      <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-white/75 transition-colors duration-200 mb-0.5">
                        {t("typeLabel")}
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-foreground group-hover:text-white transition-colors duration-200">
                        {empType}
                      </span>
                    </div>

                    {/* Far Right: Arrow Action */}
                    <div className="md:col-span-1 flex items-center justify-end">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-100 dark:bg-white/10 group-hover:bg-white/20 text-foreground group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5 shadow-xs">
                        <ArrowIcon size={20} strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeUp>
            );
          })}

          {filteredPositions.length === 0 && (
            <div className="text-center py-16 bg-white dark:bg-card rounded-2xl border border-gray-200 dark:border-white/10">
              <p className="text-muted-foreground text-base">
                {isAr ? "لا توجد وظائف شاغرة حالياً في هذا القسم." : "No active positions found in this department."}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
