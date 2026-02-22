"use client";

import React from "react";
import Image from "next/image";
import { Database, Layers } from "lucide-react";

const Projects: React.FC = () => {
  const diagrams = [
    {
      id: 1,
      name: "Diagramme UML – Gestion Aéroport & Vols",
      image: "/projects/sortie_page-0001.jpg",
      description:
        "Modélisation complète d'un système de gestion aéroportuaire avec diagramme de classes UML. Conception des entités (Aéroport, Vol, Vol Réel, Calendrier, Siège, Passager, Fidélité) avec leurs attributs, relations et cardinalités. Projet réalisé en respectant les principes MCD/MLD et la normalisation pour une traduction optimale en schéma relationnel.",
      tools: "UML, MCD, MLD, Modelio",
      year: "2025",
      entities: ["Aéroport", "Vol", "Vol Réel", "Calendrier", "Siège", "Passager", "Fidélité"],
    },
  ];

  return (
    <div className="pt-20 w-full overflow-hidden">
      <hr className="pt-5 text-zinc-700" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        <h2 className="text-2xl sm:text-4xl font-bold uppercase" data-aos="fade-right">
          Projets de Modélisation (DBA)
        </h2>
        <p className="dark:text-gray-300 py-2" data-aos="fade-up">
          Diagrammes de conception de bases de données réalisés dans le cadre de mes études et projets en administration de bases de données.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {diagrams.map((project, index) => (
          <div
            key={project.id}
            data-aos="fade-up"
            data-aos-delay={index * 200}
            className="items-center grid grid-cols-1 md:grid-cols-2 gap-6 py-16"
          >
            <div className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="p-4 border-b border-gray-200 dark:border-gray-600 flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Schéma de conception
                </span>
              </div>
              <div className="relative overflow-hidden rounded-b-xl p-4 bg-gray-50 dark:bg-gray-900/50">
                <Image
                  src={project.image}
                  alt={project.name}
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] rounded-lg"
                  priority
                  quality={95}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Layers className="h-6 w-6 text-blue-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{project.name}</h2>
              </div>

              <div className="bg-white dark:bg-gray-800/50 shadow-sm p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{project.description}</p>
              </div>

              <div className="bg-white dark:bg-gray-800/50 shadow-sm p-6 rounded-xl space-y-4 border border-gray-200 dark:border-gray-600">
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-300 flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-500" />
                  Détails du modèle
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 dark:text-gray-300">Année</p>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">{project.year}</p>
                </div>
                <hr className="border-gray-200 dark:border-gray-700" />
                <div className="flex justify-between items-start gap-4">
                  <p className="text-gray-600 dark:text-gray-300">Outils</p>
                  <p className="text-gray-800 dark:text-gray-200 font-medium text-right">{project.tools}</p>
                </div>
                <hr className="border-gray-200 dark:border-gray-700" />
                <div>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">Entités modélisées</p>
                  <div className="flex flex-wrap gap-2">
                    {project.entities.map((entity, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
                      >
                        {entity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
