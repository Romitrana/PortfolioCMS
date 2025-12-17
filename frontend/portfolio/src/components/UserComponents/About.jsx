import "./About.css";
import Center from "./Center";
import { useRef, useEffect } from "react";
import AchievementCards from "./AchievementCards";
import Typed from "typed.js";
import { motion } from "framer-motion";

const leftVariants = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: "easeOut" },
  },
};

const centerVariants = {
  hidden: { opacity: 0, y: -80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: "easeOut" },
  },
};

const rightVariants = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: "easeOut" },
  },
};

export default function About({data}) {
  const typedRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: ["Student", "Developer", "Coder", "Tech Lover"],
      typeSpeed: 70,
      backSpeed: 70,
      loop: true,
      backDelay: 1000,
    };

    const typed = new Typed(typedRef.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section className="about-container" id="home">
      <motion.aside id="left" initial="hidden" animate="visible" variants={leftVariants}>
        <h3>Hi, Myself</h3>
        <h1>Romit Rana</h1>
        <h3>
          And I'm a <span ref={typedRef} className="typewriter"></span>
        </h3>
        <p>
          I like to introduce myself as a Web Developer. I see myself as someone
          who can take on any challenge that is presented to me and find a way
          to overcome it. I am always looking for ways to improve my skills and
          learn new technologies.
        </p>

        <div className="social-media">
          <a href="https://www.facebook.com/romit.rana.10">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a
            href="https://www.instagram.com/rana__romit36/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a
            href="https://github.com/Romitrana"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-github"></i>
          </a>
          <a
            href="https://twitter.com/Romitrana259286"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-x-twitter"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/romit-rana/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
          <a
            href="https://leetcode.com/u/Romit_Rana/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-solid fa-code"></i>
          </a>
        </div>

        <a
          href="/assets/RomitRanaCV.pdf"
          id="resume"
          download="RomitRanaCV.pdf"
        >
          Download CV
        </a>
      </motion.aside>

      <motion.div id="center" initial="hidden" animate="visible" variants={centerVariants}>
        <Center />
      </motion.div>

      <motion.div id="right" initial="hidden" animate="visible" variants={rightVariants}>
        <AchievementCards data={data}/>
      </motion.div>
    </section>
  );
}
