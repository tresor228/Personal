"use client";

import React, { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Vérifie si le chargement a déjà été effectué dans cette session
        const hasLoaded = sessionStorage.getItem("portfolio-loaded");
        if (!hasLoaded) {
            setIsLoading(true);
        }
        setMounted(true);
    }, []);

    const handleLoadComplete = () => {
        sessionStorage.setItem("portfolio-loaded", "true");
        setIsLoading(false);
    };

    // Avant l'hydratation, afficher les enfants directement (SSR)
    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <>
            {isLoading && <LoadingScreen onComplete={handleLoadComplete} />}
            <div
                style={{
                    opacity: isLoading ? 0 : 1,
                    transition: "opacity 0.7s ease 0.2s",
                    pointerEvents: isLoading ? "none" : "auto",
                }}
            >
                {children}
            </div>
        </>
    );
}
