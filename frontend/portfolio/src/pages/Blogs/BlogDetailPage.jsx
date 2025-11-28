// pages/Blogs/BlogDetailPage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../Projects/ProjectDetailPage.module.css";
import Loader from "../../components/UtilComponents/Loader";

export default function BlogDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState(null);

  // Fetch blog details
  useEffect(() => {
    fetch(`http://localhost:8000/portfolio/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setBlog(data.blog);
      });
  }, [id]);

  // Fetch comments for this blog
  useEffect(() => {
    fetch(`http://localhost:8000/portfolio/comments/${id}?model=Blog`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setComments(data.comments);
      });
  }, [id]);

  // Delete blog handler
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch(`http://localhost:8000/portfolio/blogs/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        alert("Blog deleted successfully!");
        navigate("/admin/blogs");
      } else {
        alert("Failed to delete blog.");
      }
    } catch {
      alert("Error deleting blog.");
    }
  };

  // Delete comment handler
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;

    try {
      const res = await fetch(
        `http://localhost:8000/portfolio/comments/${commentId}`,
        { method: "DELETE" }
      );
      const data = await res.json();

      if (data.success)
        setComments((prev) => prev.filter((c) => c._id !== commentId));
      else alert("Failed to delete comment.");
    } catch {
      alert("Error deleting comment.");
    }
  };

  if (!blog) return <Loader size={64} />;
  if (!comments) return <Loader size={32} />;

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <div className={styles.cover}>
          {blog.coverImage ? (
            <img
              src={blog.coverImage}
              alt={blog.title}
              className={styles.image}
            />
          ) : (
            <div className={styles.noImage}>No Image Available</div>
          )}
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>{blog.title}</h2>
          <p className={styles.desc}>{blog.content}</p>

          {blog.tags?.length > 0 && (
            <div className={styles.metaGrid}>
              <span>
                <b>Tags:</b> {blog.tags.join(", ")}
              </span>
            </div>
          )}

          <div className={styles.metaGrid}>
            <span>
              <b>Likes:</b> {blog.likes || 0}
            </span>
            <span>
              <b>Dislikes:</b> {blog.dislikes || 0}
            </span>
            <span>
              <b>Created At:</b> {new Date(blog.createdAt).toLocaleDateString()}
            </span>
            <span>
              <b>Updated At:</b> {new Date(blog.updatedAt).toLocaleDateString()}
            </span>
          </div>

          <button className={styles.deleteBtn} onClick={handleDelete}>
            Delete Blog
          </button>

          {/* Comments List for Admin */}
          <section style={{ marginTop: "2rem" }}>
            <h3>Comments ({comments.length})</h3>
            {comments.length === 0 ? (
              <p>No comments yet.</p>
            ) : (
              <ul className={styles.commentSection}>
                {comments.map((comment) => (
                  <li key={comment._id} className={styles.comment}>
                    <p>
                      <b className={styles.commenter}>{comment.name}</b>{" "}
                      <small>
                        - {new Date(comment.createdAt).toLocaleString()}{" "}
                        {comment.isApproved ? (
                          <span style={{ color: "var(--color-successtext)" }}>
                            <i class="fa-solid fa-check"></i>
                          </span>
                        ) : (
                          <span style={{ color: "var(--color-alertbg" }}>
                            <i class="fa-solid fa-xmark"></i>
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
                      <i class="fa-regular fa-trash-can"></i>
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
