"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "./LanguageContext";

const ROLES = [
  "Data Scientist",
  "AI Engineer",
  "Backend Architect",
];

export default function Presentation() {
  const { language } = useLanguage();

  // ── Typewriter effect ──
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];

    if (!isDeleting && displayed === current) {
      const t = setTimeout(() => setIsDeleting(true), 2200);
      return () => clearTimeout(t);
    }

    if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
      return;
    }

    const speed = isDeleting ? 45 : 85;
    const t = setTimeout(() => {
      setDisplayed(isDeleting
        ? current.slice(0, displayed.length - 1)
        : current.slice(0, displayed.length + 1)
      );
    }, speed);

    return () => clearTimeout(t);
  }, [displayed, isDeleting, roleIndex]);

  const handlePortfolioClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleHireClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const quoteText =
    language === "fr"
      ? "L'ingénierie backend exceptionnelle de Trésor garantit le succès de nos systèmes. Hautement recommandé."
      : "Trésor's exceptional backend engineering ensures our system's success. Highly Recommended.";

  const expLabelText = language === "fr" ? "Expérience" : "Experience";
  const hireText = language === "fr" ? "Recruter" : "Hire me";

  return (
    <section className="relative bg-white dark:bg-[#0B0D10] overflow-hidden min-h-screen">
      {/* Glow blob */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FD8D49]/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/*
          Single grid — center col holds badge + title + photo in one stack.
          Side cols use pt to align their content at photo shoulder level.
        */}
        <div className="grid lg:grid-cols-12 items-start gap-8 lg:gap-0">

          {/* ── LEFT — quote ── */}
          <div
            data-aos="fade-right"
            data-aos-duration="900"
            className="lg:col-span-3 order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left
                       pt-8 lg:pt-[276px] lg:pr-10"
          >
            <span
              className="font-serif text-zinc-800 dark:text-white select-none leading-none"
              style={{ fontSize: "3rem" }}
            >
              &ldquo;&ldquo;
            </span>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mt-3 max-w-[200px] font-outfit">
              {quoteText}
            </p>
            <div className="mt-4 flex items-center gap-2 justify-center lg:justify-start">
              <div className="w-1 h-4 bg-[#FD8D49] rounded-full" />
              <span className="text-[10px] font-black tracking-widest text-zinc-400 uppercase font-outfit">
                {language === "fr" ? "Avis Collaborateur" : "Partner Review"}
              </span>
            </div>
          </div>

          {/* ── CENTER — badge → title → photo (continuous, no gap) ── */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-center pt-20 lg:pt-24">

            {/* Hello badge */}
            <div
              data-aos="zoom-in"
              data-aos-duration="600"
              className="relative flex items-center justify-center mb-5"
            >
              {/* Two spark strokes top-right */}
              <svg
                className="absolute -top-3 -right-7 w-7 h-7 text-zinc-400 dark:text-zinc-500"
                viewBox="0 0 28 22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="6" y1="16" x2="14" y2="5" />
                <line x1="14" y1="19" x2="22" y2="8" />
              </svg>
              <div className="px-5 py-2 border border-zinc-800 dark:border-white/40 text-zinc-900 dark:text-white text-xs font-bold rounded-full font-outfit tracking-wide bg-white dark:bg-transparent">
                Hello!
              </div>
            </div>

            {/* Title — immediately above the photo, no bottom margin */}
            <div
              data-aos="fade-up"
              data-aos-duration="700"
              className="text-center w-full lg:w-[130%] mb-0"
            >
              <h1 className="font-black font-outfit leading-[1.02] tracking-[-0.02em] text-zinc-950 dark:text-white m-0">
                <span className="block text-[2rem] sm:text-[2.8rem] lg:text-[3.4rem]">
                  I&apos;m <span className="text-[#FD8D49]">Trésor</span>,
                </span>
                <span className="block text-[2.6rem] sm:text-[3.6rem] lg:text-[4.6rem] relative">
                  {/* Orange decorative curves */}
                  <span
                    className="hidden lg:inline-block absolute top-1/2 -translate-y-1/2 -translate-x-full pr-2"
                    aria-hidden
                  >
                    <svg width="34" height="20" viewBox="0 0 34 20" fill="none">
                      <path d="M2 16 Q9 4 20 12" stroke="#FD8D49" strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M7 19 Q16 6 27 14" stroke="#FD8D49" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                  {/* Typewriter text + blinking cursor */}
                  <span className="inline-block min-w-[2ch]">{displayed}</span>
                  <span
                    className="inline-block w-[3px] h-[0.85em] bg-[#FD8D49] ml-1 align-middle rounded-sm"
                    style={{ animation: "cursorBlink 1s step-end infinite" }}
                  />
                </span>
              </h1>
            </div>

            {/* Photo — starts flush right below the title */}
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="800"
              className="relative w-[260px] sm:w-[320px] lg:w-[350px] h-[350px] sm:h-[400px] lg:h-[430px] flex items-end justify-center mt-0 lg:-mt-16"
            >
              {/* Orange semicircle (bottom 73% of container) */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2
                              w-[245px] sm:w-[305px] lg:w-[330px]
                              h-[245px] sm:h-[305px] lg:h-[330px]
                              bg-[#FD8D49] rounded-t-full shadow-xl shadow-[#FD8D49]/20" />

              {/* Profile photo — fills from bottom, face near top of container */}
              <div className="absolute bottom-0 z-10
                              w-[240px] sm:w-[295px] lg:w-[320px]
                              h-[335px] sm:h-[385px] lg:h-[415px]
                              animate-float">
                <Image
                  src="/tresorfolio.png"
                  alt="Trésor ALADE"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* CTA buttons */}
              <div className="absolute bottom-4 z-20 backdrop-blur-xl bg-white/20 dark:bg-black/30 border border-white/30 p-1.5 rounded-full flex gap-1.5 shadow-2xl">
                <button
                  onClick={handlePortfolioClick}
                  className="bg-[#FD8D49] hover:bg-[#E06B29] text-white text-xs font-black uppercase tracking-wider rounded-full px-5 py-2.5 flex items-center gap-1.5 shadow-md shadow-[#FD8D49]/30 transition-all font-outfit"
                >
                  Portfolio <ArrowUpRight size={13} />
                </button>
                <button
                  onClick={handleHireClick}
                  className="bg-zinc-900/85 hover:bg-zinc-900 text-white text-xs font-black uppercase tracking-wider rounded-full px-5 py-2.5 transition-all font-outfit"
                >
                  {hireText}
                </button>
              </div>
            </div>

          </div>

          {/* ── RIGHT — stats ── */}
          <div
            data-aos="fade-left"
            data-aos-duration="900"
            className="lg:col-span-3 order-3 flex flex-col items-center lg:items-start
                       pt-8 lg:pt-[276px] lg:pl-24"
          >
            {/* 5 orange stars */}
            <div className="flex items-center gap-0.5 text-[#FD8D49] mb-2">
              {[...Array(4)].map((_, i) => (
                <span key={i} className="text-2xl leading-none">★</span>
              ))}
            </div>
            <span className="text-[4.5rem] lg:text-[5.5rem] font-black text-zinc-950 dark:text-white leading-none font-outfit">
              2+
            </span>
            <span className="text-xl font-black text-zinc-950 dark:text-white font-outfit leading-none mt-1">
              Years
            </span>
            <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400 mt-2 font-outfit">
              {expLabelText}
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
