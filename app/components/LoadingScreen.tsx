"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./LoadingScreen.module.css";

const TOTAL_DURATION_MS = 2000;

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const onCompleteRef = useRef(onComplete);

  onCompleteRef.current = onComplete;

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onCompleteRef.current(), 600);
    }, TOTAL_DURATION_MS);

    return () => clearTimeout(exitTimer);
  }, []);

  return (
    <div className={`${styles.screen} ${isExiting ? styles.exit : ""}`}>
      {/* scanlines */}
      <div className={styles.scanlines} aria-hidden />

      {/* coins HUD */}
      <div className={styles.cornerTL}>[ TA ]</div>
      <div className={styles.cornerTR}>DV{new Date().getFullYear()}:2K</div>

      {/* contenu central */}
      <div className={styles.center}>
        <div className={styles.glitchWrap}>
          <span className={styles.title} data-text="LOADING">LOADING</span>
        </div>
        <div className={styles.sub}>
          <span className={styles.subLine} />
          <span className={styles.subText}>TRÉSOR · ALADE</span>
          <span className={styles.subLine} />
        </div>
      </div>

      {/* barre du bas */}
      <div className={styles.bottom}>
        <span className={styles.wait}>PLEASE WAIT...</span>
        <div className={styles.track}>
          <div className={styles.fill} />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
