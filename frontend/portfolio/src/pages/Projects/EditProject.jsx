import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/portfolio/projects/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProject(data.project);
        }
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProject({
      ...project,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(project).forEach(([key, val]) => {
      if (key !== "image") form.append(key, val);
    });

    if (file) form.append("image", file);

    const res = await fetch(`/portfolio/projects/${id}`, {
      method: "PATCH",
      body: form,
    });

    const data = await res.json();
    if (data.success) navigate("/admin/projects");
  };

  if (!project) return <p>Loading...</p>;

  return (
    <section>
      <h2>Edit Project</h2>

      <form onSubmit={handleSubmit}>
        <input name="title" value={project.title} onChange={handleChange} />

        <textarea
          name="description"
          value={project.description}
          onChange={handleChange}
        />

        <input
          name="technologies"
          value={project.technologies.join(", ")}
          onChange={handleChange}
        />

        <input name="githubLink" value={project.githubLink} onChange={handleChange} />

        <input name="liveDemoLink" value={project.liveDemoLink} onChange={handleChange} />

        <input name="category" value={project.category} onChange={handleChange} />

        <input
          type="number"
          name="buildDuration"
          value={project.buildDuration}
          onChange={handleChange}
        />

        <label>
          Featured?
          <input
            type="checkbox"
            name="featured"
            checked={project.featured}
            onChange={handleChange}
          />
        </label>

        <p>Current Image:</p>
        <img src={project.image} width="200" alt="Project" />

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button type="submit">Update</button>
      </form>
    </section>
  );
}
