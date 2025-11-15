import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewProject() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    githubLink: "",
    liveDemoLink: "",
    category: "",
    buildDuration: "",
    featured: false,
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, val]) => form.append(key, val));
    if (file) form.append("image", file);

    const res = await fetch("http://localhost:8000/portfolio/projects", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    if (data.success) navigate("/admin/projects");
  };

  return (
    <section>
      <h2>Create New Project</h2>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} required />

        <input
          name="technologies"
          placeholder="React, MongoDB, Node"
          onChange={handleChange}
          required
        />

        <input name="githubLink" placeholder="GitHub URL" onChange={handleChange} />
        <input name="liveDemoLink" placeholder="Live Demo URL" onChange={handleChange} />

        <input name="category" placeholder="Category" onChange={handleChange} />

        <input
          type="number"
          name="buildDuration"
          placeholder="Duration (months)"
          onChange={handleChange}
          required
        />

        <label>
          Featured?
          <input type="checkbox" name="featured" onChange={handleChange} />
        </label>

        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />

        <button type="submit">Create</button>
      </form>
    </section>
  );
}
