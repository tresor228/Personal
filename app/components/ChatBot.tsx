"use client";

import React, { useState, useEffect } from "react";

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  // Animation de clignement des yeux
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000); // Cligne toutes les 3 secondes

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Chat Window - sera implémenté plus tard */}
      {isOpen && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-80 h-96 p-4">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Assistant IA - Trésor
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          <div className="text-center text-gray-500 dark:text-gray-400 mt-20">
            <p>Fonctionnalité à venir...</p>
            <p className="text-sm mt-2">Je répondrai à vos questions sur Trésor</p>
          </div>
        </div>
      )}

      {/* Robot Icon Button - Toujours dans le coin */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group animate-bounce-slow hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full"
        aria-label="Ouvrir le chatbot"
      >
        <div className="relative w-16 h-22 flex flex-col items-center">
          {/* Ombre douce et diffuse sous le robot */}
          <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-11 h-3 bg-black/10 dark:bg-black/20 rounded-full blur-xl"></div>
          
          {/* Tête - capsule arrondie, légèrement plus large en bas */}
          <div className="relative w-12 h-11 bg-gray-200 dark:bg-gray-300 rounded-full" style={{ borderRadius: '9999px' }}>
            {/* Antenne fine et verticale en haut */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0.5 h-3 bg-gray-300 dark:bg-gray-400 rounded-full"></div>
            
            {/* Écran facial sombre (visage) */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-5 bg-gray-900 dark:bg-black rounded-lg">
              {/* Yeux cyan lumineux - Animation de clignement */}
              <div className="absolute top-1.5 left-2 flex space-x-2">
                <div 
                  className={`w-2 h-2 bg-cyan-400 rounded-full transition-all duration-150 ${isBlinking ? 'h-0.5' : 'h-2'} shadow-[0_0_12px_rgba(34,211,238,1)]`}
                  style={{ boxShadow: '0 0 8px rgba(34, 211, 238, 1), 0 0 16px rgba(34, 211, 238, 0.5)' }}
                ></div>
                <div 
                  className={`w-2 h-2 bg-cyan-400 rounded-full transition-all duration-150 ${isBlinking ? 'h-0.5' : 'h-2'} shadow-[0_0_12px_rgba(34,211,238,1)]`}
                  style={{ boxShadow: '0 0 8px rgba(34, 211, 238, 1), 0 0 16px rgba(34, 211, 238, 0.5)' }}
                ></div>
              </div>
              {/* Bouche souriante cyan */}
              <svg 
                className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-5 h-2"
                viewBox="0 0 24 8"
                fill="none"
              >
                <path 
                  d="M2 6 Q12 2 22 6" 
                  stroke="#22d3ee" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                  style={{ filter: 'drop-shadow(0 0 4px rgba(34, 211, 238, 0.8))' }}
                />
              </svg>
            </div>
          </div>

          {/* Espace entre tête et corps */}
          <div className="h-1"></div>

          {/* Corps - bulbeux, plus large à la base */}
          <div className="relative w-16 h-12 bg-gray-200 dark:bg-gray-300 rounded-full" style={{ borderRadius: '9999px' }}>
            {/* Le corps est naturellement plus large grâce au rounded-full */}
          </div>
        </div>
      </button>
    </div>
  );
};

export default ChatBot;

