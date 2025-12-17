import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import styles from "./UserBlog.module.css";

const AVATARS = ["avatar1", "avatar2", "avatar3", "avatar4", "avatar5"];
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function UserBlog() {
  const { blogs } = useLoaderData();
  const [blogStates, setBlogStates] = useState({});
  const [userReactions, setUserReactions] = useState({});
  const [commentsCollapsed, setCommentsCollapsed] = useState({});
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme") || "light"
  );

  useEffect(() => {
    if (!blogs?.length) return;

    const loadComments = async () => {
      const updates = await Promise.all(
        blogs.map(async (blog) => {
          try {
            const res = await fetch(
              `${API_URL}/portfolio/comments/${blog._id}?model=Blog`
            );
            const data = await res.json();
            return {
              blogId: blog._id,
              comments: data.success ? data.comments : [],
              likes: blog.likes,
              dislikes: blog.dislikes,
            };
          } catch (err) {
            console.error("Failed to fetch comments for", blog._id, err);
            return {
              blogId: blog._id,
              comments: [],
              likes: blog.likes,
              dislikes: blog.dislikes,
            };
          }
        })
      );

      const newBlogStates = {};
      const newCommentsCollapsed = {};
      updates.forEach(({ blogId, comments, likes, dislikes }) => {
        newBlogStates[blogId] = {
          comments,
          likes,
          dislikes,
          newCommentName: "",
          newCommentText: "",
        };
        newCommentsCollapsed[blogId] = true;
      });

      setBlogStates(newBlogStates);
      setCommentsCollapsed(newCommentsCollapsed);
    };

    loadComments();
  }, [blogs]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const updateReaction = async (blogId, newReaction) => {
    const currentReaction = userReactions[blogId];
    try {
      if (currentReaction) {
        await fetch(`${API_URL}/portfolio/blogs/${blogId}/${currentReaction}`, {
          method: "DELETE",
        });
      }

      if (currentReaction === newReaction) {
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
        return;
      }

      const res = await fetch(
        `${API_URL}/portfolio/blogs/${blogId}/${newReaction}`,
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
    } catch (err) {
      console.error("Reaction error:", err);
    }
  };

  const handleCommentChange = (blogId, field, value) => {
    setBlogStates((prev) => ({
      ...prev,
      [blogId]: { ...prev[blogId], [field]: value },
    }));
  };

  const handleCommentSubmit = async (blogId) => {
    const { newCommentName: name, newCommentText: message } =
      blogStates[blogId];
    if (!name.trim() || !message.trim())
      return alert("Please enter both name and comment!");

    try {
      const res = await fetch(`${API_URL}/portfolio/comments`, {
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
        setCommentsCollapsed((prev) => ({ ...prev, [blogId]: false }));
      }
    } catch (err) {
      console.error("Comment submit error:", err);
    }
  };

  const handleKeyPress = (e, blogId) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit(blogId);
    }
  };

  const toggleCommentsCollapse = (blogId) => {
    setCommentsCollapsed((prev) => ({ ...prev, [blogId]: !prev[blogId] }));
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
          {blogs?.length ? (
            blogs.map((blog) => {
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
                        👍 {blogState.likes ?? blog.likes}
                      </button>
                      <button
                        className={`${styles.reactionBtn} ${
                          styles.dislikeBtn
                        } ${userReaction === "dislike" ? styles.active : ""}`}
                        onClick={() => updateReaction(blog._id, "dislike")}
                      >
                        👎 {blogState.dislikes ?? blog.dislikes}
                      </button>
                    </div>

                    <div className={styles.commentSection}>
                      <button
                        className={styles.collapseToggle}
                        onClick={() => toggleCommentsCollapse(blog._id)}
                      >
                        {collapsed ? "Show Comments" : "Hide Comments"} ⬇️
                      </button>

                      {!collapsed && (
                        <>
                          <div className={styles.commentForm}>
                            <input
                              type="text"
                              placeholder="Your name"
                              value={blogState.newCommentName || ""}
                              onChange={(e) =>
                                handleCommentChange(
                                  blog._id,
                                  "newCommentName",
                                  e.target.value
                                )
                              }
                            />
                            <textarea
                              placeholder="Share your thoughts..."
                              value={blogState.newCommentText || ""}
                              onChange={(e) =>
                                handleCommentChange(
                                  blog._id,
                                  "newCommentText",
                                  e.target.value
                                )
                              }
                              onKeyPress={(e) => handleKeyPress(e, blog._id)}
                              rows="3"
                            />
                            <button
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
                            <div className={styles.commentListContainer}>
                              {blogState.comments.map((comment) => {
                                const avatarIdx = Math.floor(
                                  Math.random() * AVATARS.length
                                );
                                return (
                                  <div
                                    key={comment._id}
                                    className={styles.commentItem}
                                  >
                                    <img
                                      src={`/assets/${AVATARS[avatarIdx]}.png`}
                                      className={styles.commentAvatar}
                                    />
                                    <div className={styles.commentContent}>
                                      <div className={styles.commentHeader}>
                                        <strong>{comment.name}</strong>
                                        <span>
                                          {new Date(
                                            comment.createdAt
                                          ).toLocaleDateString()}
                                        </span>
                                      </div>
                                      <p>{comment.message}</p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
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
