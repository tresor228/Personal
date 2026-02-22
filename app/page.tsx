"use client";

import LoadingScreen from "./components/LoadingScreen";

export default function SplashPage() {
  const handleComplete = () => {
    console.log("Chargement terminé, redirection vers /portfolio...");
    window.location.href = "/portfolio";
  };

  return <LoadingScreen onComplete={handleComplete} />;
}
