"use client";

import { useState } from "react";
import { type SubDiscipline } from "@/data/servicesData";

interface SystemsIntegrationTabsProps {
  subDisciplines: SubDiscipline[];
  isRtl?: boolean;
}

export default function SystemsIntegrationTabs({
  subDisciplines,
  isRtl = false,
}: SystemsIntegrationTabsProps) {
  const [activeTabId, setActiveTabId] = useState(subDisciplines[0]?.id || "electrical");

  const activeDiscipline =
    subDisciplines.find((d) => d.id === activeTabId) || subDisciplines[0];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Vertical Discipline Navigation Tabs */}
        <div className="lg:col-span-4 xl:col-span-3">
          <div className="sticky top-28 bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs">
            <p className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-400">
              {isRtl ? "التخصصات المتكاملة" : "Integrated Disciplines"}
            </p>

            <nav
              className="flex flex-col gap-1.5 mt-1"
              aria-label="Systems Integration Disciplines"
              role="tablist"
            >
              {subDisciplines.map((discipline) => {
                const isActive = discipline.id === activeTabId;
                const Icon = discipline.icon;

                return (
                  <button
                    key={discipline.id}
                    type="button"
                    role="tab"
                    id={`discipline-tab-${discipline.id}`}
                    aria-selected={isActive}
                    aria-controls={`discipline-panel-${discipline.id}`}
                    onClick={() => setActiveTabId(discipline.id)}
                    className={`
                      w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold
                      text-start transition-all duration-200 cursor-pointer select-none
                      ${
                        isActive
                          ? "bg-[#002244] text-white shadow-sm border-s-4 border-secondary"
                          : "text-slate-700 hover:text-primary hover:bg-slate-50"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? "text-secondary" : "text-slate-400"
                        }`}
                      />
                      <span>{discipline.tabTitle}</span>
                    </div>

                    <span
                      className={`text-xs transition-transform duration-200 ${
                        isActive
                          ? "translate-x-0.5 text-secondary opacity-100"
                          : "opacity-0 -translate-x-1"
                      }`}
                    >
                      {isRtl ? "←" : "→"}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Right Column: Active Discipline Content & Capabilities */}
        <div className="lg:col-span-8 xl:col-span-9">
          <div
            key={activeDiscipline.id}
            id={`discipline-panel-${activeDiscipline.id}`}
            role="tabpanel"
            aria-labelledby={`discipline-tab-${activeDiscipline.id}`}
            className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/80 shadow-xs animate-fadeIn"
          >
            {/* Active Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001833] tracking-tight mb-6">
              {activeDiscipline.heading}
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-10">
              {activeDiscipline.description}
            </p>

            {/* Core Capabilities Section */}
            <div className="pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800">
                  {activeDiscipline.capabilitiesHeading}
                </h3>
              </div>

              {/* 2-Column Grid of Capabilities with Styled Diamond Bullets */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {activeDiscipline.capabilities.map((capability, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors group"
                  >
                    <span
                      aria-hidden="true"
                      className="text-secondary text-sm font-bold mt-0.5 select-none shrink-0 group-hover:scale-125 transition-transform"
                    >
                      ◆
                    </span>
                    <span className="text-sm sm:text-base font-medium text-slate-700 leading-snug">
                      {capability}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
