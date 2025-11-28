import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";
import styles from "../Projects/ProjectsPage.module.css";

export default function SkillsPage() {
  const loaderData = useLoaderData();
  const skills = loaderData.skills;
  const { id } = useParams(); // current active skill ID

  return (
    <section className={styles.container}>
      <aside className={styles.projectListSection}>
        <header className={styles.projectsHeader}>
          <h2 className={styles.projectsTitle}>My Skills</h2>
          <Link to="new">
            <button className={styles.addProjectBtn}>Add New Skill</button>
          </Link>
        </header>

        <ul className={styles.projectList}>
          {skills && skills.length > 0 ? (
            skills.map((skill) => (
              <li
                key={skill._id}
                className={
                  id === skill._id
                    ? `${styles.projectCard} ${styles.activeCard}`
                    : styles.projectCard
                }
              >
                {/* LEFT: image */}
                <div className={styles.projectImageContainer}>
                  <img
                    src={
                      skill.image ||
                      "https://via.placeholder.com/80x80/6366F1/FFFFFF?text=S"
                    }
                    alt={skill.name}
                    className={styles.projectImage}
                  />
                </div>

                {/* RIGHT: info (only title is clickable) */}
                <div className={styles.projectInfo}>
                  <div className={styles.projectHeader}>
                    <Link to={skill._id} className={styles.projectLink}>
                      <h3 className={styles.projectTitle}>{skill.name}</h3>
                    </Link>
                  </div>
                  <div className={styles.projectDate}>
                    Proficiency: {skill.proficiency}<br/>
                    Experience : {skill.experienceYears} years
                  </div>
                </div>

                {/* Edit pill on the right, consistent with projects */}
                <Link to={`edit/${skill._id}`} className={styles.editLink}>
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
                No skills found. Add your first skill!
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
