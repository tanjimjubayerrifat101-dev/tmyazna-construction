import { type StaticImageData } from "next/image";

import service1Img from "@/assets/service/service1.png";
import service2Img from "@/assets/service/service2.png";
import service3Img from "@/assets/service/service3.png";
import service4Img from "@/assets/service/service4.png";
import service5Img from "@/assets/service/service5.png";
import srviceHomeImg from "@/assets/service/srvice-home.png";
import blog1Img from "@/assets/home/blog1.png";
import blog2Img from "@/assets/home/blog2.png";
import blog3Img from "@/assets/home/blog3.png";
import blog4Img from "@/assets/home/blog4.png";
import blog5Img from "@/assets/home/blog5.png";
import blog6Img from "@/assets/home/blog6.png";
import hero1Img from "@/assets/home/hero1.png";

export type ProjectStatus = "Ongoing" | "Completed" | "Planning";
export type ProjectSectorSlug =
  | "all"
  | "systems-integration"
  | "construction"
  | "facility-services"
  | "manpower"
  | "environmental";

export interface ProjectItem {
  id: string;
  title: string;
  sector: string;
  sectorSlug: ProjectSectorSlug;
  status: ProjectStatus;
  location: string;
  description: string;
  value: string;
  year: string;
  progress: number;
  image: StaticImageData;
}

export interface ProjectStat {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}

export const PROJECTS_STATS: ProjectStat[] = [
  { target: 40, suffix: "+", label: "Projects Delivered" },
  { target: 1.6, prefix: "SAR ", suffix: "B", decimals: 1, label: "Portfolio Value" },
  { target: 13, label: "Regions Covered" },
  { target: 5, label: "Business Sectors" },
];

export const PROJECT_SECTORS: { label: string; slug: ProjectSectorSlug }[] = [
  { label: "All", slug: "all" },
  { label: "Systems Integration", slug: "systems-integration" },
  { label: "Construction", slug: "construction" },
  { label: "Facility Services", slug: "facility-services" },
  { label: "Manpower", slug: "manpower" },
  { label: "Environmental", slug: "environmental" },
];

export const FLAGSHIP_PROJECT: ProjectItem = {
  id: "flagship-king-salman-park",
  title: "King Salman Park — MEP & smart systems integration",
  sector: "Systems Integration",
  sectorSlug: "systems-integration",
  status: "Ongoing",
  location: "Riyadh Region",
  description:
    "Full mechanical, electrical and plumbing integration with intelligent building-management systems across a landmark development within King Salman Park — one of the largest urban parks in the world.",
  value: "SAR 480M",
  year: "2025",
  progress: 72,
  image: srviceHomeImg,
};

export const PROJECTS_LIST: ProjectItem[] = [
  {
    id: "proj-1",
    title: "King Salman Park — MEP & smart systems",
    sector: "Systems Integration",
    sectorSlug: "systems-integration",
    status: "Ongoing",
    location: "Riyadh Region",
    description:
      "Full MEP integration and intelligent building-management systems across a landmark park development.",
    value: "SAR 480M",
    year: "2025",
    progress: 72,
    image: service1Img,
  },
  {
    id: "proj-2",
    title: "Industrial water & wastewater treatment plant",
    sector: "Environmental",
    sectorSlug: "environmental",
    status: "Ongoing",
    location: "Eastern Region",
    description:
      "Design, build and operation of an advanced water treatment facility serving an industrial cluster.",
    value: "SAR 210M",
    year: "2025",
    progress: 84,
    image: service5Img,
  },
  {
    id: "proj-3",
    title: "NEOM development — integrated MEP package",
    sector: "Systems Integration",
    sectorSlug: "systems-integration",
    status: "Planning",
    location: "Tabuk Region",
    description:
      "Integrated mechanical, electrical and ICT systems package for a flagship NEOM development.",
    value: "SAR 360M",
    year: "2026",
    progress: 18,
    image: blog1Img,
  },
  {
    id: "proj-4",
    title: "Jeddah waterfront — interior fit-out",
    sector: "Construction",
    sectorSlug: "construction",
    status: "Completed",
    location: "Makkah Region",
    description:
      "High-end interior fit-out and finishing works for a waterfront commercial landmark on the Red Sea coast.",
    value: "SAR 145M",
    year: "2024",
    progress: 100,
    image: service2Img,
  },
  {
    id: "proj-5",
    title: "Regional campus — integrated FM",
    sector: "Facility Services",
    sectorSlug: "facility-services",
    status: "Ongoing",
    location: "Al-Qassim",
    description:
      "Five-year integrated hard and soft facility-management contract for a major institutional campus.",
    value: "SAR 92M",
    year: "2025",
    progress: 55,
    image: service3Img,
  },
  {
    id: "proj-6",
    title: "Abha highland infrastructure works",
    sector: "Construction",
    sectorSlug: "construction",
    status: "Ongoing",
    location: "Asir Region",
    description:
      "Civil and structural infrastructure works supporting tourism development across the Asir Highlands.",
    value: "SAR 175M",
    year: "2025",
    progress: 41,
    image: blog3Img,
  },
  {
    id: "proj-7",
    title: "Technical manpower deployment programme",
    sector: "Manpower",
    sectorSlug: "manpower",
    status: "Ongoing",
    location: "Najran Region",
    description:
      "Deployment and management of certified technical teams supporting operations and maintenance.",
    value: "SAR 62M",
    year: "2026",
    progress: 22,
    image: service4Img,
  },
  {
    id: "proj-8",
    title: "Smart waste-management programme",
    sector: "Environmental",
    sectorSlug: "environmental",
    status: "Completed",
    location: "Al-Jouf",
    description:
      "Sensor-based collection, segregation and recycling rollout across municipal facilities.",
    value: "SAR 48M",
    year: "2024",
    progress: 100,
    image: blog6Img,
  },
  {
    id: "proj-9",
    title: "Mosque complex — operations & maintenance",
    sector: "Facility Services",
    sectorSlug: "facility-services",
    status: "Ongoing",
    location: "Madinah Region",
    description:
      "Comprehensive O&M, cleaning and MEP maintenance across a major mosque and visitor complex.",
    value: "SAR 78M",
    year: "2025",
    progress: 60,
    image: blog5Img,
  },
  {
    id: "proj-10",
    title: "Diriyah Gate heritage district infrastructure",
    sector: "Construction",
    sectorSlug: "construction",
    status: "Ongoing",
    location: "Riyadh Region",
    description:
      "Precision structural civil works, traditional mud-brick facade coordination, and underground MEP tunnels for the historic district.",
    value: "SAR 220M",
    year: "2025",
    progress: 65,
    image: hero1Img,
  },
  {
    id: "proj-11",
    title: "Red Sea International Airport — terminal MEP",
    sector: "Systems Integration",
    sectorSlug: "systems-integration",
    status: "Completed",
    location: "Tabuk Region",
    description:
      "Complete life-safety, baggage automation BMS, and central chiller mechanical systems for the eco-luxury terminal.",
    value: "SAR 310M",
    year: "2024",
    progress: 100,
    image: blog2Img,
  },
  {
    id: "proj-12",
    title: "Qiddiya Speed Park — utility & electrical networks",
    sector: "Systems Integration",
    sectorSlug: "systems-integration",
    status: "Planning",
    location: "Riyadh Region",
    description:
      "High-voltage electrical substation integration, trackside telemetry networks, and automated water management for motorsports complex.",
    value: "SAR 180M",
    year: "2026",
    progress: 30,
    image: blog4Img,
  },
  {
    id: "proj-13",
    title: "Riyadh Metro Line 3 — stations technical FM",
    sector: "Facility Services",
    sectorSlug: "facility-services",
    status: "Ongoing",
    location: "Riyadh Region",
    description:
      "Turnkey hard FM operations, preventive escalator/HVAC maintenance, and passenger safety compliance across transit stations.",
    value: "SAR 85M",
    year: "2025",
    progress: 80,
    image: srviceHomeImg,
  },
];
