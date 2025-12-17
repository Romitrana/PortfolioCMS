import React, { useRef } from "react";
import styles from "./TestimonialCarousel.module.css";
import { motion, useAnimation } from "framer-motion";

export default function TestimonialCarousel({ data }) {
  const testimonials = data.testimonials;
  const carouselRef = useRef(null);
  const controls = useAnimation();

  // CSS animation pauses on container hover using group
  return (
    <div className={styles.carouselOuter} id="testimonials">
      <motion.div
        className={styles.carousel}
        ref={carouselRef}
        // Framer Motion only for hover-pause/resume
        onMouseEnter={() => controls.stop()}
        onMouseLeave={() => controls.start()}
      >
        <div className={styles.carouselTrack}>
          {/* Duplicate testimonials for infinite effect */}
          {[...testimonials, ...testimonials].map((t, i) => (
            <motion.div
              className={`${styles.card} ${t.featured ? styles.featured : ""}`}
              key={i}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 6px 32px rgba(59,211,199,0.21)",
              }}
            >
              <img src={t.photo} alt={t.name} className={styles.avatar} />
              <div className={styles.cardContent}>
                <span className={styles.cardRole}>{t.role}</span>
                <p className={styles.cardMessage}>"{t.message}"</p>
                <span className={styles.cardName}>- {t.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
