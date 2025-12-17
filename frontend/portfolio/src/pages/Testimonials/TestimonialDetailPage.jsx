import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../Projects/ProjectDetailPage.module.css";
import Loader from "../../components/UtilComponents/Loader";

const API_URL = import.meta.env.VITE_API_URL;

export default function TestimonialDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [testimonial, setTestimonial] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`${API_URL}/portfolio/testimonials/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTestimonial(data.testimonial || data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch testimonial:", err);
      });
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this testimonial?"))
      return;

    try {
      const res = await fetch(`${API_URL}/portfolio/testimonials/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        alert("Testimonial deleted successfully!");
        navigate("/admin/testimonials");
      } else {
        alert(data.message || "Failed to delete testimonial");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting testimonial");
    }
  };

  if (!testimonial) return <Loader size={64} />;

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        {/* LEFT: photo */}
        <div className={styles.cover}>
          {testimonial.photo ? (
            <img
              src={testimonial.photo}
              alt={testimonial.name}
              className={styles.image}
            />
          ) : (
            <div className={styles.noImage}>No Photo Available</div>
          )}
        </div>

        {/* RIGHT: content */}
        <div className={styles.content}>
          <h2 className={styles.title}>{testimonial.name}</h2>

          <p className={styles.desc}>{testimonial.message}</p>

          <div className={styles.metaGrid}>
            <span>
              <b>Role:</b> {testimonial.role}
            </span>
            <span>
              <b>Featured:</b> {testimonial.featured ? "Yes" : "No"}
            </span>
            {testimonial.createdAt && (
              <span>
                <b>Given On:</b>{" "}
                {new Date(testimonial.createdAt).toLocaleDateString()}
              </span>
            )}
            {testimonial.updatedAt && (
              <span>
                <b>Last Updated:</b>{" "}
                {new Date(testimonial.updatedAt).toLocaleDateString()}
              </span>
            )}
          </div>

          <button className={styles.deleteBtn} onClick={handleDelete}>
            Delete Testimonial
          </button>
        </div>
      </div>
    </section>
  );
}
