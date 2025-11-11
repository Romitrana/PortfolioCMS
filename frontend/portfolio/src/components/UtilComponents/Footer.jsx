
import styles from "./Footer.module.css";
import logo from "/portLogo.png";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; 2025 <img src={logo} alt="logo" className={styles.logo} />
        Romit Rana | All rights reserved.
      </p>
      <ul className={styles.socialList}>
        <li>
          <a href="#" aria-label="Facebook">
            <i className="fa-brands fa-square-facebook"></i>
          </a>
        </li>
        <li>
          <a href="#" aria-label="Instagram">
            <i className="fa-brands fa-instagram"></i>
          </a>
        </li>
        <li>
          <a href="#" aria-label="Twitter">
            <i className="fa-brands fa-twitter"></i>
          </a>
        </li>
        <li>
          <a href="#" aria-label="GitHub">
            <i className="fa-brands fa-github"></i>
          </a>
        </li>
      </ul>
    </footer>
  );
}
