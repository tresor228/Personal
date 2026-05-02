"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Download, Github, Linkedin } from "lucide-react";
import { useLanguage } from "@/app/components/LanguageContext";
import { ParcoursBoutton } from "@/app/components/ParcoursModal";

const About: React.FC = () => {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const links = [
    "https://drive.google.com/file/d/1ckRwZsWM5G-TEKY28aINVZcBreZidPXg/view?usp=sharing",
    "https://www.linkedin.com/in/tresor-alade/",
    "https://github.com/TresorAlad",
  ];

  const socialLinks = [
    { id: 1, label: "Github", icon: Github, link: links[2] },
    { id: 2, label: "LinkedIn", icon: Linkedin, link: links[1] },
  ];

  const topSkills = [
    { name: "Django / Python", level: 90, color: "#2DD4BF" },
    { name: "PostgreSQL", level: 90, color: "#336791" },
    { name: "SQL Server", level: 85, color: "#CC2927" },
    { name: "MySQL", level: 85, color: "#4479A1" },
    { name: "Azure SQL", level: 80, color: "#0089D6" },
  ];

  return (
    <div className="section-divider-wrapper py-10 overflow-hidden">
      <div className="section-divider mb-5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-6 flex flex-col gap-3">
          <span data-aos="fade-right" className="text-[11px] font-black text-[#2DD4BF] uppercase tracking-[0.3em]">
            — Mon Parcours
          </span>
          <h2
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-gray-900 dark:text-white"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            {t("about.title")}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">

          {/* Left Column: Journey */}
          <div className="space-y-6" data-aos="fade-up">
            <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-xl border border-gray-100 dark:border-white/5 p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-black/5">

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span className="w-1 h-7 bg-[#2DD4BF] rounded-full" />
                {t("about.journey")}
              </h3>

              <div className="space-y-5">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 font-medium">
                  {t("about.description")}
                </p>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed italic border-l-2 border-[#2DD4BF]/30 pl-4">
                  {t("about.education")}
                </p>
                <div className="h-px bg-gradient-to-r from-[#2DD4BF]/30 via-gray-200 dark:via-zinc-800 to-transparent my-6" />
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  {t("about.search")}
                </p>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  {t("about.motivation")}
                </p>
              </div>

              <div className="mt-10 pt-8 border-t border-gray-100 dark:border-zinc-800 flex flex-wrap items-center gap-4">
                <Link href={links[0]} target="_blank">
                  <Button className="bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-full px-6 h-11 text-sm font-bold shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                    {t("about.cv")}
                    <Download className="h-4 w-4" />
                  </Button>
                </Link>

                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <Link href={social.link} key={social.id} target="_blank">
                      <Button variant="outline" size="icon"
                        className="w-11 h-11 rounded-full border-gray-200 dark:border-zinc-700 hover:border-[#2DD4BF] hover:text-[#2DD4BF] dark:hover:text-[#2DD4BF] transition-all">
                        <social.icon className="h-5 w-5" />
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Skills */}
          <div className="space-y-6" data-aos="fade-left">
            <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-xl border border-gray-100 dark:border-white/5 p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-black/5">

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-10 flex items-center gap-3">
                <span className="w-1 h-7 bg-[#2DD4BF] rounded-full" />
                {t("about.skills")}
              </h3>

              <div className="space-y-8">
                {topSkills.map((skill, index) => (
                  <div key={skill.name} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-bold text-gray-800 dark:text-white tracking-tight">
                        {skill.name}
                      </span>
                      <span className="text-sm font-black" style={{ color: skill.color }}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2.5 w-full bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: mounted ? `${skill.level}%` : "0%",
                          backgroundColor: skill.color,
                          transitionDelay: `${index * 120}ms`,
                          boxShadow: `0 0 10px ${skill.color}60`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-gray-100 dark:border-zinc-800">
                <p className="text-xs text-gray-400 dark:text-zinc-500 font-medium italic">
                  * Niveau d&apos;assurance et d&apos;expérience pratique avec chaque technologie.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Parcours */}
        <div className="mt-6 flex flex-col items-center gap-4" data-aos="zoom-in">
          <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Formations & certifications</span>
          <ParcoursBoutton />
        </div>
      </div>
    </div>
  );
};

export default About;
