import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Projects/NewProject.module.css";

export default function NewSkill() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    masteredConcepts: "",
    proficiency: "Beginner",
    experienceYears: 0,
    notes: "",
    tags: "",
  });

  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // numeric field
    if (name === "experienceYears") {
      setFormData((prev) => ({
        ...prev,
        [name]: value === "" ? "" : Number(value),
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

    // prepare arrays as JSON strings for backend normalizeArrayField helper
    const masteredConceptsArr = formData.masteredConcepts
      ? formData.masteredConcepts
          .split(",")
          .map((m) => m.trim())
          .filter(Boolean)
      : [];
    const tagsArr = formData.tags
      ? formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("proficiency", formData.proficiency);
    form.append("experienceYears", formData.experienceYears || 0);
    form.append("notes", formData.notes);

    form.append("masteredConcepts", JSON.stringify(masteredConceptsArr));
    form.append("tags", JSON.stringify(tagsArr));
    form.append("certificates", JSON.stringify([]));
    form.append("projects", JSON.stringify([]));

    if (file) form.append("image", file);

    const res = await fetch("http://localhost:8000/portfolio/skills", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    if (data.success) navigate("/admin/skills");
    else alert(data.message || "Failed to create skill");
  };

  return (
    <section className={styles.newProjectSection}>
      <h2>Create New Skill</h2>

      <form onSubmit={handleSubmit} className={styles.formCard}>
        {/* LEFT COLUMN */}
        <div className={styles.leftColumn}>
          <div className={styles.inputGroup}>
            <label>Skill Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="React, Node.js, CSS..."
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Short description of this skill..."
              required
            />
          </div>

          <div className={styles.rowGroup}>
            <div className={styles.inputGroup}>
              <label>Proficiency</label>
              <select
                name="proficiency"
                value={formData.proficiency}
                onChange={handleChange}
                style={{
                  padding: "0.8rem 1rem",
                  borderRadius: "10px",
                  background: "var(--color-dark2)",
                  border: "1.8px solid var(--color-border)",
                  color: "var(--color-text)",
                  fontSize: "1rem",
                }}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label>Experience (years)</label>
              <input
                type="number"
                name="experienceYears"
                value={formData.experienceYears}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Mastered Concepts (comma separated)</label>
            <input
              name="masteredConcepts"
              value={formData.masteredConcepts}
              onChange={handleChange}
              placeholder="Hooks, Context, Performance..."
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Tags (comma separated)</label>
            <input
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="frontend, ui, javascript..."
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any additional notes about this skill..."
            />
          </div>
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
            onClick={() => document.getElementById("newSkillFileInput").click()}
          >
            <p>
              Drag &amp; Drop image here
              <br />
              <small>(or click to browse)</small>
            </p>

            <input
              id="newSkillFileInput"
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

        <button className={styles.submitBtn}>Create Skill</button>
      </form>
    </section>
  );
}
