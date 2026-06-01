"use client";

import React, { useRef, useState } from "react";
import { ArrowUpRight, BrainCircuit, Server, DatabaseZap, Workflow, ChevronLeft, ChevronRight } from "lucide-react";
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
  SiTensorflow,
  SiPytorch,
  SiJupyter,
  SiScikitlearn,
  SiNumpy,
  SiPandas,
  SiFastapi,
  SiN8N,
} from "react-icons/si";
import { useLanguage } from "@/app/components/LanguageContext";

export default function Skills() {
  const { language, t } = useLanguage();
  const [activeCard, setActiveCard] = useState(0);

  const mainServices = [
    {
      id: 0,
      title: language === "fr" ? "Data Science" : "Data Science",
      subtitle: "Python · Pandas · Jupyter",
      desc:
        language === "fr"
          ? "Analyse exploratoire, nettoyage de données massives, visualisation et extraction d'insights actionnables pour piloter vos décisions métiers."
          : "Exploratory data analysis, large-scale data wrangling, visualization and extraction of actionable insights to drive business decisions.",
      icon: <DatabaseZap className="text-[#FD8D49] h-6 w-6" />,
      visual: (
        <div className="w-full h-full bg-[#161B22] rounded-xl p-3.5 border border-white/5 flex flex-col justify-between shadow-inner select-none font-mono">
          <div className="text-[8px] text-zinc-500 font-bold uppercase tracking-wider pb-1.5 border-b border-white/10">
            data_analysis.ipynb
          </div>
          <div className="flex-1 flex flex-col justify-center gap-2 py-2">
            {/* mini bar chart */}
            {[
              { label: "Revenue", val: 85, color: "#FD8D49" },
              { label: "Churn", val: 42, color: "#60a5fa" },
              { label: "LTV", val: 68, color: "#a78bfa" },
              { label: "CAC", val: 31, color: "#34d399" },
            ].map((row) => (
              <div key={row.label} className="flex items-center gap-2">
                <span className="text-[7px] text-zinc-500 w-10 text-right shrink-0">{row.label}</span>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${row.val}%`, background: row.color, opacity: 0.85 }}
                  />
                </div>
                <span className="text-[7px] w-6 shrink-0" style={{ color: row.color }}>{row.val}%</span>
              </div>
            ))}
          </div>
          <div className="bg-white/5 px-2 py-1 rounded text-zinc-400 text-[8px] flex items-center justify-between">
            <span>Dataset: 1.2M rows</span>
            <span className="text-[#FD8D49]">▲ +12.4%</span>
          </div>
        </div>
      ),
    },
    {
      id: 1,
      title: language === "fr" ? "Ingénierie IA / ML" : "AI / ML Engineering",
      subtitle: "TensorFlow · PyTorch · Scikit-learn",
      desc:
        language === "fr"
          ? "Conception, entraînement et déploiement de modèles de machine learning et de deep learning adaptés aux besoins métiers réels."
          : "Design, training and deployment of machine learning and deep learning models tailored to real business needs.",
      icon: <BrainCircuit className="text-[#FD8D49] h-6 w-6" />,
      visual: (
        <div className="w-full h-full bg-[#161B22] rounded-xl p-3.5 border border-white/5 flex flex-col justify-between shadow-inner select-none">
          <div className="text-[8px] text-zinc-500 font-bold uppercase tracking-wider pb-1.5 border-b border-white/10 font-mono">
            Model Training
          </div>
          <div className="flex-1 flex items-center justify-center py-2">
            {/* neural network layers */}
            <div className="flex items-center gap-3">
              {[
                { nodes: 3, label: "Input" },
                { nodes: 4, label: "Hidden" },
                { nodes: 4, label: "Hidden" },
                { nodes: 2, label: "Output" },
              ].map((layer, li) => (
                <React.Fragment key={li}>
                  <div className="flex flex-col items-center gap-1.5">
                    {Array.from({ length: layer.nodes }).map((_, ni) => (
                      <div
                        key={ni}
                        className="w-3 h-3 rounded-full border"
                        style={{
                          borderColor: li === 0 ? "#60a5fa" : li === 3 ? "#FD8D49" : "#a78bfa",
                          background:
                            li === 0
                              ? "rgba(96,165,250,0.15)"
                              : li === 3
                              ? "rgba(253,141,73,0.2)"
                              : "rgba(167,139,250,0.1)",
                        }}
                      />
                    ))}
                    <span className="text-[6px] text-zinc-600 uppercase tracking-wide">{layer.label}</span>
                  </div>
                  {li < 3 && <div className="w-4 h-px bg-white/10 shrink-0" />}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="bg-[#FD8D49]/10 px-2 py-1 rounded text-[7px] text-[#FD8D49] font-bold font-mono flex justify-between">
            <span>Accuracy: 94.7%</span>
            <span>Loss: 0.083</span>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: language === "fr" ? "Architecture Backend" : "Backend Architecture",
      subtitle: "Golang · Django · FastAPI",
      desc:
        language === "fr"
          ? "Conception et développement d'APIs performantes, scalables et résilientes, avec gestion experte des bases de données transactionnelles."
          : "Design and development of high-performance, scalable and resilient APIs, with expert management of transactional databases.",
      icon: <Server className="text-[#FD8D49] h-6 w-6" />,
      visual: (
        <div className="w-full h-full bg-[#161B22] rounded-xl p-3 border border-white/5 font-mono text-[9px] text-[#A5D6FF] flex flex-col justify-between shadow-inner">
          <div className="flex items-center justify-between pb-1.5 border-b border-white/10 text-zinc-500 uppercase tracking-widest text-[8px] font-bold">
            <span>api_server.go</span>
            <span className="text-emerald-500">● online</span>
          </div>
          <div className="flex-1 py-2 space-y-1 select-none">
            <p className="text-[#FF7B72]">func <span className="text-[#D2A8FF]">HandleRequest</span><span className="text-white">(w, r) &#123;</span></p>
            <p className="text-zinc-500 pl-3">{"// Predict via AI model"}</p>
            <p className="pl-3 text-white">go ai.<span className="text-[#D2A8FF]">Predict</span>(r.Context())</p>
            <p className="pl-3 text-[#FF7B72]">w.<span className="text-[#D2A8FF]">WriteHeader</span><span className="text-white">(http.StatusOK)</span></p>
            <p className="text-white">&#125;</p>
          </div>
          <div className="bg-white/5 px-2 py-1 rounded text-zinc-400 text-[8px] flex items-center justify-between">
            <span>Response: 200 OK</span>
            <span className="text-[#FD8D49]">1.42 ms</span>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: language === "fr" ? "Automatisation & Workflows" : "Automation & Workflows",
      subtitle: "n8n · Webhooks · API Integration",
      desc:
        language === "fr"
          ? "Automatisation de vos processus métier avec n8n : connexion d'APIs, déclencheurs webhook, pipelines de données et orchestration de workflows sans code."
          : "Automate your business processes with n8n: API connections, webhook triggers, data pipelines and no-code workflow orchestration.",
      icon: <Workflow className="text-[#FD8D49] h-6 w-6" />,
      visual: (
        <div className="w-full h-full bg-[#161B22] rounded-xl p-3.5 border border-white/5 flex flex-col justify-between shadow-inner select-none">
          <div className="text-[8px] text-zinc-500 font-bold uppercase tracking-wider pb-1.5 border-b border-white/10 font-mono">
            workflow.n8n
          </div>
          <div className="flex-1 flex flex-col justify-center gap-2 py-1">
            {[
              { from: "Webhook", to: "Filter", color: "#EA4B71" },
              { from: "Filter", to: "AI Model", color: "#FD8D49" },
              { from: "AI Model", to: "Slack / DB", color: "#60a5fa" },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div
                  className="text-[7px] font-bold px-2 py-0.5 rounded border"
                  style={{ borderColor: `${step.color}50`, color: step.color, background: `${step.color}15` }}
                >
                  {step.from}
                </div>
                <div className="flex-1 flex items-center gap-0.5">
                  <div className="flex-1 h-px" style={{ background: `${step.color}40` }} />
                  <span className="text-[8px]" style={{ color: step.color }}>▶</span>
                </div>
                <div className="text-[7px] font-bold px-2 py-0.5 rounded border border-white/10 text-zinc-400 bg-white/5">
                  {step.to}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-emerald-500/10 px-2 py-1 rounded text-[7px] text-emerald-400 font-bold font-mono flex justify-between">
            <span>Status: ACTIVE</span>
            <span>3 workflows running</span>
          </div>
        </div>
      ),
    },
  ];

  const skillCategories = [
    {
      id: "datascience",
      title: "Data Science",
      skills: [
        { id: 1, name: "Python", icon: <SiPython className="text-[#3776AB]" /> },
        { id: 2, name: "Pandas", icon: <SiPandas className="text-[#150458]" style={{ filter: "brightness(2)" }} /> },
        { id: 3, name: "NumPy", icon: <SiNumpy className="text-[#013243]" style={{ filter: "brightness(3)" }} /> },
        { id: 4, name: "Jupyter", icon: <SiJupyter className="text-[#F37626]" /> },
      ],
    },
    {
      id: "ai",
      title: language === "fr" ? "Machine Learning / IA" : "Machine Learning / AI",
      skills: [
        { id: 5, name: "TensorFlow", icon: <SiTensorflow className="text-[#FF6F00]" /> },
        { id: 6, name: "PyTorch", icon: <SiPytorch className="text-[#EE4C2C]" /> },
        { id: 7, name: "Scikit-learn", icon: <SiScikitlearn className="text-[#F7931E]" /> },
      ],
    },
    {
      id: "backend",
      title: "Backend",
      skills: [
        { id: 8, name: "Golang", icon: <SiGo className="text-[#00ADD8]" /> },
        { id: 9, name: "Django", icon: <SiDjango className="text-emerald-500" /> },
        { id: 10, name: "FastAPI", icon: <SiFastapi className="text-[#009688]" /> },
      ],
    },
    {
      id: "databases",
      title: t("skills.category.databases"),
      skills: [
        { id: 11, name: "PostgreSQL", icon: <SiPostgresql className="text-[#336791]" /> },
        { id: 12, name: "Oracle", icon: <SiOracle className="text-[#F80000]" /> },
        { id: 13, name: "MySQL", icon: <SiMysql className="text-[#4479A1]" /> },
        { id: 14, name: "Supabase", icon: <SiSupabase className="text-[#3ECF8E]" /> },
        { id: 15, name: "Sauvegarde/Restore", icon: <LuDatabaseBackup className="text-green-500" /> },
        { id: 16, name: "Optimisation SQL", icon: <FaDatabase className="text-teal-500" /> },
      ],
    },
    {
      id: "tools",
      title: t("skills.category.tools"),
      skills: [
        { id: 17, name: "Docker", icon: <SiDocker className="text-[#2496ED]" /> },
        { id: 18, name: "Git", icon: <SiGit className="text-[#F05032]" /> },
        { id: 19, name: "GitHub", icon: <SiGithub className="text-zinc-300" /> },
        { id: 20, name: "GitLab", icon: <SiGitlab className="text-[#FC6D26]" /> },
        { id: 21, name: "Postman", icon: <SiPostman className="text-[#FF6C37]" /> },
        { id: 26, name: "n8n", icon: <SiN8N className="text-[#EA4B71]" /> },
      ],
    },
    {
      id: "automation",
      title: language === "fr" ? "Automatisation" : "Automation",
      skills: [
        { id: 22, name: "n8n", icon: <SiN8N className="text-[#EA4B71]" /> },
      ],
    },
    {
      id: "modeling",
      title: t("skills.category.modeling"),
      skills: [
        { id: 23, name: "UML (MCD, MLD)", icon: <SiUml className="text-purple-500" /> },
        { id: 24, name: "Normalisation", icon: <FaDatabase className="text-indigo-400" /> },
        { id: 25, name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
      ],
    },
  ];

  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollToCard = (index: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.querySelectorAll("[data-card]")[index] as HTMLElement;
    if (card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
    setActiveCard(index);
  };

  const scrollCarousel = (dir: "left" | "right") => {
    const next = dir === "right"
      ? Math.min(activeCard + 1, mainServices.length - 1)
      : Math.max(activeCard - 1, 0);
    scrollToCard(next);
  };

  // sync dot avec scroll
  const handleCarouselScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const cards = el.querySelectorAll("[data-card]");
    cards.forEach((card, i) => {
      const rect = (card as HTMLElement).getBoundingClientRect();
      const parentRect = el.getBoundingClientRect();
      if (rect.left >= parentRect.left - 10 && rect.left < parentRect.left + parentRect.width / 2) {
        setActiveCard(i);
      }
    });
  };

  const handleServiceClick = (index: number) => {
    scrollToCard(index);
    document
      .getElementById("tech-stack-anchor")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="w-full bg-[#0B0D10] text-white rounded-t-[3.5rem] pt-24 pb-16 relative overflow-hidden -mt-10 border-t border-white/5 shadow-2xl">
      {/* glow blobs */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 left-10 w-[200px] h-[200px] rounded-full bg-[#FD8D49]/5 blur-[70px]" />
        <div className="absolute top-[40%] right-[-50px] w-[350px] h-[350px] rounded-full bg-[#FD8D49]/10 blur-[100px]" />
        <div className="absolute bottom-[10%] left-[-80px] w-[280px] h-[280px] rounded-full bg-zinc-500/5 blur-[90px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-end mb-16">
          <div className="md:col-span-6 space-y-4" data-aos="fade-right">
            <span className="text-[10px] font-black text-[#FD8D49] uppercase tracking-[0.35em] block font-outfit">
              — {language === "fr" ? "Domaines d'expertise" : "Areas of Expertise"}
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white font-outfit">
              My <span className="text-[#FD8D49]">Services</span>
            </h2>
          </div>
          <div className="md:col-span-6" data-aos="fade-left">
            <p className="text-zinc-400 text-sm leading-relaxed font-outfit font-medium">
              {language === "fr"
                ? "De l'analyse de données à l'ingénierie IA en passant par l'architecture backend — des solutions end-to-end conçues pour la performance, l'intelligence et la scalabilité."
                : "From data analysis to AI engineering and backend architecture — end-to-end solutions designed for performance, intelligence and scalability."}
            </p>
          </div>
        </div>

        {/* Service Cards — carrousel horizontal */}
        <div className="relative mb-8" data-aos="fade-up">
          {/* flèche gauche */}
          <button
            onClick={() => scrollCarousel("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-[#FD8D49] hover:border-[#FD8D49] flex items-center justify-center text-white transition-all shadow-lg hidden md:flex"
          >
            <ChevronLeft size={18} />
          </button>

          {/* piste de scroll */}
          <div
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 px-1"
            style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
          >
            {mainServices.map((service, index) => (
              <div
                key={service.id}
                data-card
                className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[2.5rem] p-6 hover:border-[#FD8D49]/50 transition-all duration-500 flex flex-col justify-between shadow-xl group relative overflow-hidden shrink-0"
                style={{ width: "clamp(280px, 32vw, 360px)", height: "450px", scrollSnapAlign: "start" }}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-zinc-500 text-xs font-black uppercase tracking-widest font-outfit block">
                      0{index + 1} / SERVICE
                    </span>
                    <div className="p-2 bg-white/5 rounded-xl border border-white/5">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white font-outfit leading-tight pt-2">
                    {service.title}
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed font-outfit font-medium">
                    {service.desc}
                  </p>
                </div>

                <div className="w-full h-40 py-2">
                  {service.visual}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                  <span className="text-[10px] text-[#FD8D49] font-black uppercase tracking-wider font-outfit">
                    {service.subtitle}
                  </span>
                  <button
                    onClick={() => handleServiceClick(index)}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-[#FD8D49] hover:border-[#FD8D49] hover:scale-105 active:scale-95 flex items-center justify-center text-white transition-all group-hover:shadow-lg group-hover:shadow-[#FD8D49]/20"
                  >
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:rotate-45" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* flèche droite */}
          <button
            onClick={() => scrollCarousel("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-[#FD8D49] hover:border-[#FD8D49] flex items-center justify-center text-white transition-all shadow-lg hidden md:flex"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* dots */}
        <div className="flex items-center justify-center gap-3 mb-24 select-none">
          {mainServices.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCard(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeCard === index
                  ? "w-7 bg-[#FD8D49]"
                  : "w-2.5 bg-zinc-700 hover:bg-zinc-500"
              }`}
              aria-label={`Service ${index + 1}`}
            />
          ))}
        </div>

        {/* Tech Stack */}
        <div id="tech-stack-anchor" className="border-t border-white/5 pt-20">
          <div className="mb-12 flex flex-col gap-3" data-aos="fade-right">
            <span className="text-[10px] font-black text-[#FD8D49] uppercase tracking-[0.35em] block font-outfit">
              — {language === "fr" ? "Écosystème Technologique" : "Technical Ecosystem"}
            </span>
            <h3 className="text-3xl font-black text-white font-outfit">
              {language === "fr" ? "Stack Technique Complète" : "Complete Tech Stack"}
            </h3>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-xl font-outfit">
              {language === "fr"
                ? "L'ensemble des langages, frameworks, outils IA et bases de données que je maîtrise pour construire vos solutions data et backend :"
                : "The full set of languages, AI frameworks, and databases I master to build your data and backend solutions:"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, catIndex) => (
              <div
                key={category.id}
                data-aos="fade-up"
                data-aos-delay={catIndex * 80}
                className="group relative flex flex-col bg-white/5 border border-white/10 rounded-[2rem] p-6 hover:shadow-xl hover:shadow-[#FD8D49]/5 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute -top-24 -right-24 w-40 h-40 bg-[#FD8D49]/5 rounded-full blur-3xl group-hover:bg-[#FD8D49]/10 transition-colors duration-500" />
                <h4 className="text-sm font-bold text-white mb-6 flex items-center tracking-wide font-outfit">
                  <span className="w-1.5 h-4 bg-[#FD8D49] rounded-full mr-2.5" />
                  {category.title}
                </h4>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center bg-white/[0.03] border border-white/5 rounded-xl py-2 px-3 hover:border-[#FD8D49]/40 hover:bg-white/[0.08] transition-all duration-300 group/item"
                    >
                      <div className="text-xl transition-transform duration-300 group-hover/item:scale-110">
                        {skill.icon}
                      </div>
                      <span className="ml-2.5 text-xs font-bold text-zinc-300 group-hover/item:text-[#FD8D49] transition-colors duration-300 font-outfit">
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
    </div>
  );
}
