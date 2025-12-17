import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./AchievementCard.css";

export default function AchievementCards({ data }) {
  const achievements = data.achievements;
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const intervalRef = useRef();

  useEffect(() => {
    if (!isPaused && achievements?.length > 0) {
      intervalRef.current = setInterval(() => {
        setVisibleIndex((prev) => (prev + 1) % achievements.length);
      }, 4000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPaused, achievements?.length]);

  function Card({ ach }) {
    const cardRef = useRef(null);

    function handleMouseEnter() {
      setIsPaused(true);
    }

    function handleMouseLeave() {
      setIsPaused(false);
    }

    if (!ach) return null;

    return (
      <motion.div
        className="achievement-card"
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8 }}
        style={{ position: "absolute", width: "100%" }}
      >
        <div className="card-image-container">
          <img src={ach.image} alt={ach.title} className="achievement-img" />
        </div>
        <div className="card-content">
          <div className="card-header">
            <h3>{ach.title}</h3>
            <span className="category-badge">{ach.category}</span>
          </div>
          <p className="achievement-desc">{ach.description}</p>
          <div className="card-footer">
            <span className="date-awarded">
              {new Date(ach.dateAwarded).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="achievement-cards">
      <AnimatePresence mode="wait">
        {achievements?.length > 0 && (
          <Card
            key={achievements[visibleIndex]?.title}
            ach={achievements[visibleIndex]}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
