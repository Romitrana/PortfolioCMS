import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./EditProject.module.css";
import Loader from "../../components/UtilComponents/Loader";
const API_URL = import.meta.env.VITE_API_URL;
export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/portfolio/projects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProject(data.project);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "technologies") {
      setProject({
        ...project,
        technologies: value.split(",").map((t) => t.trim()),
      });
      return;
    }

    setProject({ ...project, [name]: type === "checkbox" ? checked : value });
  };

  const handleFileSelect = (fileData) => {
    if (fileData && fileData.type.startsWith("image/")) {
      setFile(fileData);
    }
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

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    Object.entries(project).forEach(([key, val]) => {
      if (key !== "image") form.append(key, val);
    });

    if (file) form.append("image", file);

    const res = await fetch(`${API_URL}/portfolio/projects/${id}`, {
      method: "PATCH",
      body: form,
    });

    const data = await res.json();
    if (data.success) navigate("/admin/projects");
  };

  if (!project) return <Loader size={64} />;

  return (
    <section className={styles.editProjectSection}>
      <h2>Edit Project</h2>

      <form onSubmit={handleSubmit} className={styles.formCard}>
        {/* LEFT COLUMN */}
        <div className={styles.leftColumn}>
          <div className={styles.inputGroup}>
            <label>Project Title</label>
            <input
              name="title"
              value={project.title}
              onChange={handleChange}
              placeholder="Project Title"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Description</label>
            <textarea
              name="description"
              value={project.description}
              onChange={handleChange}
              placeholder="Short project description..."
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Technologies (comma separated)</label>
            <input
              name="technologies"
              value={project.technologies.join(", ")}
              onChange={handleChange}
              placeholder="React, Node, MongoDB"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>GitHub Link</label>
            <input
              name="githubLink"
              value={project.githubLink}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Live Demo Link</label>
            <input
              name="liveDemoLink"
              value={project.liveDemoLink}
              onChange={handleChange}
            />
          </div>

          <div className={styles.rowGroup}>
            <div className={styles.inputGroup}>
              <label>Category</label>
              <input
                name="category"
                value={project.category}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Build Duration (days)</label>
              <input
                type="number"
                name="buildDuration"
                value={project.buildDuration}
                onChange={handleChange}
              />
            </div>
          </div>

          <label className={styles.checkboxGroup}>
            <input
              type="checkbox"
              name="featured"
              checked={project.featured}
              onChange={handleChange}
            />
            <span>Mark as Featured</span>
          </label>
        </div>

        {/* RIGHT COLUMN */}
        <div className={styles.rightColumn}>
          <h4>Current Image</h4>

          <div className={styles.imagePreview}>
            <img src={project.image} alt="Project" />
          </div>

          <h4 style={{ marginTop: "1.5rem" }}>Upload New Image</h4>

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

          {/* Preview Selected New Image */}
          {file && (
            <div className={styles.newPreview}>
              <h4>New Image Preview</h4>
              <img src={URL.createObjectURL(file)} alt="New" />
            </div>
          )}
        </div>

        <button className={styles.submitBtn}>Update Project</button>
      </form>
    </section>
  );
}
