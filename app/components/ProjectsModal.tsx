"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, Layout, Github, Globe, Database, ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Project = {
  id: number;
  name: string;
  image: string;
  category: "dba" | "web";
  description: string;
  stack?: string[];
  tools?: string;
  year: string;
  githubUrl?: string;
  demoUrl?: string;
  entities?: string[];
};

const projects: Project[] = [
  {
    id: 1,
    name: "Gestion Aéroport & Vols",
    image: "/projects/sortie_page-0001.jpg",
    category: "dba",
    description: "Modélisation complète d'un système de gestion aéroportuaire avec diagramme de classes UML. Conception des entités (Aéroport, Vol, Vol Réel, Calendrier, Siège, Passager, Fidélité).",
    tools: "UML, MCD, MLD, Modelio",
    year: "2026",
    entities: ["Aéroport", "Vol", "Vol Réel", "Passager"],
  },
  {
    id: 2,
    name: "Pitch AI",
    image: "/projects/pitch-i.png",
    category: "web",
    description: "Plateforme d'analyse de projets par IA : problèmes, solutions, Business Model et Canaux de diffusion.",
    stack: ["Golang", "HTML", "CSS", "JavaScript"],
    year: "2025",
    githubUrl: "https://github.com/TresorAlad/Pitch-IA.git",
    demoUrl: "https://app-pitch.onrender.com",
  },
  {
    id: 3,
    name: "Meteo",
    image: "/projects/meteo.png",
    category: "web",
    description: "Application de visualisation de données météorologiques mondiales en temps réel.",
    stack: ["Golang", "HTML", "CSS", "JavaScript"],
    year: "2025",
    githubUrl: "https://github.com/TresorAlad/Meteo-Go-js.git",
    demoUrl: "https://meteodev.onrender.com/",
  },
  {
    id: 4,
    name: "Gestion Video Club",
    image: "/projects/clubvideo.png",
    category: "web",
    description: "Logiciel de gestion de location et stocks pour vidéo clubs (JavaFX/SQLite).",
    stack: ["Java", "JavaFX", "SQLite"],
    year: "2026",
    githubUrl: "https://github.com/TresorAlad/Club-Video.git",
  },
  {
    id: 5,
    name: "Gestion Universitaire",
    image: "/projects/salle.png",
    category: "web",
    description: "Système de gestion des salles et réservations universitaires (Java/Maven).",
    stack: ["Java", "JavaFX", "SQLite"],
    year: "2026",
    githubUrl: "https://github.com/TresorAlad/SystemeGestion.git",
  },
];

function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
    setIsClosing(false);
    // Measure scrollbar then lock
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

export const ProjectsModalButton = () => {
  const { isOpen, isClosing, open, close } = useModal();
  const [selected, setSelected] = useState<Project | null>(null);

  // Show project detail or back to grid
  const selectProject = (p: Project) => setSelected(p);
  const backToGrid = () => setSelected(null);

  const handleOpen = () => {
    setSelected(null);
    open();
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={handleOpen}
        className="group relative flex items-center gap-2 px-7 py-3 border-2 border-[#2DD4BF]/40 hover:border-[#2DD4BF] text-[#2DD4BF] rounded-full text-sm font-black uppercase tracking-[0.15em] transition-all duration-300 hover:bg-[#2DD4BF]/5 active:scale-95"
      >
        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <Layout size={20} />
        Voir mes projets
      </button>

      {/* Modal Portal */}
      {isOpen && (
        <div
          className={`fixed inset-0 z-[200] flex flex-col ${isClosing ? "modal-overlay closing" : "modal-overlay"}`}
          style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)" }}
        >
          {/* Click outside to close */}
          <div className="absolute inset-0" onClick={close} />

          {/* Panel */}
          <div
            className={`relative m-auto w-[96vw] max-w-7xl h-[92vh] bg-white dark:bg-[#111318] rounded-3xl border border-gray-200/50 dark:border-white/8 shadow-2xl flex flex-col overflow-hidden ${isClosing ? "modal-panel closing" : "modal-panel"}`}
          >
            {/* ── Header ── */}
            <div className="flex-shrink-0 flex items-center justify-between px-8 py-5 border-b border-gray-100 dark:border-white/5">
              {selected ? (
                <button onClick={backToGrid}
                  className="flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <ArrowLeft size={18} />
                  Retour aux projets
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#2DD4BF]/15 rounded-xl flex items-center justify-center">
                    <Layout size={20} className="text-[#2DD4BF]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">Mes Réalisations</h2>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{projects.length} projets</p>
                  </div>
                </div>
              )}
              <button
                onClick={close}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-red-500 hover:text-white text-gray-500 dark:text-gray-400 transition-all duration-200"
                aria-label="Fermer"
              >
                <X size={18} />
              </button>
            </div>

            {/* ── Body ── */}
            <div className="flex-1 overflow-y-auto">
              {selected ? (
                /* ── Project Detail View ── */
                <div className="h-full flex flex-col lg:flex-row">
                  
                  {/* Image Side */}
                  <div className="relative w-full lg:w-3/5 min-h-[280px] bg-gray-50 dark:bg-zinc-900 overflow-hidden">
                    <Image src={selected.image} alt={selected.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Category pill */}
                    <div className={`absolute top-6 left-6 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white ${selected.category === 'web' ? 'bg-blue-500' : 'bg-[#2DD4BF]'}`}>
                      {selected.category === 'web' ? '⟡ Web App' : '⟡ Data Engineering'}
                    </div>
                  </div>

                  {/* Info Side */}
                  <div className="w-full lg:w-2/5 p-8 lg:p-10 flex flex-col gap-6 overflow-y-auto">
                    <div>
                      <p className="text-[10px] font-black text-[#2DD4BF] uppercase tracking-widest mb-2">{selected.year}</p>
                      <h3 className="text-3xl font-black text-gray-900 dark:text-white leading-tight">{selected.name}</h3>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{selected.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {(selected.stack || selected.entities || []).map((tag) => (
                        <span key={tag} className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-white/5 text-xs font-bold text-gray-500 dark:text-gray-400 border border-gray-200/50 dark:border-white/5 uppercase">{tag}</span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="mt-auto flex flex-col gap-3">
                      {selected.demoUrl && (
                        <Link href={selected.demoUrl} target="_blank" className="flex items-center justify-center gap-2 py-3.5 bg-[#2DD4BF] hover:bg-[#0d9488] text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:shadow-lg hover:shadow-[#2DD4BF]/25">
                          Voir le Demo
                          <ArrowUpRight size={16} />
                        </Link>
                      )}
                      {selected.githubUrl && (
                        <Link href={selected.githubUrl} target="_blank" className="flex items-center justify-center gap-2 py-3.5 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:opacity-90">
                          <Github size={16} />
                          Code Source
                        </Link>
                      )}
                      {!selected.demoUrl && !selected.githubUrl && (
                        <div className="py-3.5 text-center text-xs font-bold text-gray-400 bg-gray-50 dark:bg-white/5 rounded-2xl">Usage interne — liens non disponibles</div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* ── Projects Grid ── */
                <div className="p-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {projects.map((project, i) => (
                    <button
                      key={project.id}
                      onClick={() => selectProject(project)}
                      className="group text-left bg-gray-50 dark:bg-white/3 hover:bg-white dark:hover:bg-white/6 border border-gray-200/60 dark:border-white/6 hover:border-[#2DD4BF]/40 dark:hover:border-[#2DD4BF]/30 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#2DD4BF]/8 flex flex-col"
                      style={{ animationDelay: `${i * 40}ms` }}
                    >
                      {/* Image */}
                      <div className="relative h-44 overflow-hidden bg-gray-200 dark:bg-zinc-800">
                        <Image
                          src={project.image}
                          alt={project.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        {/* Hover CTA */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <span className="px-4 py-2 bg-white/90 dark:bg-zinc-900/90 text-gray-900 dark:text-white text-xs font-black uppercase tracking-widest rounded-full backdrop-blur-sm flex items-center gap-1.5">
                            Voir détails
                            <ArrowUpRight size={12} />
                          </span>
                        </div>

                        {/* Category Badge */}
                        <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider text-white ${project.category === 'web' ? 'bg-blue-500/90' : 'bg-[#2DD4BF]/90'} backdrop-blur-sm`}>
                          {project.category === 'web' ? 'Web' : 'DBA'}
                        </div>
                        
                        {/* Year Badge */}
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[9px] font-black bg-black/60 text-white backdrop-blur-sm">
                          {project.year}
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-5 space-y-3 flex-1 flex flex-col">
                        <h3 className="font-bold text-gray-900 dark:text-white text-base leading-snug group-hover:text-[#2DD4BF] transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 flex-1">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {(project.stack || project.entities || []).slice(0, 3).map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/5 text-[9px] font-bold text-gray-400 uppercase border border-gray-200/40 dark:border-white/5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
