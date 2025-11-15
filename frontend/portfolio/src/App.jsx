import "./App.css";
// import { motion } from "motion/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserLayout from "./layout/UserLayout";
import AdminLayout from "./layout/AdminLayout";
import BlogsPage from "./pages/BlogsPage";
import SkillsPage from "./pages/SkillsPage";
import CertificatesPage from "./pages/CertificatesPage";
import ProjectsPage from "./pages/Projects/ProjectsPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import AchievementsPage from "./pages/AchievementsPage";
import AdminWelcomePage from "./components/AdminComponents/AdminWelcomePage";
import ProjectDetailPage from "./pages/Projects/ProjectDetailPage";
import NewProject from "./pages/Projects/NewProject";
import EditProject from "./pages/Projects/EditProject";
// Router setup
const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminWelcomePage /> },
      { path: "blogs", element: <BlogsPage /> },
      { path: "skills", element: <SkillsPage /> },
      {
        path: "projects",
        element: <ProjectsPage />,
        children: [
          { path: ":id", element: <ProjectDetailPage /> },
          { path: "new", element: <NewProject /> },
          { path: "edit/:id", element: <EditProject /> },
        ],
      },
      { path: "certificates", element: <CertificatesPage /> },
      { path: "testimonials", element: <TestimonialsPage /> },
      { path: "achievements", element: <AchievementsPage /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
