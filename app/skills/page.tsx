"use client";

import React from "react";
import { FaDatabase } from "react-icons/fa";
import { LuDatabaseBackup } from "react-icons/lu";
import {
  SiGo,
  SiMysql,
  SiOracle,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiGithub,
  SiGitlab,
  SiUml,
  SiPostman,
  SiSupabase,
  SiReact,
} from "react-icons/si";

const Skills: React.FC = () => {
  const skills = [
    // Bases de données
    { id: 1, name: "Oracle", icon: <SiOracle className="text-red-600" /> },
    { id: 2, name: "SQL Server", icon: <FaDatabase className="text-red-500" /> },
    { id: 3, name: "PostgreSQL", icon: <SiPostgresql className="text-blue-600" /> },
    { id: 4, name: "SQL", icon: <FaDatabase className="text-sky-500" /> },
    { id: 5, name: "Azure SQL", icon: <FaDatabase className="text-blue-500" /> },
    { id: 6, name: "MySQL", icon: <SiMysql className="text-blue-600" /> },
    // Modélisation
    { id: 7, name: "UML (MCD, MLD)", icon: <SiUml className="text-purple-500" /> },
    { id: 8, name: "Normalisation", icon: <FaDatabase className="text-indigo-500" /> },
    // Outils & DevOps
    { id: 9, name: "Docker", icon: <SiDocker className="text-blue-400" /> },
    { id: 10, name: "Git", icon: <SiGit className="text-orange-600" /> },
    { id: 11, name: "GitHub", icon: <SiGithub className="text-gray-800 dark:text-gray-200" /> },
    { id: 12, name: "GitLab", icon: <SiGitlab className="text-orange-500" /> },
    { id: 13, name: "Modelio", icon: <SiUml className="text-emerald-500" /> },
    // Programmation
    { id: 14, name: "Golang", icon: <SiGo className="text-cyan-500" /> },
    // DBA
    { id: 15, name: "Sauvegarde/Restauration", icon: <LuDatabaseBackup className="text-green-600" /> },
    { id: 16, name: "Optimisation SQL", icon: <FaDatabase className="text-teal-500" /> },
    // Web (existants)
    { id: 17, name: "React", icon: <SiReact className="text-blue-500" /> },
    { id: 18, name: "Postman", icon: <SiPostman className="text-orange-500" /> },
    { id: 19, name: "Supabase", icon: <SiSupabase className="text-teal-400" /> },
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