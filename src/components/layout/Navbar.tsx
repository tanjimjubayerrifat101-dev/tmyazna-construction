"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronDown, Search, ArrowRight, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { NAV, type NavItem } from "@/data/navigation";
import gsap from "gsap";
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

  // Desktop dropdown menu refs & animation tracking
  const dropdownRef = useRef<HTMLDivElement>(null);
  const prevActiveMenuRef = useRef<string | null>(null);

  // Mobile drawer refs
  const mobileBackdropRef = useRef<HTMLDivElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);

  // Hamburger lines refs for clean 3-line to X animation
  const burgerTopRef = useRef<HTMLSpanElement>(null);
  const burgerMidRef = useRef<HTMLSpanElement>(null);
  const burgerBotRef = useRef<HTMLSpanElement>(null);

  // Mobile submenu animation ref map
  const mobileSubmenuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Dynamic searchable items
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

  const searchResults = searchQuery.trim()
    ? allSearchableItems.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.trim().toLowerCase()),
      )
    : [];

  // Detect scroll
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
        closeDesktopMenu();
        closeSearch();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeDesktopMenu();
        closeSearch();
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

  // Prevent background scroll when drawer is open
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

  // Smooth Hamburger 3-line <-> X morph via GSAP
  useEffect(() => {
    const top = burgerTopRef.current;
    const mid = burgerMidRef.current;
    const bot = burgerBotRef.current;

    if (!top || !mid || !bot) return;

    if (mobileMenuOpen) {
      gsap.to(top, {
        y: 7,
        rotation: 45,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(mid, {
        opacity: 0,
        scaleX: 0,
        duration: 0.2,
        ease: "power2.out",
      });
      gsap.to(bot, {
        y: -7,
        rotation: -45,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(top, {
        y: 0,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(mid, {
        opacity: 1,
        scaleX: 1,
        duration: 0.25,
        ease: "power2.out",
      });
      gsap.to(bot, {
        y: 0,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [mobileMenuOpen]);

  // Desktop Dropdown Open/Close GSAP Animation
  useEffect(() => {
    const el = dropdownRef.current;
    if (!el) return;

    if (activeMenu) {
      // If coming from another menu, do a quick cross-fade / height morph
      gsap.killTweensOf(el);
      gsap.fromTo(
        el,
        {
          opacity: prevActiveMenuRef.current ? 0.4 : 0,
          y: prevActiveMenuRef.current ? -4 : -10,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        }
      );
    }
    prevActiveMenuRef.current = activeMenu;
  }, [activeMenu]);

  const closeDesktopMenu = () => {
    const el = dropdownRef.current;
    if (el && activeMenu) {
      gsap.to(el, {
        opacity: 0,
        y: -8,
        scale: 0.98,
        duration: 0.22,
        ease: "power2.in",
        onComplete: () => {
          setActiveMenu(null);
          prevActiveMenuRef.current = null;
        },
      });
    } else {
      setActiveMenu(null);
      prevActiveMenuRef.current = null;
    }
  };

  const closeSearch = () => {
    const el = searchContainerRef.current;
    if (el && searchOpen) {
      gsap.to(el, {
        opacity: 0,
        y: -8,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => setSearchOpen(false),
      });
    } else {
      setSearchOpen(false);
    }
  };

  const toggleSearch = () => {
    if (searchOpen) {
      closeSearch();
    } else {
      setSearchOpen(true);
    }
  };

  useEffect(() => {
    if (searchOpen && searchContainerRef.current) {
      gsap.fromTo(
        searchContainerRef.current,
        { opacity: 0, y: -10, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: "power2.out" }
      );
    }
  }, [searchOpen]);

  // Mobile submenu accordion animation with GSAP
  useEffect(() => {
    Object.keys(mobileSubmenuRefs.current).forEach((key) => {
      const subEl = mobileSubmenuRefs.current[key];
      if (!subEl) return;

      if (mobileExpandedGroup === key) {
        gsap.killTweensOf(subEl);
        gsap.fromTo(
          subEl,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" }
        );
      } else if (subEl.style.height && subEl.style.height !== "0px") {
        gsap.to(subEl, {
          height: 0,
          opacity: 0,
          duration: 0.24,
          ease: "power2.in",
          onComplete: () => {
            if (subEl) subEl.style.height = "0px";
          },
        });
      }
    });
  }, [mobileExpandedGroup]);

  // Hover handlers with smooth debounce
  const handleMouseEnter = (key: string, hasSubMenu: boolean) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    if (hasSubMenu) {
      setActiveMenu(key);
    } else {
      closeDesktopMenu();
    }
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      closeDesktopMenu();
    }, 200);
  };

  const isActive = (item: NavItem) => {
    const hrefs = item.href
      ? [item.href]
      : item.groups?.flatMap((g) => g.items.map((i) => i.href)) || [];
    return hrefs.some(
      (h) => pathname === h || (h !== "/" && pathname.startsWith(h)),
    );
  };

  const activeItem = NAV.find((item) => item.key === activeMenu);

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

        {/* Desktop Navigation Links */}
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
                    onClick={() => {
                      if (isOpen) {
                        closeDesktopMenu();
                      } else {
                        setActiveMenu(item.key);
                      }
                    }}
                    className="group flex items-center gap-1.5 px-3.5 xl:px-5 h-full text-[15px] font-medium text-gray-800 transition-colors duration-200 cursor-pointer"
                  >
                    <span className="nav-rolling-text-wrap">
                      <span className="nav-text-item nav-text-primary">
                        {menuLabel}
                      </span>
                      <span className="nav-text-item nav-text-duplicate font-semibold text-primary">
                        {menuLabel}
                      </span>
                    </span>

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
                        className={`nav-text-item nav-text-primary ${
                          itemActive ? "text-primary font-semibold" : ""
                        }`}
                      >
                        {menuLabel}
                      </span>
                      <span className="nav-text-item nav-text-duplicate font-semibold text-primary">
                        {menuLabel}
                      </span>
                    </span>
                  </Link>
                )}

                {/* Dropdown Menu with GSAP Smooth Entrance & Exit */}
                {hasChildren && isOpen && (
                  <div
                    ref={dropdownRef}
                    onMouseEnter={() => handleMouseEnter(item.key, true)}
                    className="absolute inset-s-0 top-full w-80 origin-top z-50 will-change-transform"
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
                            {group.items.map(({ key, href }) => (
                              <li key={key}>
                                <Link
                                  href={href}
                                  onClick={() => closeDesktopMenu()}
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

        {/* Right Section Actions: Search, Language Switch & Animated Hamburger Menu */}
        <div className="flex items-center gap-3 sm:gap-4 xl:gap-6">
          {/* Search Trigger */}
          <div className="relative hidden md:block">
            <button
              type="button"
              onClick={toggleSearch}
              aria-label={t("search")}
              className="flex h-10 w-10 items-center cursor-pointer justify-center rounded-none text-gray-700 hover:text-primary transition-colors duration-200"
            >
              <Search size={20} />
            </button>

            {/* Quick search input flyout with GSAP animation */}
            {searchOpen && (
              <div
                ref={searchContainerRef}
                className="absolute end-0 top-full mt-2 w-80 sm:w-96 rounded-none bg-white p-3 shadow-2xl border border-gray-100 border-t-2 border-t-primary z-50 will-change-transform"
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
                              closeSearch();
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

          {/* Tablet / Mobile Menu Toggle Button: 3 straight lines morphing to X on click with NO unwanted skew/rotate on hover */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative flex lg:hidden h-10 w-10 flex-col items-center justify-center gap-[5px] cursor-pointer p-2 rounded-md hover:bg-black/5 transition-colors duration-200"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <span
              ref={burgerTopRef}
              className="w-6 h-[2px] bg-gray-800 rounded-full origin-center will-change-transform block"
            />
            <span
              ref={burgerMidRef}
              className="w-6 h-[2px] bg-gray-800 rounded-full origin-center will-change-transform block"
            />
            <span
              ref={burgerBotRef}
              className="w-6 h-[2px] bg-gray-800 rounded-full origin-center will-change-transform block"
            />
          </button>
        </div>
      </div>

      {/* Tablet & Mobile Drawer with GSAP-like Smooth Transition */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          mobileMenuOpen
            ? "visible pointer-events-auto"
            : "invisible pointer-events-none"
        }`}
      >
        {/* Backdrop Blur with Smooth Fade */}
        <div
          ref={mobileBackdropRef}
          onClick={() => setMobileMenuOpen(false)}
          className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-out ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Drawer Content */}
        <div
          ref={mobileDrawerRef}
          className={`fixed inset-y-0 start-0 w-full sm:w-[420px] max-w-[85vw] bg-white shadow-2xl z-10 flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full rtl:translate-x-full"
          }`}
        >
          <div>
            {/* Header inside drawer */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <Image
                  src={logo}
                  alt="TMYAZNA LOGO"
                  className="w-20 lg:w-24 xl:w-28"
                />
              </Link>

              {/* Close Button inside drawer */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="group flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 cursor-pointer"
                aria-label="Close menu"
              >
                <X
                  size={24}
                  className="transition-transform duration-200 group-hover:scale-110 text-inherit"
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
                          className="flex w-full items-center justify-between py-2 text-lg font-medium text-gray-800 hover:text-primary transition-colors cursor-pointer"
                        >
                          <span>{t(`menu.${item.key}`)}</span>
                          <ChevronDown
                            size={18}
                            className={`text-secondary transition-transform duration-300 ${
                              isExpanded ? "rotate-180 text-primary" : ""
                            }`}
                          />
                        </button>

                        <div
                          ref={(el) => {
                            mobileSubmenuRefs.current[item.key] = el;
                          }}
                          className="overflow-hidden"
                          style={{
                            height: isExpanded ? "auto" : 0,
                            opacity: isExpanded ? 1 : 0,
                          }}
                        >
                          <div className="ps-3 pt-3 pb-2 space-y-4">
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
                        </div>
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
        </div>
      </div>
    </header>
  );
}
