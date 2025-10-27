import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./AchievementCard.css";
const achievements = [
  { image: "/assets/c.png", title: "Achievement 1", desc: "Description 1" },
  {
    image: "/assets/nodejs.png",
    title: "Achievement 2",
    desc: "Description 2",
  },
  {
    image: "/assets/python.png",
    title: "Achievement 3",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis fugit recusandae nulla natus ipsum possimus et officiis debitis,",
  },
];

export default function AchievementCards() {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const intervalRef = useRef();

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setVisibleIndex((prev) => (prev + 1) % achievements.length);
      }, 4000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  function Card({ ach }) {
    const cardRef = useRef(null);

    function handleMouseMove(e) {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const cardX = rect.left + rect.width / 2;
      const cardY = rect.top + rect.height / 2;
      const offsetX = e.clientX - cardX;
      const offsetY = e.clientY - cardY;
      const rotateX = -(offsetY / rect.height) * 18; // more pronounced tilt
      const rotateY = (offsetX / rect.width) * 18;

      // Responsive scale: max 1.04, min 1.00
      const scale =
        1.03 -
        ((Math.abs(offsetX) + Math.abs(offsetY)) / (rect.width + rect.height)) *
          0.05;

      // Glow/shadow effect based on movement
      const glowStrength = Math.min(20, Math.abs(rotateX) + Math.abs(rotateY));
      card.style.transform = `scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.boxShadow = `0 10px ${
        30 + glowStrength
      }px rgba(217, 83, 79, 0.18), 0 2px 8px rgba(0,0,0,0.10)`;
      card.style.transition = "transform 0.12s, box-shadow 0.2s";
    }

    function handleMouseEnter() {
      setIsPaused(true);
    }
    function handleMouseLeave() {
      setIsPaused(false);
      const card = cardRef.current;
      if (card) {
        card.style.transform = "scale(1) rotateX(0deg) rotateY(0deg)";
        card.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
        card.style.transition =
          "transform 0.65s cubic-bezier(.25,.8,.25,1), box-shadow 0.5s";
      }
    }

    return (
      <motion.div
        className="achievement-card"
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8 }}
        style={{ position: "absolute", width: "100%" }}
      >
        <img src={ach.image} alt={ach.title} className="achievement-img" />
        <h3>{ach.title}</h3>
        <p>{ach.desc}</p>
      </motion.div>
    );
  }

  return (
    <div className="achievement-cards">
      <AnimatePresence mode="wait">
        <Card
          key={achievements[visibleIndex].title}
          ach={achievements[visibleIndex]}
        />
      </AnimatePresence>
    </div>
  );
}
