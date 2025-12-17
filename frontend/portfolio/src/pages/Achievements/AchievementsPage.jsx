import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";
import styles from "../Projects/ProjectsPage.module.css";

export default function AchievementsPage() {
  const loaderData = useLoaderData();
  const achievements = loaderData.achievements || loaderData;
  const { id } = useParams();

  return (
    <section className={styles.container}>
      <aside className={styles.projectListSection}>
        <header className={styles.projectsHeader}>
          <h2 className={styles.projectsTitle}>Achievements</h2>
          <Link to="new">
            <button className={styles.addProjectBtn}>+ Add </button>
          </Link>
        </header>

        <ul className={styles.projectList}>
          {achievements && achievements.length > 0 ? (
            achievements.map((ach) => (
              <li
                key={ach._id}
                className={
                  id === ach._id
                    ? `${styles.projectCard} ${styles.activeCard}`
                    : styles.projectCard
                }
              >
                <div className={styles.projectImageContainer}>
                  <img
                    src={
                      ach.image ||
                      "https://via.placeholder.com/80x80/6366F1/FFFFFF?text=A"
                    }
                    alt={ach.title}
                    className={styles.projectImage}
                  />
                </div>

                <div className={styles.projectInfo}>
                  <div className={styles.projectHeader}>
                    <Link to={ach._id} className={styles.projectLink}>
                      <h3 className={styles.projectTitle}>{ach.title}</h3>
                    </Link>
                  </div>
                  <div className={styles.projectDate}>
                    {ach.category}
                    <br />
                    {ach.dateAwarded && (
                      <>
                        Awarded on:{" "}
                        {new Date(ach.dateAwarded).toLocaleDateString()}
                      </>
                    )}
                  </div>
                </div>

                <Link to={`edit/${ach._id}`} className={styles.editLink}>
                  Edit
                </Link>
              </li>
            ))
          ) : (
            <li className={styles.projectCard}>
              <p
                style={{
                  margin: 0,
                  color: "var(--color-secondary)",
                  padding: "1rem",
                }}
              >
                No achievements found. Add your first achievement!
              </p>
            </li>
          )}
        </ul>
      </aside>

      <main className={styles.outletSection}>
        <Outlet />
      </main>
    </section>
  );
}
