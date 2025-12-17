import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Projects/NewProject.module.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function NewTestimonial() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    message: "",
    featured: false,
  });

  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("role", formData.role);
    form.append("message", formData.message);
    form.append("featured", formData.featured ? "true" : "false");

    if (file) form.append("photo", file);

    try {
      const res = await fetch(`${API_URL}/portfolio/testimonials`, {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (data.success) navigate("/admin/testimonials");
      else alert(data.message || "Failed to create testimonial");
    } catch (err) {
      console.error(err);
      alert("Error creating testimonial");
    }
  };

  return (
    <section className={styles.newProjectSection}>
      <h2>Create New Testimonial</h2>

      <form onSubmit={handleSubmit} className={styles.formCard}>
        {/* LEFT COLUMN */}
        <div className={styles.leftColumn}>
          <div className={styles.inputGroup}>
            <label>Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Person's name"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Role</label>
            <input
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Client, Colleague, Mentor..."
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Their feedback / testimonial message..."
              rows={5}
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
          <h4>Upload Photo</h4>

          <div
            className={`${styles.dropzone} ${
              dragActive ? styles.activeDrop : ""
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() =>
              document.getElementById("newTestimonialFileInput").click()
            }
          >
            <p>
              Drag &amp; Drop photo here
              <br />
              <small>(or click to browse)</small>
            </p>

            <input
              id="newTestimonialFileInput"
              type="file"
              accept="image/*"
              className={styles.hiddenFile}
              onChange={(e) => handleFileSelect(e.target.files[0])}
            />
          </div>

          {file && (
            <div className={styles.newPreview}>
              <h4>Photo Preview</h4>
              <img src={URL.createObjectURL(file)} alt="Preview" />
            </div>
          )}
        </div>

        <button className={styles.submitBtn}>Create Testimonial</button>
      </form>
    </section>
  );
}
