"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type CertificationItem = {
  id: number;
  name: string;
  image: string;
  description: string;
  link: string;
  training: string;
  tools: string[];
  year: number;
};

const certifications: CertificationItem[] = [

  {
    id: 1,
    name: "Voyage dans le monde des BDD",
    image: "/certificats/Voyage.jpg",
    description:
      "“Voyage dans le monde des bases de données” est un cours centré sur l’administration de SQL Server, PostgreSQL, Azure SQL, ainsi que l’exploration de MongoDB et Oracle",
    link: "https://www.udemy.com/certificate/UC-d7d58ee9-6b8b-48d3-a70b-e786310a07f8/",
    training: "Udemy",
    tools: ["MySQL", "PostgreSQL", "Azure SQL", "Administration Sql Server | Postgresql", "Mongo DB"],
    year: 2026,
  },
  {
    id: 2,
    name: "Uml modelisation",
    image: "/certificats/Modelisation database.jpg",
    description:
      "Uml modelisation est un cours qui vous apprend à créer des modèles UML.",
    link: "https://www.linkedin.com/learning/certificates/69f2cb265336c142e1cc3d3a76852472f486890f721145342bcecf79aba72723?trk=share_certificate",
    training: "Linkedin Learning",
    tools: ["UML"],
    year: 2026,
  },
  {
    id: 3,
    name: "Oracle Administration",
    image: "/certificats/Administration oracle.jpg",
    description:
      "Oracle Administration est un cours qui vous apprend à administrer les bases de données Oracle.",
    link: "https://www.linkedin.com/learning/certificates/4421288fa80895c565b15634e2687dbd198e56c2993291e354a0c660a8910c6b?trk=share_certificate",
    training: "Linkedin Learning",
    tools: ["Administration Oracle"],
    year: 2026,
  },
  {
    id: 4,
    name: "Modelisation des Base de données",
    image: "/certificats/uml modelisation.jpg",
    description:
      "Modelisation des Base de données est un cours qui vous apprend à créer des modèles de bases de données.",
    link: "https://www.linkedin.com/learning/certificates/103b4440d4afd48f2d8577fa21e053e2ee81cedb9a5278375178ffca3e2ac61f?trk=share_certificate",
    training: "Linkedin Learning",
    tools: ["MCD", "MLD"],
    year: 2026,
  },
  {
    id: 5,
    name: "Prompt Engineering",
    image: "/certificats/prompt.png",
    description:
      "Prompt Engineering est un cours qui vous apprend à créer des prompts pour les IA.",
    link: "https://www.sololearn.com/certificates/CC-QTLJFCV4",
    training: "Sololearn",
    tools: ["Prompt", "IA", "GenAI", "LLM"],
    year: 2026,
  },
  {
    id: 6,
    name: "Vibe Coding",
    image: "/certificats/VibeCoding.jpg",
    description:
      "Vibe Coding est un cours de programmation qui vous apprend à programmer en JavaScript.",
    link: "https://www.sololearn.com/certificates/CC-1DTZ4THF",
    training: "Sololearn",
    tools: ["Cursor", "Lovable", "Bolt", "V0", "Replit", "Claude AI"],
    year: 2026,
  },
  {
    id: 7,
    name: "Essentiel Golang",
    image: "/certificats/certification_golang.jpeg",
    description:
      "Essentiel Golang est un cours qui vous apprend à créer des fondamentaux en Go.",
    link: "https://www.linkedin.com/learning/certificates/18e63ec4bc7a75219ff3a219b5237277e9c2f66c73cfc5ce38932c3d31e20e84",
    training: "Linkedin Learning",
    tools: ["Go"],
    year: 2025,
  }
];

const Certification: React.FC = () => {
  return (
    <div className="pt-20 w-full overflow-hidden">
      <hr className="pt-5 text-zinc-700" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        <h2
          className="text-2xl sm:text-4xl font-bold uppercase"
          data-aos="fade-right"
        >
          Certification
        </h2>
        <p className="dark:text-gray-300 py-2" data-aos="fade-up">
          Voici une sélection de certifications qui illustrent mon engagement
          pour l’apprentissage continu et le développement de compétences.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              className="flex flex-col bg-white dark:bg-gray-900/70 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden"
            >
              <div className="relative w-full h-52 overflow-hidden">
                <Image
                  src={cert.image}
                  alt={cert.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="flex-1 flex flex-col p-5 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {cert.name}
                  </h3>
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200">
                    {cert.year}
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {cert.description}
                </p>

                <div className="mt-2">
                  <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
                    Outils & Technologies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cert.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-1 rounded-full text-xs bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {cert.training}
                  </span>
                  <Link
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2">
                      Voir
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certification;

