import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./UserProjectDetail.module.css";

const avatar = ["avatar1", "avatar2", "avatar3", "avatar4", "avatar5"];
const API_URL = import.meta.env.VITE_API_URL;
export default function UserProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [projectState, setProjectState] = useState({
    comments: [],
    newCommentName: "",
    newCommentText: "",
  });
  const [commentsCollapsed, setCommentsCollapsed] = useState(true);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const projectRes = await fetch(
          `${API_URL}/portfolio/projects/${id}`
        );
        const projectData = await projectRes.json();

        if (projectData.success) {
          setProject(projectData.project);
        }

        const commentsRes = await fetch(
          `${API_URL}/portfolio/comments/${id}?model=Project`
        );
        const commentsData = await commentsRes.json();

        if (commentsData.success) {
          setProjectState((prev) => ({
            ...prev,
            comments: commentsData.comments || [],
          }));
        }
      } catch (error) {
        console.error("Failed to load project:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleCommentNameChange = (e) => {
    setProjectState((prev) => ({ ...prev, newCommentName: e.target.value }));
  };

  const handleCommentTextChange = (e) => {
    setProjectState((prev) => ({ ...prev, newCommentText: e.target.value }));
  };

  const handleCommentSubmit = async () => {
    const { newCommentName, newCommentText } = projectState;
    const name = newCommentName.trim();
    const message = newCommentText.trim();

    if (!name || !message) {
      alert("Please enter both name and comment!");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/http://localhost:8000/portfolio/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetId: id,
          targetModel: "Project",
          name,
          message,
        }),
      });

      const data = await res.json();
      if (data.success && data.comment) {
        setProjectState((prev) => ({
          ...prev,
          comments: [data.comment, ...prev.comments],
          newCommentName: "",
          newCommentText: "",
        }));
        setCommentsCollapsed(false);
      }
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  const toggleCommentsCollapse = () => {
    setCommentsCollapsed(!commentsCollapsed);
  };

  if (loading) return <div className={styles.loading}>Loading project...</div>;
  if (!project) return <div className={styles.notFound}>Project not found</div>;

  return (
    <div className={styles.projectDetailPage}>
      {/* Hero Header */}
      <header className={styles.heroHeader}>
        <div className={styles.themeToggle}>
          <button onClick={toggleTheme} className={styles.themeBtn}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
        <div className={styles.heroContent}>
          <div className={styles.categoryBadge}>{project.category}</div>
          <h1 className={styles.projectTitle}>{project.title}</h1>
          <div className={styles.durationChip}>
            {project.buildDuration} months build
          </div>
        </div>
      </header>

      <div className={styles.mainContent}>
        {/* Project Image */}
        {project.image && (
          <div className={styles.projectImageContainer}>
            <img
              src={project.image}
              alt={project.title}
              className={styles.projectImage}
            />
          </div>
        )}

        {/* Content Grid */}
        <div className={styles.contentGrid}>
          {/* Main Content */}
          <div className={styles.mainContentArea}>
            <div className={styles.descriptionSection}>
              <h2 className={styles.sectionTitle}>About the Project</h2>
              <p className={styles.projectDescription}>{project.description}</p>
            </div>

            {/* Technologies */}
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

            {/* Action Buttons */}
            <div className={styles.actionButtons}>
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  className={styles.actionBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github"></i>
                  View Code
                </a>
              )}
              {project.liveDemoLink && (
                <a
                  href={project.liveDemoLink}
                  className={styles.actionBtnLive}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-external-link-alt"></i>
                  Live Demo
                </a>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.statsCard}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>
                  {project.buildDuration}
                </span>
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
              onClick={toggleCommentsCollapse}
            >
              {commentsCollapsed ? "Show Comments" : "Hide Comments"}
              <i
                className={`fas ${commentsCollapsed ? "fa-plus" : "fa-minus"}`}
              ></i>
            </button>
          </div>

          {!commentsCollapsed && (
            <>
              {/* Add Comment Form */}
              <div className={styles.commentForm}>
                <div className={styles.formRow}>
                  <input
                    type="text"
                    className={styles.nameInput}
                    placeholder="Your name"
                    value={projectState.newCommentName}
                    onChange={handleCommentNameChange}
                  />
                  <textarea
                    className={styles.textInput}
                    placeholder="Share your thoughts about this project..."
                    value={projectState.newCommentText}
                    onChange={handleCommentTextChange}
                    onKeyPress={handleKeyPress}
                    rows="3"
                  />
                </div>
                <button
                  className={styles.submitBtn}
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
              {projectState.comments?.length > 0 && (
                <div className={styles.commentsList}>
                  <div className={styles.commentsCount}>
                    {projectState.comments.length}{" "}
                    {projectState.comments.length === 1
                      ? "Comment"
                      : "Comments"}
                  </div>
                  {projectState.comments.map((comment) => (
                    <div key={comment._id} className={styles.commentCard}>
                      <div className={styles.commentAvatarContainer}>
                        <img
                          src={`/assets/${
                            avatar[Math.floor(Math.random() * 5)]
                          }.png`}
                          className={styles.commentAvatar}
                          alt="Avatar"
                        />
                      </div>
                      <div className={styles.commentContent}>
                        <div className={styles.commentMeta}>
                          <strong className={styles.commentAuthor}>
                            {comment.name}
                          </strong>
                          <span className={styles.commentDate}>
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className={styles.commentText}>{comment.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
