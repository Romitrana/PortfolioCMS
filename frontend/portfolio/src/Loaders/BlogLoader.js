import { apiFetch } from "../utils/api";

export async function blogsLoader() {
  try {
    return await apiFetch("/portfolio/blogs");
  } catch (error) {
    const errorData = {
      message: error.message || "Failed to load blogs",
    };
    throw new Response(JSON.stringify(errorData), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
