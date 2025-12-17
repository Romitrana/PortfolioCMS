import { useState, useEffect } from "react";
import UserNavbar from "../components/UserComponents/UserNavbar";
import styles from "./UserLayout.module.css";
import About from "../components/UserComponents/About";
import Scroll from "../components/UtilComponents/Scroll";
import Info from "../components/UserComponents/Info";
import LiquidSpaceSection from "../components/UtilComponents/Liquid-space-section";
import Skills from "../components/UserComponents/Skills";
import TestimonialCarousel from "../components/UserComponents/TestimonialCarousel";
import RocketScrollToTop from "../components/UtilComponents/RocketScrollToTop";
import ContactForm from "../components/UserComponents/ContactForm";
import Footer from "../components/UtilComponents/Footer";
import CertificateCarousel from "../components/UserComponents/CertificateCarousel";
import { useLoaderData } from "react-router-dom";

export default function UserLayout() {
  const data = useLoaderData();
  const {
    projects = [],
    skills = [],
    testimonials = [],
    achievements = [],
    certificates = [],
  } = data || {};
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Apply theme to body or root
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className={`${styles.userContainer} ${styles[theme]}`}>
      <Scroll />
      <UserNavbar theme={theme} toggleTheme={toggleTheme} />
      <main className={styles.userMain}>
        <About data={achievements} />
        <Info />
        <LiquidSpaceSection data={projects} />
        <Skills data={skills} />
        <CertificateCarousel certificates={certificates.certificates} />
        <TestimonialCarousel data={testimonials} />
      </main>
      <RocketScrollToTop />
      <ContactForm />
      <Footer />
    </div>
  );
}
