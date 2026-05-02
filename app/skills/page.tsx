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
  SiPython,
  SiDjango,
} from "react-icons/si";
import { useLanguage } from "@/app/components/LanguageContext";

const Skills: React.FC = () => {
  const { t } = useLanguage();

  const skillCategories = [
    {
      id: "databases",
      title: "skills.category.databases",
      skills: [
        { id: 1, name: "Oracle", icon: <SiOracle className="text-[#F80000]" /> },
        { id: 2, name: "SQL Server", icon: <FaDatabase className="text-[#CC2927]" /> },
        { id: 3, name: "PostgreSQL", icon: <SiPostgresql className="text-[#336791]" /> },
        { id: 4, name: "SQL", icon: <FaDatabase className="text-sky-500" /> },
        { id: 5, name: "Azure SQL", icon: <FaDatabase className="text-[#0089D6]" /> },
        { id: 6, name: "MySQL", icon: <SiMysql className="text-[#4479A1]" /> },
      ],
    },
    {
      id: "modeling",
      title: "skills.category.modeling",
      skills: [
        { id: 7, name: "UML (MCD, MLD)", icon: <SiUml className="text-purple-500" /> },
        { id: 8, name: "Normalisation", icon: <FaDatabase className="text-indigo-500" /> },
      ],
    },
    {
      id: "tools",
      title: "skills.category.tools",
      skills: [
        { id: 13, name: "Modelio", icon: <SiUml className="text-emerald-500" /> },
        { id: 9, name: "Docker", icon: <SiDocker className="text-[#2496ED]" /> },
        { id: 10, name: "Git", icon: <SiGit className="text-[#F05032]" /> },
        { id: 11, name: "GitHub", icon: <SiGithub className="text-gray-800 dark:text-gray-200" /> },
        { id: 12, name: "GitLab", icon: <SiGitlab className="text-[#FC6D26]" /> },
        { id: 18, name: "Postman", icon: <SiPostman className="text-[#FF6C37]" /> },
      ],
    },
    {
      id: "programming",
      title: "skills.category.programming",
      skills: [
        { id: 14, name: "Golang", icon: <SiGo className="text-[#00ADD8]" /> },
        { id: 20, name: "Python", icon: <SiPython className="text-[#3776AB]" /> },
      ],
    },
    {
      id: "dba",
      title: "skills.category.dba",
      skills: [
        { id: 15, name: "Sauvegarde/Restauration", icon: <LuDatabaseBackup className="text-green-600" /> },
        { id: 16, name: "Optimisation SQL", icon: <FaDatabase className="text-teal-500" /> },
      ],
    },
    {
      id: "web",
      title: "skills.category.web",
      skills: [
        { id: 17, name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
        { id: 21, name: "Django", icon: <SiDjango className="text-[#092E20]" /> },
        { id: 19, name: "Supabase", icon: <SiSupabase className="text-[#3ECF8E]" /> },
      ],
    },
  ];

  return (
    <div className="py-10 overflow-hidden">
      <div className="section-divider mb-5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3">
          <span data-aos="fade-right" className="text-[11px] font-black text-[#2DD4BF] uppercase tracking-[0.3em]">
            — Stack Technique
          </span>
          <h2
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-gray-900 dark:text-white"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            {t("skills.title")}
          </h2>
          <p
            className="text-gray-500 dark:text-gray-400 max-w-xl mt-2"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            {t("skills.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, catIndex) => (
            <div
              key={category.id}
              data-aos="fade-up"
              data-aos-delay={catIndex * 100}
              className="group relative flex flex-col bg-white dark:bg-zinc-900/40 backdrop-blur-xl border border-gray-100 dark:border-white/5 rounded-[2.5rem] p-8 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 overflow-hidden"
            >
              {/* Decorative background element */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-500" />

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                <span className="w-1.5 h-6 bg-[#2DD4BF] rounded-full mr-3" />
                {t(category.title)}
              </h3>

              <div className="flex flex-wrap gap-3 mt-auto">
                {category.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl py-2.5 px-4 hover:border-[#2DD4BF] dark:hover:border-[#2DD4BF]/50 hover:bg-white dark:hover:bg-white/10 transition-all duration-300 group/item cursor-default"
                  >
                    <div className="text-2xl transition-transform duration-300 group-hover/item:scale-110 group-hover/item:rotate-3">
                      {skill.icon}
                    </div>
                    <span className="ml-3 text-sm font-semibold text-gray-600 dark:text-gray-300 group-hover/item:text-[#2DD4BF] dark:group-hover/item:text-[#2DD4BF] transition-colors duration-300">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;