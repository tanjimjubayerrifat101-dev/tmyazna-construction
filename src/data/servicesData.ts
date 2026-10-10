import { type StaticImageData } from "next/image";
import {
  Cpu,
  Building2,
  Settings,
  Users,
  Leaf,
  Zap,
  Wrench,
  Droplets,
  Flame,
  Wind,
  Network,
  type LucideIcon,
} from "lucide-react";

import service1Img from "@/assets/service/service1.png";
import service2Img from "@/assets/service/service2.png";
import service3Img from "@/assets/service/service3.png";
import service4Img from "@/assets/service/service4.png";
import service5Img from "@/assets/service/service5.png";

// Catalog and supporting images from project assets
import catalogHeroImg from "@/assets/service/srvice-home.png";
import blog1Img from "@/assets/home/blog1.png";
import blog2Img from "@/assets/home/blog2.png";
import blog3Img from "@/assets/home/blog3.png";
import blog4Img from "@/assets/home/blog4.png";
import blog5Img from "@/assets/home/blog5.png";
import blog6Img from "@/assets/home/blog6.png";
import hero1Img from "@/assets/home/hero1.png";
import hero2Img from "@/assets/home/hero2.png";

export interface CatalogItem {
  id: string;
  title: string;
  description: string;
  image: StaticImageData;
  badge?: string;
}

export interface SubDiscipline {
  id: string;
  tabTitle: string;
  heading: string;
  description: string;
  capabilitiesHeading: string;
  capabilities: string[];
  icon: LucideIcon;
}

export interface ServiceItemData {
  id: string;
  slug: string;
  number: string;
  name: string;
  shortTitle: string;
  heading: string;
  description: string;
  image: StaticImageData;
  icon: LucideIcon;
  subDisciplines?: SubDiscipline[];
  coreCapabilitiesHeading?: string;
  coreCapabilities?: string[];
  catalogHeading?: string;
  catalogItems: CatalogItem[];
}

export const SERVICES_DATA: ServiceItemData[] = [
  {
    id: "systems-integration",
    slug: "systems-integration",
    number: "01",
    name: "Systems Integration",
    shortTitle: "Systems Integration",
    icon: Cpu,
    heading: "Our Systems Integration Expertise",
    description:
      "We unify a building's electrical, mechanical, plumbing, fire & life safety, HVAC and ICT systems into one intelligent, measurable network — engineered for reliability, efficiency and long-term performance across six integrated disciplines.",
    image: service1Img,
    subDisciplines: [
      {
        id: "electrical",
        tabTitle: "Electrical",
        heading: "Our Electrical Systems Integration Expertise",
        description:
          "At TMYAZNA Company Limited, we provide the intelligent backbone for your facility’s power infrastructure. Our team excels in the sophisticated integration of high-voltage distribution and low-voltage control systems, ensuring a seamless flow of energy that is both reliable and measurable. We bridge the gap between heavy electrical hardware and smart building analytics, allowing for real-time monitoring and automated load management. By synchronizing power systems with your HVAC and Fire Life Safety networks, we create an integrated environment that reduces operational costs, enhances equipment lifespan, and guarantees uninterrupted performance.",
        capabilitiesHeading: "CORE ELECTRICAL & POWER INTEGRATION CAPABILITIES",
        capabilities: [
          "Main Switchgear & MDB Integration",
          "Smart Metering & Sub-Metering",
          "Automatic Transfer Switches (ATS)",
          "Generator Control Systems",
          "UPS (Uninterruptible Power Supply)",
          "Intelligent Lighting Control",
          "Power Quality Analytics",
          "Motor Control Centers (MCC)",
          "EV Charging Infrastructure",
          "Renewable Energy Integration",
        ],
        icon: Zap,
      },
      {
        id: "mechanical",
        tabTitle: "Mechanical",
        heading: "Our Mechanical Systems Integration Expertise",
        description:
          "We engineer and integrate comprehensive mechanical systems tailored for high-demand infrastructure across the Kingdom. From industrial fluid transport and pumping stations to pressurized gas networks, our solutions ensure optimal thermodynamic balance, pressure containment, and uninterrupted plant performance with centralized sensor telemetry.",
        capabilitiesHeading: "CORE MECHANICAL SYSTEMS INTEGRATION CAPABILITIES",
        capabilities: [
          "Chilled Water Piping & Hydraulic Balancing",
          "Boiler & Heat Exchanger Integration",
          "Industrial Pumping & Lift Stations",
          "Vibration & Acoustic Isolation Systems",
          "Pneumatic & Gas Distribution Networks",
          "Smart Valve & Actuator Controls",
          "Thermal Energy Metering",
          "Predictive Mechanical Vibration Monitoring",
        ],
        icon: Wrench,
      },
      {
        id: "plumbing",
        tabTitle: "Plumbing",
        heading: "Our Plumbing Systems Integration Expertise",
        description:
          "Delivering advanced water supply, stormwater management, and drainage integration designed for peak water conservation and hygiene standards. Our intelligent systems optimize hydraulic pressure, detect subterranean leaks instantaneously, and seamlessly connect greywater reclamation to central facility controllers.",
        capabilitiesHeading: "CORE PLUMBING & WATER NETWORK CAPABILITIES",
        capabilities: [
          "Potable Water Pumping & Booster Systems",
          "Greywater & Treated Effluent Circulation",
          "Automated Acoustic Leak Detection",
          "Solar Water Heating Integration",
          "Stormwater Attenuation & Drainage",
          "Backflow Prevention & Water Quality Telemetry",
          "Sanitary Waste & Venting Solutions",
          "Smart Pressure Regulating Systems",
        ],
        icon: Droplets,
      },
      {
        id: "fire-safety",
        tabTitle: "Fire & Life Safety",
        heading: "Our Fire & Life Safety Integration Expertise",
        description:
          "Our life-safety integration unites state-of-the-art addressable fire alarm panels, emergency voice evacuation, clean-agent suppression, and smoke containment into one fail-safe network. Engineered to fully comply with Saudi Civil Defense and NFPA standards, guaranteeing real-time rapid response.",
        capabilitiesHeading: "CORE FIRE & LIFE SAFETY CAPABILITIES",
        capabilities: [
          "Addressable Fire Alarm & Detection Systems",
          "Voice Alarm & Mass Notification Systems",
          "Clean Agent (FM-200 / Novec) Suppression",
          "Fire Pump Controllers & Standpipe Integration",
          "Smoke Extraction & Staircase Pressurization",
          "Emergency Lighting & Central Battery Systems",
          "Civil Defense Direct Interface Compliance",
          "Gas Leak Detection & Automatic Shut-Off",
        ],
        icon: Flame,
      },
      {
        id: "hvac",
        tabTitle: "HVAC",
        heading: "Our HVAC Systems Integration Expertise",
        description:
          "Optimizing indoor air quality, comfort, and energy performance through precision climate integration. We synchronize central chiller plants, AHUs, VRF networks, and variable air volume dampers with intelligent environmental sensors and weather-predictive algorithms to minimize energy consumption in challenging climates.",
        capabilitiesHeading: "CORE HVAC & CLIMATE INTEGRATION CAPABILITIES",
        capabilities: [
          "Central Chiller Plant Optimization",
          "Air Handling Units (AHU) & VAV Controls",
          "VRV / VRF Intelligent Multi-Split Systems",
          "Building Air Balancing & IAQ Sensors",
          "Demand-Controlled Ventilation (DCV)",
          "Energy Recovery Ventilators (ERV)",
          "Cooling Tower Control Automation",
          "Smart Thermostat & Zone Automation",
        ],
        icon: Wind,
      },
      {
        id: "ict",
        tabTitle: "ICT",
        heading: "Our ICT & Digital Systems Integration Expertise",
        description:
          "We deploy the digital backbone of intelligent facilities—encompassing structured optical fiber networks, enterprise IoT sensor meshes, biometric access control, unified communications, and integrated cybersecurity infrastructure for modern resilient operations.",
        capabilitiesHeading: "CORE ICT & DIGITAL INTEGRATION CAPABILITIES",
        capabilities: [
          "Enterprise Structured Cabling & Fiber Optics",
          "IP CCTV & AI Video Analytics Integration",
          "Biometric Access Control & Turnstiles",
          "Unified Communications & VoIP",
          "Data Center Infrastructure & Rack PDU",
          "Wireless Wi-Fi 6/7 & Mesh Deployments",
          "Audio-Visual & Conference Room Systems",
          "Building IoT Sensor Gateways & Edge Computing",
        ],
        icon: Network,
      },
    ],
    catalogHeading: "Systems Integration Catalog",
    catalogItems: [
      {
        id: "si-cat-1",
        title: "Main Switchgear & MDB Panels",
        description:
          "Engineered low- and medium-voltage power distribution units integrated with smart circuit monitoring and automated failover control.",
        image: service1Img,
        badge: "Power Distribution",
      },
      {
        id: "si-cat-2",
        title: "Centralized Building Management Systems",
        description:
          "Intelligent BMS architecture unifying HVAC, lighting, energy metering, and equipment diagnostics into a single dashboard.",
        image: catalogHeroImg,
        badge: "Smart Automation",
      },
      {
        id: "si-cat-3",
        title: "Clean Agent Fire Suppression Units",
        description:
          "NFPA-compliant waterless gas suppression solutions designed for mission-critical data rooms, telecom hubs, and electrical substations.",
        image: blog1Img,
        badge: "Life Safety",
      },
      {
        id: "si-cat-4",
        title: "Enterprise Optical ICT & Server Racks",
        description:
          "High-density structured cabling, redundant fiber loops, and organized server enclosures optimized for high-throughput connectivity.",
        image: blog2Img,
        badge: "Digital Backbone",
      },
    ],
  },
  {
    id: "construction",
    slug: "construction",
    number: "02",
    name: "Construction",
    shortTitle: "Construction",
    icon: Building2,
    heading: "Our Construction Expertise",
    description:
      "We deliver civil, structural and building works to programme, budget and the highest quality and safety standards — managing every stage from groundworks and structures through fit-out to testing, commissioning and handover.",
    image: service2Img,
    coreCapabilitiesHeading: "CORE CIVIL & CONSTRUCTION CAPABILITIES",
    coreCapabilities: [
      "Civil & Structural Engineering",
      "High-Precision Concrete & Steel Frame Construction",
      "Turnkey Architectural Fit-Out & Interior Finishing",
      "Pre-Engineered Building (PEB) Structural Erection",
      "Site Excavation, Shoring & Deep Foundation Works",
      "Underground Municipal Utilities & Drainage Infrastructure",
      "Integrated MEP Coordination & Implementation",
      "Rigorous Quality Assurance (QA/QC) & ISO Compliance",
      "Testing, Commissioning & Handover Certifications",
      "Safety First Programme & Zero-Harm On-Site Standards",
    ],
    catalogHeading: "Construction Solutions Catalog",
    catalogItems: [
      {
        id: "con-cat-1",
        title: "Commercial & Corporate Complex Structures",
        description:
          "Turnkey delivery of prime commercial office headquarters, shopping centers, and mixed-use developments across Saudi Arabia.",
        image: service2Img,
        badge: "Commercial",
      },
      {
        id: "con-cat-2",
        title: "Heavy Civil & Foundation Infrastructure",
        description:
          "Deep basement excavations, secant piling, ground compaction, and heavy reinforced concrete foundations built for high loads.",
        image: blog3Img,
        badge: "Civil Works",
      },
      {
        id: "con-cat-3",
        title: "Turnkey Interior Fit-Out & Architectural Finishes",
        description:
          "Bespoke commercial interiors, acoustic ceiling installations, premium stonework, and contemporary architectural glass facades.",
        image: blog4Img,
        badge: "Fit-Out",
      },
      {
        id: "con-cat-4",
        title: "Industrial Warehouses & Logistics Hubs",
        description:
          "High-span pre-engineered steel buildings, temperature-controlled distribution centers, and heavy-duty flooring solutions.",
        image: hero1Img,
        badge: "Industrial",
      },
    ],
  },
  {
    id: "facility-services",
    slug: "facility-services",
    number: "03",
    name: "Facility Services",
    shortTitle: "Facility Services",
    icon: Settings,
    heading: "Our Facility Management Expertise",
    description:
      "We provide end-to-end hard and soft facility management that keeps assets running reliably and cost-effectively across their entire lifecycle — backed by CAFM technology and trained, certified teams.",
    image: service3Img,
    coreCapabilitiesHeading: "CORE FACILITY MANAGEMENT CAPABILITIES",
    coreCapabilities: [
      "Computer-Aided Facility Management (CAFM) Deployment",
      "Hard FM: Electrical, HVAC & Mechanical Plant Maintenance",
      "Soft FM: Janitorial, Landscaping, Pest Control & Hygiene",
      "Preventive & Condition-Based Asset Maintenance",
      "24/7 Rapid Response Helpdesk & Dispatch Center",
      "Energy Audits & Operational Cost Optimization",
      "Asset Lifecycle Depreciation & Capital Replacement Planning",
      "Statutory Safety & Environmental Compliance Auditing",
      "Vendor & Subcontractor Management & Performance SLAs",
      "Emergency Preparedness & Business Continuity Protocols",
    ],
    catalogHeading: "Facility Management Catalog",
    catalogItems: [
      {
        id: "fm-cat-1",
        title: "CAFM Smart Facility Operations Platform",
        description:
          "Cloud-based work order tracking, IoT asset telemetry, and preventive maintenance automation for commercial portfolios.",
        image: service3Img,
        badge: "CAFM Technology",
      },
      {
        id: "fm-cat-2",
        title: "Critical Plant Hard FM Maintenance Packages",
        description:
          "Comprehensive service agreements for chillers, backup generators, transformers, and building automation controllers.",
        image: blog5Img,
        badge: "Hard FM",
      },
      {
        id: "fm-cat-3",
        title: "Premium Soft Services & Campus Cleaning",
        description:
          "Sustainable green cleaning practices, automated facade washing, landscape irrigation, and hygienic waste processing.",
        image: blog6Img,
        badge: "Soft FM",
      },
      {
        id: "fm-cat-4",
        title: "Energy & HVAC Retrofit Optimization",
        description:
          "Targeted upgrades for legacy building systems that reduce kilowatt consumption by up to 30% through intelligent controls.",
        image: hero2Img,
        badge: "Efficiency",
      },
    ],
  },
  {
    id: "manpower",
    slug: "manpower",
    number: "04",
    name: "Manpower",
    shortTitle: "Manpower",
    icon: Users,
    heading: "Our Manpower Expertise",
    description:
      "We supply skilled, certified people — mobilised quickly and managed to international standards across every discipline and trade, with full recruitment, training, Saudization and compliance support.",
    image: service4Img,
    coreCapabilitiesHeading: "CORE WORKFORCE & TALENT MOBILIZATION CAPABILITIES",
    coreCapabilities: [
      "Rapid Deployment of Certified Engineers & Technical Specialists",
      "Multi-Discipline Trades: Electricians, Welders, Pipefitters & Plumbers",
      "Comprehensive Saudization (Nitaqat) Strategy & Advisory",
      "HSE & OSHA Certified Safety Officers & Site Supervisors",
      "Rigorous Multi-Stage Skill Testing & Verification",
      "Full Visa Processing, Payroll, Insurance & HR Logistics",
      "On-Site Camp Accommodation & Fleet Transport Management",
      "Flexible Short-Term Shutdown & Long-Term Project Staffing",
      "Vocational Upskilling & Safety Training Programs",
      "100% Compliance with Saudi Ministry of Human Resources Regulations",
    ],
    catalogHeading: "Workforce Solutions Catalog",
    catalogItems: [
      {
        id: "mp-cat-1",
        title: "Certified MEP Technical Teams",
        description:
          "Specialized crews of electrical technicians, HVAC mechanics, and instrumentation specialists equipped with verified credentials.",
        image: service4Img,
        badge: "Technical Trades",
      },
      {
        id: "mp-cat-2",
        title: "Civil Construction & Structural Crews",
        description:
          "Experienced steel fixers, shuttering carpenters, masons, and certified heavy equipment operators ready for mega-projects.",
        image: blog3Img,
        badge: "Construction Labor",
      },
      {
        id: "mp-cat-3",
        title: "Certified HSE Safety & Quality Officers",
        description:
          "Dedicated site safety professionals ensuring zero lost-time incidents and continuous compliance with Saudi labor codes.",
        image: blog1Img,
        badge: "HSE Officers",
      },
      {
        id: "mp-cat-4",
        title: "Turnkey Workforce Logistics & Camps",
        description:
          "Complete mobilization packages including fully catered accommodation, daily bus transport, medical coverage, and HR support.",
        image: blog5Img,
        badge: "Turnkey Logistics",
      },
    ],
  },
  {
    id: "environmental",
    slug: "environmental",
    number: "05",
    name: "Environmental",
    shortTitle: "Environmental",
    icon: Leaf,
    heading: "Our Environmental Expertise",
    description:
      "We deliver water, waste and sustainability solutions that protect the environment and support the Kingdom’s net-zero ambitions — from treatment plants to recycling, compliance and emissions monitoring.",
    image: service5Img,
    coreCapabilitiesHeading: "CORE ENVIRONMENTAL & SUSTAINABILITY CAPABILITIES",
    coreCapabilities: [
      "Industrial & Commercial Wastewater Treatment Solutions",
      "Treated Sewage Effluent (TSE) Recycling & RO Plants",
      "Solid Waste Management, Segregation & Material Recovery",
      "Continuous Ambient Air Quality & Stack Emissions Telemetry",
      "Environmental Impact Assessment (EIA) Studies & Permitting",
      "Solar PV & Renewable Clean Energy Integration",
      "Contaminated Soil & Groundwater Remediation",
      "Circular Economy Advisory & Industrial By-Product Repurposing",
      "Saudi Green Initiative & National Net-Zero Framework Alignment",
      "Regulatory Compliance with the National Environmental Center (NCEC)",
    ],
    catalogHeading: "Environmental Solutions Catalog",
    catalogItems: [
      {
        id: "env-cat-1",
        title: "Modular Wastewater Treatment Plants (MBR / MBBR)",
        description:
          "Containerized and civil sewage treatment systems producing high-purity recycled water for landscape irrigation and industrial cooling.",
        image: service5Img,
        badge: "Water Treatment",
      },
      {
        id: "env-cat-2",
        title: "Industrial Recycling & Waste Recovery Centers",
        description:
          "Engineered sorting and processing facilities transforming solid industrial waste into reusable raw materials.",
        image: blog6Img,
        badge: "Waste Recovery",
      },
      {
        id: "env-cat-3",
        title: "Continuous Emissions & Air Quality Stations",
        description:
          "Real-time sensor arrays measuring particulates, VOCs, NOx, and greenhouse gases with direct telemetry to environmental monitors.",
        image: blog2Img,
        badge: "Monitoring",
      },
      {
        id: "env-cat-4",
        title: "Commercial Solar PV Carports & Rooftop Arrays",
        description:
          "Grid-tied solar photovoltaic installations that reduce carbon footprint and generate clean on-site kilowatt hours.",
        image: hero2Img,
        badge: "Renewable Energy",
      },
    ],
  },
];
