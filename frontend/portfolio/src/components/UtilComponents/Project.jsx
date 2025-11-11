import React from "react";
import styles from "./Project.module.css";

export default function Project({ project }) {
  const {
    title,
    description,
    technologies,
    githubLink,
    liveDemoLink,
    image,
    category,
    buildDuration,
    featured,
  } = project;

  const handleTechClick = (e, tech) => {
    e.stopPropagation(); // prevent triggering parent link
    // For now, just simulate navigation
    window.location.href = `/skills/${tech.toLowerCase()}`;
  };

  const projectLink = "/project-details"; // dummy link

  return (
    <a
      href={projectLink}
      className={styles.card}
      target="_blank"
      rel="noopener noreferrer"
    >
      {liveDemoLink && (
        <div className={styles.liveBadge} aria-label="Live Project">
          LIVE
        </div>
      )}
      {featured && (
        <div
          className={styles.starIcon}
          aria-label="Featured Project"
          title="Featured Project"
        >
          ★
        </div>
      )}

      {image && (
        <img
          src={image}
          alt={`${title} screenshot`}
          className={styles.projectImage}
        />
      )}

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.techList}>
          {technologies.map((tech, i) => (
            <span
              key={i}
              className={styles.techItem}
              onClick={(e) => handleTechClick(e, tech)}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className={styles.info}>
          <span className={styles.category}>{category}</span>
          <span className={styles.duration}>
            {buildDuration} month{buildDuration > 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </a>
  );
}
