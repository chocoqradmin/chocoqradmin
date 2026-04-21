"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Game() {
  const [clicks, setClicks] = useState<number>(0);
  const [finished, setFinished] = useState<boolean>(false);
  const router = useRouter();

  const breakSound = useRef<HTMLAudioElement | null>(null);
  const lastPlay = useRef(0);

  useEffect(() => {
    const audio = new Audio("/sounds/break.mp3");
    audio.volume = 0.7;
    audio.preload = "auto";
    breakSound.current = audio;
  }, []);

  const playBreak = () => {
    const now = Date.now();
    if (now - lastPlay.current < 80) return;
    lastPlay.current = now;

    if (!breakSound.current) return;

    const sound = breakSound.current.cloneNode(true) as HTMLAudioElement;
    sound.volume = 0.7;
    sound.play().catch(() => {});
  };

  const handleClick = () => {
    if (finished) return;

    playBreak();

    setClicks((prev) => {
      const newClicks = prev + 1;

      if (newClicks === 10) {
        setFinished(true);

        setTimeout(() => {
          router.push("/result");
        }, 900);
      }

      return newClicks;
    });
  };

  const progress = (clicks / 10) * 100;

  const chocolateStates = ["🍫","🍫","🍫","🍫","🍫","🎁"];
  const breakLevel = Math.floor((clicks / 10) * 5);

  return (
    <div style={styles.container}>

      <svg style={styles.chocolateTop} viewBox="0 0 100 40" preserveAspectRatio="none">
        <path d="M0 0 H100 V26 C95 32, 92 26, 88 26 C85 26, 83 30, 80 30 C77 30, 75 26, 72 26 C69 26, 67 36, 64 36 C61 36, 59 24, 56 24 C53 24, 51 30, 48 30 C45 30, 43 26, 40 26 C37 26, 35 36, 32 36 C29 36, 27 26, 24 26 C21 26, 19 32, 16 32 C13 32, 11 24, 8 24 C5 24, 2 32, 0 32 Z" fill="#4d3800"/>
      </svg>

      <motion.div
        style={styles.floating1}
        animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        😲
      </motion.div>

      <motion.div
        style={styles.floating2}
        animate={{ y: [0, 15, 0], rotate: [0, -10, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        🎁
      </motion.div>

      <div style={styles.card}>

        <h1 style={styles.title}>ROMPE EL CHOCOLATE !</h1>

        <div style={styles.progressBar}>
          <motion.div
            style={styles.progressFill}
            animate={{ width: `${progress}%` }}
          />
        </div>

        {/* WRAPPER RELATIVO SIN CAMBIAR DISEÑO */}
        <div style={{ position: "relative", display: "inline-block" }}>

          <motion.div
            whileTap={{ scale: finished ? 1 : 0.85 }}
            animate={{
              rotate: clicks > 0 ? [0, 8, -8, 0] : 0,
              scale: clicks === 10 ? [1, 1.4, 0] : 1,
            }}
            transition={{ duration: 0.3 }}
            style={{
              ...styles.chocolate,
              cursor: finished ? "default" : "pointer",
              filter: "none"
            }}
          >
            {chocolateStates[breakLevel]}
          </motion.div>

          {/* HITBOX INVISIBLE PERFECTAMENTE CENTRADO */}
          <div
            onClick={handleClick}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "260px",
              height: "260px",
              cursor: "pointer",
              zIndex: 5
            }}
          />

        </div>

        <p style={styles.text}>
          Toca el chocolate y rómpelo
        </p>

        <p style={styles.progressText}>
          {clicks} de 10 golpes
        </p>

        {clicks > 0 && clicks < 10 && (
          <motion.div
            key={clicks}
            initial={{ y: 0 }}
            animate={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6 }}
            style={styles.particle}
          >
            🔨
          </motion.div>
        )}

      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100dvh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    background: "#fff7e6",
    position: "relative",
    overflow: "hidden"
  },

  chocolateTop: {
    position: "absolute",
    top: -20,
    left: 0,
    width: "100%",
    height: "clamp(120px, 20vh, 220px)",
    zIndex: 0
  },

  floating1: {
    position: "absolute",
    top: "10%",
    left: "10%",
    fontSize: "40px",
    opacity: 0.8,
    zIndex: 2
  },

  floating2: {
    position: "absolute",
    bottom: "10%",
    right: "10%",
    fontSize: "40px",
    opacity: 0.8,
    zIndex: 2
  },

  card: {
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    color: "#fff",
    zIndex: 2
  },

  title: {
    fontSize: "20px",
    marginTop: "clamp(20px, 5vh, 60px)",
    fontWeight: "900",
    color: "#4d3800",
    marginBottom: "15px",
    whiteSpace: "nowrap"
  },

  progressBar: {
    width: "100%",
    height: "8px",
    background: "#4d3800",
    borderRadius: "20px",
    overflow: "hidden",
    marginBottom: "20px"
  },

  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, gold, orange)",
    width: "0%"
  },

  chocolate: {
    fontSize: "clamp(200px, 18vw, 260px)",
    marginBottom: "20px",
    userSelect: "none"
  },

  text: {
    fontSize: "15px",
    color: "#4d3800",
    fontWeight: "700",
    marginBottom: "10px"
  },

  progressText: {
    fontSize: "15px",
    fontWeight: "900",
    color: "#4d3800"
  },

  particle: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "100px"
  }
};