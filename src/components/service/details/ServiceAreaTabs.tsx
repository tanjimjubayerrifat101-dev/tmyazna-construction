"use client";

import { useState } from "react";
import {
  type CatalogItem,
  type SubDiscipline,
} from "@/data/servicesData";
import ServiceCatalog from "./ServiceCatalog";

interface ServiceAreaTabsProps {
  subDisciplines: SubDiscipline[];
  tabHeading: string;
  catalogHeading: string;
  catalogItems: CatalogItem[];
  isRtl?: boolean;
}

export default function ServiceAreaTabs({
  subDisciplines,
  tabHeading,
  catalogHeading,
  catalogItems,
  isRtl = false,
}: ServiceAreaTabsProps) {
  const [activeTabId, setActiveTabId] = useState(subDisciplines[0]?.id || "electrical");

  const activeDiscipline =
    subDisciplines.find((d) => d.id === activeTabId) || subDisciplines[0];

  return (
    <div className="w-full">
      <div className="flex flex-col items-stretch gap-6 lg:grid lg:grid-cols-12 lg:items-start lg:gap-8 xl:gap-10">
        <div className="sticky top-25 z-30 self-start lg:col-span-3">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xs">
            <p className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-400">
              {tabHeading}
            </p>

            <nav
              className="mt-1 flex gap-1.5 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
              aria-label={tabHeading}
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
                      flex w-max shrink-0 items-center justify-between gap-4 rounded-xl px-4 py-3.5 text-sm font-semibold lg:w-full
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
        <div className="lg:col-span-9">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(220px,3fr)]">
            <div
              key={activeDiscipline.id}
              id={`discipline-panel-${activeDiscipline.id}`}
              role="tabpanel"
              aria-labelledby={`discipline-tab-${activeDiscipline.id}`}
              className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs animate-fadeIn sm:p-10 lg:p-12"
            >
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-[#001833] sm:text-3xl ">
                {activeDiscipline.heading}
              </h2>

              <p className="mb-10 text-base font-normal leading-relaxed text-slate-600 sm:text-lg">
                {activeDiscipline.description}
              </p>

              <div className="border-t border-slate-100 pt-6">
                <div className="mb-6 flex items-center gap-2">
                  {/* <span className="h-2 w-2 rounded-full bg-secondary" /> */}
                  <h2 className="mb-6 text-2xl font-bold tracking-tight text-[#001833] sm:text-3xl ">
                    {activeDiscipline.capabilitiesHeading}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-x-8 gap-y-4 xl:grid-cols-2">
                  {activeDiscipline.capabilities.map((capability, idx) => (
                    <div
                      key={idx}
                      className="group flex items-start gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-slate-50"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 select-none text-sm font-bold text-secondary transition-transform group-hover:scale-125"
                      >
                        ◆
                      </span>
                      <span className="text-sm font-medium leading-snug text-slate-700 lg:whitespace-nowrap xl:text-sm">
                        {capability}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <ServiceCatalog
              heading={catalogHeading}
              items={catalogItems}
              isRtl={isRtl}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
