"use client";

import React from "react";
import { FaHtml5, FaCss3Alt, FaJs, FaGit } from "react-icons/fa";
import {
  SiNextdotjs,
  SiGo,
  SiTailwindcss,
  SiTypescript,
  SiMysql,
  SiReact,
  SiPostgresql,
  SiSupabase,
  SiPostman, // Ajouté ici
} from "react-icons/si";

const Skills: React.FC = () => {
  const skills = [
    { id: 1, name: "HTML", icon: <FaHtml5 className="text-orange-500" /> },
    { id: 2, name: "CSS", icon: <FaCss3Alt className="text-blue-500" /> },
    { id: 3, name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
    { id: 4, name: "Git", icon: <FaGit className="text-red-500" /> },
    { id: 5, name: "PostgreSQL", icon: <SiPostgresql className="text-blue-600" /> },
    { id: 6, name: "Go", icon: <SiGo className="text-cyan-500" /> },
    { id: 7, name: "Postman", icon: <SiPostman className="text-orange-500" /> }, // Correction ici
    { id: 8, name: "Supabase", icon: <SiSupabase className="text-teal-400" /> },
    { id: 9, name: "React", icon: <SiReact className="text-blue-500" /> },
  ];

  return (
    <div className="pt-10">
      <hr className="pt-20 text-zinc-700" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          <h2
            className="text-3xl font-bold uppercase pb-4 text-gray-900 dark:text-white"
            data-aos="fade-right"
          >
            Mes Compétences
          </h2>
          <div className="flex-col space-y-6">
            <div
              className="bg-white dark:bg-gray-800/50 shadow-sm p-6 rounded-xl"
              data-aos="fade-up"
            >
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                J’aime apprendre constamment de nouvelles technologies et améliorer mes compétences. Voici les outils et langages que je maîtrise actuellement :
              </p>
            </div>

            <div
              className="flex flex-wrap gap-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {skills.map((skill, index) => (
                <div
                  key={skill.id}
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}
                  className="flex items-center bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-600 rounded-full py-2 px-4 hover:shadow-md dark:hover:bg-gray-400 transition-all duration-300 hover:scale-105"
                >
                  <div className="p-1.5">{skill.icon}</div>
                  <span className="ml-3 font-medium text-gray-700 dark:text-gray-200">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;