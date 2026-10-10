"use client";

import { Link } from "@/i18n/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SERVICES_DATA, type ServiceItemData } from "@/data/servicesData";
import SystemsIntegrationTabs from "@/components/service/details/SystemsIntegrationTabs";
import StandardServiceDetail from "@/components/service/details/StandardServiceDetail";
import ServiceCatalog from "@/components/service/details/ServiceCatalog";
import ServiceCTA from "@/components/service/details/ServiceCTA";

interface ServiceDetailClientProps {
  slug: string;
  isRtl?: boolean;
}

export default function ServiceDetailClient({
  slug,
  isRtl = false,
}: ServiceDetailClientProps) {
  const service = SERVICES_DATA.find((s) => s.slug === slug);
  if (!service) return null;

  const isSystemsIntegration = service.slug === "systems-integration" && !!service.subDisciplines;

  return (
    <div className="py-12 sm:py-16 lg:py-24 bg-[#f8fbff]" dir={isRtl ? "rtl" : "ltr"}>
      <div className="container">
        {/* Back navigation link to /service */}
        <div className="mb-8">
          <Link
            href="/service"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors duration-200 group"
          >
            {isRtl ? (
              <ArrowRight
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            ) : (
              <ArrowLeft
                className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
                aria-hidden="true"
              />
            )}
            <span>{isRtl ? "العودة إلى كافة الخدمات" : "Back to all services"}</span>
          </Link>
        </div>

        {/* Systems Integration has 6 sub-tabs; other services render standard detailed layout */}
        {isSystemsIntegration && service.subDisciplines ? (
          <SystemsIntegrationTabs
            subDisciplines={service.subDisciplines}
            isRtl={isRtl}
          />
        ) : (
          <StandardServiceDetail
            service={service}
            isRtl={isRtl}
          />
        )}

        {/* Catalog Section for all services */}
        <ServiceCatalog
          heading={service.catalogHeading || "Catalog"}
          items={service.catalogItems}
          isRtl={isRtl}
        />

        {/* Bottom CTA Banner */}
        <ServiceCTA serviceName={service.name} isRtl={isRtl} />
      </div>
    </div>
  );
}
