"use client";

import { type ServiceItemData } from "@/data/servicesData";

interface StandardServiceDetailProps {
  service: ServiceItemData;
  isRtl?: boolean;
}

export default function StandardServiceDetail({
  service,
}: StandardServiceDetailProps) {
  return (
    <div className="w-full">
      <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-14 border border-slate-200/80 shadow-xs">
        {/* Service Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001833] tracking-tight mb-6">
          {service.heading}
        </h2>

        {/* Detailed Description */}
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-10 max-w-4xl">
          {service.description}
        </p>

        {/* Core Capabilities Section */}
        {service.coreCapabilitiesHeading && service.coreCapabilities && (
          <div className="pt-8 border-t border-slate-100">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800">
                {service.coreCapabilitiesHeading}
              </h3>
            </div>

            {/* 2-Column Grid of Capabilities with Diamond Bullets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {service.coreCapabilities.map((capability, idx) => (
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
        )}
      </div>
    </div>
  );
}
