import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../Projects/EditProject.module.css";
import Loader from "../../components/UtilComponents/Loader";

const API_URL = import.meta.env.VITE_API_URL;

export default function EditTestimonial() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [testimonial, setTestimonial] = useState(null);
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/portfolio/testimonials/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success)
          setTestimonial(data.testimonial || data.testimonialData || data);
      })
      .catch((err) => console.error("Error fetching testimonial:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTestimonial((prev) => ({
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
    if (!testimonial) return;

    const form = new FormData();
    form.append("name", testimonial.name || "");
    form.append("role", testimonial.role || "");
    form.append("message", testimonial.message || "");
    form.append("featured", testimonial.featured ? "true" : "false");

    if (file) form.append("photo", file);

    try {
      const res = await fetch(`${API_URL}/portfolio/testimonials/${id}`, {
        method: "PATCH",
        body: form,
      });
      const data = await res.json();
      if (data.success) navigate("/admin/testimonials");
      else alert(data.message || "Failed to update testimonial");
    } catch (err) {
      console.error(err);
      alert("Error updating testimonial");
    }
  };

  if (!testimonial) return <Loader size={64} />;

  return (
    <section className={styles.editProjectSection}>
      <h2>Edit Testimonial</h2>

      <form onSubmit={handleSubmit} className={styles.formCard}>
        {/* LEFT COLUMN */}
        <div className={styles.leftColumn}>
          <div className={styles.inputGroup}>
            <label>Name</label>
            <input
              name="name"
              value={testimonial.name || ""}
              onChange={handleChange}
              placeholder="Person's name"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Role</label>
            <input
              name="role"
              value={testimonial.role || ""}
              onChange={handleChange}
              placeholder="Client, Colleague, Mentor..."
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Message</label>
            <textarea
              name="message"
              value={testimonial.message || ""}
              onChange={handleChange}
              placeholder="Their feedback / testimonial text..."
              rows={4}
              required
            />
          </div>

          <label className={styles.checkboxGroup}>
            <input
              type="checkbox"
              name="featured"
              checked={!!testimonial.featured}
              onChange={handleChange}
            />
            <span>Mark as Featured</span>
          </label>
        </div>

        {/* RIGHT COLUMN */}
        <div className={styles.rightColumn}>
          <h4>Current Photo</h4>
          <div className={styles.imagePreview}>
            {testimonial.photo ? (
              <img src={testimonial.photo} alt={testimonial.name} />
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
                No photo uploaded
              </div>
            )}
          </div>

          <h4 style={{ marginTop: "1.5rem" }}>Upload New Photo</h4>

          <div
            className={`${styles.dropzone} ${dragActive ? styles.activeDrop : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() =>
              document.getElementById("hiddenTestimonialFile").click()
            }
          >
            <p>
              Drag &amp; Drop new photo here
              <br />
              <small>(or click to browse)</small>
            </p>

            <input
              id="hiddenTestimonialFile"
              type="file"
              accept="image/*"
              className={styles.hiddenFile}
              onChange={(e) => handleFileSelect(e.target.files[0])}
            />
          </div>

          {file && (
            <div className={styles.newPreview}>
              <h4>New Photo Preview</h4>
              <img src={URL.createObjectURL(file)} alt="New" />
            </div>
          )}
        </div>

        <button className={styles.submitBtn}>Update Testimonial</button>
      </form>
    </section>
  );
}
