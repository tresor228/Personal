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
    name: "MLH Hackaton 2026",
    image: "/certificats/MLH Certification.png",
    description:
      "MLH Hackaton 2026 est un hackathon qui permet de développer des applications en utilisant l'API de Gemini.",
    link: "https://drive.google.com/file/d/1YUuhGAh6h9PB_A-VhDmLOaETQTUh87WZ/view?usp=sharing",
    training: "MLH",
    tools: ["Gemini API"],
    year: 2025,
  },
  {
    id: 7,
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
    id: 8,
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
  const [showAll, setShowAll] = React.useState(false);
  const displayedCertifications = showAll ? certifications : certifications.slice(0, 6);

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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {displayedCertifications.map((cert, index) => (
            <div
              key={cert.id}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              className="flex flex-col bg-white dark:bg-gray-900/70 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden h-full p-4"
            >
              <div className="relative w-full h-40 overflow-hidden rounded-xl flex-shrink-0">
                <Image
                  src={cert.image}
                  alt={cert.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="flex-1 flex flex-col pt-4 space-y-3">
                <div className="flex items-start justify-between gap-3 h-14">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
                    {cert.name}
                  </h3>
                  <span className="flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200">
                    {cert.year}
                  </span>
                </div>

                <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 h-8">
                  {cert.description}
                </p>

                <div className="mt-2">
                  <p className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 mb-1.5">
                    Outils & Technologies
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-1 rounded bg-gray-50 dark:bg-zinc-800/50 text-gray-600 dark:text-gray-400 text-[9px] font-bold border border-gray-200/50 dark:border-zinc-700/50 uppercase tracking-tighter"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-4 flex items-center justify-between gap-3">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                    {cert.training}
                  </span>
                  <Link
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="rounded-full bg-blue-500 hover:bg-blue-600 text-white text-[10px] uppercase font-bold px-5 h-8">
                      Voir
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {certifications.length > 6 && (
          <div className="flex justify-center pt-10">
            <Button
              onClick={() => setShowAll(!showAll)}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-10 uppercase font-bold text-sm h-11"
            >
              {showAll ? "Voir Moins" : "Voir Plus"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Certification;

