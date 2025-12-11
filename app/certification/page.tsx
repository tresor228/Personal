"use client";

import React, { useState, useEffect } from "react";

const Certification: React.FC = () => {
  const text = "bientôt disponible";
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100; // Vitesse d'écriture/suppression
    let timeout: NodeJS.Timeout;

    if (!isDeleting && charIndex < text.length) {
      // Mode écriture
      timeout = setTimeout(() => {
        setDisplayedText(text.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, typeSpeed);
    } else if (!isDeleting && charIndex === text.length) {
      // Pause après avoir écrit tout le texte
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && charIndex > 0) {
      // Mode suppression
      timeout = setTimeout(() => {
        setDisplayedText(text.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, typeSpeed);
    } else if (isDeleting && charIndex === 0) {
      // Pause après avoir tout supprimé, puis recommencer
      timeout = setTimeout(() => {
        setIsDeleting(false);
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, text]);

  return (
    <div className="pt-10">
      <hr className="pt-20 text-zinc-700" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          <h2
            className="text-3xl font-bold uppercase pb-4 text-gray-900 dark:text-white"
            data-aos="fade-right"
          >
            Certification
          </h2>
          <div className="flex-col space-y-6">
            <div
              className="bg-white dark:bg-gray-800/50 shadow-sm p-6 rounded-xl"
              data-aos="fade-up"
            >
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Mes certifications et accréditations professionnelles seront disponibles prochainement.
              </p>
              <div className="mt-6">
                <span className="text-2xl font-semibold text-blue-500 dark:text-blue-400">
                  {displayedText}
                  <span className="animate-pulse">|</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certification;

