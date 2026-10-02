/**
 * Typed data source for the "Our Partners" section.
 *
 * Fields:
 *  - logo    : path relative to /public (e.g. "/partners/roshn.svg").
 *              Leave undefined to render a text-chip fallback.
 *  - logoAr  : optional Arabic-variant logo (same format).
 *              Falls back to `logo` when not provided.
 *  - nameKey : i18n key under Partners.partners.*
 *  - initials: used for the monogram avatar when no logo is available.
 */

export interface Partner {
  id: string;
  nameKey: string;    // e.g. "momrah"  →  t("Partners.partners.momrah")
  initials: string;
  logo?: string;      // public-relative path
  logoAr?: string;    // Arabic-variant logo (optional)
}

export interface PartnerCategory {
  id: string;
  /** i18n key under Partners.categories.* */
  titleKey: string;
  partners: Partner[];
}

export const PARTNER_CATEGORIES: PartnerCategory[] = [
  {
    id: "government",
    titleKey: "government",
    partners: [
      { id: "momrah",  nameKey: "momrah",  initials: "MO" },
      { id: "rega",    nameKey: "rega",    initials: "RE" },
      { id: "sakani",  nameKey: "sakani",  initials: "SK" },
    ],
  },
  {
    id: "realEstate",
    titleKey: "realEstate",
    partners: [
      // TODO: Confirm logo paths. The brief states logos exist in project assets,
      // but they were not found in public/ or src/assets/ during audit (2026-10-01).
      // Add the correct paths once the files are placed under /public/partners/.
      { id: "roshn",       nameKey: "roshn",       initials: "RO", logo: undefined /* TODO: "/partners/roshn.svg" */ },
      { id: "kingSalman",  nameKey: "kingSalman",  initials: "KS", logo: undefined /* TODO: "/partners/king-salman-park.svg" */ },
      { id: "trojena",     nameKey: "trojena",     initials: "TR", logo: undefined /* TODO: "/partners/trojena.svg" */ },
      { id: "tbc",         nameKey: "tbc",         initials: "TB", logo: undefined /* TODO: "/partners/tbc.svg" */ },
      { id: "realEstate5", nameKey: "realEstate5", initials: "R5", logo: undefined /* TODO: add fifth real-estate logo */ },
    ],
  },
  {
    id: "funds",
    titleKey: "funds",
    partners: [
      { id: "blominvest",     nameKey: "blominvest",     initials: "BL" },
      { id: "alphaCapital",   nameKey: "alphaCapital",   initials: "AC" },
      { id: "dirayah",        nameKey: "dirayah",        initials: "DI" },
      { id: "albilad",        nameKey: "albilad",        initials: "AB" },
    ],
  },
  {
    id: "financiers",
    titleKey: "financiers",
    partners: [
      { id: "snb",           nameKey: "snb",           initials: "SN" },
      { id: "alRajhi",       nameKey: "alRajhi",       initials: "AR" },
      { id: "riyadBank",     nameKey: "riyadBank",     initials: "RB" },
      { id: "alinma",        nameKey: "alinma",        initials: "AL" },
      { id: "anb",           nameKey: "anb",           initials: "AN" },
      { id: "sab",           nameKey: "sab",           initials: "SA" },
      { id: "gib",           nameKey: "gib",           initials: "GI" },
      { id: "firstFinance",  nameKey: "firstFinance",  initials: "FF" },
    ],
  },
  {
    id: "consultancy",
    titleKey: "consultancy",
    partners: [
      { id: "knightFrank", nameKey: "knightFrank", initials: "KF" },
      { id: "jll",         nameKey: "jll",         initials: "JL" },
      { id: "colliers",    nameKey: "colliers",    initials: "CO" },
      { id: "pwc",         nameKey: "pwc",         initials: "PW" },
    ],
  },
  {
    id: "operators",
    titleKey: "operators",
    partners: [
      { id: "ritzCarlton", nameKey: "ritzCarlton", initials: "RC" },
      { id: "nobu",        nameKey: "nobu",        initials: "NB" },
    ],
  },
  {
    id: "engineering",
    titleKey: "engineering",
    partners: [
      { id: "benoy",       nameKey: "benoy",       initials: "BE" },
      { id: "cracknell",   nameKey: "cracknell",   initials: "CR" },
      { id: "dewan",       nameKey: "dewan",       initials: "DE" },
      { id: "naga",        nameKey: "naga",        initials: "NA" },
      { id: "darAlOmran",  nameKey: "darAlOmran",  initials: "DO" },
    ],
  },
];
