import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // Check if token exists in localStorage
  const token = localStorage.getItem("admin_token");

  // If no token → redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise → allow access
  return children;
}
