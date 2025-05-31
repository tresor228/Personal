"use client";

import React, { useEffect } from "react";
import Presentation from "./components/Presentation";
import Projects from "./projects/page";
import About from "./about/page";
import Skills from "./skills/page";
import Contact from "./contact/page";
import AOS from "aos";
import "aos/dist/aos.css";

const Page: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: "ease-out",
    });
  }, []);
  return (
    <div className="w-full overflow-hidden text-zinc-800 dark:text-zinc-100">
      <Presentation />
      <Projects />
      <About />
      <Skills />
      <Contact />
    </div>
  );
};

export default Page;
