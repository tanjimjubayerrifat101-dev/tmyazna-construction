import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import Breadcrumbs from "@/utils/Breadcrumb";
import { SERVICES_DATA } from "@/data/servicesData";
import ServiceDetailClient from "./ServiceDetailClient";

interface PageProps {
  params: Promise<{ slug: string; local: string }>;
}

export function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const service = SERVICES_DATA.find((s) => s.slug === slug);
  if (!service) {
    notFound();
  }

  const locale = await getLocale();
  const t = await getTranslations("ServicePage");
  const isRtl = locale === "ar";

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Banner utilizing existing Breadcrumbs component */}
      <Breadcrumbs
        title={service.name}
        eyebrow={t("eyebrow") || "OUR SERVICES"}
        heading={service.heading}
        description={service.description}
        image={service.image}
        imageAlt={`${service.name} — TMYAZNA Company Limited`}
      />

      {/* Main Service Details Content */}
      <ServiceDetailClient slug={service.slug} isRtl={isRtl} />
    </main>
  );
}
