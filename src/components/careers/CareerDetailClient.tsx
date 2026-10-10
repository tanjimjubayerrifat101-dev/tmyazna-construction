"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  CheckCircle2,
  UploadCloud,
  FileText,
  X,
  Send,
  Building2,
  MapPin,
  Clock,
  HelpCircle,
  CheckCircle,
  Loader2,
  User,
  Mail,
  Phone,
  Globe,
  Briefcase,
  Link2,
  Timer,
  MessageSquare,
} from "lucide-react";
import { JOB_POSITIONS } from "@/data/careersData";
import FadeUp from "@/utils/FadeUp";

interface CareerDetailClientProps {
  jobId: string;
}

export default function CareerDetailClient({ jobId }: CareerDetailClientProps) {
  const t = useTranslations("Careers");
  const locale = useLocale();
  const isAr = locale === "ar";

  const initialFound = JOB_POSITIONS.find((j) => j.id === jobId) || JOB_POSITIONS[0];
  const [selectedJobId, setSelectedJobId] = useState<string>(initialFound?.id || jobId);
  const currentJob = JOB_POSITIONS.find((j) => j.id === selectedJobId) || initialFound;

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form fields state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    nationality: "",
    experience: "3-5 years",
    currentEmployer: "",
    noticePeriod: "1 month",
    linkedin: "",
    coverNote: "",
    consent: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      alert(isAr ? "يرجى الموافقة على شروط معالجة البيانات للمتابعة." : "Please agree to the privacy consent to proceed.");
      return;
    }
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const jobTitle = isAr ? currentJob.title.ar : currentJob.title.en;
  const jobDept = isAr ? currentJob.department.ar : currentJob.department.en;
  const jobLoc = isAr ? currentJob.location.ar : currentJob.location.en;
  const jobType = isAr ? currentJob.type.ar : currentJob.type.en;
  const jobOverview = isAr ? currentJob.overview.ar : currentJob.overview.en;
  const responsibilities = isAr ? currentJob.responsibilities.ar : currentJob.responsibilities.en;
  const requirements = isAr ? currentJob.requirements.ar : currentJob.requirements.en;
  const JobIcon = currentJob.icon;

  /* ── shared class helpers ── */
  const inputClass =
    "w-full pl-10 pr-4 py-3.5 rounded-xl bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-white/8 text-foreground text-sm placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 shadow-sm";

  const selectClass =
    "w-full pl-10 pr-8 py-3.5 rounded-xl bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-white/8 text-foreground text-sm outline-none transition-all duration-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 shadow-sm cursor-pointer appearance-none";

  const SectionHeader = ({
    num,
    title,
    sub,
  }: {
    num: string;
    title: string;
    sub: string;
  }) => (
    <div className="flex items-center gap-3.5 px-5 sm:px-6 py-4 bg-gradient-to-r from-secondary/8 via-secondary/4 to-transparent dark:from-secondary/12 dark:via-secondary/5 dark:to-transparent border-b border-slate-200/60 dark:border-white/6">
      <div className="w-8 h-8 rounded-lg bg-secondary text-white font-mono font-bold text-xs flex items-center justify-center shadow-md shadow-secondary/30 shrink-0">
        {num}
      </div>
      <div>
        <h4 className="text-sm sm:text-base font-bold text-foreground tracking-tight">{title}</h4>
        <p className="text-[11px] text-muted-foreground">{sub}</p>
      </div>
    </div>
  );

  const Chevron = () => (
    <svg
      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div className="bg-slate-50/50 dark:bg-background pb-24">
      <div className="container max-w-5xl -mt-10 sm:-mt-14 relative z-20 space-y-8 sm:space-y-10 pt-2">

        {/* ══ Card 1: Job Overview & Requirements ══ */}
        <FadeUp delay={0.1} y={25}>
          <div className="rounded-3xl bg-white dark:bg-card border border-gray-200/90 dark:border-white/10 shadow-xl p-6 sm:p-10 lg:p-12 relative overflow-hidden">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-6 pb-8 border-b border-gray-100 dark:border-white/5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center shrink-0 shadow-sm">
                <JobIcon size={36} strokeWidth={2} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-3">
                  {jobTitle}
                </h2>
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs sm:text-sm">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-300 font-semibold">
                    <Building2 size={14} />
                    {jobDept}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/10 text-muted-foreground font-medium">
                    <MapPin size={14} />
                    {jobLoc}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                    <Clock size={14} />
                    {jobType}
                  </span>
                </div>
              </div>
            </div>

            {/* Overview */}
            <div className="py-6 sm:py-8 text-muted-foreground text-sm sm:text-base leading-relaxed border-b border-gray-100 dark:border-white/5">
              <p>{jobOverview}</p>
            </div>

            {/* Responsibilities & Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pt-8">
              <div>
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-secondary mb-5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  {t("whatYouDo")}
                </h3>
                <ul className="space-y-3.5">
                  {responsibilities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-foreground/85 leading-relaxed">
                      <CheckCircle2 size={18} className="text-secondary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-secondary mb-5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  {t("whatYouBring")}
                </h3>
                <ul className="space-y-3.5">
                  {requirements.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-foreground/85 leading-relaxed">
                      <CheckCircle2 size={18} className="text-secondary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* ══ Card 2: Application Form ══ */}
        <FadeUp delay={0.2} y={30}>
          <div className="rounded-3xl bg-white dark:bg-card border border-gray-200/90 dark:border-white/10 shadow-2xl relative overflow-hidden">
            {/* gradient top bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-primary via-secondary to-primary absolute top-0 inset-x-0" />

            {isSubmitted ? (
              /* ── Success state ── */
              <div className="p-8 sm:p-12 text-center py-20 sm:py-28 space-y-5">
                <div className="w-24 h-24 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center shadow-inner">
                  <CheckCircle size={52} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground">{t("successTitle")}</h3>
                <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                  {t("successDesc")}
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="px-10 py-3.5 rounded-full bg-secondary text-white font-bold text-sm shadow-lg shadow-secondary/25 hover:bg-secondary/90 transition-all cursor-pointer"
                  >
                    {isAr ? "تقديم طلب آخر" : "Submit another application"}
                  </button>
                </div>
              </div>
            ) : (
              /* ── Form ── */
              <form onSubmit={handleSubmit} className="p-6 sm:p-10 lg:p-12 pt-10 sm:pt-12">
                {/* Form header */}
                <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
                  <div className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-secondary mb-3">
                    <span className="w-6 h-0.5 bg-secondary rounded-full" />
                    <span>{t("applicationEyebrow")}</span>
                    <span className="w-6 h-0.5 bg-secondary rounded-full" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                    {t("formTitle")}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2">{t("formSubtitle")}</p>
                </div>

                <div className="space-y-6 sm:space-y-7">
                  {/* ─ Section 01: Personal Details ─ */}
                  <div className="rounded-2xl overflow-hidden border border-slate-200/70 dark:border-white/8 shadow-sm">
                    <SectionHeader num="01" title={t("personalDetails")} sub={t("personalDetailsSub")} />

                    <div className="p-5 sm:p-6 bg-slate-50/60 dark:bg-slate-900/30 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      {/* First Name */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                          {t("firstName")} <span className="text-secondary">*</span>
                        </label>
                        <div className="relative">
                          <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                          <input type="text" name="firstName" required value={formData.firstName} onChange={handleInputChange} placeholder={isAr ? "محمد" : "First name"} className={inputClass} />
                        </div>
                      </div>

                      {/* Last Name */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                          {t("lastName")} <span className="text-secondary">*</span>
                        </label>
                        <div className="relative">
                          <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                          <input type="text" name="lastName" required value={formData.lastName} onChange={handleInputChange} placeholder={isAr ? "العتيبي" : "Last name"} className={inputClass} />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                          {t("email")} <span className="text-secondary">*</span>
                        </label>
                        <div className="relative">
                          <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                          <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="you@email.com" className={inputClass} />
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                          {t("phone")} <span className="text-secondary">*</span>
                        </label>
                        <div className="relative">
                          <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                          <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="+966 5X XXX XXXX" className={inputClass} />
                        </div>
                      </div>

                      {/* City */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                          {t("city")}
                        </label>
                        <div className="relative">
                          <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                          <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder={isAr ? "الرياض" : "e.g. Riyadh"} className={inputClass} />
                        </div>
                      </div>

                      {/* Nationality */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                          {t("nationality")}
                        </label>
                        <div className="relative">
                          <Globe size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                          <input type="text" name="nationality" value={formData.nationality} onChange={handleInputChange} placeholder={isAr ? "سعودي" : "Nationality"} className={inputClass} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ─ Section 02: Position & Experience ─ */}
                  <div className="rounded-2xl overflow-hidden border border-slate-200/70 dark:border-white/8 shadow-sm">
                    <SectionHeader num="02" title={t("positionExperience")} sub={t("positionExperienceSub")} />

                    <div className="p-5 sm:p-6 bg-slate-50/60 dark:bg-slate-900/30 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      {/* Position – full width */}
                      <div className="sm:col-span-2 space-y-1.5">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                          {t("position")} <span className="text-secondary">*</span>
                        </label>
                        <div className="relative">
                          <Briefcase size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
                          <Chevron />
                          <select
                            name="position"
                            required
                            value={selectedJobId}
                            onChange={(e) => setSelectedJobId(e.target.value)}
                            className={`${selectClass} font-semibold`}
                          >
                            {JOB_POSITIONS.map((pos) => (
                              <option key={pos.id} value={pos.id}>
                                {isAr ? pos.title.ar : pos.title.en} — ({isAr ? pos.department.ar : pos.department.en})
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Experience */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                          {t("experience")} <span className="text-secondary">*</span>
                        </label>
                        <div className="relative">
                          <Briefcase size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
                          <Chevron />
                          <select name="experience" value={formData.experience} onChange={handleInputChange} className={selectClass}>
                            <option value="1-3 years">{isAr ? "١-٣ سنوات" : "1-3 years"}</option>
                            <option value="3-5 years">{isAr ? "٣-٥ سنوات" : "3-5 years"}</option>
                            <option value="5-8 years">{isAr ? "٥-٨ سنوات" : "5-8 years"}</option>
                            <option value="8+ years">{isAr ? "٨+ سنوات" : "8+ years"}</option>
                          </select>
                        </div>
                      </div>

                      {/* Notice Period */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                          {t("noticePeriod")}
                        </label>
                        <div className="relative">
                          <Timer size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
                          <Chevron />
                          <select name="noticePeriod" value={formData.noticePeriod} onChange={handleInputChange} className={selectClass}>
                            <option value="immediate">{isAr ? "فوري" : "Immediate"}</option>
                            <option value="1 month">{isAr ? "شهر واحد" : "1 month"}</option>
                            <option value="2 months">{isAr ? "شهران" : "2 months"}</option>
                            <option value="3 months">{isAr ? "٣ أشهر" : "3 months"}</option>
                          </select>
                        </div>
                      </div>

                      {/* Current Employer – full width */}
                      <div className="sm:col-span-2 space-y-1.5">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                          {t("currentEmployer")}
                        </label>
                        <div className="relative">
                          <Building2 size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                          <input type="text" name="currentEmployer" value={formData.currentEmployer} onChange={handleInputChange} placeholder={isAr ? "اسم جهة العمل الحالية أو السابقة" : "Current company / organization name"} className={inputClass} />
                        </div>
                      </div>

                      {/* LinkedIn – full width */}
                      <div className="sm:col-span-2 space-y-1.5">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                          {t("linkedin")}
                        </label>
                        <div className="relative">
                          <Link2 size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                          <input type="url" name="linkedin" value={formData.linkedin} onChange={handleInputChange} placeholder="https://linkedin.com/in/username" className={inputClass} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ─ Section 03: Documents & Cover Note ─ */}
                  <div className="rounded-2xl overflow-hidden border border-slate-200/70 dark:border-white/8 shadow-sm">
                    <SectionHeader num="03" title={t("documentsTitle")} sub={t("documentsSub")} />

                    <div className="p-5 sm:p-6 bg-slate-50/60 dark:bg-slate-900/30 space-y-5">
                      {/* CV Upload */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                          {isAr ? "السيرة الذاتية (CV)" : "Resume / CV"} <span className="text-secondary">*</span>
                        </label>

                        {uploadedFile ? (
                          <div className="flex items-center justify-between p-4 sm:p-5 rounded-xl bg-white dark:bg-card border-2 border-secondary/40 shadow-sm">
                            <div className="flex items-center gap-3.5">
                              <div className="w-11 h-11 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
                                <FileText size={22} />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-foreground">{uploadedFile.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • {isAr ? "جاهز للإرسال" : "Ready to submit"}
                                </p>
                              </div>
                            </div>
                            <button type="button" onClick={handleRemoveFile} className="p-2 rounded-lg hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 transition-colors cursor-pointer" title="Remove file">
                              <X size={18} />
                            </button>
                          </div>
                        ) : (
                          <label className="relative flex flex-col items-center justify-center p-8 sm:p-10 rounded-xl border-2 border-dashed border-slate-300 dark:border-white/12 hover:border-secondary bg-white dark:bg-card hover:bg-secondary/5 transition-all duration-300 cursor-pointer group shadow-xs">
                            <input type="file" accept=".pdf,.doc,.docx" required onChange={handleFileChange} className="sr-only" />
                            <div className="w-14 h-14 rounded-2xl bg-secondary/10 group-hover:bg-secondary text-secondary group-hover:text-white flex items-center justify-center mb-3 transition-all duration-300 shadow-sm group-hover:scale-105">
                              <UploadCloud size={26} />
                            </div>
                            <span className="text-sm font-bold text-foreground group-hover:text-secondary transition-colors">
                              {t("cvUpload")}
                            </span>
                            <span className="text-xs text-muted-foreground mt-1">{t("cvFormats")}</span>
                          </label>
                        )}
                      </div>

                      {/* Cover Note */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                          {t("coverNote")}
                        </label>
                        <div className="relative">
                          <MessageSquare size={15} className="absolute left-3 top-3.5 text-slate-400 pointer-events-none" />
                          <textarea
                            name="coverNote"
                            rows={4}
                            value={formData.coverNote}
                            onChange={handleInputChange}
                            placeholder={t("coverNotePlaceholder")}
                            className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-white/8 text-foreground text-sm placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 shadow-sm resize-y min-h-[110px]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ─ Consent ─ */}
                  <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-xl bg-secondary/5 dark:bg-secondary/10 border border-secondary/20 dark:border-secondary/25">
                    <input
                      type="checkbox"
                      id="consent-checkbox"
                      name="consent"
                      required
                      checked={formData.consent}
                      onChange={handleInputChange}
                      className="w-4 h-4 mt-0.5 rounded border-slate-300 text-secondary focus:ring-secondary cursor-pointer accent-secondary shrink-0"
                    />
                    <label htmlFor="consent-checkbox" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors leading-relaxed cursor-pointer">
                      {t("consentText")}
                    </label>
                  </div>

                  {/* ─ Submit ─ */}
                  <div className="text-center pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-14 py-4 rounded-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-bold text-base shadow-xl shadow-secondary/25 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          <span>{t("submitting")}</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                          <span>{t("submitBtn")}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </FadeUp>

        {/* ══ Questions Help Card ══ */}
        <FadeUp delay={0.25} y={20}>
          <div className="rounded-2xl p-6 bg-white dark:bg-card border border-gray-200/80 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                <HelpCircle size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">{t("questions")}</h4>
                <p className="text-xs text-muted-foreground">{t("questionsSub")}</p>
              </div>
            </div>
            <a href="mailto:careers@tmyazna.sa" className="text-sm font-bold text-secondary hover:underline">
              careers@tmyazna.sa
            </a>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
