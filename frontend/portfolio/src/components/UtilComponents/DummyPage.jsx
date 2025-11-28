import React, { useEffect, useState, useRef, useCallback } from "react";
import styles from "./Dummy.module.css";

export default function DummyPage({ text, items = 5, cursorSpeed = 2500 }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef([]);

  const updateCursorPosition = useCallback((index) => {
    if (itemRefs.current[index]) {
      const el = itemRefs.current[index];
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--cursor-top', `${rect.top + rect.height / 2}px`);
      el.style.setProperty('--cursor-left', `${rect.left - 25}px`);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items);
    }, cursorSpeed);

    return () => clearInterval(interval);
  }, [cursorSpeed, items]);

  useEffect(() => {
    updateCursorPosition(activeIndex);
  }, [activeIndex, updateCursorPosition]);

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        {/* Pure Animation Menu */}
        <div className={styles.centeredMenu}>
          <div className={styles.menuList}>
            {Array.from({ length: items }).map((_, i) => (
              <div
                key={i}
                ref={(el) => (itemRefs.current[i] = el)}
                className={`${styles.menuItem} ${i === activeIndex ? styles.active : ''}`}
              >
                <div className={styles.shimmerBars}>
                  <div className={styles.bar1}></div>
                  <div className={styles.bar2}></div>
                </div>
                <div className={styles.glowOverlay}></div>
              </div>
            ))}
          </div>

          {/* Animated Cursor */}
          <div className={`${styles.cursor} ${styles.bouncing}`} />
        </div>

        {/* Content Below */}
        <div className={styles.contentCard}>
          <p className={styles.contentText}>{text}</p>
        </div>
      </div>
    </div>
  );
}
