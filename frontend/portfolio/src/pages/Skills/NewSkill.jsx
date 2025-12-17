import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Projects/NewProject.module.css";

const API_URL = import.meta.env.VITE_API_URL;

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
    if (name === "experienceYears") {
      setFormData((prev) => ({
        ...prev,
        [name]: value === "" ? "" : Number(value),
      }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    try {
      const res = await fetch(`${API_URL}/portfolio/skills`, {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (data.success) navigate("/admin/skills");
      else alert(data.message || "Failed to create skill");
    } catch (err) {
      console.error("Error creating skill:", err);
      alert("Failed to create skill");
    }
  };

  return (
    <section className={styles.newProjectSection}>
      <h2>Create New Skill</h2>

      <form onSubmit={handleSubmit} className={styles.formCard}>
        {/* LEFT COLUMN */}
        <div className={styles.leftColumn}>
          {/* ...same input fields as before... */}
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
