import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Projects/NewProject.module.css";
const API_URL = import.meta.env.VITE_API_URL;
export default function NewCertificate() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    issueDate: "",
    description: "",
  });

  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
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
    form.append("title", formData.title);
    form.append("issuer", formData.issuer);
    form.append("issueDate", formData.issueDate);
    form.append("description", formData.description);
    if (file) form.append("image", file); // backend should use upload.single("image")

    const res = await fetch(`${API_URL}/portfolio/certificates`, {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    if (data.success) {
      navigate("/admin/certificates");
    } else {
      alert(data.message || "Failed to create certificate");
    }
  };

  return (
    <section className={styles.newProjectSection}>
      <h2>Create New Certificate</h2>

      <form onSubmit={handleSubmit} className={styles.formCard}>
        {/* LEFT COLUMN */}
        <div className={styles.leftColumn}>
          <div className={styles.inputGroup}>
            <label>Certificate Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="React Developer Certification"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Issuer</label>
            <input
              name="issuer"
              value={formData.issuer}
              onChange={handleChange}
              placeholder="e.g., Coursera, Udemy, Company"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Issue Date</label>
            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Short description of this certificate or what you learned..."
              rows={4}
            />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className={styles.rightColumn}>
          <h4>Upload Certificate Image</h4>

          <div
            className={`${styles.dropzone} ${
              dragActive ? styles.activeDrop : ""
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() =>
              document.getElementById("newCertificateFileInput").click()
            }
          >
            <p>
              Drag &amp; Drop image here
              <br />
              <small>(or click to browse)</small>
            </p>

            <input
              id="newCertificateFileInput"
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

        <button className={styles.submitBtn}>Create Certificate</button>
      </form>
    </section>
  );
}
