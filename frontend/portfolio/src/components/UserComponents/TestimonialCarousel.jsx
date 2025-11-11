import React, { useRef } from "react";
import styles from "./TestimonialCarousel.module.css";
import { motion, useAnimation } from "framer-motion";

// Example testimonial data, shape matches your Mongoose schema
const testimonials = [
  {
    name: "Alice Nguyen",
    role: "Client",
    message: "Romit delivered superb work! Attention to detail is impeccable.",
    photo: "https://randomuser.me/api/portraits/women/31.jpg",
    featured: false,
    createdAt: "2025-04-18",
  },
  {
    name: "John Smith",
    role: "Colleague",
    message: "Always creative and reliable. Love collaborating with Romit.",
    photo: "https://randomuser.me/api/portraits/men/18.jpg",
    featured: false,
    createdAt: "2025-03-01",
  },
  {
    name: "Priya Gupta",
    role: "Mentor",
    message: "Romit grew so fast as a developer. Superb mentoring experience!",
    photo: "https://randomuser.me/api/portraits/women/12.jpg",
    featured: true,
    createdAt: "2025-03-15",
  },
  // Add more testimonials as needed
];

export default function TestimonialCarousel() {
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
