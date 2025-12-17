import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../Projects/ProjectDetailPage.module.css";
import Loader from "../../components/UtilComponents/Loader";
const API_URL = import.meta.env.VITE_API_URL;
export default function AchievementDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [achievement, setAchievement] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`${API_URL}/portfolio/achievements/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAchievement(data.achievement || data);
        }
      })
      .catch(() => {});
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this achievement?"))
      return;

    try {
      const res = await fetch(
        `${API_URL}/portfolio/achievements/${id}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (data.success) {
        alert("Achievement deleted successfully!");
        navigate("/admin/achievements");
      } else {
        alert(data.message || "Failed to delete achievement");
      }
    } catch (err) {
      alert("Error deleting achievement");
    }
  };

  if (!achievement) return <Loader size={64} />;

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        {/* LEFT: image */}
        <div className={styles.cover}>
          {achievement.image ? (
            <img
              src={achievement.image}
              alt={achievement.title}
              className={styles.image}
            />
          ) : (
            <div className={styles.noImage}>No Image Available</div>
          )}
        </div>

        {/* RIGHT: content */}
        <div className={styles.content}>
          <h2 className={styles.title}>{achievement.title}</h2>

          {achievement.description && (
            <p className={styles.desc}>{achievement.description}</p>
          )}

          <div className={styles.metaGrid}>
            <span>
              <b>Category:</b> {achievement.category}
            </span>
            <span>
              <b>Date Awarded:</b>{" "}
              {achievement.dateAwarded
                ? new Date(achievement.dateAwarded).toLocaleDateString()
                : "N/A"}
            </span>
            {achievement.createdAt && (
              <span>
                <b>Created At:</b>{" "}
                {new Date(achievement.createdAt).toLocaleDateString()}
              </span>
            )}
            {achievement.updatedAt && (
              <span>
                <b>Last Updated:</b>{" "}
                {new Date(achievement.updatedAt).toLocaleDateString()}
              </span>
            )}
          </div>

          <button className={styles.deleteBtn} onClick={handleDelete}>
            Delete Achievement
          </button>
        </div>
      </div>
    </section>
  );
}
