"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/app/components/LanguageContext";

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
    description: "Administration SQL Server, PostgreSQL, Azure SQL, MongoDB et Oracle — une formation holistique sur les SGBD les plus demandés.",
    link: "https://www.udemy.com/certificate/UC-d7d58ee9-6b8b-48d3-a70b-e786310a07f8/",
    training: "Udemy",
    tools: ["PostgreSQL", "Azure SQL", "SQL Server", "MongoDB"],
    year: 2026,
  },
  {
    id: 2,
    name: "UML Modélisation",
    image: "/certificats/Modelisation database.jpg",
    description: "Conception de modèles UML rigoureusement structurés pour la modélisation de systèmes d'information complexes.",
    link: "https://www.linkedin.com/learning/certificates/69f2cb265336c142e1cc3d3a76852472f486890f721145342bcecf79aba72723",
    training: "LinkedIn Learning",
    tools: ["UML"],
    year: 2026,
  },
  {
    id: 3,
    name: "Oracle Administration",
    image: "/certificats/Administration oracle.jpg",
    description: "Gestion et administration de bases de données Oracle : installations, sécurité, backups et optimisation.",
    link: "https://www.linkedin.com/learning/certificates/4421288fa80895c565b15634e2687dbd198e56c2993291e354a0c660a8910c6b",
    training: "LinkedIn Learning",
    tools: ["Oracle"],
    year: 2026,
  },
  {
    id: 4,
    name: "Modélisation Bases de Données",
    image: "/certificats/uml modelisation.jpg",
    description: "Conception de MCD et MLD (Merise) pour des bases de données robustes, normalisées et évolutives.",
    link: "https://www.linkedin.com/learning/certificates/103b4440d4afd48f2d8577fa21e053e2ee81cedb9a5278375178ffca3e2ac61f",
    training: "LinkedIn Learning",
    tools: ["MCD", "MLD", "Merise"],
    year: 2026,
  },
  {
    id: 5,
    name: "Prompt Engineering",
    image: "/certificats/prompt.png",
    description: "Maîtrise des techniques de prompt pour tirer le meilleur des modèles de langage (LLMs, GenAI).",
    link: "https://www.sololearn.com/certificates/CC-QTLJFCV4",
    training: "Sololearn",
    tools: ["Prompt", "GenAI", "LLM"],
    year: 2026,
  },
  {
    id: 6,
    name: "MLH Hackathon 2026",
    image: "/certificats/MLH Certification.png",
    description: "Participation à un hackathon international avec développement d'un projet innovant à l'aide de l'API Gemini.",
    link: "https://drive.google.com/file/d/1YUuhGAh6h9PB_A-VhDmLOaETQTUh87WZ/view?usp=sharing",
    training: "MLH",
    tools: ["Gemini API"],
    year: 2025,
  },
  {
    id: 7,
    name: "Vibe Coding",
    image: "/certificats/VibeCoding.jpg",
    description: "Maîtrise des outils de développement assistés par IA : Cursor, Lovable, Bolt, V0, Replit, Claude AI.",
    link: "https://www.sololearn.com/certificates/CC-1DTZ4THF",
    training: "Sololearn",
    tools: ["Cursor", "Lovable", "Bolt", "V0"],
    year: 2026,
  },
  {
    id: 8,
    name: "Essentiel Golang",
    image: "/certificats/certification_golang.jpeg",
    description: "Fondamentaux du langage Go : concurrence, gestion des erreurs, HTTP, et construction d'APIs performantes.",
    link: "https://www.linkedin.com/learning/certificates/18e63ec4bc7a75219ff3a219b5237277e9c2f66c73cfc5ce38932c3d31e20e84",
    training: "LinkedIn Learning",
    tools: ["Go"],
    year: 2025,
  },
];

const trainingColors: Record<string, string> = {
  "Udemy": "bg-[#A435F0]/10 text-[#A435F0] border-[#A435F0]/20",
  "LinkedIn Learning": "bg-[#0A66C2]/10 text-[#0A66C2] border-[#0A66C2]/20",
  "MLH": "bg-[#E70048]/10 text-[#E70048] border-[#E70048]/20",
  "Sololearn": "bg-[#23B5E8]/10 text-[#23B5E8] border-[#23B5E8]/20",
};

const Certification: React.FC = () => {
  const { t } = useLanguage();
  const [showAll, setShowAll] = React.useState(false);
  const displayedCertifications = showAll ? certifications : certifications.slice(0, 6);

  return (
    <div className="py-28 overflow-hidden w-full">
      <div className="section-divider mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16 flex flex-col gap-3">
          <span data-aos="fade-right" className="text-[11px] font-black text-[#2DD4BF] uppercase tracking-[0.3em]">
            — Apprentissage Continu
          </span>
          <h2
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-gray-900 dark:text-white"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            {t("cert.title")}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mt-2" data-aos="fade-up" data-aos-delay="150">
            {t("cert.description")}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCertifications.map((cert, index) => (
            <div
              key={cert.id}
              data-aos="fade-up"
              data-aos-delay={index * 80}
              className="group flex flex-col bg-white dark:bg-zinc-900/60 rounded-[2rem] border border-gray-100 dark:border-white/5 overflow-hidden hover:border-[#2DD4BF]/30 hover:shadow-xl hover:shadow-[#2DD4BF]/5 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-zinc-800">
                <Image
                  src={cert.image}
                  alt={cert.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Training badge */}
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border backdrop-blur-md ${trainingColors[cert.training] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                  {cert.training}
                </div>
                {/* Year badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[9px] font-black uppercase bg-zinc-900/70 text-white backdrop-blur-md">
                  {cert.year}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6 gap-4">
                <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                  {cert.name}
                </h3>

                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 flex-1">
                  {cert.description}
                </p>

                {/* Tools */}
                <div className="flex flex-wrap gap-1.5">
                  {cert.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-1 rounded-lg bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 text-[9px] font-black border border-gray-100 dark:border-white/5 uppercase tracking-tighter"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <Link
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto flex items-center justify-center gap-2 py-3 bg-[#2DD4BF]/10 hover:bg-[#2DD4BF] text-[#2DD4BF] hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest border border-[#2DD4BF]/20 hover:border-[#2DD4BF] transition-all duration-300"
                >
                  {t("cert.view")}
                  <ExternalLink size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Show More */}
        {certifications.length > 6 && (
          <div className="flex justify-center mt-14">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-10 py-4 rounded-full border-2 border-[#2DD4BF]/40 text-[#2DD4BF] font-black text-sm uppercase tracking-widest hover:bg-[#2DD4BF] hover:text-white hover:border-[#2DD4BF] transition-all duration-300"
            >
              {showAll ? t("projects.viewLess") : t("projects.viewMore")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Certification;
