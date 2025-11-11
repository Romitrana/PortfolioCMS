import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    // Update document body class and persist in localStorage
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <nav className={styles.navbar}>
      <div /> {/* Space for logo if needed */}
      <button
        className={styles.themeToggleBtn}
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        aria-label="Toggle theme"
        title="Toggle light/dark theme"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
      <button
        className={styles.logoutBtn}
        onClick={() => {
          // Insert logout logic here (e.g. clear tokens and redirect)
        }}
        aria-label="Logout"
        title="Logout"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
