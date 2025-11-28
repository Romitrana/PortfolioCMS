import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../Projects/EditProject.module.css";
import Loader from "../../components/UtilComponents/Loader";

export default function EditCertificate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [certificate, setCertificate] = useState(null);
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/portfolio/certificates/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const cert = data.certificate || data;
          // Format issueDate for input[type="date"]
          const formattedDate = cert.issueDate
            ? new Date(cert.issueDate).toISOString().split("T")[0]
            : "";
          setCertificate({
            ...cert,
            issueDate: formattedDate,
          });
        }
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCertificate((prev) => ({ ...prev, [name]: value }));
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
    if (!certificate) return;

    const form = new FormData();
    form.append("title", certificate.title || "");
    form.append("issuer", certificate.issuer || "");
    form.append("issueDate", certificate.issueDate || "");
    form.append("description", certificate.description || "");

    if (file) {
      form.append("image", file);
    }

    const res = await fetch(
      `http://localhost:8000/portfolio/certificates/${id}`,
      {
        method: "PATCH",
        body: form,
      }
    );

    const data = await res.json();
    if (data.success) {
      navigate("/admin/certificates");
    } else {
      alert(data.message || "Failed to update certificate");
    }
  };

  if (!certificate) return <Loader size={64} />;

  return (
    <section className={styles.editProjectSection}>
      <h2>Edit Certificate</h2>

      <form onSubmit={handleSubmit} className={styles.formCard}>
        {/* LEFT COLUMN */}
        <div className={styles.leftColumn}>
          <div className={styles.inputGroup}>
            <label>Certificate Title</label>
            <input
              name="title"
              value={certificate.title || ""}
              onChange={handleChange}
              placeholder="React Developer Certification"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Issuer</label>
            <input
              name="issuer"
              value={certificate.issuer || ""}
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
              value={certificate.issueDate || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Description</label>
            <textarea
              name="description"
              value={certificate.description || ""}
              onChange={handleChange}
              placeholder="Short description of this certificate..."
              rows={4}
            />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className={styles.rightColumn}>
          <h4>Current Image</h4>

          <div className={styles.imagePreview}>
            {certificate.image ? (
              <img src={certificate.image} alt={certificate.title} />
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
              document.getElementById("hiddenCertificateFile").click()
            }
          >
            <p>
              Drag &amp; Drop new image here
              <br />
              <small>(or click to browse)</small>
            </p>

            <input
              id="hiddenCertificateFile"
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

        <button className={styles.submitBtn}>Update Certificate</button>
      </form>
    </section>
  );
}
