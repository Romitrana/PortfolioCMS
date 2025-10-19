# ---- image suggestions

1. Best combo for your portfolio:

2. Backgrounds: high-quality JPG/PNG (starfield, galaxy gradient).

3. Decorative & Animated Elements (rockets, planets, astronauts, satellites): SVGs.

4. Icons (skills, contact, socials): SVGs (lightweight + animatable).

# --------------------- FEATURES --------------------------

🟡 Skills

⚡Skill-Project-Certificate Relationship

> Each Skill can reference multiple Projects and Certificates via their \_ids in MongoDB.
> On the frontend, Skill cards display linked Projects and Certificates as clickable links.
> Clicking a link redirects the user to the respective Project or Certificate detail page, which fetches full data using the referenced \_id.
> This approach keeps Skill documents lightweight and ensures that updates in Projects or Certificates are reflected dynamically across the app.
> Backend APIs for fetching single Project or Certificate are used to populate the detail pages.

proposed template structure

<!-- <div className="skill-card">
  <h2>{skill.name}</h2>
  <p>Proficiency: {skill.proficiency}</p>
  <div>
    <h4>Certificates:</h4>
    {skill.certificates.map(cert => (
      <a key={cert._id} href={`/certificates/${cert._id}`}>
        {cert.title}
      </a>
    ))}
  </div>
  <div>
    <h4>Projects:</h4>
    {skill.projects.map(project => (
      <a key={project._id} href={`/projects/${project._id}`}>
        {project.title}
      </a>
    ))}
  </div>
</div> -->
