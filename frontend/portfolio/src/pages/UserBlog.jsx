import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import styles from "./UserBlog.module.css";

const avatar = ["avatar1", "avatar2", "avatar3", "avatar4", "avatar5"];

export default function UserBlog() {
  const { blogs } = useLoaderData();
  const [blogStates, setBlogStates] = useState({});
  const [userReactions, setUserReactions] = useState({}); // "like", "dislike", or null
  const [commentsCollapsed, setCommentsCollapsed] = useState({}); // track collapsed state per blog
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme") || "light"
  );

  useEffect(() => {
    if (blogs?.length) {
      blogs.forEach(async (blog) => {
        try {
          const res = await fetch(
            `http://localhost:8000/portfolio/comments/${blog._id}?model=Blog`
          );
          const data = await res.json();
          if (data.success) {
            setBlogStates((prev) => ({
              ...prev,
              [blog._id]: {
                likes: blog.likes,
                dislikes: blog.dislikes,
                comments: data.comments || [],
                newCommentName: "",
                newCommentText: "",
              },
            }));

            // default collapsed true for comments
            setCommentsCollapsed((prev) => ({
              ...prev,
              [blog._id]: true,
            }));
          }
        } catch (error) {
          console.error("Failed to load comments:", error);
        }
      });
    }
  }, [blogs]);

  // Theme toggle handler
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const updateReaction = async (blogId, newReaction) => {
    const currentReaction = userReactions[blogId];

    if (currentReaction === newReaction) {
      try {
        const res = await fetch(
          `http://localhost:8000/portfolio/blogs/${blogId}/${newReaction}`,
          { method: "DELETE" }
        );

        if (res.ok) {
          setUserReactions((prev) => ({ ...prev, [blogId]: null }));

          setBlogStates((prev) => ({
            ...prev,
            [blogId]: {
              ...prev[blogId],
              likes:
                newReaction === "like"
                  ? prev[blogId].likes - 1
                  : prev[blogId].likes,
              dislikes:
                newReaction === "dislike"
                  ? prev[blogId].dislikes - 1
                  : prev[blogId].dislikes,
            },
          }));
        }
        return;
      } catch (error) {
        console.error("Failed to remove reaction:", error);
      }
    }

    if (currentReaction) {
      await fetch(
        `http://localhost:8000/portfolio/blogs/${blogId}/${currentReaction}`,
        { method: "DELETE" }
      );
    }

    try {
      const res = await fetch(
        `http://localhost:8000/portfolio/blogs/${blogId}/${newReaction}`,
        { method: "PATCH" }
      );

      const data = await res.json();

      if (data.success) {
        setUserReactions((prev) => ({ ...prev, [blogId]: newReaction }));

        setBlogStates((prev) => ({
          ...prev,
          [blogId]: {
            ...prev[blogId],
            likes: data.blog.likes,
            dislikes: data.blog.dislikes,
          },
        }));
      }
    } catch (error) {
      console.error(`Failed to ${newReaction}:`, error);
    }
  };

  const handleCommentNameChange = (e, blogId) => {
    setBlogStates((prev) => ({
      ...prev,
      [blogId]: { ...prev[blogId], newCommentName: e.target.value },
    }));
  };

  const handleCommentTextChange = (e, blogId) => {
    setBlogStates((prev) => ({
      ...prev,
      [blogId]: { ...prev[blogId], newCommentText: e.target.value },
    }));
  };

  const handleCommentSubmit = async (blogId) => {
    const blogState = blogStates[blogId];
    const name = blogState?.newCommentName?.trim();
    const message = blogState?.newCommentText?.trim();

    if (!name || !message) {
      alert("Please enter both name and comment!");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/portfolio/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetId: blogId,
          targetModel: "Blog",
          name,
          message,
        }),
      });

      const data = await res.json();
      if (data.success && data.comment) {
        setBlogStates((prev) => ({
          ...prev,
          [blogId]: {
            ...prev[blogId],
            comments: [data.comment, ...prev[blogId].comments],
            newCommentName: "",
            newCommentText: "",
          },
        }));
        setCommentsCollapsed((prev) => ({ ...prev, [blogId]: false })); // Show comments after adding
      }
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  const handleKeyPress = (e, blogId) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit(blogId);
    }
  };

  const toggleCommentsCollapse = (blogId) => {
    setCommentsCollapsed((prev) => ({
      ...prev,
      [blogId]: !prev[blogId],
    }));
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <header className={styles.header}>
          <h1 className={styles.pageTitle}>My Blogs</h1>
          <button className={styles.themeToggleBtn} onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </header>

        <div className={styles.blogsList}>
          {blogs?.map((blog) => {
            const blogState = blogStates[blog._id] || {};
            const userReaction = userReactions[blog._id];
            const collapsed = commentsCollapsed[blog._id];

            return (
              <article key={blog._id} className={styles.blogCard}>
                {blog.coverImage && (
                  <div className={styles.imageContainer}>
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className={styles.coverImage}
                    />
                  </div>
                )}

                <div className={styles.cardBody}>
                  <h2 className={styles.blogTitle}>{blog.title}</h2>
                  <p className={styles.blogContent}>{blog.content}</p>

                  {blog.tags?.length > 0 && (
                    <div className={styles.tagsContainer}>
                      {blog.tags.map((tag, idx) => (
                        <span key={idx} className={styles.tag}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className={styles.interactions}>
                    <button
                      className={`${styles.reactionBtn} ${styles.likeBtn} ${
                        userReaction === "like" ? styles.active : ""
                      }`}
                      onClick={() => updateReaction(blog._id, "like")}
                    >
                      <span className={styles.emoji}>
                        <i className="fa-solid fa-thumbs-up"></i>
                      </span>
                      <span>{blogState.likes ?? blog.likes}</span>
                    </button>

                    <button
                      className={`${styles.reactionBtn} ${styles.dislikeBtn} ${
                        userReaction === "dislike" ? styles.active : ""
                      }`}
                      onClick={() => updateReaction(blog._id, "dislike")}
                    >
                      <span className={styles.emoji}>
                        <i className="fa-solid fa-thumbs-down"></i>
                      </span>
                      <span>{blogState.dislikes ?? blog.dislikes}</span>
                    </button>
                  </div>

                  <div className={styles.commentSection}>
                    <button
                      className={styles.collapseToggle}
                      onClick={() => toggleCommentsCollapse(blog._id)}
                      aria-expanded={!collapsed}
                      aria-controls={`comment-list-${blog._id}`}
                    >
                      <span style={{ fontSize: "0.9rem" }}>
                        {collapsed ? "Show Comments" : "Hide Comments"}
                      </span>
                      <span
                        className={`${styles.collapseArrow} ${
                          collapsed ? "" : styles.rotated
                        }`}
                      >
                        <i className="fa-solid fa-angle-down"></i>
                      </span>
                    </button>

                    {!collapsed && (
                      <>
                        <div className={styles.commentForm}>
                          <input
                            type="text"
                            className={styles.commentNameInput}
                            placeholder="Your name"
                            value={blogState.newCommentName || ""}
                            onChange={(e) =>
                              handleCommentNameChange(e, blog._id)
                            }
                            aria-label="Your name"
                          />
                          <textarea
                            className={styles.commentTextInput}
                            placeholder="Share your thoughts..."
                            value={blogState.newCommentText || ""}
                            onChange={(e) =>
                              handleCommentTextChange(e, blog._id)
                            }
                            onKeyPress={(e) => handleKeyPress(e, blog._id)}
                            rows="3"
                            aria-label="Your comment"
                          />
                          <button
                            className={styles.commentBtn}
                            onClick={() => handleCommentSubmit(blog._id)}
                            disabled={
                              !blogState.newCommentName?.trim() ||
                              !blogState.newCommentText?.trim()
                            }
                          >
                            Post Comment
                          </button>
                        </div>

                        {blogState.comments?.length > 0 && (
                          <>
                            <div className={styles.commentsHeader}>
                              <h4>Comments ({blogState.comments.length})</h4>
                            </div>
                            <div
                              className={styles.commentListContainer}
                              id={`comment-list-${blog._id}`}
                            >
                              {blogState.comments.map((comment) => (
                                <div
                                  key={comment._id}
                                  className={styles.commentItem}
                                >
                                  <img
                                    src={`/assets/${
                                      avatar[Math.floor(Math.random() * 5)]
                                    }.png`}
                                    className={styles.commentAvatar}
                                  />
                                  <div className={styles.commentContent}>
                                    <div className={styles.commentHeader}>
                                      <strong className={styles.commentAuthor}>
                                        {comment.name}
                                      </strong>
                                      <span className={styles.commentDate}>
                                        {new Date(
                                          comment.createdAt
                                        ).toLocaleDateString()}
                                      </span>
                                    </div>
                                    <p className={styles.commentMessage}>
                                      {comment.message}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </article>
            );
          })}

          {!blogs?.length && (
            <div className={styles.emptyState}>
              <h3>No blogs yet</h3>
              <p>Check back later for new content!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
