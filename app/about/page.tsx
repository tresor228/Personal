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
    { name: "Django / Python", level: 90, color: "#FD8D49" },
    { name: "PostgreSQL", level: 90, color: "#336791" },
    { name: "SQL Server", level: 85, color: "#CC2927" },
    { name: "MySQL", level: 85, color: "#4479A1" },
    { name: "Azure SQL", level: 80, color: "#0089D6" },
  ];

  return (
    <div className="section-divider-wrapper py-24 overflow-hidden bg-white dark:bg-[#0B0D10]/15">
      <div className="section-divider mb-12" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-12 flex flex-col gap-3">
          <span data-aos="fade-right" className="text-[10px] font-black text-[#FD8D49] uppercase tracking-[0.35em] font-outfit">
            — Mon Parcours
          </span>
          <h2
            className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-zinc-950 dark:text-white font-outfit"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            {t("about.title")}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left Column: Journey */}
          <div className="space-y-6" data-aos="fade-up">
            <div className="bg-zinc-50 dark:bg-white/5 backdrop-blur-xl border border-zinc-100 dark:border-white/5 p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-black/[0.01]">

              <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-8 flex items-center gap-3 font-outfit">
                <span className="w-1.5 h-6 bg-[#FD8D49] rounded-full" />
                {t("about.journey")}
              </h3>

              <div className="space-y-5">
                <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 font-medium font-outfit">
                  {t("about.description")}
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed italic border-l-2 border-[#FD8D49]/30 pl-4 font-outfit text-sm">
                  {t("about.education")}
                </p>
                <div className="h-px bg-gradient-to-r from-[#FD8D49]/30 via-zinc-200 dark:via-zinc-800 to-transparent my-6" />
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-outfit text-sm">
                  {t("about.search")}
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-outfit text-sm">
                  {t("about.motivation")}
                </p>
              </div>

              <div className="mt-10 pt-8 border-t border-zinc-200/60 dark:border-zinc-850 flex flex-wrap items-center gap-4">
                <Link href={links[0]} target="_blank">
                  <Button className="bg-[#FD8D49] hover:bg-[#E06B29] text-white rounded-full px-6 h-11 text-xs font-black uppercase tracking-wider shadow-lg shadow-[#FD8D49]/10 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 font-outfit">
                    {t("about.cv")}
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                </Link>

                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <Link href={social.link} key={social.id} target="_blank">
                      <Button variant="outline" size="icon"
                        className="w-11 h-11 rounded-full border-zinc-250 dark:border-zinc-750 hover:border-[#FD8D49] hover:text-[#FD8D49] dark:hover:text-[#FD8D49] transition-all bg-white dark:bg-zinc-900 shadow-sm text-zinc-500">
                        <social.icon className="h-4.5 w-4.5" />
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Skills */}
          <div className="space-y-6" data-aos="fade-left">
            <div className="bg-zinc-50 dark:bg-white/5 backdrop-blur-xl border border-zinc-100 dark:border-white/5 p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-black/[0.01]">

              <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-10 flex items-center gap-3 font-outfit">
                <span className="w-1.5 h-6 bg-[#FD8D49] rounded-full" />
                {t("about.skills")}
              </h3>

              <div className="space-y-7">
                {topSkills.map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-zinc-800 dark:text-white tracking-wide font-outfit">
                        {skill.name}
                      </span>
                      <span className="text-xs font-black font-outfit" style={{ color: skill.color }}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-zinc-200/60 dark:bg-zinc-800 rounded-full overflow-hidden">
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

              <div className="mt-10 pt-8 border-t border-zinc-200/60 dark:border-zinc-800">
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider font-outfit">
                  * Niveau d&apos;assurance et d&apos;expérience pratique avec chaque technologie.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Parcours */}
        <div className="mt-16 flex flex-col items-center gap-4" data-aos="zoom-in">
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-black font-outfit">Formations & certifications</span>
          <ParcoursBoutton />
        </div>
      </div>
    </div>
  );
};

export default About;
