// pages/Blogs/EditBlog.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../Projects/EditProject.module.css"; // reuse your existing css
import Loader from "../../components/UtilComponents/Loader";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [blog, setBlog] = useState(null);
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/portfolio/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setBlog(data.blog);
      });
  }, [id, API_URL]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "tags") {
      setBlog({
        ...blog,
        tags: value.split(",").map((t) => t.trim()),
      });
      return;
    }

    setBlog({ ...blog, [name]: value });
  };

  const handleFileSelect = (fileData) => {
    if (fileData && fileData.type.startsWith("image/")) setFile(fileData);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    // Append blog fields except coverImage (handled separately)
    Object.entries(blog).forEach(([key, val]) => {
      if (key !== "coverImage") form.append(key, val);
    });

    if (file) form.append("image", file);

    const res = await fetch(`${API_URL}/portfolio/blogs/${id}`, {
      method: "PATCH",
      body: form,
    });

    const data = await res.json();
    if (data.success) navigate("/admin/blogs");
    else alert(data.message || "Failed to update blog");
  };

  if (!blog) return <Loader size={64} />;

  return (
    <section className={styles.editProjectSection}>
      <h2>Edit Blog</h2>

      <form onSubmit={handleSubmit} className={styles.formCard}>
        {/* LEFT COLUMN */}
        <div className={styles.leftColumn}>
          <div className={styles.inputGroup}>
            <label>Blog Title</label>
            <input
              name="title"
              value={blog.title}
              onChange={handleChange}
              placeholder="Blog Title"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Content</label>
            <textarea
              name="content"
              value={blog.content}
              onChange={handleChange}
              placeholder="Main content of the blog..."
              rows={10}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Tags (comma separated)</label>
            <input
              name="tags"
              value={blog.tags ? blog.tags.join(", ") : ""}
              onChange={handleChange}
              placeholder="javascript, frontend, career"
            />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className={styles.rightColumn}>
          <h4>Current Cover Image</h4>
          <div className={styles.imagePreview}>
            {blog.coverImage ? (
              <img src={blog.coverImage} alt="Blog Cover" />
            ) : (
              <p>No image available</p>
            )}
          </div>

          <h4 style={{ marginTop: "1.5rem" }}>Upload New Cover Image</h4>

          <div
            className={`${styles.dropzone} ${
              dragActive ? styles.activeDrop : ""
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById("hiddenFile").click()}
          >
            <p>
              Drag & Drop new image here
              <br />
              <small>(or click to browse)</small>
            </p>

            <input
              id="hiddenFile"
              type="file"
              className={styles.hiddenFile}
              onChange={(e) => handleFileSelect(e.target.files[0])}
            />
          </div>

          {file && (
            <div className={styles.newPreview}>
              <h4>New Image Preview</h4>
              <img src={URL.createObjectURL(file)} alt="New Cover" />
            </div>
          )}
        </div>

        <button className={styles.submitBtn}>Update Blog</button>
      </form>
    </section>
  );
}
