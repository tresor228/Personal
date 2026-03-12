"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Database, Layers, Github, Globe, Search, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  const [filter, setFilter] = useState<ProjectCategory>("all");
  const [showAll, setShowAll] = useState(false);

  const projects: Project[] = [
    // ... (projects data remains same)
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

  return (
    <div className="pt-10 pb-12 w-full overflow-hidden">
      <hr className="pt-20 text-zinc-700" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Section Title & Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <h2
                className="text-3xl font-bold uppercase text-gray-900 dark:text-white"
                data-aos="fade-right"
              >
                Mes Projets
              </h2>
              <p
                className="text-gray-600 dark:text-gray-400 max-w-2xl"
                data-aos="fade-right"
                data-aos-delay="100"
              >
                Découvrez mes réalisations en développement web et conception de bases de données (DBA).
                Chaque projet reflète mon engagement envers la qualité et la performance.
              </p>
            </div>

            {/* Filters */}
            <div
              className="flex flex-wrap gap-2"
              data-aos="fade-left"
            >
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => { setFilter("all"); setShowAll(false); }}
                className={`rounded-full uppercase text-xs font-bold transition-all ${filter === "all" ? "bg-blue-500 hover:bg-blue-600" : "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                  }`}
              >
                Tous
              </Button>
              <Button
                variant={filter === "web" ? "default" : "outline"}
                onClick={() => { setFilter("web"); setShowAll(false); }}
                className={`rounded-full uppercase text-xs font-bold transition-all ${filter === "web" ? "bg-blue-500 hover:bg-blue-600" : "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                  }`}
              >
                Web
              </Button>
              <Button
                variant={filter === "dba" ? "default" : "outline"}
                onClick={() => { setFilter("dba"); setShowAll(false); }}
                className={`rounded-full uppercase text-xs font-bold transition-all ${filter === "dba" ? "bg-blue-500 hover:bg-blue-600" : "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                  }`}
              >
                DBA / Modélisation
              </Button>
            </div>
          </div>

          {/* Project List - Grid 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedProjects.map((project, index) => (
              <div
                key={project.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-transparent hover:border-blue-500/30 transition-all duration-300 shadow-sm flex flex-col h-full"
              >
                {/* Image Container */}
                <div className="relative h-44 w-full overflow-hidden rounded-xl bg-gray-200 dark:bg-zinc-800 mb-4 flex-shrink-0">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 text-white">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg ${project.category === 'web'
                      ? 'bg-blue-500'
                      : 'bg-emerald-500'
                      }`}>
                      {project.category === 'web' ? 'Web' : 'DBA'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow space-y-3">
                  <div className="flex items-center gap-2">
                    {project.category === 'web' ? <Layout className="h-5 w-5 text-blue-500" /> : <Database className="h-5 w-5 text-emerald-500" />}
                    <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-1">
                      {project.name}
                    </h3>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-[11px] leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  <div className="mt-auto pt-4">
                    {project.category === "web" ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Stack</p>
                          <span className="px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[9px] font-bold rounded border border-blue-100 dark:border-blue-900/30">
                            {project.year}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {project.stack.map((tech) => (
                            <span
                              key={tech}
                              className="inline-flex items-center px-2 py-1 rounded bg-blue-50/30 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold border border-blue-100/20 dark:border-blue-800/30 uppercase tracking-tighter"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {project.demoUrl && (
                            <Link href={project.demoUrl} target="_blank" className="flex-1">
                              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 text-[10px] uppercase font-bold h-9">
                                Demo
                                <Globe className="h-3 w-3 ml-1.5" />
                              </Button>
                            </Link>
                          )}
                          {project.githubUrl && (
                            <Link href={project.githubUrl} target="_blank" className="flex-1">
                              <Button variant="outline" className="w-full border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors rounded-full px-4 text-[10px] uppercase font-bold h-9">
                                GitHub
                                <Github className="h-3 w-3 ml-1.5" />
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2 font-poppins">
                          <div className="p-2 bg-white/50 dark:bg-zinc-900/30 rounded-xl border border-gray-100 dark:border-zinc-800">
                            <p className="text-[9px] text-gray-500 uppercase font-bold mb-0.5">Année</p>
                            <p className="text-xs font-bold text-gray-900 dark:text-gray-100">{project.year}</p>
                          </div>
                          <div className="p-2 bg-white/50 dark:bg-zinc-900/30 rounded-xl border border-gray-100 dark:border-zinc-800">
                            <p className="text-[9px] text-gray-500 uppercase font-bold mb-0.5">Outils</p>
                            <p className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate">{project.tools}</p>
                          </div>
                        </div>

                        <div className="pt-2">
                          <div className="flex flex-wrap gap-1.5">
                            {project.entities.slice(0, 4).map((entity) => (
                              <span
                                key={entity}
                                className="px-2 py-1 bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-bold rounded border border-emerald-100/30 dark:border-emerald-800/20 uppercase tracking-tighter"
                              >
                                {entity}
                              </span>
                            ))}
                          </div>
                        </div>

                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] uppercase font-bold h-10 mt-2">
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
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-10 uppercase font-bold text-sm"
              >
                {showAll ? "Voir Moins" : "Voir Plus"}
              </Button>
            </div>
          )}

          {filteredProjects.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
              <Search className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Aucun projet</h3>
              <p className="text-sm dark:text-gray-400">Essayez une autre catégorie.</p>
            </div>
          )}
        </div>
      </div>
    </div >
  );
};

export default Projects;


