"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useLanguage } from "./LanguageContext";

type NavItem = {
  path: string;
  name: string;
  sectionId: string | null;
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links: NavItem[] = [
    { path: "/", name: t("nav.home"), sectionId: "top" },
    { path: "/about", name: t("nav.about"), sectionId: "about" },
    { path: "/skills", name: t("nav.skills"), sectionId: "skills" },
    { path: "/projects", name: t("nav.projects"), sectionId: "projects" },
    { path: "/contact", name: t("nav.contact"), sectionId: "contact" },
  ];

  const scrollToSection = useCallback((sectionId: string | null) => {
    if (sectionId === "top" || sectionId === null) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document
      .getElementById(sectionId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const linkHref = (item: NavItem) =>
    item.path === "/" ? "/" : `/#${item.sectionId ?? ""}`;

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
      if (pathname !== "/") return;
      e.preventDefault();
      setIsOpen(false);
      scrollToSection(item.sectionId);
    },
    [pathname, scrollToSection]
  );

  const isLinkActive = (item: NavItem) => {
    if (item.path === "/") return pathname === "/";
    return pathname === item.path;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full ${
        scrolled ? "py-2" : "py-4"
      } px-4 sm:px-6 lg:px-8`}
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? "bg-white/90 dark:bg-zinc-950/90 shadow-xl shadow-black/5 border border-gray-200/50 dark:border-white/5"
              : "bg-white/40 dark:bg-zinc-950/30 border border-white/20 dark:border-white/5"
          } backdrop-blur-2xl rounded-2xl`}
        >
          <div className="flex justify-between items-center h-16 px-5 sm:px-7">
            <Link
              href="/"
              scroll={false}
              className="group flex items-center gap-2"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  scrollToSection("top");
                }
              }}
            >
              <div className="w-8 h-8 bg-[#2DD4BF] rounded-lg flex items-center justify-center text-white font-black text-sm shadow-lg shadow-[#2DD4BF]/30 group-hover:rotate-6 transition-transform">
                T
              </div>
              <span className="text-base font-black uppercase tracking-tighter text-gray-900 dark:text-white transition-colors group-hover:text-[#2DD4BF]">
                TRÉSOR ALADE
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {links.map((link) => {
                const isActive = isLinkActive(link);
                return (
                  <Link
                    key={link.path}
                    href={linkHref(link)}
                    scroll={false}
                    className={`relative px-4 py-2 text-sm font-bold uppercase tracking-tight transition-all duration-200 rounded-xl ${
                      isActive
                        ? "text-[#2DD4BF] bg-[#2DD4BF]/5"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5"
                    }`}
                    onClick={(e) => handleNavClick(e, link)}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#2DD4BF] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-gray-600 dark:text-gray-300 hover:text-[#2DD4BF] bg-gray-50 dark:bg-white/5 hover:bg-[#2DD4BF]/5 rounded-full border border-gray-100 dark:border-white/5 hover:border-[#2DD4BF]/30 transition-all"
              >
                <Globe size={13} />
                {language === "fr" ? "EN" : "FR"}
              </button>

              <ThemeToggle />

              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-[#2DD4BF] hover:bg-[#2DD4BF]/5 rounded-xl transition-all"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ${
              isOpen
                ? "max-h-96 border-t border-gray-100 dark:border-white/5"
                : "max-h-0"
            }`}
          >
            <div className="p-5 space-y-2">
              {links.map((link) => {
                const isActive = isLinkActive(link);
                return (
                  <Link
                    key={link.path}
                    href={linkHref(link)}
                    scroll={false}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-tight transition-all ${
                      isActive
                        ? "text-[#2DD4BF] bg-[#2DD4BF]/5"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"
                    }`}
                    onClick={(e) => handleNavClick(e, link)}
                  >
                    {link.name}
                    {isActive && (
                      <span className="w-1.5 h-1.5 bg-[#2DD4BF] rounded-full" />
                    )}
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Langue
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setLanguage(language === "fr" ? "en" : "fr");
                    setIsOpen(false);
                  }}
                  className="px-5 py-2 bg-[#2DD4BF] hover:bg-[#0d9488] text-white rounded-full text-xs font-black uppercase tracking-widest transition-all"
                >
                  {language === "fr" ? "English" : "Français"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
