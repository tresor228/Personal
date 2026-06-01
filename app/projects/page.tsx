"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Database, Layers, Github, Globe, Search, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLanguage } from "@/app/components/LanguageContext";

type ProjectCategory = "all" | "dba" | "web";

interface BaseProject {
  id: number;
  name: string;
  image: string;
  description: string;
  category: "dba" | "web";
}

interface DBAProject extends BaseProject {
  category: "dba";
  tools: string;
  year: string;
  entities: string[];
}

interface WebProject extends BaseProject {
  category: "web";
  stack: string[];
  year: string;
  githubUrl?: string;
  demoUrl?: string;
}

type Project = DBAProject | WebProject;

const Projects: React.FC = () => {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState<ProjectCategory>("all");
  const [showAll, setShowAll] = useState(false);

  const projects: Project[] = [
    {
      id: 1,
      name: "Gestion Aéroport & Vols",
      image: "/projects/sortie_page-0001.jpg",
      category: "dba",
      description:
        "Modélisation complète d'un système de gestion aéroportuaire avec diagramme de classes UML. Conception des entités (Aéroport, Vol, Vol Réel, Calendrier, Siège, Passager, Fidélité) avec leurs attributs, relations et cardinalités. Projet réalisé en respectant les principes MCD/MLD et la normalisation.",
      tools: "UML, MCD, MLD, Modelio",
      year: "2026",
      entities: ["Aéroport", "Vol", "Vol Réel", "Calendrier", "Siège", "Passager", "Fidélité"],
    },
    {
      id: 2,
      name: "Pitch AI",
      image: "/projects/pitch-i.png",
      category: "web",
      description:
        "Pitch AI est une plateforme qui analyse vos projet et vous donne les problèmes, solutions , Business Model , Canal de diffusion",
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
      description:
        "Meteo est une application qui permet de visualiser les données météorologiques en temps réel.",
      stack: ["Golang", "HTML", "CSS", "JavaScript"],
      year: "2025",
      githubUrl: "https://github.com/TresorAlad/Meteo-Go-js.git",
      demoUrl: "https://meteodev.onrender.com/",
    },
    {
      id: 4,
      name: "Gestion Video Club (Desktop App)",
      image: "/projects/clubvideo.png",
      category: "web",
      description:
        "Application de gestion de location de cassettes vidéo avec interface JavaFX et base de données SQLite. Gestion des membres, stocks et retours.",
      stack: ["Java", "JavaFX", "SQLite", "Maven"],
      year: "2026",
      githubUrl: "https://github.com/TresorAlad/Club-Video.git",
    },
    {
      id: 5,
      name: "Gestion de Salle Universitaire (Desktop App)",
      image: "/projects/salle.png",
      category: "web",
      description:
        "Gestion de salle Universitaire est une application Desktop qui permet de gérer les salles universitaires et les réservations.",
      stack: ["Java", "JavaFX", "SQLite", "Maven"],
      year: "2026",
      githubUrl: "https://github.com/TresorAlad/SystemeGestion.git",
    },
  ];

  const filteredProjects = projects.filter(
    (p) => filter === "all" || p.category === filter
  );

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  // Fallbacks for missing translations
  const labelAll = language === "fr" ? "Tous" : "All";
  const labelWeb = language === "fr" ? "Web" : "Web";
  const labelDba = language === "fr" ? "DBA / Modélisation" : "DBA / Modeling";

  return (
    <div className="py-24 w-full overflow-hidden bg-white dark:bg-[#0B0D10]/15">
      <div className="section-divider mb-12" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Section Header */}
          <div className="mb-6 flex flex-col gap-3">
            <span data-aos="fade-right" className="text-[10px] font-black text-[#FD8D49] uppercase tracking-[0.35em] font-outfit">
              — {t("projects.subtitle")}
            </span>
            <h2
              className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-zinc-950 dark:text-white font-outfit"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              {t("projects.title")}
            </h2>
            <p
              className="text-zinc-500 dark:text-zinc-400 max-w-xl mt-2 font-outfit text-sm"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              {t("projects.description")}
            </p>
          </div>

          {/* Filters */}
          <div
            className="flex flex-wrap gap-3 pb-8 border-b border-zinc-100 dark:border-white/5 font-outfit"
            data-aos="fade-left"
          >
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => { setFilter("all"); setShowAll(false); }}
              className={`rounded-full uppercase text-[10px] font-black tracking-widest h-10 px-6 transition-all ${
                filter === "all"
                  ? "bg-[#FD8D49] hover:bg-[#E06B29] text-white shadow-lg shadow-[#FD8D49]/20"
                  : "border-[#FD8D49]/30 text-[#FD8D49] hover:bg-[#FD8D49]/5"
              }`}
            >
              {labelAll}
            </Button>
            <Button
              variant={filter === "web" ? "default" : "outline"}
              onClick={() => { setFilter("web"); setShowAll(false); }}
              className={`rounded-full uppercase text-[10px] font-black tracking-widest h-10 px-6 transition-all ${
                filter === "web"
                  ? "bg-[#FD8D49] hover:bg-[#E06B29] text-white shadow-lg shadow-[#FD8D49]/20"
                  : "border-[#FD8D49]/30 text-[#FD8D49] hover:bg-[#FD8D49]/5"
              }`}
            >
              {labelWeb}
            </Button>
            <Button
              variant={filter === "dba" ? "default" : "outline"}
              onClick={() => { setFilter("dba"); setShowAll(false); }}
              className={`rounded-full uppercase text-[10px] font-black tracking-widest h-10 px-6 transition-all ${
                filter === "dba"
                  ? "bg-[#FD8D49] hover:bg-[#E06B29] text-white shadow-lg shadow-[#FD8D49]/20"
                  : "border-[#FD8D49]/30 text-[#FD8D49] hover:bg-[#FD8D49]/5"
              }`}
            >
              {labelDba}
            </Button>
          </div>

          {/* Project List - Grid 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-outfit">
            {displayedProjects.map((project, index) => (
              <div
                key={project.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-zinc-50 dark:bg-white/5 p-5 rounded-[2.5rem] border border-zinc-100 dark:border-white/5 hover:border-[#FD8D49]/40 transition-all duration-550 shadow-xl shadow-black/[0.01] flex flex-col h-full group"
              >
                {/* Image Container */}
                <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-zinc-200 dark:bg-zinc-800 mb-5 flex-shrink-0">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 text-white">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg ${
                      project.category === 'web'
                        ? 'bg-zinc-900 text-white'
                        : 'bg-[#FD8D49] text-white'
                    }`}>
                      {project.category === 'web' ? 'Web' : 'DBA'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow space-y-3.5">
                  <div className="flex items-center gap-2.5">
                    {project.category === 'web' 
                      ? <Layout className="h-5 w-5 text-[#FD8D49]" /> 
                      : <Database className="h-5 w-5 text-[#FD8D49]" />
                    }
                    <h3 className="text-base font-bold text-zinc-950 dark:text-white line-clamp-1">
                      {project.name}
                    </h3>
                  </div>

                  <p className="text-zinc-550 dark:text-zinc-350 text-xs leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  <div className="mt-auto pt-4">
                    {project.category === "web" ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-1.5">
                          <p className="text-[9px] text-zinc-400 uppercase font-black tracking-widest">Stack</p>
                          <span className="px-2 py-0.5 bg-[#FD8D49]/10 text-[#FD8D49] text-[9px] font-bold rounded border border-[#FD8D49]/20 font-outfit">
                            {project.year}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {project.stack.map((tech) => (
                            <span
                              key={tech}
                              className="inline-flex items-center px-2 py-1 rounded-lg bg-zinc-200/40 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 text-[9px] font-bold border border-zinc-200/20 dark:border-white/5 uppercase tracking-tight"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {project.demoUrl && (
                            <Link href={project.demoUrl} target="_blank" className="flex-1">
                              <Button className="w-full bg-[#FD8D49] hover:bg-[#E06B29] text-white rounded-xl px-4 text-[9px] font-black uppercase tracking-widest h-11 transition-all shadow-md shadow-[#FD8D49]/10">
                                Demo
                                <Globe className="h-3.5 w-3.5 ml-1.5" />
                              </Button>
                            </Link>
                          )}
                          {project.githubUrl && (
                            <Link href={project.githubUrl} target="_blank" className="flex-1">
                              <Button variant="outline" className="w-full border-zinc-250 dark:border-zinc-750 text-zinc-500 hover:border-[#FD8D49] hover:text-[#FD8D49] dark:hover:text-[#FD8D49] transition-all bg-white dark:bg-zinc-900 rounded-xl px-4 text-[9px] font-black uppercase tracking-widest h-11">
                                GitHub
                                <Github className="h-3.5 w-3.5 ml-1.5" />
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-2 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-150 dark:border-zinc-800">
                            <p className="text-[9px] text-zinc-400 uppercase font-black tracking-widest mb-0.5">Année</p>
                            <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{project.year}</p>
                          </div>
                          <div className="p-2 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-150 dark:border-zinc-800">
                            <p className="text-[9px] text-zinc-400 uppercase font-black tracking-widest mb-0.5">Outils</p>
                            <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate">{project.tools}</p>
                          </div>
                        </div>

                        <div className="pt-2">
                          <div className="flex flex-wrap gap-1.5">
                            {project.entities.slice(0, 4).map((entity) => (
                              <span
                                key={entity}
                                className="px-2 py-0.5 bg-[#FD8D49]/10 text-[#FD8D49] text-[9px] font-bold rounded border border-[#FD8D49]/20 uppercase tracking-tight"
                              >
                                {entity}
                              </span>
                            ))}
                          </div>
                        </div>

                        <Button className="w-full bg-[#FD8D49] hover:bg-[#E06B29] text-white rounded-xl text-[9px] font-black uppercase tracking-widest h-11 mt-2 shadow-lg shadow-[#FD8D49]/10">
                          <Layers className="h-3.5 w-3.5 mr-1.5" />
                          Modélisation
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length > 6 && (
            <div className="flex justify-center pt-8">
              <Button
                onClick={() => setShowAll(!showAll)}
                className="bg-[#FD8D49] hover:bg-[#E06B29] text-white rounded-full px-12 py-6 uppercase font-black tracking-widest text-xs shadow-xl shadow-[#FD8D49]/20 transition-all hover:scale-105 active:scale-95 font-outfit"
              >
                {showAll ? t("projects.viewLess") : t("projects.viewMore")}
              </Button>
            </div>
          )}

          {filteredProjects.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center opacity-50 font-outfit">
              <Search className="h-12 w-12 text-zinc-400 mb-4" />
              <h3 className="text-lg font-bold text-zinc-800 dark:text-white">Aucun projet</h3>
              <p className="text-xs text-zinc-500">Essayez une autre catégorie.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;