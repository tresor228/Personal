"use client";

import React, { useEffect, useState } from "react";
import styles from "./LoadingScreen.module.css";

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);
    const [currentText, setCurrentText] = useState(0);

    const loadingTexts = [
        "Initialisation...",
        "Chargement des données...",
        "Préparation de l'interface...",
        "Presque prêt...",
        "Bienvenue !",
    ];

    // Positions fixes pour les 20 particules (évite les valeurs aléatoires côté serveur)
    const particlePositions = [
        { top: "8%", left: "12%" }, { top: "15%", left: "30%" },
        { top: "5%", left: "55%" }, { top: "12%", left: "75%" },
        { top: "22%", left: "88%" }, { top: "35%", left: "5%" },
        { top: "40%", left: "20%" }, { top: "38%", left: "45%" },
        { top: "42%", left: "70%" }, { top: "35%", left: "92%" },
        { top: "55%", left: "8%" }, { top: "60%", left: "28%" },
        { top: "58%", left: "52%" }, { top: "62%", left: "78%" },
        { top: "55%", left: "95%" }, { top: "72%", left: "15%" },
        { top: "78%", left: "38%" }, { top: "75%", left: "62%" },
        { top: "80%", left: "82%" }, { top: "88%", left: "48%" },
    ];

    const dotDelays = ["0s", "0.2s", "0.4s"];

    useEffect(() => {
        const totalDuration = 5000;
        const intervalMs = 50;
        const increment = 100 / (totalDuration / intervalMs);

        const progressTimer = setInterval(() => {
            setProgress((prev) => {
                const next = prev + increment;
                if (next >= 100) {
                    clearInterval(progressTimer);
                    return 100;
                }
                return next;
            });
        }, intervalMs);

        // Rotation des textes
        const textTimers = loadingTexts.map((_, i) =>
            setTimeout(() => setCurrentText(i), (totalDuration / loadingTexts.length) * i)
        );

        // Phase de sortie
        const exitTimer = setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => onComplete(), 500);
        }, totalDuration);

        return () => {
            clearInterval(progressTimer);
            textTimers.forEach((t) => clearTimeout(t));
            clearTimeout(exitTimer);
        };
    }, []);

    return (
        <div className={`${styles.loadingScreen} ${isExiting ? styles.loadingExit : ""}`}>
            {/* Grille de fond animée */}
            <div className={styles.gridBg} />

            {/* Particules flottantes */}
            <div className={styles.particles}>
                {particlePositions.map((pos, i) => (
                    <span
                        key={i}
                        className={styles.particle}
                        style={{
                            top: pos.top,
                            left: pos.left,
                            animationDelay: `${i * -0.15}s`,
                            animationDuration: `${3 + i * 0.3}s`,
                        }}
                    />
                ))}
            </div>

            {/* Contenu central */}
            <div className={styles.loadingContent}>

                {/* Logo avec anneaux rotatifs */}
                <div className={styles.logoContainer}>
                    <div className={`${styles.logoRing} ${styles.outerRing}`} />
                    <div className={`${styles.logoRing} ${styles.middleRing}`} />
                    <div className={`${styles.logoRing} ${styles.innerRing}`} />
                    <div className={styles.logoInitials}>
                        <span className={styles.initialT}>T</span>
                        <span className={styles.initialA}>A</span>
                    </div>
                </div>

                {/* Nom */}
                <div className={styles.loadingName}>
                    <span className={styles.nameTresor}>Trésor</span>
                    <span className={styles.nameAlade}>ALADE</span>
                </div>

                {/* Ligne décorative */}
                <div className={styles.decorativeLine}>
                    <span className={styles.lineDot} />
                    <span className={styles.lineBar} />
                    <span className={styles.lineDot} />
                </div>

                {/* Texte animé */}
                <div className={styles.loadingTextContainer}>
                    <p className={styles.loadingText} key={currentText}>
                        {loadingTexts[currentText]}
                    </p>
                </div>

                {/* Barre de progression */}
                <div className={styles.progressContainer}>
                    <div className={styles.progressTrack}>
                        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                        <div className={styles.progressGlow} style={{ left: `${progress}%` }} />
                    </div>
                    <div className={styles.progressLabels}>
                        <span className={styles.progressLabel}>Chargement</span>
                        <span className={styles.progressPercent}>{Math.round(progress)}%</span>
                    </div>
                </div>

                {/* Points de chargement */}
                <div className={styles.dotsContainer}>
                    {dotDelays.map((delay, i) => (
                        <span
                            key={i}
                            className={styles.loadingDot}
                            style={{ animationDelay: delay }}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default LoadingScreen;
