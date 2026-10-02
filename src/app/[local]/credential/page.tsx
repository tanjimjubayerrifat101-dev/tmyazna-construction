import { getTranslations } from "next-intl/server";
import Breadcrumbs from "@/utils/Breadcrumb";
import {
    CredentialImageText,
    CredentialTextImage,
} from "@/components/credential/CredentialFeature";
import cityImage from "@/assets/home/blog1.png";
import systemsImage from "@/assets/home/blog2.png";
import siteImage from "@/assets/home/blog4.png";

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

            <div className="container pt-10 text-center sm:pt-14">
                <p className="text-xs font-bold uppercase text-secondary">{t("sectionEyebrow")}</p>
                <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-bold leading-tight text-primary sm:text-4xl">
                    {t("sectionHeading")}
                </h2>
            </div>

            <CredentialTextImage
                eyebrow={t("environment.eyebrow")}
                title={t("environment.title")}
                subtitle={t("environment.subtitle")}
                description={t("environment.description")}
                image={systemsImage}
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
                image={siteImage}
                imageAlt={t("quality.imageAlt")}
                viewImageLabel={t("viewImage")}
                lensLabel={t("viewLens")}
                closeImageLabel={t("closeImage")}
                openLinkLabel={t("openLink")}
            />
        </main>
    );
}