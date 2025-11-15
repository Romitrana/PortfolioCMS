import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./ProjectsPage.module.css";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/portfolio/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProjects(data.projects);
      });
  }, []);

  return (
    <section className={styles.container}>
      <aside className={styles.projectListSection}>
        <header className={styles.projectsHeader}>
          <h2 className={styles.projectsTitle}>My Projects</h2>
          <Link to="new">
            <button className={styles.addProjectBtn}>Add New Project</button>
          </Link>
        </header>
        <ul className={styles.projectList}>
          {projects.map((p) => (
            <li key={p._id} className={styles.projectCard}>
              <div className={styles.projectImageContainer}>
                <img
                  src={p.image || "https://via.placeholder.com/80?text=No+Image"}
                  alt={p.title}
                  className={styles.projectImage}
                />
              </div>
              <div className={styles.projectInfo}>
                <div className={styles.projectHeader}>
                  <Link to={p._id} className={styles.projectLink}>
                    <h3 className={styles.projectTitle}>{p.title}</h3>
                  </Link>
                  <Link to={`edit/${p._id}`} className={styles.editLink}>
                    Edit
                  </Link>
                </div>
                <div className={styles.projectDate}>
                  Created on: {new Date(p.createdAt || p.addedAt).toLocaleDateString()}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      <main className={styles.outletSection}>
        <Outlet />
      </main>
    </section>
  );
}
