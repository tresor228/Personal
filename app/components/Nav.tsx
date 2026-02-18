"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    {
      path: "/",
      name: "Accueil",
    },
    {
      path: "/projects",
      name: "Projets",
    },
    {
      path: "/certification",
      name: "Certification",
    },
    {
      path: "/about",
      name: "À propos",
    },
    {
      path: "/skills",
      name: "Compétences",
    },
    {
      path: "/contact",
      name: "Contact",
    },
  ];

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 w-full py-3 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        {/* Container arrondi avec bordure */}
        <div className='bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-xl border border-gray-200 dark:border-blue-400/30 shadow-lg'>
          <div className='flex justify-between items-center h-12 px-3 sm:px-5'>
            {/* Logo texte */}
            <Link 
              href="/" 
              className='text-base sm:text-lg font-bold uppercase text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200'
              data-aos="fade-right"
            >
              TRESOR ALADE
            </Link>

            {/* Menu Desktop */}
            <div className='hidden lg:flex items-center space-x-6'>
              {links.map((link, index) => (
                <Link 
                  key={link.path} 
                  href={link.path} 
                  className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm font-medium'
                  data-aos="fade-down"
                  data-aos-delay={index * 100}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Boutons à droite */}
            <div className='flex items-center space-x-4'>
              {/* Theme Toggle */}
              <div className='hidden md:block' data-aos="fade-left">
                <ThemeToggle />
              </div>

              {/* Menu Burger Mobile */}
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className='lg:hidden text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200'
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Menu Mobile */}
          {isOpen && (
            <div className='lg:hidden border-t border-gray-200 dark:border-gray-700 space-y-2 py-4 px-6 bg-white/50 dark:bg-gray-900/50'>
              {links.map((link) => (
                <Link 
                  key={link.path} 
                  href={link.path} 
                  className='block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 py-2'
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className='flex items-center space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700'>
                <ThemeToggle />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
