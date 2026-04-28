"use client";
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from './LanguageContext'

const Presentation = () => {
  const { t } = useLanguage();
  const link = [
    "https://www.linkedin.com/in/tresor-alade/",
    "https://github.com/tresor228"
  ]

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-8 overflow-hidden">

      {/* Rich ambient background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#2DD4BF] opacity-[0.04] dark:opacity-[0.06] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600 opacity-[0.04] dark:opacity-[0.06] rounded-full blur-[100px]" />
        <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-purple-600 opacity-[0.03] dark:opacity-[0.05] rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-16 items-center">

          {/* Text Content — 7 Columns */}
          <div className="lg:col-span-7 z-10 space-y-10">

            {/* Greeting */}
            <div data-aos="fade-down" data-aos-duration="900" className="space-y-5">

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#2DD4BF]/30 bg-[#2DD4BF]/5 dark:bg-[#2DD4BF]/10">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2DD4BF] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2DD4BF]"></span>
                </span>
                <span className="text-[11px] font-black text-[#2DD4BF] uppercase tracking-[0.25em]">
                  Disponible • Open to work
                </span>
              </div>

              {/* Greeting line */}
              <div className="text-xl sm:text-2xl font-light text-gray-500 dark:text-gray-400 tracking-wider">
                {t("hero.salut")} <span className="font-black text-gray-900 dark:text-white">{t("hero.im")}</span>
              </div>

              {/* Name — Hero Typography */}
              <h1 className="text-[2.8rem] sm:text-[3.8rem] lg:text-[5rem] font-black leading-[0.9] tracking-[-0.03em] text-shimmer">
                {t("hero.name")}
              </h1>

              {/* Role */}
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-700 dark:text-gray-200 tracking-tight">
                {t("hero.roles")}
              </h2>
            </div>

            {/* Description */}
            <p data-aos="fade-up" data-aos-delay="200" className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed">
              {t("hero.description")}
            </p>

            {/* Stats */}
            <div data-aos="zoom-in" data-aos-delay="300" className="hidden sm:grid grid-cols-3 gap-4 max-w-lg">
              {[
                { value: "2+", label: t("hero.stats.exp") },
                { value: "3+", label: t("hero.stats.clients") },
                { value: "5+", label: t("hero.stats.projects") },
              ].map((stat, i) => (
                <div key={i} className="text-center p-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-[#2DD4BF]/40 transition-all hover:-translate-y-1 group">
                  <div className="text-2xl font-black text-[#2DD4BF] group-hover:scale-110 transition-transform">{stat.value}</div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA + Socials */}
            <div data-aos="fade-up" data-aos-delay="400" className="flex flex-wrap items-center gap-4">
              <Link href="/contact">
                <Button className="group bg-[#2DD4BF] hover:bg-[#0d9488] text-white rounded-full px-8 py-6 text-sm font-bold shadow-xl shadow-[#2DD4BF]/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                  {t("hero.cta")}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <div className="flex items-center gap-3">
                <Link href={link[0]} target="_blank" aria-label="LinkedIn"
                  className="p-3 text-gray-400 hover:text-[#0A66C2] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-full transition-all hover:scale-110 hover:border-[#0A66C2]/30 shadow-sm">
                  <Linkedin size={20} />
                </Link>
                <Link href={link[1]} target="_blank" aria-label="Github"
                  className="p-3 text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-full transition-all hover:scale-110 hover:border-gray-300 shadow-sm">
                  <Github size={20} />
                </Link>
              </div>

              {/* Scroll indicator */}
              <div className="hidden lg:flex items-center gap-2 ml-4 text-gray-400 text-xs font-bold uppercase tracking-widest">
                <div className="w-px h-5 bg-gray-200 dark:bg-white/10" />
                Scroll
              </div>
            </div>
          </div>

          {/* Profile Image — 5 Columns */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div data-aos="fade-left" data-aos-duration="1000" className="relative animate-float">

              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-[3rem] border-2 border-[#2DD4BF]/20 scale-[1.05] pointer-events-none" />
              <div className="absolute inset-0 rounded-[3rem] border border-[#2DD4BF]/10 scale-[1.12] pointer-events-none" />

              {/* Background Glow */}
              <div className="absolute -inset-6 bg-[#2DD4BF] opacity-[0.06] dark:opacity-10 rounded-[4rem] blur-3xl" />

              {/* Image Frame */}
              <div className="relative z-10 w-[300px] sm:w-[360px] h-[400px] sm:h-[480px] rounded-[3rem] overflow-hidden border-4 border-white dark:border-white/10 shadow-2xl group">
                <Image
                  src="/tresorfolio.png"
                  alt={t("hero.name")}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[5%] group-hover:grayscale-0"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d9488]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Location Badge */}
              <div className="absolute -bottom-4 -left-6 z-20 bg-white dark:bg-zinc-900 px-5 py-3 rounded-2xl shadow-2xl border border-gray-100 dark:border-white/10 flex items-center gap-3 animate-slide-up">
                <div className="w-9 h-9 bg-[#2DD4BF]/10 rounded-xl flex items-center justify-center">
                  <MapPin size={18} className="text-[#2DD4BF]" />
                </div>
                <div>
                  <div className="text-[9px] text-gray-400 font-black uppercase tracking-widest">{t("hero.location.label")}</div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">{t("hero.location.value")}</div>
                </div>
              </div>

              {/* Experience Badge */}
              <div className="absolute -top-4 -right-4 z-20 bg-[#2DD4BF] text-white px-5 py-3 rounded-2xl shadow-2xl flex flex-col items-center animate-pulse-ring">
                <div className="text-2xl font-black leading-none">2+</div>
                <div className="text-[9px] font-black uppercase tracking-widest opacity-80">Ans Exp.</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Presentation