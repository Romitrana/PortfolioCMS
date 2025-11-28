import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/login", { replace: true });
  };

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
        onClick={handleLogout}
        aria-label="Logout"
        title="Logout"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
