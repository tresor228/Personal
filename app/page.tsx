"use client";

import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Presentation from "./components/Presentation";
import About from "./about/page";
import Skills from "./skills/page";
import Projects from "./projects/page";
import Contact from "./contact/page";
import ChatBot from "./components/ChatBot";
import LoadingScreen from "./components/LoadingScreen";

export default function Page() {
  const pathname = usePathname();
  const [contentReady, setContentReady] = useState(false);

  useLayoutEffect(() => {
    try {
      if (sessionStorage.getItem("portfolio-splash-seen") === "1") {
        setContentReady(true);
      }
    } catch {
      /* sessionStorage indisponible */
    }
  }, []);

  const handleSplashComplete = useCallback(() => {
    try {
      sessionStorage.setItem("portfolio-splash-seen", "1");
    } catch {
      /* ignore */
    }
    setContentReady(true);
  }, []);

  useEffect(() => {
    if (!contentReady || typeof window === "undefined") return;
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
    return () => cancelAnimationFrame(id);
  }, [contentReady, pathname]);

  const showSplash = !contentReady;

  return (
    <>
      {showSplash && <LoadingScreen onComplete={handleSplashComplete} />}

      {contentReady && (
        <div className="w-full overflow-hidden text-zinc-800 dark:text-zinc-100 animate-in fade-in duration-500">
          <section id="top" className="home-section-anchor">
            <Presentation />
          </section>
          <section id="about" className="home-section-anchor">
            <About />
          </section>
          <section id="skills" className="home-section-anchor">
            <Skills />
          </section>
          <section id="projects" className="home-section-anchor">
            <Projects />
          </section>
          <section id="contact" className="home-section-anchor">
            <Contact />
          </section>
          <ChatBot />
        </div>
      )}
    </>
  );
}
