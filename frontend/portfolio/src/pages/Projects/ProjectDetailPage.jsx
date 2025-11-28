import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ProjectDetailPage.module.css";
import Loader from "../../components/UtilComponents/Loader";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/portfolio/projects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const proj = data.project;
          if (typeof proj.technologies === "string") {
            proj.technologies = proj.technologies
              .split(",")
              .map((t) => t.trim());
          }
          setProject(proj);
        }
      });
  }, [id]);

  // Fetch comments for this project
  useEffect(() => {
    fetch(`http://localhost:8000/portfolio/comments/${id}?model=Project`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setComments(data.comments);
      });
  }, [id]);

  // Delete project handler
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    try {
      const res = await fetch(
        `http://localhost:8000/portfolio/projects/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (data.success) {
        alert("Project deleted successfully!");
        navigate("/admin/projects");
      } else {
        alert("Failed to delete project.");
      }
    } catch (error) {
      alert("Error deleting project.");
    }
  };

  // Delete comment handler
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      const res = await fetch(
        `http://localhost:8000/portfolio/comments/${commentId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (data.success)
        setComments((prev) => prev.filter((c) => c._id !== commentId));
      else alert("Failed to delete comment.");
    } catch {
      alert("Error deleting comment.");
    }
  };

  if (!project) return <Loader size={64} />;
  if (!comments) return <Loader size={32} />;

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <div className={styles.cover}>
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className={styles.image}
            />
          ) : (
            <div className={styles.noImage}>No Image Available</div>
          )}
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>{project.title}</h2>
          <p className={styles.desc}>{project.description}</p>
          <div className={styles.metaGrid}>
            <span>
              <b>Technologies:</b> {project.technologies.join(", ")}
            </span>
            <span>
              <b>Category:</b> {project.category || "N/A"}
            </span>
            <span>
              <b>Build Duration:</b> {project.buildDuration} months
            </span>
            <span>
              <b>Featured:</b> {project.featured ? "Yes" : "No"}
            </span>
          </div>
          <div className={styles.links}>
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noreferrer"
                className={styles.btn}
              >
                GitHub
              </a>
            )}
            {project.liveDemoLink && (
              <a
                href={project.liveDemoLink}
                target="_blank"
                rel="noreferrer"
                className={styles.btn}
              >
                Live Demo
              </a>
            )}
          </div>
          <button className={styles.deleteBtn} onClick={handleDelete}>
            Delete Project
          </button>

          {/* Comments List for Project */}
          <section style={{ marginTop: "2rem" }}>
            <h3>Comments ({comments.length})</h3>
            {comments.length === 0 ? (
              <p>No comments yet.</p>
            ) : (
              <ul className={styles.commentSection}>
                {comments.map((comment) => (
                  <li key={comment._id} className={styles.comment}>
                    <p>
                      <b>{comment.name}</b>{" "}
                      <small>
                        - {new Date(comment.createdAt).toLocaleString()}{" "}
                        {comment.isApproved ? (
                          <span style={{ color: "var(--color-successtext)" }}>
                            <i className="fa-solid fa-check"></i>
                          </span>
                        ) : (
                          <span style={{ color: "var(--color-alertbg" }}>
                            <i className="fa-solid fa-xmark"></i>
                          </span>
                        )}
                      </small>
                    </p>
                    <p>{comment.message}</p>
                    <button
                      className={styles.commentDel}
                      title="delete"
                      onClick={() => handleDeleteComment(comment._id)}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}
