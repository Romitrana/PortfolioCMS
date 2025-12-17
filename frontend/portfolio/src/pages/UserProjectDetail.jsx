import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./UserProjectDetail.module.css";
import { apiFetch } from "../utils/api"; // adjust path as needed

const AVATARS = ["avatar1", "avatar2", "avatar3", "avatar4", "avatar5"];

export default function UserProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [projectState, setProjectState] = useState({
    comments: [],
    newCommentName: "",
    newCommentText: "",
    avatars: [],
  });
  const [commentsCollapsed, setCommentsCollapsed] = useState(true);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme") || "light"
  );

  useEffect(() => {
    if (!id) return;

    const fetchProjectAndComments = async () => {
      try {
        setLoading(true);

        // Fetch project and comments in parallel
        const [projectData, commentsData] = await Promise.all([
          apiFetch(`/portfolio/projects/${id}`),
          apiFetch(`/portfolio/comments/${id}?model=Project`),
        ]);

        if (projectData.success) setProject(projectData.project);

        const comments = commentsData.success ? commentsData.comments : [];
        const avatars = comments.map(
          () => AVATARS[Math.floor(Math.random() * AVATARS.length)]
        );
        setProjectState((prev) => ({ ...prev, comments, avatars }));
      } catch (err) {
        console.error("Failed to fetch project or comments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectAndComments();
  }, [id]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleCommentChange = (field, value) => {
    setProjectState((prev) => ({ ...prev, [field]: value }));
  };

  const handleCommentSubmit = async () => {
    const { newCommentName: name, newCommentText: message } = projectState;
    if (!name.trim() || !message.trim())
      return alert("Please enter both name and comment!");

    try {
      const data = await apiFetch("/portfolio/comments", {
        method: "POST",
        body: JSON.stringify({
          targetId: id,
          targetModel: "Project",
          name,
          message,
        }),
      });

      if (data.success && data.comment) {
        setProjectState((prev) => ({
          ...prev,
          comments: [data.comment, ...prev.comments],
          avatars: [
            AVATARS[Math.floor(Math.random() * AVATARS.length)],
            ...prev.avatars,
          ],
          newCommentName: "",
          newCommentText: "",
        }));
        setCommentsCollapsed(false);
      }
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  if (loading) return <div className={styles.loading}>Loading project...</div>;
  if (!project) return <div className={styles.notFound}>Project not found</div>;

  return (
    <div className={styles.projectDetailPage}>
      {/* Hero Header */}
      <header className={styles.heroHeader}>
        <button onClick={toggleTheme} className={styles.themeBtn}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        <div className={styles.heroContent}>
          <div className={styles.categoryBadge}>{project.category}</div>
          <h1 className={styles.projectTitle}>{project.title}</h1>
          <div className={styles.durationChip}>
            {project.buildDuration} months build
          </div>
        </div>
      </header>

      {project.image && (
        <div className={styles.projectImageContainer}>
          <img
            src={project.image}
            alt={project.title}
            className={styles.projectImage}
          />
        </div>
      )}

      <div className={styles.contentGrid}>
        {/* Main Content */}
        <div className={styles.mainContentArea}>
          <div className={styles.descriptionSection}>
            <h2 className={styles.sectionTitle}>About the Project</h2>
            <p>{project.description}</p>
          </div>

          {project.technologies?.length > 0 && (
            <div className={styles.techSection}>
              <h3 className={styles.sectionTitle}>Technologies</h3>
              <div className={styles.techGrid}>
                {project.technologies.map((tech, idx) => (
                  <div key={idx} className={styles.techChip}>
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={styles.actionButtons}>
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionBtn}
              >
                <i className="fab fa-github"></i> View Code
              </a>
            )}
            {project.liveDemoLink && (
              <a
                href={project.liveDemoLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionBtnLive}
              >
                <i className="fas fa-external-link-alt"></i> Live Demo
              </a>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.statsCard}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{project.buildDuration}</span>
              <span className={styles.statLabel}>Months</span>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>
                {project.technologies?.length || 0}
              </span>
              <span className={styles.statLabel}>Tech Stack</span>
            </div>
          </div>
        </aside>
      </div>

      {/* Comments Section */}
      <section className={styles.commentsSection}>
        <div className={styles.commentsHeader}>
          <h2 className={styles.sectionTitle}>Leave a Comment</h2>
          <button
            className={styles.toggleBtn}
            onClick={() => setCommentsCollapsed(!commentsCollapsed)}
          >
            {commentsCollapsed ? "Show Comments" : "Hide Comments"}{" "}
            <i
              className={`fas ${commentsCollapsed ? "fa-plus" : "fa-minus"}`}
            ></i>
          </button>
        </div>

        {!commentsCollapsed && (
          <>
            {/* Comment Form */}
            <div className={styles.commentForm}>
              <input
                type="text"
                placeholder="Your name"
                value={projectState.newCommentName}
                onChange={(e) =>
                  handleCommentChange("newCommentName", e.target.value)
                }
              />
              <textarea
                placeholder="Share your thoughts about this project..."
                value={projectState.newCommentText}
                onChange={(e) =>
                  handleCommentChange("newCommentText", e.target.value)
                }
                onKeyPress={handleKeyPress}
                rows="3"
              />
              <button
                onClick={handleCommentSubmit}
                disabled={
                  !projectState.newCommentName?.trim() ||
                  !projectState.newCommentText?.trim()
                }
              >
                Post Comment
              </button>
            </div>

            {/* Comments List */}
            {projectState.comments.length > 0 && (
              <div className={styles.commentsList}>
                {projectState.comments.map((comment, idx) => (
                  <div key={comment._id} className={styles.commentCard}>
                    <img
                      src={`/assets/${projectState.avatars[idx]}.png`}
                      alt="Avatar"
                      className={styles.commentAvatar}
                    />
                    <div className={styles.commentContent}>
                      <div className={styles.commentMeta}>
                        <strong>{comment.name}</strong>
                        <span>
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p>{comment.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
