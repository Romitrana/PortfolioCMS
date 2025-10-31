import "./About.css";
import Center from "./Center";
import { useRef, useEffect } from "react";
import AchievementCards from "./AchievementCards";
import Typed from "typed.js";


export default function About() {
  const typedRef = useRef(null);
  useEffect(() => {
    const options = {
      strings: ["Student", "Developer", "Coder", "Tech Lover"],
      typeSpeed: 70,
      backSpeed: 70,
      loop: true,
      backDelay: 1000,
    };

    // Initialize Typed.js
    const typed = new Typed(typedRef.current, options);

    // Cleanup on component unmount
    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <section className="about-container">
      {/* Left Section */}
      <aside id="left">
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
      </aside>

      {/* Center Section (Profile + Orbiting Logos) */}
      <div id="center">
        <Center />
      </div>

      {/* Right Section (Achievements) */}
      <div id="right">
        <AchievementCards />
      </div>
    </section>
  );
}
