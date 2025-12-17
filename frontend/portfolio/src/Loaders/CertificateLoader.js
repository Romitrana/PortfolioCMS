import { apiFetch } from "../utils/api";

export async function certificateLoader() {
  try {
    return await apiFetch("/portfolio/certificates");
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
