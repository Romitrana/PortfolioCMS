// pages/Blogs/NewBlog.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Projects/NewProject.module.css"; // reuse your existing CSS

export default function NewBlog() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileSelect = (fileData) => {
    if (fileData && fileData.type.startsWith("image/")) setFile(fileData);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFileSelect(e.dataTransfer.files[0]);
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
    form.append("title", formData.title);
    form.append("content", formData.content);
    form.append("tags", formData.tags);

    if (file) form.append("coverImage", file);

    const res = await fetch("http://localhost:8000/portfolio/blogs", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    if (data.success) navigate("/admin/blogs");
  };

  return (
    <section className={styles.newProjectSection}>
      <h2>Create New Blog</h2>

      <form onSubmit={handleSubmit} className={styles.formCard}>
        {/* LEFT COLUMN */}
        <div className={styles.leftColumn}>
          <div className={styles.inputGroup}>
            <label>Blog Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Blog Title"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={10}
              placeholder="Main blog content here..."
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Tags (comma separated)</label>
            <input
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="javascript, frontend, career"
            />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className={styles.rightColumn}>
          <h4>Upload Cover Image</h4>

          <div
            className={`${styles.dropzone} ${
              dragActive ? styles.activeDrop : ""
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById("newFileInput").click()}
          >
            <p>
              Drag & Drop image here
              <br />
              <small>(or click to browse)</small>
            </p>

            <input
              id="newFileInput"
              type="file"
              accept="image/*"
              className={styles.hiddenFile}
              onChange={(e) => handleFileSelect(e.target.files[0])}
            />
          </div>

          {file && (
            <div className={styles.newPreview}>
              <h4>Image Preview</h4>
              <img src={URL.createObjectURL(file)} alt="Preview" />
            </div>
          )}
        </div>

        <button className={styles.submitBtn}>Create Blog</button>
      </form>
    </section>
  );
}
