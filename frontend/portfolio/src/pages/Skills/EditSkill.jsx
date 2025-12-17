import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../Projects/EditProject.module.css";
import Loader from "../../components/UtilComponents/Loader";

const API_URL = import.meta.env.VITE_API_URL;

export default function EditSkill() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [skill, setSkill] = useState(null);
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [relationType, setRelationType] = useState("project");
  const [relationIdInput, setRelationIdInput] = useState("");

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const res = await fetch(`${API_URL}/portfolio/skills/${id}`);
        const data = await res.json();
        if (data.success && data.skill) {
          const s = data.skill;
          const certificates =
            s.certificates?.map((c) => (typeof c === "string" ? c : c._id)) ||
            [];
          const projects =
            s.projects?.map((p) => (typeof p === "string" ? p : p._id)) || [];
          const masteredConcepts = Array.isArray(s.masteredConcepts)
            ? s.masteredConcepts
            : typeof s.masteredConcepts === "string"
            ? s.masteredConcepts
                .split(",")
                .map((m) => m.trim())
                .filter(Boolean)
            : [];
          const tags = Array.isArray(s.tags)
            ? s.tags
            : typeof s.tags === "string"
            ? s.tags
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
            : [];
          setSkill({ ...s, certificates, projects, masteredConcepts, tags });
        }
      } catch (err) {
        console.error("Error fetching skill:", err);
      }
    };
    fetchSkill();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "masteredConcepts") {
      setSkill((prev) => ({
        ...prev,
        masteredConcepts: value
          .split(",")
          .map((m) => m.trim())
          .filter(Boolean),
      }));
      return;
    }
    if (name === "tags") {
      setSkill((prev) => ({
        ...prev,
        tags: value
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      }));
      return;
    }
    if (name === "experienceYears") {
      setSkill((prev) => ({ ...prev, experienceYears: Number(value) || 0 }));
      return;
    }
    setSkill((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (fileData) => {
    if (fileData && fileData.type.startsWith("image/")) setFile(fileData);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0])
      handleFileSelect(e.dataTransfer.files[0]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleAddRelation = (e) => {
    e.preventDefault();
    const trimmed = relationIdInput.trim();
    if (!trimmed) return;
    if (relationType === "project") {
      setSkill((prev) =>
        prev.projects.includes(trimmed)
          ? prev
          : { ...prev, projects: [...prev.projects, trimmed] }
      );
    } else {
      setSkill((prev) =>
        prev.certificates.includes(trimmed)
          ? prev
          : { ...prev, certificates: [...prev.certificates, trimmed] }
      );
    }
    setRelationIdInput("");
  };

  const handleRemoveProject = (projId) =>
    setSkill((prev) => ({
      ...prev,
      projects: prev.projects.filter((idVal) => idVal !== projId),
    }));
  const handleRemoveCertificate = (certId) =>
    setSkill((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((idVal) => idVal !== certId),
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!skill) return;

    const form = new FormData();
    const bodyForServer = {
      name: skill.name,
      description: skill.description || "",
      masteredConcepts: skill.masteredConcepts || [],
      proficiency: skill.proficiency,
      experienceYears: skill.experienceYears || 0,
      notes: skill.notes || "",
      certificates: skill.certificates || [],
      projects: skill.projects || [],
      tags: skill.tags || [],
    };

    Object.entries(bodyForServer).forEach(([key, val]) => {
      form.append(key, Array.isArray(val) ? JSON.stringify(val) : val);
    });

    if (file) form.append("image", file);

    try {
      const res = await fetch(`${API_URL}/portfolio/skills/${id}`, {
        method: "PATCH",
        body: form,
      });
      const data = await res.json();
      if (data.success) navigate("/admin/skills");
      else alert(data.message || "Failed to update skill");
    } catch (err) {
      console.error("Error updating skill:", err);
      alert("Failed to update skill");
    }
  };

  if (!skill) return <Loader size={64} />;
  return (
    <section className={styles.editProjectSection}>
      <h2>Edit Skill</h2>

      <form onSubmit={handleSubmit} className={styles.formCard}>
        {/* LEFT COLUMN */}
        <div className={styles.leftColumn}>
          <div className={styles.inputGroup}>
            <label>Skill Name</label>
            <input
              name="name"
              value={skill.name || ""}
              onChange={handleChange}
              placeholder="Skill name (e.g., React, Node.js)"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Description</label>
            <textarea
              name="description"
              value={skill.description || ""}
              onChange={handleChange}
              placeholder="Short description of this skill..."
              rows={3}
            />
          </div>

          <div className={styles.rowGroup}>
            <div className={styles.inputGroup}>
              <label>Proficiency</label>
              <select
                name="proficiency"
                value={skill.proficiency || "Beginner"}
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
                value={skill.experienceYears || 0}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Mastered Concepts (comma separated)</label>
            <input
              name="masteredConcepts"
              value={(skill.masteredConcepts || []).join(", ")}
              onChange={handleChange}
              placeholder="Hooks, Context, Performance, ..."
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Tags (comma separated)</label>
            <input
              name="tags"
              value={(skill.tags || []).join(", ")}
              onChange={handleChange}
              placeholder="frontend, ui, javascript..."
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Notes</label>
            <textarea
              name="notes"
              value={skill.notes || ""}
              onChange={handleChange}
              placeholder="Any additional notes about this skill..."
              rows={3}
            />
          </div>

          {/* Projects & Certificates IDs management */}
          <div className={styles.inputGroup}>
            <label>Link Projects / Certificates by ID</label>

            <div
              style={{
                display: "flex",
                gap: "0.8rem",
                alignItems: "center",
                marginBottom: "0.6rem",
                flexWrap: "wrap",
              }}
            >
              <input
                type="text"
                value={relationIdInput}
                onChange={(e) => setRelationIdInput(e.target.value)}
                placeholder="Enter ObjectId"
                style={{
                  flex: "1",
                  minWidth: "160px",
                  padding: "0.6rem 0.8rem",
                  borderRadius: "10px",
                  background: "var(--color-dark2)",
                  border: "1.8px solid var(--color-border)",
                  color: "var(--color-text)",
                  fontSize: "0.95rem",
                }}
              />

              <div
                style={{
                  display: "flex",
                  gap: "0.6rem",
                  alignItems: "center",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  <input
                    type="radio"
                    name="relationType"
                    value="project"
                    checked={relationType === "project"}
                    onChange={(e) => setRelationType(e.target.value)}
                  />
                  <span>Project</span>
                </label>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  <input
                    type="radio"
                    name="relationType"
                    value="certificate"
                    checked={relationType === "certificate"}
                    onChange={(e) => setRelationType(e.target.value)}
                  />
                  <span>Certificate</span>
                </label>
              </div>

              <button
                onClick={handleAddRelation}
                type="button"
                style={{
                  padding: "0.55rem 1rem",
                  borderRadius: "10px",
                  border: "none",
                  background: "var(--color-primary)",
                  color: "var(--color-accent)",
                  cursor: "pointer",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                Add ID
              </button>
            </div>

            {/* List existing project IDs */}
            <div style={{ marginTop: "0.4rem" }}>
              <strong>Projects:</strong>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.4rem",
                  marginTop: "0.3rem",
                }}
              >
                {(skill.projects || []).length === 0 && (
                  <span
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--color-secondary)",
                    }}
                  >
                    No linked projects.
                  </span>
                )}
                {(skill.projects || []).map((projId) => (
                  <span
                    key={projId}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      padding: "0.25rem 0.55rem",
                      borderRadius: "999px",
                      background: "var(--color-dark2)",
                      fontSize: "0.8rem",
                    }}
                  >
                    {projId}
                    <button
                      type="button"
                      onClick={() => handleRemoveProject(projId)}
                      title="Remove project"
                      style={{
                        border: "none",
                        background: "transparent",
                        color: "var(--color-alertbg)",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        padding: 0,
                      }}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* List existing certificate IDs */}
            <div style={{ marginTop: "0.7rem" }}>
              <strong>Certificates:</strong>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.4rem",
                  marginTop: "0.3rem",
                }}
              >
                {(skill.certificates || []).length === 0 && (
                  <span
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--color-secondary)",
                    }}
                  >
                    No linked certificates.
                  </span>
                )}
                {(skill.certificates || []).map((certId) => (
                  <span
                    key={certId}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      padding: "0.25rem 0.55rem",
                      borderRadius: "999px",
                      background: "var(--color-dark2)",
                      fontSize: "0.8rem",
                    }}
                  >
                    {certId}
                    <button
                      type="button"
                      onClick={() => handleRemoveCertificate(certId)}
                      title="Remove certificate"
                      style={{
                        border: "none",
                        background: "transparent",
                        color: "var(--color-alertbg)",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        padding: 0,
                      }}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className={styles.rightColumn}>
          <h4>Current Image</h4>

          <div className={styles.imagePreview}>
            {skill.image ? (
              <img src={skill.image} alt="Skill" />
            ) : (
              <div
                style={{
                  width: "100%",
                  padding: "2rem 1rem",
                  borderRadius: "12px",
                  border: "2px dashed var(--color-border)",
                  color: "var(--color-secondary)",
                  textAlign: "center",
                  fontStyle: "italic",
                }}
              >
                No image uploaded
              </div>
            )}
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
            onClick={() => document.getElementById("hiddenSkillFile").click()}
          >
            <p>
              Drag &amp; Drop new image here
              <br />
              <small>(or click to browse)</small>
            </p>

            <input
              id="hiddenSkillFile"
              type="file"
              className={styles.hiddenFile}
              accept="image/*"
              onChange={(e) => handleFileSelect(e.target.files[0])}
            />
          </div>

          {/* Preview Selected New Image */}
          {file && (
            <div className={styles.newPreview}>
              <h4>New Image Preview</h4>
              <img src={URL.createObjectURL(file)} alt="New Skill" />
            </div>
          )}
        </div>

        <button className={styles.submitBtn}>Update Skill</button>
      </form>
    </section>
  );
}
