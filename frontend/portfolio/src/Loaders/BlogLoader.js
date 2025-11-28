// Loaders/BlogLoader.js
export async function blogsLoader() {
  const res = await fetch("http://localhost:8000/portfolio/blogs");
  if (!res.ok) {
    throw new Response("Failed to load blogs", { status: res.status });
  }
  const data = await res.json();
  return data; 
}
