// PublicLoaders.js
import { apiFetch } from "../utils/api";

export async function publicProjectsLoader() {
  return await apiFetch("/portfolio/projects");
}

export async function publicSkillsLoader() {
  return await apiFetch("/portfolio/skills");
}

export async function publicTestimonialsLoader() {
  return await apiFetch("/portfolio/testimonials");
}

export async function publicAchievementsLoader() {
  return await apiFetch("/portfolio/achievements");
}

export async function publicCertificatesLoader() {
  return await apiFetch("/portfolio/certificates");
}
