import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../Projects/ProjectDetailPage.module.css";
import Loader from "../../components/UtilComponents/Loader";

const API_URL = import.meta.env.VITE_API_URL;

export default function SkillDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [skill, setSkill] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/portfolio/skills/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const s = data.skill;

          const certificates =
            s.certificates?.map((c) => (typeof c === "string" ? c : c._id)) ||
            [];
          const projects =
            s.projects?.map((p) => (typeof p === "string" ? p : p._id)) || [];

          setSkill({
            ...s,
            certificates,
            projects,
          });
        }
      })
      .catch((err) => console.error("Error fetching skill:", err));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;

    try {
      const res = await fetch(`${API_URL}/portfolio/skills/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        alert("Skill deleted successfully!");
        navigate("/admin/skills");
      } else {
        alert("Failed to delete skill.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting skill.");
    }
  };

  if (!skill) return <Loader size={64} />;

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <div className={styles.cover}>
          {skill.image ? (
            <img src={skill.image} alt={skill.name} className={styles.image} />
          ) : (
            <div className={styles.noImage}>No Image Available</div>
          )}
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>{skill.name}</h2>

          {skill.description && (
            <p className={styles.desc}>{skill.description}</p>
          )}

          <div className={styles.metaGrid}>
            <span>
              <b>Proficiency:</b> {skill.proficiency}
            </span>
            <span>
              <b>Experience:</b> {skill.experienceYears} years
            </span>
            <span>
              <b>Created At:</b>{" "}
              {new Date(skill.createdAt).toLocaleDateString()}
            </span>
            <span>
              <b>Updated At:</b>{" "}
              {new Date(skill.updatedAt).toLocaleDateString()}
            </span>
          </div>

          {skill.masteredConcepts?.length > 0 && (
            <div className={styles.metaGrid}>
              <span>
                <b>Mastered Concepts:</b> {skill.masteredConcepts.join(", ")}
              </span>
            </div>
          )}

          {skill.tags?.length > 0 && (
            <div className={styles.metaGrid}>
              <span>
                <b>Tags:</b> {skill.tags.join(", ")}
              </span>
            </div>
          )}

          {skill.notes && (
            <div className={styles.metaGrid}>
              <span>
                <b>Notes:</b> {skill.notes}
              </span>
            </div>
          )}

          <div className={styles.metaGrid}>
            <span>
              <b>Projects Linked:</b>{" "}
              {skill.projects?.length > 0 ? skill.projects.join(", ") : "None"}
            </span>
            <span>
              <b>Certificates Linked:</b>{" "}
              {skill.certificates?.length > 0
                ? skill.certificates.join(", ")
                : "None"}
            </span>
          </div>

          <button className={styles.deleteBtn} onClick={handleDelete}>
            Delete Skill
          </button>
        </div>
      </div>
    </section>
  );
}
