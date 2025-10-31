import React from "react";
import { motion } from "motion/react";
import styles from "./Info.module.css";
import profilePic from "/assets/romit5.jpg";

export default function Info() {
  return (
    <section className={styles.infoSection} id="info">
      <video
        className={styles.stars}
        src="/redSpace.mp4"
        autoPlay
        loop
        muted
      />
      <motion.img
        src={profilePic}
        alt="Romit Rana"
        className={styles.infoImg}
        initial={{ opacity: 0, x: -100, scale: 0.85 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      <motion.div
        className={styles.infoText}
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        <h2 className={styles.heading}>
          <span className={styles.highlightRed}>About</span>
          <span className={styles.highlightWhite}>Me</span>
        </h2>
        <h4 className={styles.subtitle}>Full-Stack Web Developer</h4>
        <p className={styles.paragraph}>
          Hey there, I'm Romit Rana, a soon-to-be MCA graduate from Lovely
          Professional University, Punjab. My passion for web development has
          been the driving force behind my love for learning and embracing new
          technologies. Currently immersed in the world of web development, I
          bring a creative touch to my projects, always aiming for that perfect
          blend of functionality and aesthetics. Excited about the prospect of
          leveraging my skills and ambition, I look forward to exploring new
          opportunities and challenges. Thanks for taking a moment to get to
          know me! 💖
        </p>
        <button className={styles.contactBtn}>Contact</button>
      </motion.div>
    </section>
  );
}
