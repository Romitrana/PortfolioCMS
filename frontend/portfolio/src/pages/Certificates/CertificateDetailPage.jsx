import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../Projects/ProjectDetailPage.module.css";
import Loader from "../../components/UtilComponents/Loader";

export default function CertificateDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:8000/portfolio/certificates/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCertificate(data.certificate || data);
        }
      })
      .catch(() => {});
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this certificate?"))
      return;

    try {
      const res = await fetch(
        `http://localhost:8000/portfolio/certificates/${id}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (data.success) {
        alert("Certificate deleted successfully!");
        navigate("/admin/certificates");
      } else {
        alert(data.message || "Failed to delete certificate");
      }
    } catch (err) {
      alert("Error deleting certificate");
    }
  };

  if (!certificate) return <Loader size={64} />;

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        {/* LEFT: certificate image */}
        <div className={styles.cover}>
          {certificate.image ? (
            <img
              src={certificate.image}
              alt={certificate.title}
              className={styles.image}
            />
          ) : (
            <div className={styles.noImage}>No Image Available</div>
          )}
        </div>

        {/* RIGHT: content */}
        <div className={styles.content}>
          <h2 className={styles.title}>{certificate.title}</h2>

          {certificate.description && (
            <p className={styles.desc}>{certificate.description}</p>
          )}

          <div className={styles.metaGrid}>
            <span>
              <b>Issuer:</b> {certificate.issuer}
            </span>
            <span>
              <b>Issue Date:</b>{" "}
              {certificate.issueDate
                ? new Date(certificate.issueDate).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "Not specified"}
            </span>
            {certificate.createdAt && (
              <span>
                <b>Added On:</b>{" "}
                {new Date(certificate.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            )}
            {certificate.updatedAt && (
              <span>
                <b>Last Updated:</b>{" "}
                {new Date(certificate.updatedAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            )}
          </div>

          <button className={styles.deleteBtn} onClick={handleDelete}>
            Delete Certificate
          </button>
        </div>
      </div>
    </section>
  );
}
