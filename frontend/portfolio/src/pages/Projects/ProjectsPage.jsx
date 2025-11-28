import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";
import styles from "./ProjectsPage.module.css";
export default function ProjectsPage() {
  const loaderData = useLoaderData();
  const projects = loaderData.projects;
  const { id } = useParams(); // This gives you current active project ID

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
          {projects && projects.length > 0 ? (
            projects.map((p) => (
              <li
                key={p._id}
                className={
                  id === p._id
                    ? `${styles.projectCard} ${styles.activeCard}`
                    : styles.projectCard
                }
              >
                {/* ...rest of your code... */}
                <div className={styles.projectImageContainer}>
                  <img
                    src={
                      p.image || "https://via.placeholder.com/80?text=No+Image"
                    }
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
                    Created on:{" "}
                    {new Date(p.createdAt || p.addedAt).toLocaleDateString()}
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className={styles.emptyListMessage}>
              No projects found. Add a new one!
            </p>
          )}
        </ul>
      </aside>
      <main className={styles.outletSection}>
        <Outlet />
      </main>
    </section>
  );
}
