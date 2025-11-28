import React, { useEffect } from "react";
import styles from "./MessageBox.module.css";

export default function MessageBox({
  message = "",
  backgroundColor = "#e3ffe3",
  borderColor = "#28a745",
  duration = 2500,
  onClose,
}) {
  // Prevent crash if onClose is missing
  const safeClose = typeof onClose === "function" ? onClose : () => {};

  useEffect(() => {
    const timer = setTimeout(() => safeClose(), duration);
    return () => clearTimeout(timer);
  }, [duration, safeClose]);

  return (
    <div
      className={`${styles.box} ${styles.drop}`}
      style={{
        backgroundColor,
        borderLeft: `6px solid ${borderColor}`,
      }}
    >
      <span className={styles.text}>{message}</span>

      <button className={styles.close} onClick={safeClose}>
        ✖
      </button>
    </div>
  );
}
