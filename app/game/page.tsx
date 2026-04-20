"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Game() {
  const [clicks, setClicks] = useState<number>(0);
  const [finished, setFinished] = useState<boolean>(false);
  const router = useRouter();

  // 🔊 SONIDO BREAK
  const playBreak = () => {
    const audio = new Audio("/sounds/break.mp3");
    audio.volume = 0.7;
    audio.currentTime = 0;
    audio.play();
  };

  const handleClick = () => {
    if (finished) return;

    playBreak(); // 🔊 SONIDO EN CADA TOQUE

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

  const chocolateStates = [
    "🍫",
    "🍫",
    "🍫",
    "🍫",
    "🍫",
    "🎁"
  ];

  const breakLevel = Math.floor((clicks / 10) * 5);

  return (
    <div style={styles.container}>

      {/* 🔥 FONDO CHOCOLATE */}
      <svg style={styles.chocolateTop} viewBox="0 0 100 40" preserveAspectRatio="none">
        <path
          d="
            M0 0 
            H100 
            V26

            C95 32, 92 26, 88 26
            C85 26, 83 30, 80 30
            C77 30, 75 26, 72 26
            C69 26, 67 36, 64 36
            C61 36, 59 24, 56 24
            C53 24, 51 30, 48 30
            C45 30, 43 26, 40 26
            C37 26, 35 36, 32 36
            C29 36, 27 26, 24 26
            C21 26, 19 32, 16 32
            C13 32, 11 24, 8 24

            C5 24, 2 32, 0 32
            Z
          "
          fill="#4d3800"
        />
      </svg>

      {/* FLOTANTES */}
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

        <h1 style={styles.title}>
          ROMPE EL CHOCOLATE !
        </h1>

        <div style={styles.progressBar}>
          <motion.div
            style={styles.progressFill}
            animate={{ width: `${progress}%` }}
          />
        </div>

        <motion.div
          onClick={handleClick}
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
    minHeight: "100vh",
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
    top: 0,
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
    fontSize: "clamp(24px, 6vw, 32px)",
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
    fontSize: "clamp(200px, 20vw, 130px)",
    marginBottom: "20px",
    userSelect: "none"
  },

  text: {
    fontSize: "18px",
    color: "#4d3800",
    fontWeight: "700",
    marginBottom: "10px"
  },

  progressText: {
    fontSize: "18px",
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