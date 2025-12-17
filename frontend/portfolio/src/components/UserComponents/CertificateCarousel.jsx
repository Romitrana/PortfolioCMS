// CertificateCarousel.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./CertificateCarousel.module.css";

const CertificateCarousel = ({ certificates }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isAutoPlay || certificates.length === 0) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % certificates.length);
    }, 4000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [certificates.length, isAutoPlay]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % certificates.length);
    setIsAutoPlay(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
    setIsAutoPlay(false);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  if (!certificates || certificates.length === 0) {
    return (
      <div className={styles.certificateEmpty}>
        <p>No certificates available</p>
      </div>
    );
  }

  return (
    <div className={styles.certificateCarouselContainer}>
      {/* Main Carousel Track */}
      <div className={styles.carouselTrack}>
        <motion.div
          className={styles.carouselInner}
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.6 
          }}
        >
          {certificates.map((cert, index) => (
            <motion.div
              key={cert._id || index}
              className={styles.certificateSlide}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className={styles.certificateCard}>
                <div className={styles.certificateImage}>
                  <img
                    src={cert.image || "/api/placeholder/400/300"}
                    alt={cert.title}
                    loading="lazy"
                  />
                </div>
                <div className={styles.certificateContent}>
                  <h3 className={styles.certificateTitle}>{cert.title}</h3>
                  {cert.description && (
                    <p className={styles.certificateDesc}>{cert.description}</p>
                  )}
                  <div className={styles.certificateMeta}>
                    <span className={styles.issuer}>{cert.issuer}</span>
                    <span className={styles.issueDate}>
                      {new Date(cert.issueDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Controls */}
      <div className={styles.carouselNav}>
        <button
          className={`${styles.navBtn} ${styles.prevBtn}`}
          onClick={handlePrev}
          aria-label="Previous certificate"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>

        <div className={styles.dotsContainer}>
          {certificates.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.active : ""}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to certificate ${index + 1}`}
            />
          ))}
        </div>

        <button
          className={`${styles.navBtn} ${styles.nextBtn}`}
          onClick={handleNext}
          aria-label="Next certificate"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
          </svg>
        </button>
      </div>

      {/* Auto-play toggle */}
      <div className={styles.autoplayToggle}>
        <label className={styles.toggleLabel}>
          <input
            type="checkbox"
            checked={isAutoPlay}
            onChange={(e) => setIsAutoPlay(e.target.checked)}
          />
          <span className={styles.toggleSwitch}></span>
          Auto-rotate
        </label>
      </div>
    </div>
  );
};

export default CertificateCarousel;
