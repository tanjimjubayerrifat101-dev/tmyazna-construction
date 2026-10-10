import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import CareersHero from "@/components/careers/CareersHero";
import WhyWorkWithUs from "@/components/careers/WhyWorkWithUs";
import OpenPositionsSection from "@/components/careers/OpenPositionsSection";
import HiringProcessSection from "@/components/careers/HiringProcessSection";
import CareersCtaBanner from "@/components/careers/CareersCtaBanner";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Careers");
  return {
    title: `${t("breadcrumb")} | TMYAZNA Construction`,
    description: t("subheading"),
  };
}

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section with Breadcrumbs & Action Banner */}
      <CareersHero />

      {/* Why Work With Us & Life at TMYAZNA */}
      <WhyWorkWithUs />

      {/* Open Positions with Service-style tabs & Image 1 cards */}
      <OpenPositionsSection />

      {/* 4 Hiring Process Stages */}
      <HiringProcessSection />

      {/* Don't see your role? Send CV banner */}
      <CareersCtaBanner />
    </main>
  );
}
