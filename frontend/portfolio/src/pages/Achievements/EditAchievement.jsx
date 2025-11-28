import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../Projects/EditProject.module.css";
import Loader from "../../components/UtilComponents/Loader";

export default function EditAchievement() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [achievement, setAchievement] = useState(null);
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/portfolio/achievements/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const ach = data.achievement || data;
          // Format date for input[type="date"]
          const formattedDate = ach.dateAwarded
            ? new Date(ach.dateAwarded).toISOString().split("T")[0]
            : "";
          setAchievement({
            ...ach,
            dateAwarded: formattedDate,
          });
        }
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAchievement((prev) => ({ ...prev, [name]: value }));
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
    if (!achievement) return;

    const form = new FormData();
    form.append("title", achievement.title || "");
    form.append("category", achievement.category || "");
    form.append("dateAwarded", achievement.dateAwarded || "");
    form.append("description", achievement.description || "");

    if (file) form.append("image", file);

    const res = await fetch(
      `http://localhost:8000/portfolio/achievements/${id}`,
      {
        method: "PATCH",
        body: form,
      }
    );

    const data = await res.json();
    if (data.success) {
      navigate("/admin/achievements");
    } else {
      alert(data.message || "Failed to update achievement");
    }
  };

  if (!achievement) return <Loader size={64} />;

  return (
    <section className={styles.editProjectSection}>
      <h2>Edit Achievement</h2>

      <form onSubmit={handleSubmit} className={styles.formCard}>
        {/* LEFT COLUMN */}
        <div className={styles.leftColumn}>
          <div className={styles.inputGroup}>
            <label>Achievement Title</label>
            <input
              name="title"
              value={achievement.title || ""}
              onChange={handleChange}
              placeholder="Achievement title"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Category</label>
            <input
              name="category"
              value={achievement.category || ""}
              onChange={handleChange}
              placeholder="e.g., Award, Competition, Recognition"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Date Awarded</label>
            <input
              type="date"
              name="dateAwarded"
              value={achievement.dateAwarded || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Description</label>
            <textarea
              name="description"
              value={achievement.description || ""}
              onChange={handleChange}
              placeholder="Description of the achievement..."
              rows={4}
            />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className={styles.rightColumn}>
          <h4>Current Image</h4>

          <div className={styles.imagePreview}>
            {achievement.image ? (
              <img src={achievement.image} alt={achievement.title} />
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
            onClick={() =>
              document.getElementById("hiddenAchievementFile").click()
            }
          >
            <p>
              Drag &amp; Drop new image here
              <br />
              <small>(or click to browse)</small>
            </p>

            <input
              id="hiddenAchievementFile"
              type="file"
              accept="image/*"
              className={styles.hiddenFile}
              onChange={(e) => handleFileSelect(e.target.files[0])}
            />
          </div>

          {file && (
            <div className={styles.newPreview}>
              <h4>New Image Preview</h4>
              <img src={URL.createObjectURL(file)} alt="New" />
            </div>
          )}
        </div>

        <button className={styles.submitBtn}>Update Achievement</button>
      </form>
    </section>
  );
}
