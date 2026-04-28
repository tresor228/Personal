"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, Award, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

type CertificationItem = {
  id: number;
  name: string;
  image: string;
  description: string;
  link: string;
  training: string;
  year: number;
};

const certifications: CertificationItem[] = [
  {
    id: 1,
    name: "Voyage dans le monde des BDD",
    image: "/certificats/Voyage.jpg",
    description: "Administration de SQL Server, PostgreSQL, Azure SQL, MongoDB et Oracle — une formation holistique sur les SGBD les plus demandés.",
    link: "https://www.udemy.com/certificate/UC-d7d58ee9-6b8b-48d3-a70b-e786310a07f8/",
    training: "Udemy",
    year: 2026,
  },
  {
    id: 2,
    name: "UML Modélisation",
    image: "/certificats/Modelisation database.jpg",
    description: "Conception de modèles UML rigoureux pour la modélisation de systèmes d'information complexes.",
    link: "https://www.linkedin.com/learning/certificates/69f2cb265336c142e1cc3d3a76852472f486890f721145342bcecf79aba72723",
    training: "LinkedIn Learning",
    year: 2026,
  },
  {
    id: 3,
    name: "Oracle Administration",
    image: "/certificats/Administration oracle.jpg",
    description: "Administration de bases de données Oracle : installation, sécurité, backups et optimisation.",
    link: "https://www.linkedin.com/learning/certificates/4421288fa80895c565b15634e2687dbd198e56c2993291e354a0c660a8910c6b",
    training: "LinkedIn Learning",
    year: 2026,
  },
  {
    id: 4,
    name: "Essentiel Golang",
    image: "/certificats/certification_golang.jpeg",
    description: "Fondamentaux du langage Go : concurrence, HTTP, et construction d'APIs performantes.",
    link: "https://www.linkedin.com/learning/certificates/18e63ec4bc7a75219ff3a219b5237277e9c2f66c73cfc5ce38932c3d31e20e84",
    training: "LinkedIn Learning",
    year: 2025,
  },
];

function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
    setIsClosing(false);
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
    document.body.classList.add("modal-open");
  }, []);

  const close = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      document.body.classList.remove("modal-open");
    }, 200);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (isOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  return { isOpen, isClosing, open, close };
}

// ── Dots indicator ──────────────────────────────────────────────────────
function Dots({ count, current, onChange }: { count: number; current: number; onChange: (i: number) => void }) {
  return (
    <div className="flex gap-2 items-center">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={`transition-all duration-300 rounded-full ${
            i === current
              ? "w-5 h-2 bg-[#2DD4BF]"
              : "w-2 h-2 bg-gray-300 dark:bg-white/20 hover:bg-[#2DD4BF]/50"
          }`}
        />
      ))}
    </div>
  );
}

// ── Inline Button (Hero & About) ────────────────────────────────────────
export const InlineCertificationButton = () => {
  const { isOpen, isClosing, open, close } = useModal();
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((p) => (p + 1) % certifications.length);
  const prev = () => setCurrent((p) => (p - 1 + certifications.length) % certifications.length);

  const cert = certifications[current];

  return (
    <>
      <button
        onClick={open}
        className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-900 dark:text-white rounded-full text-sm font-bold transition-all border border-gray-200/60 dark:border-white/8 hover:border-[#2DD4BF]/30"
      >
        <Award size={17} className="text-[#2DD4BF]" />
        Diplômes & Certificats
      </button>

      {isOpen && (
        <div
          className={`fixed inset-0 z-[200] flex items-center justify-center p-4 ${isClosing ? "modal-overlay closing" : "modal-overlay"}`}
          style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(10px)" }}
        >
          <div className="absolute inset-0" onClick={close} />

          {/* Certification Modal — Split Layout */}
          <div className={`relative z-10 w-full max-w-4xl bg-white dark:bg-[#111318] rounded-3xl border border-gray-200/50 dark:border-white/8 shadow-2xl overflow-hidden flex flex-col md:flex-row ${isClosing ? "modal-panel closing" : "modal-panel"}`}
            style={{ maxHeight: "calc(100vh - 48px)" }}
          >
            {/* Left — Image */}
            <div className="relative w-full md:w-[55%] min-h-[260px] md:min-h-[480px] bg-gray-100 dark:bg-zinc-900 overflow-hidden flex-shrink-0">
              <Image
                key={cert.id}
                src={cert.image}
                alt={cert.name}
                fill
                className="object-contain p-2 transition-opacity duration-300"
              />
              {/* Gradient overlay bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
              
              {/* Nav arrows */}
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/15 hover:bg-white/30 text-white rounded-full backdrop-blur-md transition-all hover:scale-110"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/15 hover:bg-white/30 text-white rounded-full backdrop-blur-md transition-all hover:scale-110"
              >
                <ChevronRight size={20} />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <Dots count={certifications.length} current={current} onChange={setCurrent} />
              </div>
            </div>

            {/* Right — Info */}
            <div className="flex flex-col p-8 lg:p-10 gap-6 flex-1 overflow-y-auto">
              
              {/* Close */}
              <div className="flex justify-end">
                <button
                  onClick={close}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-red-500 hover:text-white text-gray-400 transition-all"
                >
                  <X size={17} />
                </button>
              </div>

              {/* Badge */}
              <div className="flex items-center gap-2">
                <Award size={16} className="text-[#2DD4BF]" />
                <span className="text-[10px] font-black text-[#2DD4BF] uppercase tracking-widest">{cert.training}</span>
              </div>

              <div className="space-y-3 flex-1">
                <h3 className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white leading-tight">
                  {cert.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {cert.description}
                </p>
              </div>

              {/* Year tag */}
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#2DD4BF]/10 text-[#2DD4BF] rounded-lg text-[10px] font-black uppercase tracking-widest self-start">
                Année {cert.year}
              </span>

              {/* CTA */}
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-4 bg-[#2DD4BF] hover:bg-[#0d9488] text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:shadow-xl hover:shadow-[#2DD4BF]/20 hover:-translate-y-0.5"
              >
                Vérifier le certificat
                <ExternalLink size={15} />
              </a>

              {/* Counter */}
              <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {current + 1} / {certifications.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ── Floating Button (layout) ────────────────────────────────────────────
export const CertificationButton = () => {
  const { isOpen, isClosing, open, close } = useModal();
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((p) => (p + 1) % certifications.length);
  const prev = () => setCurrent((p) => (p - 1 + certifications.length) % certifications.length);
  const cert = certifications[current];

  return (
    <>
      {/* FAB */}
      <button
        onClick={open}
        className="fixed bottom-8 right-8 z-[60] group flex items-center gap-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 p-2 pr-5 rounded-full shadow-2xl hover:shadow-[#2DD4BF]/20 hover:border-[#2DD4BF]/40 hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <div className="w-11 h-11 bg-[#2DD4BF] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#2DD4BF]/30 group-hover:rotate-12 transition-transform">
          <Award size={21} />
        </div>
        <div className="flex flex-col items-start leading-tight">
          <span className="text-[9px] font-black uppercase tracking-widest text-[#2DD4BF]">Diplômes</span>
          <span className="text-sm font-bold text-gray-900 dark:text-white">Certifications</span>
        </div>
      </button>

      {isOpen && (
        <div
          className={`fixed inset-0 z-[200] flex items-center justify-center p-4 ${isClosing ? "modal-overlay closing" : "modal-overlay"}`}
          style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(10px)" }}
        >
          <div className="absolute inset-0" onClick={close} />

          <div className={`relative z-10 w-full max-w-4xl bg-white dark:bg-[#111318] rounded-3xl border border-gray-200/50 dark:border-white/8 shadow-2xl overflow-hidden flex flex-col md:flex-row ${isClosing ? "modal-panel closing" : "modal-panel"}`}
            style={{ maxHeight: "calc(100vh - 48px)" }}
          >
            {/* Left — Image */}
            <div className="relative w-full md:w-[55%] min-h-[260px] md:min-h-[480px] bg-gray-100 dark:bg-zinc-900 overflow-hidden flex-shrink-0">
              <Image key={cert.id} src={cert.image} alt={cert.name} fill className="object-contain p-2" />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />

              <button onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/15 hover:bg-white/30 text-white rounded-full backdrop-blur-md transition-all hover:scale-110">
                <ChevronLeft size={20} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/15 hover:bg-white/30 text-white rounded-full backdrop-blur-md transition-all hover:scale-110">
                <ChevronRight size={20} />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <Dots count={certifications.length} current={current} onChange={setCurrent} />
              </div>
            </div>

            {/* Right — Info */}
            <div className="flex flex-col p-8 lg:p-10 gap-6 flex-1 overflow-y-auto">
              <div className="flex justify-end">
                <button onClick={close} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-red-500 hover:text-white text-gray-400 transition-all">
                  <X size={17} />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <Award size={16} className="text-[#2DD4BF]" />
                <span className="text-[10px] font-black text-[#2DD4BF] uppercase tracking-widest">{cert.training}</span>
              </div>

              <div className="space-y-3 flex-1">
                <h3 className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white leading-tight">{cert.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{cert.description}</p>
              </div>

              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#2DD4BF]/10 text-[#2DD4BF] rounded-lg text-[10px] font-black uppercase tracking-widest self-start">
                Année {cert.year}
              </span>

              <a href={cert.link} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-4 bg-[#2DD4BF] hover:bg-[#0d9488] text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:shadow-xl hover:shadow-[#2DD4BF]/20 hover:-translate-y-0.5">
                Vérifier le certificat
                <ExternalLink size={15} />
              </a>

              <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {current + 1} / {certifications.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
