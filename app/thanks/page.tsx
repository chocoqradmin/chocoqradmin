"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";

export default function Thanks() {

  const router = useRouter();

  const clickAudio = useRef<HTMLAudioElement | null>(null);
  const winAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {

    clickAudio.current = new Audio("/sounds/click.mp3");
    clickAudio.current.preload = "auto";
    clickAudio.current.volume = 0.4;

    winAudio.current = new Audio("/sounds/win.mp3");
    winAudio.current.preload = "auto";
    winAudio.current.volume = 0.5;

    const confettiShown = sessionStorage.getItem("thanks_confetti");

    if (!confettiShown) {
      setTimeout(() => {

        if (winAudio.current) {
          winAudio.current.currentTime = 0;
          winAudio.current.play();
        }

        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 }
        });

        setTimeout(() => {
          confetti({ particleCount: 80, spread: 120, origin: { x: 0.2, y: 0.5 } });
          confetti({ particleCount: 80, spread: 120, origin: { x: 0.8, y: 0.5 } });
        }, 300);

      }, 400);

      sessionStorage.setItem("thanks_confetti", "true");
    }

  }, []);

  const playClick = () => {
    if (!clickAudio.current) return;
    clickAudio.current.currentTime = 0;
    clickAudio.current.play();
  };

  const handleFinish = () => {
    playClick();
    sessionStorage.clear();
    router.push("/end");
  };

  const handleBackToClaim = () => {
    playClick();
    router.push("/claim");
  };

  return (
    <div style={styles.container}>

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

      <motion.div
        style={styles.floating1}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🎉
      </motion.div>

      <motion.div
        style={styles.floating2}
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        🥳
      </motion.div>

      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={styles.card}
      >

        <div style={styles.iconBox}>
          🎁
        </div>

        <h1 style={styles.title}>
          <>
            GRACIAS <br />
            POR PARTICIPAR
          </>
        </h1>

        <p style={styles.subtext}>
          ¡Te esperamos pronto para más <br /> sorpresas!
        </p>

        {/* 🔥 BOTÓN VER PREMIO ARRIBA */}
        <motion.button
          onClick={handleBackToClaim}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          style={styles.secondaryButton}
        >
          Ver premio
        </motion.button>

        {/* 🔥 FINALIZAR ABAJO */}
        <motion.button
          onClick={handleFinish}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          style={styles.button}
        >
          FINALIZAR
        </motion.button>

      </motion.div>

    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100dvh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff7e6",
    position: "relative",
    padding: "20px",
    overflow: "hidden"
  },

  chocolateTop: {
    position: "absolute",
    top: -20,
    left: 0,
    width: "100%",
    height: "clamp(120px, 20vh, 220px)",
    zIndex: 1
  },

  floating1: {
    position: "absolute",
    top: "10%",
    left: "10%",
    fontSize: "40px",
    zIndex: 2
  },

  floating2: {
    position: "absolute",
    bottom: "10%",
    right: "10%",
    fontSize: "40px",
    zIndex: 2
  },

  card: {
    width: "100%",
    maxWidth: "400px",
    background: "#fff",
    borderRadius: "30px",
    padding: "20px 30px 40px",
    textAlign: "center",
    boxShadow: "0 25px 70px rgba(0,0,0,0.25)",
    zIndex: 2
  },

  iconBox: {
    fontSize: "40px",
    marginBottom: "10px"
  },

  title: {
    fontSize: "22px",
    fontWeight: "900",
    marginBottom: "15px",
    color: "#4d3800"
  },

  subtext: {
    fontSize: "15px",
    color: "#000000",
    marginBottom: "20px"
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "50px",
    border: "none",
    background: "#4d3800",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "10px"
  },

  // Boton Ver Premio

  secondaryButton: {
    width: "100%",
    padding: "10px",
    borderRadius: "15px", // menos redondeado
    border: "2px solid #4d3800",
    background: "transparent",
    color: "#4d3800",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "25px"
  }
};