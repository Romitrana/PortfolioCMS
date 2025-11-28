import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NewProject.module.css";

export default function NewProject() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    githubLink: "",
    liveDemoLink: "",
    category: "",
    buildDuration: "",
    featured: false,
  });

  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
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
    Object.entries(formData).forEach(([key, val]) => form.append(key, val));
    if (file) form.append("image", file);

    const res = await fetch("http://localhost:8000/portfolio/projects", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    if (data.success) navigate("/admin/projects");
  };

  return (
    <section className={styles.newProjectSection}>
      <h2>Create New Project</h2>

      <form onSubmit={handleSubmit} className={styles.formCard}>
        {/* LEFT COLUMN */}
        <div className={styles.leftColumn}>
          <div className={styles.inputGroup}>
            <label>Project Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Technologies (comma separated)</label>
            <input
              name="technologies"
              value={formData.technologies}
              placeholder="React, Node, MongoDB"
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>GitHub Link</label>
            <input
              name="githubLink"
              value={formData.githubLink}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Live Demo Link</label>
            <input
              name="liveDemoLink"
              value={formData.liveDemoLink}
              onChange={handleChange}
            />
          </div>

          <div className={styles.rowGroup}>
            <div className={styles.inputGroup}>
              <label>Category</label>
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Build Duration (days)</label>
              <input
                type="number"
                name="buildDuration"
                value={formData.buildDuration}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <label className={styles.checkboxGroup}>
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
            />
            <span>Mark as Featured</span>
          </label>
        </div>

        {/* RIGHT COLUMN */}
        <div className={styles.rightColumn}>
          <h4>Upload Image</h4>

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

        <button className={styles.submitBtn}>Create Project</button>
      </form>
    </section>
  );
}
