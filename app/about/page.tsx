"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Download, Github, Linkedin } from "lucide-react";
import "aos/dist/aos.css";

const About: React.FC = () => {
  const links = [
    "https://drive.google.com/file/d/1BoqV818iC8aipSHNhvQ6zrGWHzsU1Mv4/view?usp=sharing", // CV
    "https://www.linkedin.com/in/tresor-alade/",
    "https://github.com/tresor228",
  ];

  const elements = [
    { id: 3, label: "Télécharger CV", icon: Download, link: links[0] },
    { id: 2, label: "LinkedIn", icon: Linkedin, link: links[1] },
    { id: 1, label: "Github", icon: Github, link: links[2] },
  ];

  return (
    <div className="pt-10 pb-4">
      <hr className="pt-20 text-zinc-700" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          <h1 className="text-3xl font-bold uppercase pb-4">À Propos de Moi</h1>
          <div className="flex-col space-y-6">
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl"
            >
              <p className="text-xl leading-relaxed">
                Administrateur Base de Données curieux et passionné, j’aime concevoir des sites web modernes, rapides et faciles à utiliser.
                Mon objectif : allier performance, accessibilité et élégance dans chaque projet.
              </p>
            </div>

            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl"
            >
              <p className="leading-relaxed">
                Étudiant en IA & Big Data, je suis attentif aux détails et je m’efforce de toujours fournir un travail de qualité.
              </p>
              <p className="mt-4">
                La résolution de problèmes me passionne, et je suis toujours motivé à apprendre de nouvelles choses.
                En dehors des heures de code, j'aime jouer aux jeux vidéo ou regarder des séries.
              </p>
              <p className="mt-4 text-blue-500 dark:text-blue-400">
                N'hésitez pas à me contacter si vous souhaitez collaborer sur quelque chose d'intéressant !
              </p>
            </div>

            <div
              className="flex flex-wrap gap-4 pt-4 text-white dark:text-gray-100"
              data-aos="fade-left"
              data-aos-delay="100"
            >
              {elements.map((element) => (
                <Link href={element.link} key={element.id} target="_blank">
                  <Button className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200 uppercase rounded-full">
                    {element.label}
                    <element.icon className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
