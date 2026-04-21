"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Claim() {
  const [followed, setFollowed] = useState(false);
  const [redeemed, setRedeemed] = useState(false);
  const [prize, setPrize] = useState<{ name: string }>({ name: "Cargando..." });

  useEffect(() => {
    const savedPrize = localStorage.getItem("prize");

    if (savedPrize) {
      const parsed = JSON.parse(savedPrize);
      setPrize({ name: parsed.prize?.name || "Premio especial" });
    }

    // 👇 NUEVO: recuperar estado de sesión
    const followedSession = sessionStorage.getItem("followed");
    const redeemedSession = sessionStorage.getItem("redeemed");

    if (followedSession === "true") setFollowed(true);
    if (redeemedSession === "true") setRedeemed(true);

  }, []);

  // 🔊 SONIDO CLICK
  const playClick = () => {
    const audio = new Audio("/sounds/click.wav");
    audio.volume = 0.4;
    audio.play();
  };

  const handleFollow = () => {
    playClick(); // 🔊 sonido
    window.location.href = "instagram://user?username=yayato.choco";
    setFollowed(true);

    // NUEVO: guardar en sesión
    sessionStorage.setItem("followed", "true");
  };

  const handleRedeem = () => {
    playClick(); // 🔊 sonido
    setRedeemed(true);

    // NUEVO: guardar en sesión
    sessionStorage.setItem("redeemed", "true");

   // IR A GRACIAS DESPUÉS DE 3 SEGUNDOS
  setTimeout(() => {
    window.location.href = "/thanks";
   }, 3000);
  };

  return (
    <div style={styles.container}>

      {/* FONDO CHOCOLATE */}
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
        animate={{
          y: [0, -25, 0],
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🏆
      </motion.div>

      <motion.div
        style={styles.floating2}
        animate={{
          y: [0, 20, 0],
          rotate: [0, -10, 10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🍫
      </motion.div>

      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={styles.card}
      >

        <div style={styles.iconBox}>🎁</div>

        <h1 style={styles.title}>¡Casi es tuyo!</h1>

        <p style={styles.subtitle}>Has ganado:</p>

        <div style={styles.prizeBox}>
          {prize.name}
        </div>

        <div style={styles.step}>
          <span style={styles.stepNumber}>1</span>
          <p style={styles.stepText}>Sigue nuestra cuenta</p>
        </div>

        <motion.button
          onClick={handleFollow}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          style={{
            ...styles.instaButton,
            background: followed ? "#00c851" : "#000000"
          }}
        >
          {followed ? "✔ Cuenta seguida" : "Seguir en Instagram"}
        </motion.button>

        <div style={styles.step}>
          <span style={styles.stepNumber}>2</span>
          <p style={styles.stepText}>Muestra este premio en caja</p>
        </div>

        <motion.button
          disabled={!followed || redeemed}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: followed ? 1.05 : 1 }}
          onClick={handleRedeem}
          style={{
            ...styles.claimButton,
            opacity: followed ? 1 : 0.5,
            background: redeemed ? "#00c851" : "#000000"
          }}
        >
          {redeemed ? "✔ Mostrado en caja" : "Mostrar en caja"}
        </motion.button>

        <div style={styles.termsBox}>
          <p style={styles.termsTitle}>Importante:</p>
          <ul style={styles.termsList}>
            <li>• Premios no acumulables</li>
            <li>• Juega solo en el punto</li>
            <li>• Reclama tu premio ahora</li>
          </ul>
        </div>

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
    top: "6%",
    left: "10%",
    fontSize: "40px",
    zIndex: 2
  },

  floating2: {
    position: "absolute",
    bottom: "6%",
    right: "10%",
    fontSize: "40px",
    zIndex: 2
  },

  card: {
    width: "100%",
    maxWidth: "400px",
    background: "rgba(255,255,255,0.95)",
    borderRadius: "30px",
    padding: "30px",
    textAlign: "center",
    boxShadow: "0 25px 70px rgba(0,0,0,0.25)",
    zIndex: 2
  },

  iconBox: {
    fontSize: "40px",
  },

  title: {
    fontSize: "20px",
    fontWeight: "900",
    marginBottom: "10px",
    color: "#000000"
  },

  subtitle: {
    fontSize: "12px",
    color: "#000000",
    marginBottom: "10px"
  },

  prizeBox: {
    fontSize: "12px",
    fontWeight: "bold",
    marginBottom: "15px",
    padding: "12px",
    borderRadius: "15px",
    background: "#fffad1",
    border: "2px dashed #ffe600",
    color: "#000"
  },

  step: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "8px"
  },

  stepNumber: {
    background: "#000000",
    color: "#fff",
    borderRadius: "50%",
    width: "18px",
    height: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "bold"
  },

  stepText: {
    fontSize: "12px",
    color: "#000000"
  },

  instaButton: {
    width: "100%",
    padding: "10px",
    borderRadius: "50px",
    border: "none",
    color: "#fff",
    fontWeight: "bold",
    marginBottom: "10px",
    cursor: "pointer"
  },

  claimButton: {
    width: "100%",
    padding: "10px",
    borderRadius: "50px",
    border: "none",
    color: "#fff",
    fontWeight: "bold",
    marginBottom: "10px",
    cursor: "pointer"
  },

  termsBox: {
    marginTop: "5px",
    background: "#f5f5f5",
    padding: "10px",
    borderRadius: "12px",
    textAlign: "left"
  },

  termsTitle: {
    fontSize: "12px",
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#000"
  },

  termsList: {
    paddingLeft: "12px",
    margin: 0,
    fontSize: "14px",
    color: "#555",
    lineHeight: "1"
  }
};