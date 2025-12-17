import React from "react";
import styles from "./Project.module.css";

export default function Project({ project }) {
  const {
    _id,
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

  const projectLink = `/project-details/${_id}`;

  return (
    <a
      href={projectLink}
      className={styles.card}
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* Live Badge — FIXED (no <a> inside <a>) */}
      {liveDemoLink && (
        <span
          className={styles.liveBadge}
          aria-label="Live Project"
          onClick={(e) => {
            e.stopPropagation(); // prevents triggering the parent link
            window.open(liveDemoLink, "_blank");
          }}
        >
          Live
        </span>
      )}

      {/* Featured Star */}
      {featured && (
        <div
          className={styles.starIcon}
          aria-label="Featured Project"
          title="Featured Project"
        >
          ★
        </div>
      )}

      {/* Project Image */}
      {image && (
        <img
          src={image}
          alt={`${title} screenshot`}
          className={styles.projectImage}
        />
      )}

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description.split(".")[0]}</p>

        {/* Technologies */}
        <div className={styles.techList}>
          {technologies.map((tech, i) => (
            <span key={i} className={styles.techItem}>
              {tech}
            </span>
          ))}
        </div>

        {/* Extra Info */}
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
