import { useState, useEffect } from "react";
import styles from "./UserNavbar.module.css";
import logo from "/portLogo.png";
import Tab from "./Tab";

const UserNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <nav className={`${styles.navbar} ${styles[theme]}`}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>

        <div className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}>
          <ul>
            <Tab type="Home" url="#home" d={0.2}/>
            <Tab type="About" url="#info" d={0.4}/>
            <Tab type="Blogs" url="#blog" d={0.6}/>
            <Tab type="Projects" url="#projects" d={0.8}/>
            <Tab type="Skills" url="#skills" d={1}/>
            <Tab type="Testimonials" url="#testimonials" d={1.2}/>
          </ul>
        </div>

        <div className={styles.rightControls}>
          <button className={styles.themeToggle} onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <div className={styles.menuToggle} onClick={toggleMenu}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
