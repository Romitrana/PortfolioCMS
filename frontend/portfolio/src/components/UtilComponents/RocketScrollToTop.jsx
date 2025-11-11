import React, { useState, useEffect } from "react";
import styles from "./RocketScrollToTop.module.css";

const RocketScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    visible && (
      <button
        className={styles.rocketButton}
        onClick={handleScrollToTop}
        aria-label="Scroll to top"
      >
        <span className={styles.rocketIcon}>
         <i class="fa-solid fa-rocket"></i>
        </span>
      </button>
    )
  );
};

export default RocketScrollToTop;
