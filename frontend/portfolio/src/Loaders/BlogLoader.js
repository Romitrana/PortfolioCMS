// Loaders/BlogLoader.js
const API_URL = import.meta.env.VITE_API_URL;
export async function blogsLoader() {
  const res = await fetch(`${API_URL}/portfolio/blogs`);
  if (!res.ok) {
    throw new Response("Failed to load blogs", { status: res.status });
  }
  const data = await res.json();
  return data; 
}
