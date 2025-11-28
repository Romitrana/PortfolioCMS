import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";
import styles from "../Projects/ProjectsPage.module.css";

export default function TestimonialsPage() {
  const loaderData = useLoaderData();
  const testimonials = loaderData.testimonials || loaderData; // depending on your API shape
  const { id } = useParams(); // current active testimonial ID

  return (
    <section className={styles.container}>
      <aside className={styles.projectListSection}>
        <header className={styles.projectsHeader}>
          <h2 className={styles.projectsTitle}>Testimonials</h2>
          <Link to="new">
            <button className={styles.addProjectBtn}>Add +</button>
          </Link>
        </header>

        <ul className={styles.projectList}>
          {testimonials && testimonials.length > 0 ? (
            testimonials.map((t) => (
              <li
                key={t._id}
                className={
                  id === t._id
                    ? `${styles.projectCard} ${styles.activeCard}`
                    : styles.projectCard
                }
              >
                {/* LEFT: photo */}
                <div className={styles.projectImageContainer}>
                  <img
                    src={
                      t.photo ||
                      "https://via.placeholder.com/80x80/6366F1/FFFFFF?text=T"
                    }
                    alt={t.name}
                    className={styles.projectImage}
                  />
                </div>

                {/* RIGHT: info; only name clickable, consistent with Skills/Projects */}
                <div className={styles.projectInfo}>
                  <div className={styles.projectHeader}>
                    <Link to={t._id} className={styles.projectLink}>
                      <h3 className={styles.projectTitle}>{t.name}</h3>
                    </Link>
                  </div>
                  <div className={styles.projectDate}>
                    {t.role}<br/>
                    {t.createdAt && (
                      <>
                      Added on: {new Date(t.createdAt).toLocaleDateString()}
                      </>
                    )}
                  </div>
                  {/* <p
                    style={{
                      margin: "0.3rem 0 0",
                      fontSize: "0.9rem",
                      color: "var(--color-secondary)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {t.message}
                  </p> */}
                </div>

                {/* Edit pill on right */}
                <Link to={`edit/${t._id}`} className={styles.editLink}>
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
                No testimonials found. Add your first testimonial!
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
