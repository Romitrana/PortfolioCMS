import { apiFetch } from "../utils/api";

export async function projectsLoader() {
  try {
    return await apiFetch("/portfolio/projects");
  } catch (error) {
    const errorData = {
      message:
        error.message ||
        "Could not connect to the server or a network error occurred.",
    };
    throw new Response(JSON.stringify(errorData), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
