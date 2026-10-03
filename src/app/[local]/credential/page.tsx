import { getTranslations } from "next-intl/server";
import Breadcrumbs from "@/utils/Breadcrumb";
import {
  CredentialImageText,
  CredentialTextImage,
} from "@/components/credential/CredentialFeature";
import cityImage from "@/assets/home/blog1.png";
import FadeUp from "@/utils/FadeUp";

import cerficate1 from "@/assets/credentials/cer1.png";
import cerficate2 from "@/assets/credentials/cer2.png";
import cerficate3 from "@/assets/credentials/cer3.png";
import cerficate4 from "@/assets/credentials/cer4.png";
import cerficate5 from "@/assets/credentials/cer5.png";
import cerficate6 from "@/assets/credentials/cer6.png";
import cerficate7 from "@/assets/credentials/cer7.png";

export default async function CredentialPage() {
  const t = await getTranslations("Credential");

  return (
    <main className="min-h-screen bg-background pb-12">
      <Breadcrumbs
        title={t("breadcrumb")}
        eyebrow={t("eyebrow")}
        heading={t("heading")}
        description={t("subheading")}
        image={cityImage}
        imageAlt={t("heroImageAlt")}
      />

      <div id="certificates">
        <div className="container pt-10 text-center sm:pt-14">
          <FadeUp className="text-xs font-bold uppercase text-secondary">
            {t("sectionEyebrow")}
          </FadeUp>
          <FadeUp>
            <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-bold leading-tight text-primary sm:text-4xl">
              {t("sectionHeading")}
            </h2>
          </FadeUp>
        </div>
        <CredentialTextImage
          eyebrow={t("environment.eyebrow")}
          title={t("environment.title")}
          subtitle={t("environment.subtitle")}
          description={t("environment.description")}
          image={cerficate1}
          imageAlt={t("environment.imageAlt")}
          viewImageLabel={t("viewImage")}
          lensLabel={t("viewLens")}
          closeImageLabel={t("closeImage")}
          openLinkLabel={t("openLink")}
        />
        <CredentialImageText
          eyebrow={t("quality.eyebrow")}
          title={t("quality.title")}
          subtitle={t("quality.subtitle")}
          description={t("quality.description")}
          image={cerficate2}
          imageAlt={t("quality.imageAlt")}
          viewImageLabel={t("viewImage")}
          lensLabel={t("viewLens")}
          closeImageLabel={t("closeImage")}
          openLinkLabel={t("openLink")}
        />
        <CredentialTextImage
          eyebrow={t("facility.eyebrow")}
          title={t("facility.title")}
          subtitle={t("facility.subtitle")}
          description={t("facility.description")}
          image={cerficate3}
          imageAlt={t("facility.imageAlt")}
          viewImageLabel={t("viewImage")}
          lensLabel={t("viewLens")}
          closeImageLabel={t("closeImage")}
          openLinkLabel={t("openLink")}
        />
        <CredentialImageText
          eyebrow={t("occupational.eyebrow")}
          title={t("occupational.title")}
          subtitle={t("occupational.subtitle")}
          description={t("occupational.description")}
          image={cerficate4}
          imageAlt={t("occupational.imageAlt")}
          viewImageLabel={t("viewImage")}
          lensLabel={t("viewLens")}
          closeImageLabel={t("closeImage")}
          openLinkLabel={t("openLink")}
        />
        <CredentialTextImage
          eyebrow={t("membership.eyebrow")}
          title={t("membership.title")}
          subtitle={t("membership.subtitle")}
          description={t("membership.description")}
          image={cerficate5}
          imageAlt={t("membership.imageAlt")}
          viewImageLabel={t("viewImage")}
          lensLabel={t("viewLens")}
          closeImageLabel={t("closeImage")}
          openLinkLabel={t("openLink")}
        />
      </div>
      <div id="compliance">
        <div className="container pt-10 text-center sm:pt-14">
          <FadeUp className="text-xs font-bold uppercase text-secondary">
            {t("sectionEyebrow")}
          </FadeUp>
          <FadeUp>
            <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-bold leading-tight text-primary sm:text-4xl">
              {t("sectionHeading1")}
            </h2>
          </FadeUp>
        </div>
        <CredentialTextImage
          eyebrow={t("ministry.eyebrow")}
          title={t("ministry.title")}
          subtitle={t("ministry.subtitle")}
          description={t("ministry.description")}
          image={cerficate6}
          imageAlt={t("ministry.imageAlt")}
          viewImageLabel={t("viewImage")}
          lensLabel={t("viewLens")}
          closeImageLabel={t("closeImage")}
          openLinkLabel={t("openLink")}
        />
        <CredentialImageText
          eyebrow={t("authority.eyebrow")}
          title={t("authority.title")}
          subtitle={t("authority.subtitle")}
          description={t("authority.description")}
          image={cerficate7}
          imageAlt={t("authority.imageAlt")}
          viewImageLabel={t("viewImage")}
          lensLabel={t("viewLens")}
          closeImageLabel={t("closeImage")}
          openLinkLabel={t("openLink")}
        />
        
      </div>
    </main>
  );
}
