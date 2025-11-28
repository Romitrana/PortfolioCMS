import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";
import styles from "../Projects/ProjectsPage.module.css";

export default function CertificatesPage() {
  const loaderData = useLoaderData();
  // depending on how you return from the loader, this covers both: raw array or { certificates }
  const certificates = loaderData.certificates || loaderData;
  const { id } = useParams(); // active certificate id (for highlighting)

  return (
    <section className={styles.container}>
      <aside className={styles.projectListSection}>
        <header className={styles.projectsHeader}>
          <h2 className={styles.projectsTitle}>Certificates</h2>
          <Link to="new">
            <button className={styles.addProjectBtn}>
              Add New Certificate
            </button>
          </Link>
        </header>

        <ul className={styles.projectList}>
          {certificates && certificates.length > 0 ? (
            certificates.map((cert) => (
              <li
                key={cert._id}
                className={
                  id === cert._id
                    ? `${styles.projectCard} ${styles.activeCard}`
                    : styles.projectCard
                }
              >
                {/* LEFT: certificate image */}
                <div className={styles.projectImageContainer}>
                  <img
                    src={
                      cert.image ||
                      "https://via.placeholder.com/80x80/6366F1/FFFFFF?text=C"
                    }
                    alt={cert.title}
                    className={styles.projectImage}
                  />
                </div>

                {/* RIGHT: info; only title is clickable (consistent with Skills/Testimonials) */}
                <div className={styles.projectInfo}>
                  <div className={styles.projectHeader}>
                    <Link to={cert._id} className={styles.projectLink}>
                      <h3 className={styles.projectTitle}>{cert.title}</h3>
                    </Link>
                  </div>

                  <div className={styles.projectDate}>
                    {cert.issuer}
                    <br />
                    {cert.issueDate && (
                      <>
                        Issued on:{" "}
                        {new Date(cert.issueDate).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </>
                    )}
                  </div>

                  {/* {cert.description && (
                    <p
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
                      {cert.description}
                    </p>
                  )} */}
                </div>

                {/* Edit pill on right, same style as projects */}
                <Link to={`edit/${cert._id}`} className={styles.editLink}>
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
                No certificates found. Add your first certificate!
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
