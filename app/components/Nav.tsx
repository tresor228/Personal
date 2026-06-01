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
  isExternal?: boolean;
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();

  const cvLink = "https://drive.google.com/file/d/1ckRwZsWM5G-TEKY28aINVZcBreZidPXg/view?usp=sharing";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      
      if (pathname !== "/") return;

      const sections = ["top", "about", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + 180; // offset for nav height

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const links: NavItem[] = [
    { path: "/", name: t("nav.home"), sectionId: "top" },
    { path: "/about", name: t("nav.about"), sectionId: "about" },
    { path: cvLink, name: t("nav.resume"), sectionId: null, isExternal: true },
    { path: "/skills", name: t("nav.skills"), sectionId: "skills" },
    { path: "/projects", name: t("nav.projects"), sectionId: "projects" },
    { path: "/contact", name: t("nav.contact"), sectionId: "contact" },
  ];

  const scrollToSection = useCallback((sectionId: string | null) => {
    if (sectionId === "top" || sectionId === null) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("top");
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  }, []);

  const linkHref = (item: NavItem) => {
    if (item.isExternal) return item.path;
    return item.path === "/" ? "/" : `/#${item.sectionId ?? ""}`;
  };

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
      if (item.isExternal) return; // Let default external navigation happen
      
      if (pathname !== "/") return;
      e.preventDefault();
      setIsOpen(false);
      scrollToSection(item.sectionId);
    },
    [pathname, scrollToSection]
  );

  const isLinkActive = (item: NavItem) => {
    if (item.isExternal) return false;
    if (pathname !== "/") return false;
    return activeSection === item.sectionId;
  };

  const leftLinks = links.slice(0, 3);
  const rightLinks = links.slice(3);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full ${
        scrolled ? "py-3" : "py-5"
      } px-4 sm:px-6 lg:px-8`}
    >
      <div className="max-w-5xl mx-auto">
        <div
          className="transition-all duration-500 bg-[#0B0D10]/95 dark:bg-black/90 shadow-2xl border border-white/10 backdrop-blur-2xl rounded-full px-4 sm:px-6 py-2"
        >
          <div className="flex items-center h-12">
            {/* Left nav links (desktop) */}
            <div className="hidden lg:flex items-center gap-1 flex-1">
              {leftLinks.map((link) => {
                const isActive = isLinkActive(link);
                return (
                  <Link
                    key={link.name}
                    href={linkHref(link)}
                    scroll={false}
                    target={link.isExternal ? "_blank" : undefined}
                    rel={link.isExternal ? "noopener noreferrer" : undefined}
                    className={`relative px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-full font-outfit ${
                      isActive
                        ? "text-white bg-[#FD8D49] shadow-md shadow-[#FD8D49]/30"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                    onClick={(e) => handleNavClick(e, link)}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Center Logo */}
            <Link
              href="/"
              scroll={false}
              className="group flex items-center justify-center mx-auto lg:mx-6"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  scrollToSection("top");
                }
              }}
            >
              <div className="w-9 h-9 bg-[#FD8D49] rounded-full flex items-center justify-center text-white font-black text-xs shadow-md shadow-[#FD8D49]/30 group-hover:scale-110 transition-transform duration-300">
                TA
              </div>
            </Link>

            {/* Right nav links + controls (desktop) */}
            <div className="hidden lg:flex items-center gap-1 flex-1 justify-end">
              {rightLinks.map((link) => {
                const isActive = isLinkActive(link);
                return (
                  <Link
                    key={link.name}
                    href={linkHref(link)}
                    scroll={false}
                    target={link.isExternal ? "_blank" : undefined}
                    rel={link.isExternal ? "noopener noreferrer" : undefined}
                    className={`relative px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-full font-outfit ${
                      isActive
                        ? "text-white bg-[#FD8D49] shadow-md shadow-[#FD8D49]/30"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                    onClick={(e) => handleNavClick(e, link)}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* Language toggle */}
              <button
                type="button"
                onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/5 hover:border-white/10 transition-all font-outfit ml-1"
              >
                <Globe size={11} className="text-zinc-400" />
                {language === "fr" ? "EN" : "FR"}
              </button>

              <div className="bg-white/5 rounded-full p-1 border border-white/5 text-zinc-400 hover:text-white transition-colors">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile controls */}
            <div className="lg:hidden flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
                className="flex items-center gap-1 px-2.5 py-1.5 text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-white bg-white/5 rounded-full border border-white/5 transition-all font-outfit"
              >
                <Globe size={10} />
                {language === "fr" ? "EN" : "FR"}
              </button>
              <div className="bg-white/5 rounded-full p-1 border border-white/5 text-zinc-400 hover:text-white transition-colors">
                <ThemeToggle />
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-full transition-all"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile menu dropdown */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-500 ${
              isOpen
                ? "max-h-[380px] mt-4 border-t border-white/10 pt-4 pb-2"
                : "max-h-0"
            }`}
          >
            <div className="space-y-1 px-2 pb-3">
              {links.map((link) => {
                const isActive = isLinkActive(link);
                return (
                  <Link
                    key={link.name}
                    href={linkHref(link)}
                    scroll={false}
                    target={link.isExternal ? "_blank" : undefined}
                    rel={link.isExternal ? "noopener noreferrer" : undefined}
                    className={`flex items-center px-4 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 font-outfit ${
                      isActive
                        ? "text-white bg-[#FD8D49] shadow-md shadow-[#FD8D49]/30"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                    onClick={(e) => handleNavClick(e, link)}
                  >
                    {link.name}
                  </Link>
                );
              })}

            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
