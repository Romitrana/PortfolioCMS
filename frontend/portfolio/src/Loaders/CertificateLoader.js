const API_URL = import.meta.env.VITE_API_URL;
export async function certificateLoader() {
  const url = `${API_URL}http://localhost:8000/portfolio/certificates`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      const errorData = {
        message: `Failed to fetch certificates. Status: ${res.status}`,
      };
      throw new Response(JSON.stringify(errorData), {
        status: res.status,
        statusText: res.statusText || "Fetch Error",
        headers: { "Content-Type": "application/json" },
      });
    }
    return res;
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
    const networkErrorData = {
      message: "Could not connect to the server or a network error occurred.",
    };
    throw new Response(JSON.stringify(networkErrorData), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
