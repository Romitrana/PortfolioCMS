// pages/Blogs/BlogsPage.jsx
import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";
import styles from "../Projects/ProjectsPage.module.css"; // reuse same styles

export default function BlogsPage() {
  const loaderData = useLoaderData();
  const blogs = loaderData.blogs; // coming from getAllBlog -> { success, blogs }
  const { id } = useParams(); // current active blog ID

  return (
    <section className={styles.container}>
      <aside className={styles.projectListSection}>
        <header className={styles.projectsHeader}>
          <h2 className={styles.projectsTitle}>My Blogs</h2>
          <Link to="new">
            <button className={styles.addProjectBtn}>Add New Blog</button>
          </Link>
        </header>

        <ul className={styles.projectList}>
          {blogs && blogs.length > 0 ? (
            blogs.map((b) => (
              <li
                key={b._id}
                className={
                  id === b._id
                    ? `${styles.projectCard} ${styles.activeCard}`
                    : styles.projectCard
                }
              >
                <div className={styles.projectImageContainer}>
                  <img
                    src={
                      b.coverImage ||
                      "https://via.placeholder.com/80?text=No+Image"
                    }
                    alt={b.title}
                    className={styles.projectImage}
                  />
                </div>

                <div className={styles.projectInfo}>
                  <div className={styles.projectHeader}>
                    <Link to={b._id} className={styles.projectLink}>
                      <h3 className={styles.projectTitle}>{b.title}</h3>
                    </Link>

                    <Link to={`edit/${b._id}`} className={styles.editLink}>
                      Edit
                    </Link>
                  </div>

                  <div className={styles.projectDate}>
                    Published on:{" "}
                    {new Date(b.createdAt).toLocaleDateString()}
                  </div>

                  {/* {b.tags && b.tags.length > 0 && (
                    <div className={styles.projectTags}>
                      {b.tags.map((tag) => (
                        <span key={tag} className={styles.techTag}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )} */}
                </div>
              </li>
            ))
          ) : (
            <p className={styles.emptyListMessage}>
              No blogs found. Add a new one!
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
