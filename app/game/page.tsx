"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Game() {
  const [clicks, setClicks] = useState<number>(0);
  const [finished, setFinished] = useState<boolean>(false);
  const [maxClicks, setMaxClicks] = useState<number>(10);
  const [crumbs, setCrumbs] = useState<any[]>([]);
  const router = useRouter();

  const controls = useAnimation();

  const breakSound = useRef<HTMLAudioElement | null>(null);
  const lastPlay = useRef(0);

  useEffect(() => {
    const audio = new Audio("/sounds/break.mp3");
    audio.volume = 0.7;
    audio.preload = "auto";
    breakSound.current = audio;

    const storedClicks = sessionStorage.getItem("maxClicks");

    if (storedClicks) {
      setMaxClicks(parseInt(storedClicks));
    } else {
      const randomClicks = Math.floor(Math.random() * 3) + 3;
      sessionStorage.setItem("maxClicks", String(randomClicks));
      setMaxClicks(randomClicks);
    }
  }, []);

  const playBreak = () => {
    const now = Date.now();
    if (now - lastPlay.current < 80) return;
    lastPlay.current = now;

    if (!breakSound.current) return;

    const sound = breakSound.current.cloneNode(true) as HTMLAudioElement;
    sound.volume = 0.7;
    sound.playbackRate = 0.9 + Math.random() * 0.2;
    sound.play().catch(() => {});
  };

  const vibrate = () => {
    if (navigator.vibrate) {
      navigator.vibrate(40);
    }
  };

  const shake = () => {
    controls.start({
      scale: [1, 0.88, 1.04, 0.97, 1],
      transition: {
        duration: 0.22,
        ease: "easeOut"
      }
    });
  };

  const spawnCrumbs = () => {
    const newCrumbs = Array.from({ length: 8 }).map(() => ({
      id: Math.random(),
      x: (Math.random() - 0.5) * 140,
      y: (Math.random() - 0.5) * 140,
      rotate: Math.random() * 360,
      scale: 0.6 + Math.random() * 0.6
    }));

    setCrumbs((prev) => [...prev, ...newCrumbs]);

    setTimeout(() => {
      setCrumbs((prev) => prev.slice(newCrumbs.length));
    }, 500);
  };

  const handleClick = () => {
    if (finished) return;

    playBreak();
    vibrate();
    shake();
    spawnCrumbs();

    setClicks((prev) => {
      const newClicks = prev + 1;

      if (newClicks === maxClicks) {
        setFinished(true);

        setTimeout(() => {
          router.push("/result");
        }, 900);
      }

      return newClicks;
    });
  };

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
          {clicks > 0 && (
            <motion.div
              key={clicks}
              style={styles.progressFill}
              initial={{ width: "0%" }}
              animate={{ width: ["0%", "100%", "0%"] }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          )}
        </div>

        <div style={{ position: "relative", display: "inline-block" }}>

          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >

            <motion.div
              animate={controls}
              whileTap={{ scale: finished ? 1 : 0.95 }}
              style={{
                ...styles.chocolate,
                cursor: finished ? "default" : "pointer",
              }}
            >
              {clicks < maxClicks ? (
                <img
                  src="/images/choco.png"
                  style={styles.image}
                  draggable={false}
                />
              ) : (
                <img
                  src="/images/gift.png"
                  style={styles.image}
                  draggable={false}
                />
              )}
            </motion.div>

          </motion.div>

          <div onClick={handleClick} style={styles.hitbox} />

          {crumbs.map((crumb) => (
            <motion.img
              key={crumb.id}
              src="/images/parti.png"
              initial={{ x: 0, y: 0, opacity: 1, scale: crumb.scale }}
              animate={{
                x: crumb.x,
                y: crumb.y,
                rotate: crumb.rotate
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "12px",
                pointerEvents: "none",
                transform: "translate(-50%, -50%)"
              }}
            />
          ))}

        </div>

        {clicks > 0 && clicks < maxClicks && (
          <motion.div
            key={clicks + "particle"}
            initial={{ y: 0 }}
            animate={{ opacity: 0, y: -60 }}
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
    maxWidth: "420px",
    textAlign: "center",
    zIndex: 2
  },

  title: {
    fontSize: "22px",
    fontWeight: "900",
    color: "#4d3800",
    marginBottom: "15px"
  },

  progressBar: {
    width: "100%",
    height: "8px",
    background: "#4d3800",
    borderRadius: "20px",
    overflow: "hidden",
    marginBottom: "40px"
  },

  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, gold, orange)",
    width: "0%"
  },

  chocolate: {
    marginBottom: "20px",
    userSelect: "none"
  },

  // 🔥 MÁS GRANDE EN CELULAR
  image: {
    width: "clamp(260px, 70vw, 300px)",
    height: "auto",
    userSelect: "none",
    pointerEvents: "none",
    marginBottom: "20px"
  },

  hitbox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "clamp(260px, 70vw, 300px)",
    height: "clamp(260px, 70vw, 300px)",
    cursor: "pointer",
    zIndex: 5
  },

  particle: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "120px"
  }
};