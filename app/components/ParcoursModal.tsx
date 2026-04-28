"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, GraduationCap, Award, ExternalLink, Calendar, CheckCircle, Clock } from "lucide-react";

// ── Data ─────────────────────────────────────────────────────────────────

type Education = {
  id: number;
  degree: string;
  school: string;
  period: string;
  status: "ongoing" | "completed";
};

type Certification = {
  id: number;
  name: string;
  training: string;
  link: string;
  year: number;
  tools: string[];
};

const educations: Education[] = [
  {
    id: 1,
    degree: "Licence Pro — IA & BIG DATA",
    school: "ESGIS TOGO",
    period: "2024 — 2027",
    status: "ongoing",
  },
  {
    id: 2,
    degree: "Baccalauréat Scientifique (Série D)",
    school: "LYVO I TOGO",
    period: "Obtenu en 2024",
    status: "completed",
  },
];

const certifications: Certification[] = [
  {
    id: 1,
    name: "Voyage dans le monde des BDD",
    training: "Udemy",
    link: "https://www.udemy.com/certificate/UC-d7d58ee9-6b8b-48d3-a70b-e786310a07f8/",
    year: 2026,
    tools: ["PostgreSQL", "SQL Server", "Azure SQL", "MongoDB"],
  },
  {
    id: 2,
    name: "UML Modélisation",
    training: "LinkedIn Learning",
    link: "https://www.linkedin.com/learning/certificates/69f2cb265336c142e1cc3d3a76852472f486890f721145342bcecf79aba72723",
    year: 2026,
    tools: ["UML"],
  },
  {
    id: 3,
    name: "Oracle Administration",
    training: "LinkedIn Learning",
    link: "https://www.linkedin.com/learning/certificates/4421288fa80895c565b15634e2687dbd198e56c2993291e354a0c660a8910c6b",
    year: 2026,
    tools: ["Oracle"],
  },
  {
    id: 4,
    name: "Modélisation des Bases de Données",
    training: "LinkedIn Learning",
    link: "https://www.linkedin.com/learning/certificates/103b4440d4afd48f2d8577fa21e053e2ee81cedb9a5278375178ffca3e2ac61f",
    year: 2026,
    tools: ["MCD", "MLD", "Merise"],
  },
  {
    id: 5,
    name: "Prompt Engineering",
    training: "Sololearn",
    link: "https://www.sololearn.com/certificates/CC-QTLJFCV4",
    year: 2026,
    tools: ["GenAI", "LLM"],
  },
  {
    id: 6,
    name: "MLH Hackathon 2026",
    training: "MLH",
    link: "https://drive.google.com/file/d/1YUuhGAh6h9PB_A-VhDmLOaETQTUh87WZ/view?usp=sharing",
    year: 2025,
    tools: ["Gemini API"],
  },
  {
    id: 7,
    name: "Vibe Coding",
    training: "Sololearn",
    link: "https://www.sololearn.com/certificates/CC-1DTZ4THF",
    year: 2026,
    tools: ["Cursor", "Lovable", "V0"],
  },
  {
    id: 8,
    name: "Essentiel Golang",
    training: "LinkedIn Learning",
    link: "https://www.linkedin.com/learning/certificates/18e63ec4bc7a75219ff3a219b5237277e9c2f66c73cfc5ce38932c3d31e20e84",
    year: 2025,
    tools: ["Go"],
  },
];

const trainingColor: Record<string, string> = {
  "Udemy": "text-[#A435F0]",
  "LinkedIn Learning": "text-[#0A66C2]",
  "MLH": "text-[#E70048]",
  "Sololearn": "text-[#23B5E8]",
};

// ── Hook ─────────────────────────────────────────────────────────────────

function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
    setIsClosing(false);
    const sw = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty("--scrollbar-width", `${sw}px`);
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
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return { isOpen, isClosing, open, close };
}

// ── Component ─────────────────────────────────────────────────────────────

export const ParcoursBoutton = () => {
  const { isOpen, isClosing, open, close } = useModal();
  const [tab, setTab] = useState<"education" | "certifications">("education");

  return (
    <>
      {/* Trigger */}
      <button
        onClick={open}
        className="group relative flex items-center gap-3 px-10 py-4 bg-[#2DD4BF] hover:bg-[#0d9488] text-white rounded-full text-sm font-black uppercase tracking-[0.18em] transition-all duration-300 shadow-xl shadow-[#2DD4BF]/25 hover:shadow-[#2DD4BF]/40 hover:-translate-y-1 active:scale-95 overflow-hidden"
      >
        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <GraduationCap size={20} />
        Voir mon parcours
      </button>

      {/* Modal */}
      {isOpen && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            backgroundColor: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            animation: isClosing ? "overlayHide 0.2s ease forwards" : "overlayShow 0.25s ease forwards"
          }}
        >
          {/* Backdrop click */}
          <div className="absolute inset-0" onClick={close} />

          {/* Panel */}
          <div
            className="relative z-10 w-[90vw] max-w-lg bg-[#0d0f14] rounded-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden mx-4"
            style={{
              maxHeight: "min(calc(100vh - 48px), 680px)",
              animation: isClosing
                ? "slideDownModal 0.2s cubic-bezier(0.4,0,0.2,1) forwards"
                : "slideUpModal 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards"
            }}
          >
            {/* ── Header ── */}
            <div className="px-7 pt-7 pb-5">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white">Parcours éducatif</h2>
                  <p className="text-sm text-gray-400 mt-1">Formations & certifications</p>
                </div>
                <button
                  onClick={close}
                  className="w-9 h-9 flex items-center justify-center bg-white/5 hover:bg-red-500/80 text-gray-400 hover:text-white rounded-xl transition-all flex-shrink-0 ml-4"
                >
                  <X size={17} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 mt-6 border-b border-white/10">
                <button
                  onClick={() => setTab("education")}
                  className={`flex items-center gap-2 px-4 pb-3 text-sm font-bold transition-all border-b-2 -mb-px ${tab === "education"
                    ? "border-[#2DD4BF] text-[#2DD4BF]"
                    : "border-transparent text-gray-500 hover:text-gray-300"
                    }`}
                >
                  <GraduationCap size={15} />
                  Éducation
                </button>
                <button
                  onClick={() => setTab("certifications")}
                  className={`flex items-center gap-2 px-4 pb-3 text-sm font-bold transition-all border-b-2 -mb-px ${tab === "certifications"
                    ? "border-[#2DD4BF] text-[#2DD4BF]"
                    : "border-transparent text-gray-500 hover:text-gray-300"
                    }`}
                >
                  <Award size={15} />
                  Certifications
                </button>
              </div>
            </div>

            {/* ── Content ── */}
            <div className="overflow-y-auto px-7 pb-7 flex-1">

              {/* Education Tab */}
              {tab === "education" && (
                <div className="space-y-3 pt-2">
                  {educations.map((edu) => (
                    <div
                      key={edu.id}
                      className="flex items-start gap-4 p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#2DD4BF]/40 rounded-2xl transition-all group"
                    >
                      {/* Dot */}
                      <div className={`mt-0.5 w-3 h-3 rounded-full flex-shrink-0 ring-4 ${edu.status === "ongoing" ? "bg-[#2DD4BF] ring-[#2DD4BF]/20" : "bg-gray-500 ring-gray-500/20"}`} />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <GraduationCap size={14} className="text-[#2DD4BF] flex-shrink-0" />
                              <h3 className="font-bold text-white text-sm leading-snug">{edu.degree}</h3>
                            </div>
                            <p className="text-[#2DD4BF] text-xs font-bold ml-5">{edu.school}</p>
                          </div>
                          {edu.status === "ongoing" && (
                            <span className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1 bg-[#2DD4BF]/15 text-[#2DD4BF] rounded-full text-[9px] font-black uppercase tracking-widest">
                              <Clock size={9} />
                              En cours
                            </span>
                          )}
                          {edu.status === "completed" && (
                            <span className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1 bg-gray-500/15 text-gray-400 rounded-full text-[9px] font-black uppercase tracking-widest">
                              <CheckCircle size={9} />
                              Obtenu
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 mt-2 ml-5">
                          <Calendar size={11} className="text-gray-500" />
                          <span className="text-xs text-gray-500">{edu.period}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Certifications Tab */}
              {tab === "certifications" && (
                <div className="space-y-2 pt-2">
                  {certifications.map((cert) => (
                    <a
                      key={cert.id}
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#2DD4BF]/40 rounded-2xl transition-all group"
                    >
                      {/* Icon */}
                      <div className="w-9 h-9 bg-[#2DD4BF]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#2DD4BF]/20 transition-colors">
                        <Award size={17} className="text-[#2DD4BF]" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-bold text-white text-sm leading-snug truncate group-hover:text-[#2DD4BF] transition-colors">{cert.name}</p>
                          <span className="text-[10px] text-gray-500 font-bold whitespace-nowrap">{cert.year}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 mb-2">
                          <span className={`text-[10px] font-black uppercase tracking-wider ${trainingColor[cert.training] || "text-gray-400"}`}>
                            {cert.training}
                          </span>
                        </div>
                        
                        <p className="text-[11px] text-gray-400 leading-relaxed mb-3 line-clamp-2">
                          {/* We'll use a generic description if not provided, but it's in the certifications page array */}
                          {cert.name.includes("BDD") ? "Administration multi-SGBD (PostgreSQL, Azure SQL, MongoDB, Oracle)." : 
                           cert.name.includes("UML") ? "Conception de modèles UML rigoureux pour systèmes complexes." :
                           cert.name.includes("Oracle") ? "Gestion, sécurité et optimisation de bases Oracle." :
                           cert.name.includes("Prompt") ? "Maîtrise du Prompt Engineering pour LLMs & GenAI." :
                           cert.name.includes("Hackathon") ? "Développement IA innovant avec Google Gemini API." :
                           cert.name.includes("Vibe") ? "Développement accéléré par IA (Cursor, Lovable, V0)." :
                           cert.name.includes("Golang") ? "Construction d'APIs performantes et concurrentes en Go." : "Certification d'expertise technique validée."}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mt-auto">
                          {cert.tools.map((t) => (
                            <span key={t} className="px-2 py-0.5 bg-white/5 text-gray-500 text-[9px] font-bold rounded uppercase tracking-tight border border-white/5">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-gray-400 group-hover:bg-[#2DD4BF] group-hover:text-white transition-all transform group-hover:translate-x-1">
                        <ExternalLink size={14} />
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      , document.body)}
    </>
  );
};
