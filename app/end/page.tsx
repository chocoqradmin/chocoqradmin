"use client";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function End() {

  useEffect(() => {
    // 🔥 limpia sesión automáticamente al entrar
    sessionStorage.clear();
    localStorage.removeItem("prize");

    // 🔥 evita volver atrás con datos (bloquea historial útil)
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };

    // 🔥 evita cache (cuando regresan no carga estado anterior)
    window.addEventListener("pageshow", (event) => {
      if (event.persisted) {
        window.location.reload();
      }
    });

  }, []);

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
        style={styles.card}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >

        <div style={styles.iconBox}>
          🍫
        </div>

        <h1 style={styles.title}>
          HAS LLEGADO AL FINAL !
        </h1>

        <p style={styles.subtext}>
          Puedes cerrar esta pestaña
        </p>

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

  card: {
    width: "100%",
    maxWidth: "400px",
    background: "#fff",
    borderRadius: "30px",
    padding: "30px",
    textAlign: "center",
    boxShadow: "0 25px 70px rgba(0,0,0,0.25)",
    zIndex: 2
  },

  iconBox: {
    fontSize: "60px",
    marginBottom: "15px"
  },

  title: {
    fontSize: "22px",
    fontWeight: "900",
    marginBottom: "15px",
    color: "#4d3800"
  },

  subtext: {
    fontSize: "15px",
    color: "#555"
  }
};