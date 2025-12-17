// PublicLoaders.js - NEW FILE
const API_URL = import.meta.env.VITE_API_URL;
export async function publicProjectsLoader() {
  const res = await fetch(`${API_URL}/portfolio/projects`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data; // Returns raw array/object for visitor
}

export async function publicSkillsLoader() {
  const res = await fetch(`${API_URL}/portfolio/skills`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}

export async function publicTestimonialsLoader() {
  const res = await fetch(`${API_URL}/portfolio/testimonials`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}

export async function publicAchievementsLoader() {
  const res = await fetch(`${API_URL}/portfolio/achievements`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}

export async function publicCertificatesLoader() {
  const res = await fetch(`${API_URL}/portfolio/certificates`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}
