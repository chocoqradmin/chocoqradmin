"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

type PrizeType =
  | "lose"
  | "small_discount"
  | "medium_discount"
  | "big_discount"
  | "accessory"
  | "retry";

interface ResultData {
  type: PrizeType;
  prize?: { name: string };
}

const prizeConfig: Record<PrizeType, any> = {
  lose: {
    title: "¡CASI LO LOGRAS!",
    emoji: "😣",
    color: "#707070",
    bg: "linear-gradient(135deg, #c9c9c9, #777)"
  },
  small_discount: {
    title: "¡DESCUENTO DE $10.000!",
    emoji: "😊",
    color: "#00d11c",
    bg: "linear-gradient(135deg, #00d11c, #00d11c)"
  },
  medium_discount: {
    title: "¡DESCUENTO DE $20.000!",
    emoji: "😃",
    color: "#00d11c",
    bg: "linear-gradient(135deg, #00d11c, #00d11c)"
  },
  big_discount: {
    title: "¡DESCUENTO DE $50.000!",
    emoji: "🥳",
    color: "#00d11c",
    bg: "linear-gradient(135deg, #00d11c, #00d11c)"
  },
  accessory: {
    title: "¡ACCESORIO GRATIS!",
    emoji: "😲",
    color: "#f3ba00",
    bg: "linear-gradient(135deg, #ccb800, #f3ba00)"
  },
  retry: {
    title: "¡OTRA OPORTUNIDAD!",
    emoji: "🔄",
    color: "#00a2ff",
    bg: "linear-gradient(135deg, #00a2ff, #00a2ff)"
  }
};

export default function Result() {
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  const router = useRouter();

  const winAudio = useRef<HTMLAudioElement | null>(null);
  const loseAudio = useRef<HTMLAudioElement | null>(null);
  const clickAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    winAudio.current = new Audio("/sounds/win.mp3");
    loseAudio.current = new Audio("/sounds/lose.mp3");
    clickAudio.current = new Audio("/sounds/click.mp3");

    winAudio.current.preload = "auto";
    loseAudio.current.preload = "auto";
    clickAudio.current.preload = "auto";
  }, []);

  const playWin = () => {
    if (!winAudio.current) return;
    winAudio.current.currentTime = 0;
    winAudio.current.volume = 0.6;
    winAudio.current.play();
  };

  const playLose = () => {
    if (!loseAudio.current) return;
    loseAudio.current.currentTime = 0;
    loseAudio.current.volume = 0.6;
    loseAudio.current.play();
  };

  const playClick = () => {
    if (!clickAudio.current) return;
    clickAudio.current.currentTime = 0;
    clickAudio.current.volume = 0.4;
    clickAudio.current.play();
  };

  const getPrize = (): ResultData => {
    const rand = Math.random() * 100;

    if (rand < 25) return { type: "lose", prize: { name: "Sigue intentando" } };
    if (rand < 45) return { type: "small_discount", prize: { name: "Desc. $10.000 en compras mayores a $50.000" } };
    if (rand < 70) return { type: "medium_discount", prize: { name: "Desc. $20.000 en compras mayores a $100.000" } };
    if (rand < 80) return { type: "big_discount", prize: { name: "Desc. $50.000 en compras mayores a $200.000" } };
    if (rand < 85) return { type: "accessory", prize: { name: "Accesorio gratis seleccionado por el negocio" } };
    return { type: "retry", prize: { name: "Tienes otra oportunidad" } };
  };

  const getRetryPrize = (): ResultData => {
    const options: ResultData[] = [
      { type: "lose", prize: { name: "Sigue intentando" } },
      { type: "small_discount", prize: { name: "Desc. $10.000 en compras mayores a $50.000" } },
      { type: "medium_discount", prize: { name: "Desc. $20.000 en compras mayores a $100.000" } }
    ];

    return options[Math.floor(Math.random() * options.length)];
  };

  useEffect(() => {
    const saved = sessionStorage.getItem("result");
    const retryFlag = sessionStorage.getItem("retry");

    let prize: ResultData;

    if (saved) {
      prize = JSON.parse(saved);
    } else {
      if (retryFlag === "true") {
        prize = getRetryPrize();
        sessionStorage.removeItem("retry");
      } else {
        prize = getPrize();
      }

      sessionStorage.setItem("result", JSON.stringify(prize));
    }

    setResult(prize);
    setLoading(false);

    setTimeout(() => {
      setShow(true);

      const soundShown = sessionStorage.getItem("sound_shown");

      if (!soundShown) {
        if (prize.type === "lose") {
          playLose();
        } else {
          playWin();
        }
        sessionStorage.setItem("sound_shown", "true");
      }

    }, 400);

    const alreadyShown = sessionStorage.getItem("confetti_shown");

    if (!alreadyShown && prize.type !== "lose") {
      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 }
        });

        setTimeout(() => {
          confetti({ particleCount: 80, spread: 120, origin: { x: 0.2, y: 0.5 } });
          confetti({ particleCount: 80, spread: 120, origin: { x: 0.8, y: 0.5 } });
        }, 300);

      }, 500);

      sessionStorage.setItem("confetti_shown", "true");
    }

  }, []);

  if (loading) {
    return (
      <div style={styles.container}>
        <svg style={styles.chocolateTop} viewBox="0 0 100 40" preserveAspectRatio="none">
          <path d="M0 0 H100 V26 C95 32,92 26,88 26 C85 26,83 30,80 30 C77 30,75 26,72 26 C69 26,67 36,64 36 C61 36,59 24,56 24 C53 24,51 30,48 30 C45 30,43 26,40 26 C37 26,35 36,32 36 C29 36,27 26,24 26 C21 26,19 32,16 32 C13 32,11 24,8 24 C5 24,2 32,0 32 Z"
            fill="#4d3800"
          />
        </svg>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{ fontSize: "50px", zIndex: 2 }}
        >
          🍫
        </motion.div>
      </div>
    );
  }

  const config = prizeConfig[result!.type];

  return (
    <div style={styles.container}>

      <svg style={styles.chocolateTop} viewBox="0 0 100 40" preserveAspectRatio="none">
        <path d="M0 0 H100 V26 C95 32,92 26,88 26 C85 26,83 30,80 30 C77 30,75 26,72 26 C69 26,67 36,64 36 C61 36,59 24,56 24 C53 24,51 30,48 30 C45 30,43 26,40 26 C37 26,35 36,32 36 C29 36,27 26,24 26 C21 26,19 32,16 32 C13 32,11 24,8 24 C5 24,2 32,0 32 Z"
          fill="#4d3800"
        />
      </svg>

      <motion.div style={styles.floating1} animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity }}>
        🎁
      </motion.div>

      <motion.div style={styles.floating2} animate={{ y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity }}>
        🎁
      </motion.div>

      {show && (
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={styles.card}
        >

          <motion.div
            style={{ ...styles.iconBox, background: config.bg }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span style={styles.icon}>{config.emoji}</span>
          </motion.div>

          <h1 style={{ ...styles.title, color: config.color }}>
            {result!.type === "lose" ? "¡Suerte la próxima!" : "¡FELICIDADES!"}
          </h1>

          <h2 style={styles.subtitle}>{config.title}</h2>

          {result!.prize?.name && (
            <p style={styles.prize}>{result!.prize.name}</p>
          )}

          {result!.type === "lose" ? (
            <button
              style={{ ...styles.button, background: "#707070" }}
              onClick={() => {
                playClick();
                sessionStorage.clear();
                router.push("/end");
              }}
            >
              FINALIZAR
            </button>

          ) : result!.type === "retry" ? (
            <button
              style={{ ...styles.button, background: config.bg }}
              onClick={() => {
                playClick();
                sessionStorage.setItem("retry", "true");
                sessionStorage.removeItem("result");
                sessionStorage.removeItem("sound_shown");
                sessionStorage.removeItem("confetti_shown");
                sessionStorage.removeItem("maxClicks"); // 🔥 agregado
                router.push("/game");
              }}
            >
              Volver a intentar
            </button>

          ) : (
            <button
              style={{ ...styles.button, background: config.bg }}
              onClick={() => {
                playClick();
                localStorage.setItem("prize", JSON.stringify(result));
                router.push("/claim");
              }}
            >
              Reclamar premio
            </button>
          )}

        </motion.div>
      )}
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
    padding: "30px",
    textAlign: "center",
    boxShadow: "0 25px 70px rgba(0,0,0,0.25)",
    zIndex: 2
  },

  iconBox: {
    width: "110px",
    height: "110px",
    borderRadius: "50%",
    margin: "0 auto 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  icon: { fontSize: "70px" },

  title: { fontSize: "20px", fontWeight: "900", marginBottom: "15px" },

  subtitle: { fontSize: "20px", fontWeight: "900", marginBottom: "15px", color: "#000000" },

  prize: {
    fontSize: "20px",
    marginBottom: "20px",
    color: "#000000"
  },

  button: {
    width: "100%",
    padding: "16px",
    borderRadius: "50px",
    border: "none",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer"
  }
};