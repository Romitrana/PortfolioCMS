import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/portfolio/projects/${id}`)
      .then(res => res.json())
      .then((data) => {
        if (data.success) setProject(data.project);
      });
  }, [id]);

  if (!project) return <p>Loading...</p>;

  return (
    <section>
      <h2>{project.title}</h2>
      <img src={project.image} alt="" width="300" />
      <p>{project.description}</p>
      <p><b>Tech:</b> {project.technologies.join(", ")}</p>
      <p>GitHub: <a href={project.githubLink}>{project.githubLink}</a></p>
      <p>Live Demo: <a href={project.liveDemoLink}>{project.liveDemoLink}</a></p>
      <p>Category: {project.category}</p>
      <p>Build Duration: {project.buildDuration} months</p>
      <p>Featured: {project.featured ? "Yes" : "No"}</p>
    </section>
  );
}
