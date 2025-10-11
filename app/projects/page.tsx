"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, ArrowUpRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Projects: React.FC = () => {
  const projects = [
    {
      id: 1,
      name: "GitInsight",
      image: "/projects/GitInsight.png",
      description:
        "GitInsight est un outil CLI qui vous aide à visualiser et analyser vos dépôts Git.",
      link: "https://github.com/tresor228/GitInsight.git",
      github: "https://github.com/tresor228/GitInsight.git",
      tools: "Golang ",
      year: "2025",
    },
    {
      id: 2,
      name: "Suivi de Dépense",
      image: "/projects/depense.jpeg",
      description:
        "Suivi de Dépense est un outil web dédié à la gestion de vos finances. Il vous permet de suivre vos revenus et vos dépenses facilement, et d’avoir une vue claire sur vos flux financiers.",
      link: "https://bytedepense.netlify.app/",
      github: "https://github.com/tresor228/mini-depense-web.git",
      tools: "Golang, JavaScript, HTML & CSS",
      year: "2025",
    },
    {
      id: 3,
      name: "Pitch IA",
      image: "/projects/pich.png",
      description:
        "PICTCH IA est une plateforme qui utilise l’intelligence artificielle pour identifier et prédire la cible d’un projet",
      link: "https://app-pitch.onrender.com",
      github: "https://github.com/tresor228/Pitch-IA.git",
      tools: "Golang, HTML & CSS",
      year: "2025",
    },
    {
      id: 4,
      name: "Micro-Cours",
      image: "/projects/micro.png",
      description:
        "Micro-Cours est une plateforme d'apprentissage en ligne qui propose des cours sur divers sujets.",
      link: "https://micro-cour.vercel.app/",
      github: "https://github.com/tresor228/micro-learn.git",
      tools: "FIREBASE, JavaScript, HTML & CSS",
      year: "2025",
    },
  ];

  return (
    <div className="pt-20 w-full overflow-hidden">
      <hr className="pt-5 text-zinc-700" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        <h2 className="text-2xl sm:text-4xl font-bold uppercase" data-aos="fade-right">
          Mes Projets
        </h2>
        <p className="dark:text-gray-300 py-2" data-aos="fade-up">
          Voici une sélection de projets qui démontrent ma passion pour le développement full-stack.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {projects.map((project, index) => (
          <div
            key={project.id}
            data-aos="fade-up"
            data-aos-delay={index * 200}
            className="items-center grid grid-cols-1 md:grid-cols-2 gap-6 py-16"
          >
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 p-2 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={project.image}
                  alt={project.name}
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  priority
                  quality={95}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{project.name}</h2>

              <div className="bg-white dark:bg-gray-800/50 shadow-sm p-6 rounded-xl">
                <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
              </div>

              <div className="bg-white dark:bg-gray-800/50 shadow-sm p-6 rounded-xl space-y-4">
                <p className="text-xl font-semibold text-gray-900 dark:text-gray-300">Informations du projet</p>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 dark:text-gray-300">Année</p>
                  <p className="text-gray-800 dark:text-gray-200">{project.year}</p>
                </div>
                <hr className="border-gray-200 dark:border-gray-700" />
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 dark:text-gray-300">Outils</p>
                  <p className="text-gray-800 dark:text-gray-200">{project.tools}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4 text-white dark:text-gray-100">
                <Link href={project.github} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200 rounded-full">
                    Voir sur Github
                    <Github className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href={project.link} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200 rounded-full">
                    Démo en Direct
                    <ArrowUpRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
