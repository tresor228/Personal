"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'fr' || savedLang === 'en')) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  // This is a simple translation function that will be populated later
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translations data
const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Nav
    "nav.home": "Home",
    "nav.about": "About",
    "nav.skills": "Service",
    "nav.resume": "Resume",
    "nav.projects": "Project",
    "nav.certification": "Certifications",
    "nav.contact": "Contact",

    // Presentation
    "hero.salut": "Expertise & ",
    "hero.im": "Solutions",
    "hero.name": "Trésor ALADE",
    "hero.roles": "Architecte Backend & DBA Senior",
    "hero.description": "Je transforme vos concepts complexes en systèmes robustes. Spécialiste du Backend haute performance et de l'administration de données critiques, je vous accompagne de la conception à la mise en production.",
    "hero.stats.exp": "Ans d'Expertise",
    "hero.stats.clients": "Partenaires",
    "hero.stats.projects": "Projets Livrés",
    "hero.cta": "Démarrer une Collaboration",
    "hero.location.label": "Mobilité",
    "hero.location.value": "International / Télétravail",

    // About
    "about.title": "Profil Expert",
    "about.journey": "Mon Expertise",
    "about.skills": "Core Skills",
    "about.description": "Consultant Freelance spécialisé en architectures Backend et administration de bases de données (DBA), je conçois des systèmes sécurisés, scalables et optimisés pour la croissance. Mon approche est axée sur la performance et la fiabilité des données.",
    "about.education": "Fort d'un parcours spécialisé en IA & Big Data, j'allie rigueur académique et pragmatisme professionnel pour résoudre vos défis techniques les plus complexes.",
    "about.search": "Je suis disponible pour des missions de consulting, du développement d'APIs critiques ou de l'optimisation de vos infrastructures de données.",
    "about.motivation": "Mon objectif : apporter une excellence technique sans compromis à vos projets stratégiques par des solutions sur mesure.",
    "about.cv": "Dossier Compétences",

    // Skills
    "skills.title": "Champ d'Expertise",
    "skills.description": "Maîtrise complète de l'écosystème technique pour garantir la scalabilité et la sécurité de vos applications d'entreprise :",
    "skills.category.databases": "Systèmes de Données",
    "skills.category.modeling": "Architecture Logicielle",
    "skills.category.tools": "Écosystème & DevOps",
    "skills.category.programming": "Ingénierie Backend",
    "skills.category.dba": "Audit & Performance DBA",
    "skills.category.web": "Intégration Systèmes",

    // Certification
    "cert.title": "Garanties Techniques",
    "cert.description": "Expertise validée par les leaders du marché pour assurer une qualité de service irréprochable sur vos infrastructures.",
    "cert.view": "Vérifier l'Accréditation",

    // Projects
    "projects.title": "Études de Cas",
    "projects.subtitle": "Réalisations & Projets",
    "projects.description": "Découvrez comment j'aide mes clients à relever leurs défis techniques. Chaque projet est une preuve de ma capacité à livrer des solutions haute performance.",
    "projects.web": "Applications",
    "projects.dba": "Audit & Modélisation",
    "projects.viewMore": "Autres Réalisations",
    "projects.viewLess": "Réduire",

    // Contact
    "contact.title": "Collaborons ensemble",
    "contact.description": "Besoin d'un expert pour votre infrastructure ? Discutons de vos besoins techniques et de la manière dont je peux propulser votre projet.",
    "contact.form.title": "Briefing Projet",
    "contact.form.name": "Votre Nom / Entreprise",
    "contact.form.email": "Email Professionnel",
    "contact.form.subject": "Type de Mission",
    "contact.form.message": "Détails de votre besoin",
    "contact.form.submit": "Envoyer la Demande",
    "contact.form.sending": "Traitement en cours...",
    "contact.form.success": "Demande transmise avec succès ! Je reviens vers vous rapidement.",
    "contact.form.error": "Échec de l'envoi. Veuillez me contacter directement.",
    "contact.info.title": "Contact Direct",
    "contact.info.availability": "Statut Actuel",
    "contact.info.availability.details": "Ouvert aux nouvelles opportunités (Freelance / CDI)",
    "contact.info.cv": "Consulter mon Portfolio",
    "contact.socials": "Réseaux Professionnels",
    "contact.footer.success": "Confirmé",
    "contact.footer.error": "Incident",
    "contact.footer.madeWith": "Développé pour l'excellence technique"
  },
  en: {
    // Nav
    "nav.home": "Home",
    "nav.about": "About",
    "nav.skills": "Service",
    "nav.resume": "Resume",
    "nav.projects": "Project",
    "nav.certification": "Certifications",
    "nav.contact": "Contact",

    // Presentation
    "hero.salut": "Expertise & ",
    "hero.im": "Solutions",
    "hero.name": "Trésor ALADE",
    "hero.roles": "Senior Backend Architect & DBA",
    "hero.description": "I transform complex concepts into robust systems. Specialist in high-performance Backend development and critical data administration, I support you from design to deployment.",
    "hero.stats.exp": "Years of Expertise",
    "hero.stats.clients": "Partners",
    "hero.stats.projects": "Projects Delivered",
    "hero.cta": "Start a Collaboration",
    "hero.location.label": "Mobility",
    "hero.location.value": "International / Remote",

    // About
    "about.title": "Expert Profile",
    "about.journey": "My Expertise",
    "about.skills": "Core Skills",
    "about.description": "Freelance Consultant specializing in Backend architectures and Database Administration (DBA), I design secure, scalable systems optimized for growth. My approach focuses on performance and data reliability.",
    "about.education": "With a major in AI & Big Data, I combine academic rigor with professional pragmatism to solve your most complex technical challenges.",
    "about.search": "I am available for consulting missions, critical API development, or optimizing your data infrastructures.",
    "about.motivation": "My goal: to bring uncompromising technical excellence to your strategic projects through tailored solutions.",
    "about.cv": "Skills Dossier",

    // Skills
    "skills.title": "Field of Expertise",
    "skills.description": "Full mastery of the technical ecosystem to guarantee the scalability and security of your enterprise applications:",
    "skills.category.databases": "Data Systems",
    "skills.category.modeling": "Software Architecture",
    "skills.category.tools": "Ecosystem & DevOps",
    "skills.category.programming": "Backend Engineering",
    "skills.category.dba": "DBA Audit & Performance",
    "skills.category.web": "Systems Integration",

    // Certification
    "cert.title": "Technical Guarantees",
    "cert.description": "Expertise validated by market leaders to ensure impeccable service quality on your infrastructures.",
    "cert.view": "Verify Accreditation",

    // Projects
    "projects.title": "Case Studies",
    "projects.subtitle": "Achievements & Projects",
    "projects.description": "Discover how I help my clients overcome their technical challenges. Each project is proof of my ability to deliver high-performance solutions.",
    "projects.web": "Applications",
    "projects.dba": "Audit & Modeling",
    "projects.viewMore": "Other Achievements",
    "projects.viewLess": "Collapse",

    // Contact
    "contact.title": "Let's Collaborate",
    "contact.description": "Need an expert for your infrastructure? Let's discuss your technical requirements and how I can propel your project forward.",
    "contact.form.title": "Project Briefing",
    "contact.form.name": "Your Name / Company",
    "contact.form.email": "Professional Email",
    "contact.form.subject": "Mission Type",
    "contact.form.message": "Your Requirements",
    "contact.form.submit": "Submit Request",
    "contact.form.sending": "Processing...",
    "contact.form.success": "Request submitted! I'll get back to you shortly.",
    "contact.form.error": "Submission failed. Please contact me directly.",
    "contact.info.title": "Direct Contact",
    "contact.info.availability": "Current Status",
    "contact.info.availability.details": "Open to new opportunities (Freelance / Full-time)",
    "contact.info.cv": "View Portfolio",
    "contact.socials": "Professional Networks",
    "contact.footer.success": "Confirmed",
    "contact.footer.error": "Incident",
    "contact.footer.madeWith": "Developed for Technical Excellence"
  }
};
