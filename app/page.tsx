"use client";

import React, { useEffect, useState } from "react";
import Presentation from "./components/Presentation";
import About from "./about/page";
import Skills from "./skills/page";
import Projects from "./projects/page";
import Certification from "./certification/page";
import Contact from "./contact/page";
import ChatBot from "./components/ChatBot";
import LoadingScreen from "./components/LoadingScreen";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    // On initialise AOS mais on le rafraîchira quand le loading sera fini
    if (typeof window !== "undefined") {
      AOS.init({
        duration: 1000,
        once: false,
        easing: "ease-out",
      });
    }
  }, []);

  // Quand le chargement est fini, on rafraîchit AOS pour que les animations se lancent
  const handleComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  };

  if (!mounted) return <div className="bg-[#0a0a1a] min-h-screen" />;

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleComplete} />}

      <div
        className="w-full overflow-hidden text-zinc-800 dark:text-zinc-100"
        style={{
          opacity: isLoading ? 0 : 1,
          visibility: isLoading ? "hidden" : "visible",
          transition: "opacity 1s ease",
          height: isLoading ? "100vh" : "auto",
          overflow: isLoading ? "hidden" : "visible"
        }}
      >
        <Presentation />
        <About />
        <Skills />
        <Projects />
        <Certification />
        <Contact />
        <ChatBot />
      </div>
    </>
  );
}

