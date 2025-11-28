import React, { useEffect, useState } from "react";
import styles from "./Dot.module.css";

const Dot = ({ size = 12 }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  return (
    <span
      className={`${styles.dot} ${isOnline ? styles.online : styles.offline}`}
      style={{ width: size, height: size }}
      title={isOnline ? "Online" : "Offline"}
    />
  );
};

export default Dot;
