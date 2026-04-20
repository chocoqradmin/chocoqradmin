"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Intro() {
  const [accepted, setAccepted] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const router = useRouter();

  const playClick = () => {
    const audio = new Audio("/sounds/click.wav");
    audio.volume = 0.4;
    audio.play();
  };

  return (
    <div style={styles.container}>

      <svg style={styles.chocolateTop} viewBox="0 0 100 40" preserveAspectRatio="none">
        <path d="M0 0 H100 V26 C95 32,92 26,88 26 C85 26,83 30,80 30 C77 30,75 26,72 26 C69 26,67 36,64 36 C61 36,59 24,56 24 C53 24,51 30,48 30 C45 30,43 26,40 26 C37 26,35 36,32 36 C29 36,27 26,24 26 C21 26,19 32,16 32 C13 32,11 24,8 24 C5 24,2 32,0 32 Z" fill="#4d3800"/>
      </svg>

      <motion.div style={styles.floating1} animate={{ y:[0,-20,0], rotate:[0,10,-10,0] }} transition={{ duration:4, repeat:Infinity }}>🎉</motion.div>
      <motion.div style={styles.floating2} animate={{ y:[0,15,0], rotate:[0,-10,10,0] }} transition={{ duration:5, repeat:Infinity }}>🎁</motion.div>

      <motion.div
        initial={{ scale:0.8, opacity:0, y:50 }}
        animate={{ scale:1, opacity:1, y:0 }}
        transition={{ duration:0.6 }}
        style={styles.card}
      >

        <motion.div
          whileTap={{ scale:0.9 }}
          animate={{ rotate:[0,5,-5,0] }}
          transition={{ duration:2, repeat:Infinity }}
          style={styles.emoji}
        >
          🍫
        </motion.div>

        <motion.h1
          style={styles.title}
          animate={{ opacity:[1,0.92,1] }}
          transition={{ duration:2.5, repeat:Infinity }}
        >
          JUEGA Y GANA TU PREMIO !
        </motion.h1>

        <p style={styles.text}>
          Rompe el chocolate y descubre el premio que te espera
        </p>

        <div style={styles.termsBox}>
          <label style={styles.termsLabel}>
            <input
              type="checkbox"
              checked={accepted}
              onClick={(e) => {
                e.preventDefault();
                playClick();
                setShowModal(true);
              }}
              readOnly
            />
            Acepto términos y condiciones
          </label>
        </div>

        <motion.button
          disabled={!accepted}
          onClick={() => {
            playClick();
            router.push("/game");
          }}
          whileTap={{ scale:0.95 }}
          whileHover={{ scale: accepted ? 1.05 : 1 }}
          style={{ ...styles.button, opacity: accepted ? 1 : 0.5 }}
        >
          JUGAR AHORA
        </motion.button>

        <p style={{ ...styles.warning, visibility: accepted ? "hidden" : "visible" }}>
          Debes aceptar para continuar
        </p>

      </motion.div>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>

            <h3 style={styles.modalTitle}>Condiciones</h3>

            <ul style={styles.modalList}>
              <li>• Juega solo en el punto</li>
              <li>• 1 intento por persona</li>
              <li>• +1 intento por compra</li>
              <li>• Max 2 intentos por persona</li>
              <li>• Resultado aleatorio</li>
              <li>• Premios con condiciones</li>
              <li>• No canjeable por dinero</li>
              <li>• No acumulable</li>
            </ul>

            <h3 style={styles.modalTitle}>Términos</h3>

            <ul style={styles.modalList}>
              <li>• Participar implica aceptar términos</li>
              <li>• Es una Actividad promocional</li>
            </ul>

            <p style={styles.modalNote}>
              Puede ser grabado con fines promocionales
            </p>

            <button
              style={styles.modalButton}
              onClick={() => {
                playClick();
                setAccepted(true);
                setShowModal(false);
              }}
            >
              Acepto
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: "100dvh", // 🔥 fix móvil
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "12px",
    background: "#fff7e6",
    position: "relative",
    overflow: "hidden"
  },

  chocolateTop: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "clamp(100px, 18vh, 200px)",
    zIndex: 1
  },

  floating1: {
    position: "absolute",
    top: "10%",
    left: "10%",
    fontSize: "clamp(24px,5vw,40px)",
    zIndex: 2
  },

  floating2: {
    position: "absolute",
    bottom: "10%",
    right: "10%",
    fontSize: "clamp(24px,5vw,40px)",
    zIndex: 2
  },

  card: {
    width: "100%",
    maxWidth: "400px",
    maxHeight: "92dvh", // 🔥 evita corte
    overflow: "hidden",
    background: "rgba(255,255,255,0.95)",
    borderRadius: "30px",
    padding: "20px 16px", // 🔥 ajustado
    textAlign: "center",
    boxShadow: "0 25px 70px rgba(0,0,0,0.25)",
    zIndex: 2
  },

  emoji: {
    fontSize: "clamp(50px,10vw,80px)",
  },

  title: {
    fontSize: "clamp(18px,4vw,25px)",
    fontWeight: "900",
    color: "#4d3800",
    marginBottom: "10px"
  },

  text: {
    fontSize: "clamp(14px,3.5vw,18px)",
    marginBottom: "12px"
  },

  termsBox: {
    padding: "10px",
    borderRadius: "15px",
    marginBottom: "16px",
    border: "1px solid #fffb01"
  },

  termsLabel: {
    fontSize: "clamp(13px,3vw,16px)",
    display: "flex",
    justifyContent: "center",
    gap: "8px"
  },

  button: {
    width: "100%",
    padding: "14px",
    borderRadius: "50px",
    border: "none",
    background: "#4d3800",
    color: "#fff",
    fontSize: "clamp(14px,3.5vw,18px)",
    fontWeight: "bold",
    cursor: "pointer"
  },

  warning: {
    fontSize: "12px",
    marginTop: "8px",
    height: "16px"
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10
  },

  modal: {
    width: "90%",
    maxWidth: "350px",
    background: "#fff",
    borderRadius: "20px",
    padding: "20px"
  },

  modalTitle: {
    fontSize: "16px",
    fontWeight: "900",
    marginBottom: "10px"
  },

  modalList: {
    textAlign: "left",
    fontSize: "14px",
    marginBottom: "10px"
  },

  modalNote: {
    fontSize: "14px",
    marginTop: "20px",
    marginBottom: "20px"
  },

  modalButton: {
    width: "100%",
    padding: "14px",
    borderRadius: "50px",
    border: "none",
    background: "#4d3800",
    color: "#fff",
    fontWeight: "bold"
  }
};