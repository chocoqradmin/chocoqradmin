"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Intro() {
  const [accepted, setAccepted] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const router = useRouter();

  const clickSound = useRef<HTMLAudioElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null); 

  useEffect(() => {
    const audio = new Audio("/sounds/click.mp3");
    audio.volume = 0.4;
    audio.preload = "auto";
    clickSound.current = audio;
  }, []);

  // AUTO SCROLL DEMO (BAJA Y SUBE)
  useEffect(() => {
    if (showModal && scrollRef.current) {
      const el = scrollRef.current;

      setTimeout(() => {
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });

        setTimeout(() => {
          el.scrollTo({ top: 0, behavior: "smooth" });
        }, 700);

      }, 200);
    }
  }, [showModal]);

  const playClick = () => {
    if (!clickSound.current) return;
    clickSound.current.currentTime = 0;
    clickSound.current.play();
  };

  return (
    <div style={styles.container}>

      <svg style={styles.chocolateTop} viewBox="0 0 100 40" preserveAspectRatio="none">
        <path
          d="M0 0 H100 V26
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
            C5 24, 2 32, 0 32 Z"
          fill="#4d3800"
        />
      </svg>

      <motion.div
        style={styles.floating1}
        animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🎉
      </motion.div>

      <motion.div
        style={styles.floating2}
        animate={{ y: [0, 15, 0], rotate: [0, -10, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        🎁
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={styles.card}
      >

        <motion.div
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={styles.emoji}
        >
          🍫
        </motion.div>

        <motion.h1
          style={styles.title}
          animate={{ opacity: [1, 0.92, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <>
            JUEGA Y GANA TU <br />
            PREMIO !
          </>
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
              style={styles.checkbox}
            />
            <span>Acepto términos y condiciones</span>
          </label>
        </div>

        <motion.button
          disabled={!accepted}
          onClick={() => {
            playClick();
            router.push("/game");
          }}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: accepted ? 1.05 : 1 }}
          style={{
            ...styles.button,
            opacity: accepted ? 1 : 0.5
          }}
        >
          JUGAR AHORA
        </motion.button>

        <p
          style={{
            ...styles.warning,
            visibility: accepted ? "hidden" : "visible"
          }}
        >
          Debes aceptar para continuar
        </p>

      </motion.div>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>

            <div ref={scrollRef} style={styles.modalContent}>
              {/* AQUÍ SE APLICA EL SCROLL */}

              <h3 style={styles.modalTitle}>Condiciones</h3>

              <ul style={styles.modalList}>
                <li>• Juega solo en el punto</li>
                <li>• 1 intento por persona</li>
                <li>• +1 intento por compra</li>
                <li>• Máx. 2 intentos por persona</li>
                <li>• Resultado aleatorio</li>
                <li>• Premios con condiciones</li>
                <li>• No canjeable por dinero</li>
                <li>• No acumulable</li>
                <li>• Premios sujetos a disponibilidad</li>
                <li>• El premio debe validarse en el punto de atención</li>
                <li>• Redención válida únicamente el día de la participación</li>
              </ul>

              <h3 style={styles.modalTitle}>Términos</h3>

              <ul style={styles.modalList}>
                <li>• Participar implica aceptar términos</li>
                <li>• Es una actividad promocional</li>
                <li>• La organización podrá verificar participaciones duplicadas</li>
                <li>• Cualquier intento de manipulación anula la participación</li>
                <li>• En caso de fallas técnicas, la dinámica podrá ser ajustada</li>
              </ul>

              <p style={styles.modalNote}>
                🎥 Puede ser grabado con fines promocionales
              </p>

            </div>

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

      {/* SCROLL CAFÉ */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #e6d3a3;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: #4d3800;
          border-radius: 10px;
        }
      `}</style>

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
    zIndex: 1
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
    background: "rgba(255,255,255,0.95)",
    borderRadius: "30px",
    padding: "22px 16px",
    textAlign: "center",
    boxShadow: "0 25px 70px rgba(0,0,0,0.25)",
    zIndex: 2
  },

  emoji: {
    fontSize: "clamp(60px, 12vw, 80px)",
  },

  title: {
    fontSize: "clamp(20px, 5vw, 25px)",
    fontWeight: "900",
    color: "#4d3800",
    marginBottom: "15px"
  },

  text: {
    fontSize: "clamp(15px, 4vw, 18px)",
    color: "#000000",
    marginBottom: "15px"
  },

  termsBox: {
    background: "#fffb012c",
    padding: "10px",
    borderRadius: "15px",
    marginBottom: "15px",
    border: "1px solid #fffb01"
  },

  termsLabel: {
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    color: "#494949"
  },

  checkbox: {
    width: "18px",
    height: "18px",
    accentColor: "#4d3800",
    cursor: "pointer"
  },

  button: {
    width: "100%",
    padding: "16px",
    borderRadius: "50px",
    border: "none",
    background: "#4d3800",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  warning: {
    fontSize: "15px",
    color: "#7a7a7a",
    marginTop: "10px",
    height: "16px"
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    backdropFilter: "blur(5px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10
  },

  modal: {
    width: "90%",
    maxWidth: "350px",
    height: "500px",
    background: "#fff",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  },

  modalContent: {
    padding: "20px",
    overflowY: "auto",
    flex: 1,
    scrollbarColor: "#4d3800 #e6d3a3",
    scrollbarWidth: "thin"
  },

  modalTitle: {
    fontSize: "18px",
    textAlign: "center",
    fontWeight: "900",
    marginBottom: "10px",
    color: "#4d3800"
  },

  modalList: {
    textAlign: "left",
    fontSize: "15px",
    marginBottom: "10px",
    color: "#000000"
  },

  modalNote: {
    fontSize: "15px",
    textAlign: "center",
    marginTop: "25px",
    marginBottom: "25px",
    color: "#000000"
  },

  modalButton: {
    width: "100%",
    padding: "15px",
    border: "none",
    background: "#4d3800",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer"
  }
};