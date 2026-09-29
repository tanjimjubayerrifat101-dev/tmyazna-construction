"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronDown, Search, ArrowRight, Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { NAV, type NavItem } from "@/data/navigation";

import Image from "next/image";

import logo from "@/assets/navbar/tmyzna-logo.png";

export default function Navbar() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = locale === "en" ? "ar" : "en";

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<string | null>(
    null,
  );
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Automatically build dynamic searchable items list directly from NAV data
  const allSearchableItems = NAV.flatMap((item) => {
    const list: { label: string; href: string; parent?: string }[] = [];
    const mainLabel = t(`menu.${item.key}`);

    if (item.href) {
      list.push({ label: mainLabel, href: item.href });
    }

    if (item.groups) {
      item.groups.forEach((group) => {
        const groupLabel = t(`groups.${group.groupKey}`);
        group.items.forEach((child) => {
          list.push({
            label: t(`links.${child.key}`),
            href: child.href,
            parent: `${mainLabel} › ${groupLabel}`,
          });
        });
      });
    }

    return list;
  });

  // Filter items matching the query in real-time
  const searchResults = searchQuery.trim()
    ? allSearchableItems.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.trim().toLowerCase()),
      )
    : [];

  // Detect scroll to transition from transparent to solid white
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) {
        setActiveMenu(null);
        setSearchOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Prevent background scroll when tablet/mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Smooth hover handlers with small delay to avoid jitter
  const handleMouseEnter = (key: string, hasSubMenu: boolean) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    if (hasSubMenu) {
      setActiveMenu(key);
    } else {
      setActiveMenu(null);
    }
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  };

  const isActive = (item: NavItem) => {
    const hrefs = item.href
      ? [item.href]
      : item.groups?.flatMap((g) => g.items.map((i) => i.href)) || [];
    return hrefs.some(
      (h) => pathname === h || (h !== "/" && pathname.startsWith(h)),
    );
  };

  return (
    <header
      ref={navRef}
      onMouseLeave={handleMouseLeave}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || activeMenu !== null
          ? "bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.06)] border-b border-gray-100"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container relative flex items-center justify-between h-20">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group text-2xl font-bold tracking-tight transition-transform duration-200 active:scale-95"
        >
          <Image
            src={logo}
            alt="TMYAZNA LOGO"
            className="w-20 lg:w-24 xl:w-28"
          />
        </Link>

        {/* Desktop Navigation Links (Visible on desktop: lg and above) */}
        <nav className="hidden lg:flex items-center h-full">
          {NAV.map((item) => {
            const hasChildren = Boolean(item.groups && item.groups.length > 0);
            const isOpen = activeMenu === item.key;
            const itemActive = isActive(item);
            const menuLabel = t(`menu.${item.key}`);

            return (
              <div
                key={item.key}
                className="relative h-full flex items-center"
                onMouseEnter={() => handleMouseEnter(item.key, hasChildren)}
              >
                {hasChildren ? (
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setActiveMenu(isOpen ? null : item.key)}
                    className="group flex items-center gap-1.5 px-3.5 xl:px-5 h-full text-[15px] font-medium text-gray-800 transition-colors duration-200 cursor-pointer"
                  >
                    {/* Rolling text ticker: original rolls down, duplicate enters from top with dark-blue */}
                    <span className="nav-rolling-text-wrap">
                      <span className="nav-text-item nav-text-primary">
                        {menuLabel}
                      </span>
                      <span className="nav-text-item nav-text-duplicate font-semibold text-primary">
                        {menuLabel}
                      </span>
                    </span>

                    {/* Chevron with light-blue color and rotation */}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ease-out text-secondary ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className="group relative flex items-center px-3.5 xl:px-5 h-full text-[15px] font-medium text-gray-800 transition-colors duration-200"
                  >
                    <span className="nav-rolling-text-wrap">
                      <span
                        className={`nav-text-item nav-text-primary ${itemActive ? "text-primary font-semibold" : ""}`}
                      >
                        {menuLabel}
                      </span>
                      <span className="nav-text-item nav-text-duplicate font-semibold text-primary">
                        {menuLabel}
                      </span>
                    </span>
                  </Link>
                )}

                {/* Dropdown Menu - Clean, Sharp Square Corners, Larger Typography */}
                {hasChildren && isOpen && (
                  <div
                    onMouseEnter={() => handleMouseEnter(item.key, true)}
                    className="absolute inset-s-0 top-full w-80 animate-nav-dropdown origin-top z-50"
                  >
                    <div className="bg-white p-6 shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-gray-100 border-t-2 border-t-primary">
                      {item.groups!.map((group, gIdx) => (
                        <div
                          key={group.groupKey}
                          className={
                            gIdx > 0 ? "mt-5 pt-5 border-t border-gray-100" : ""
                          }
                        >
                          <p className="mb-3 text-[12px] font-bold tracking-widest font-sans uppercase text-secondary">
                            {t(`groups.${group.groupKey}`)}
                          </p>
                          <ul className="space-y-1">
                            {group.items.map(({ key, href, icon: Icon }) => (
                              <li key={key}>
                                <Link
                                  href={href}
                                  onClick={() => setActiveMenu(null)}
                                  className="group/item flex items-center justify-between px-3 py-2.5 text-[15px] text-gray-700 hover:text-primary hover:bg-slate-50 transition-all duration-200"
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="font-medium group-hover/item:translate-x-1 rtl:group-hover/item:-translate-x-1 transition-transform duration-200">
                                      {t(`links.${key}`)}
                                    </span>
                                  </div>
                                  <ArrowRight
                                    size={15}
                                    className="opacity-0 -translate-x-2 rtl:translate-x-2 rtl:rotate-180 group-hover/item:opacity-100 group-hover/item:translate-x-0 rtl:group-hover/item:translate-x-0 text-secondary transition-all duration-200"
                                  />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Section Actions: Search, Language Switch & Mobile/Tablet Menu Button */}
        <div className="flex items-center gap-3 sm:gap-4 xl:gap-6">
          {/* Search Trigger */}
          <div className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label={t("search")}
              className="flex h-10 w-10 items-center cursor-pointer justify-center rounded-none text-gray-700 hover:text-primary transition-colors duration-200"
            >
              <Search size={20} />
            </button>

            {/* Quick search input flyout with automatic live suggestions */}
            {searchOpen && (
              <div
                ref={searchContainerRef}
                className="absolute end-0 top-full mt-2 w-80 sm:w-96 rounded-none bg-white p-3 shadow-2xl border border-gray-100 border-t-2 border-t-primary animate-nav-dropdown z-50"
              >
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2.5 border border-gray-200">
                  <Search size={16} className="text-secondary shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`${t("search")}...`}
                    className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="text-gray-400 hover:text-gray-600 p-0.5"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Suggestions List */}
                <div className="mt-2 max-h-64 overflow-y-auto">
                  {searchQuery.trim() === "" ? (
                    <div className="p-3 text-xs font-sans text-gray-600 text-center">
                      Type to search menu items...
                    </div>
                  ) : searchResults.length > 0 ? (
                    <ul className="divide-y divide-gray-50">
                      {searchResults.map((item, idx) => (
                        <li key={`${item.href}-${idx}`}>
                          <Link
                            href={item.href}
                            onClick={() => {
                              setSearchOpen(false);
                              setSearchQuery("");
                            }}
                            className="group/search flex items-center justify-between px-3 py-2.5 hover:bg-slate-50 transition-colors"
                          >
                            <div className="flex flex-col text-start">
                              <span className="text-sm font-medium text-gray-800 group-hover/search:text-primary transition-colors">
                                {item.label}
                              </span>
                              {item.parent && (
                                <span className="text-[11px] text-gray-400">
                                  {item.parent}
                                </span>
                              )}
                            </div>
                            <ArrowRight
                              size={14}
                              className="text-secondary opacity-0 group-hover/search:opacity-100 -translate-x-1 group-hover/search:translate-x-0 rtl:rotate-180 transition-all"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-4 text-xs text-center text-gray-500">
                      {t("noResults")}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <span className="h-5 w-[1px] bg-gray-200" />

          {/* Language Switcher */}
          <Link
            href={pathname}
            locale={otherLocale}
            className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-secondary px-2 py-1 transition-colors duration-200"
          >
            <span>{t("switch")}</span>
          </Link>

          {/* Tablet / Mobile Menu Toggle Button (shown on tablet & mobile, hidden on lg+) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="group cursor-pointer flex lg:hidden h-10 w-10 items-center justify-center text-gray-800 hover:text-primary transition-all duration-300"
            aria-label="Open menu"
          >
            <Menu
              size={26}
              className="transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-6"
            />
          </button>
        </div>
      </div>

      {/* Premium Tablet & Mobile Drawer with Backdrop & Dedicated Cross (Close) Button */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-visibility duration-300 ${
          mobileMenuOpen
            ? "visible pointer-events-auto"
            : "invisible pointer-events-none"
        }`}
      >
        {/* Backdrop Blur with Smooth Fade */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-out ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Drawer Content - Slides in smoothly from Left (start-0) */}
        <div
          className={`fixed inset-y-0 start-0 w-full sm:w-[420px] max-w-[85vw] bg-white shadow-2xl z-10 flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full rtl:translate-x-full"
          }`}
        >
          <div>
            {/* Header inside drawer */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <Link href="/">
                <Image
                  src={logo}
                  alt="TMYAZNA LOGO"
                  className="w-20 lg:w-24 xl:w-28"
                />
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="group flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                aria-label="Close menu"
              >
                <X
                  size={24}
                  className="transition-transform cursor-pointer duration-200 group-hover:scale-110 group-hover:rotate-90 text-inherit"
                />
              </button>
            </div>

            {/* Navigation Links inside Drawer */}
            <div className="px-6 py-6 space-y-4">
              {NAV.map((item) => {
                const hasChildren = Boolean(
                  item.groups && item.groups.length > 0,
                );
                const isExpanded = mobileExpandedGroup === item.key;

                return (
                  <div key={item.key} className="border-b border-gray-100 pb-3">
                    {hasChildren ? (
                      <div>
                        <button
                          type="button"
                          onClick={() =>
                            setMobileExpandedGroup(isExpanded ? null : item.key)
                          }
                          className="flex w-full items-center justify-between py-2 text-lg font-medium text-gray-800 hover:text-primary transition-colors"
                        >
                          <span>{t(`menu.${item.key}`)}</span>
                          <ChevronDown
                            size={18}
                            className={`text-secondary transition-transform duration-200 ${
                              isExpanded ? "rotate-180 text-primary" : ""
                            }`}
                          />
                        </button>

                        {isExpanded && (
                          <div className="ps-3 pt-3 pb-2 space-y-4 animate-nav-dropdown">
                            {item.groups!.map((group) => (
                              <div key={group.groupKey}>
                                <p className="text-xs font-bold uppercase tracking-wider text-secondary mb-2">
                                  {t(`groups.${group.groupKey}`)}
                                </p>
                                <ul className="space-y-1">
                                  {group.items.map(({ key, href }) => (
                                    <li key={key}>
                                      <Link
                                        key={key}
                                        href={href}
                                        onClick={() => {
                                          setMobileMenuOpen(false);
                                          setMobileExpandedGroup(null);
                                        }}
                                        className="flex items-center justify-between py-2 text-base text-gray-600 hover:text-primary hover:translate-x-1 rtl:hover:-translate-x-1 transition-all"
                                      >
                                        <span>{t(`links.${key}`)}</span>
                                        <ArrowRight
                                          size={14}
                                          className="text-secondary rtl:rotate-180"
                                        />
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href || "#"}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 text-lg font-medium text-gray-800 hover:text-primary transition-colors"
                      >
                        {t(`menu.${item.key}`)}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Footer inside Drawer */}
          {/* <div className="p-6 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
            <span className="text-sm text-gray-500">Language</span>
            <Link
              href={pathname}
              locale={otherLocale}
              onClick={() => setMobileMenuOpen(false)}
              className="font-semibold text-primary hover:text-secondary text-base"
            >
              {t("switch")}
            </Link>
          </div> */}
        </div>
      </div>
    </header>
  );
}
