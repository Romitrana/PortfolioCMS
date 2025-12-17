import "./App.css";
// import { motion } from "motion/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserLayout from "./layout/UserLayout";
import AdminLayout from "./layout/AdminLayout";
//blogs
import BlogsPage from "./pages/Blogs/BlogsPage";
import BlogDetailPage from "./pages/Blogs/BlogDetailPage";
import NewBlog from "./pages/Blogs/NewBlog";
import EditBlog from "./pages/Blogs/EditBlog";
//projects
import ProjectsPage from "./pages/Projects/ProjectsPage";
import ProjectDetailPage from "./pages/Projects/ProjectDetailPage";
import NewProject from "./pages/Projects/NewProject";
import EditProject from "./pages/Projects/EditProject";
// skills
import SkillsPage from "./pages/Skills/SkillsPage";
import EditSkill from "./pages/Skills/EditSkill";
import NewSkill from "./pages/Skills/NewSkill";
import SkillDetailPage from "./pages/Skills/SkillDetailPage";
//certificates
import CertificatesPage from "./pages/Certificates/CertificatesPage";
import NewCertificate from "./pages/Certificates/NewCertificate";
import EditCertificate from "./pages/Certificates/EditCertificate";
import CertificateDetailPage from "./pages/Certificates/CertificateDetailPage";

// testimonial
import TestimonialsPage from "./pages/Testimonials/TestimonialsPage";
import EditTestimonial from "./pages/Testimonials/EditTestimonial";
import NewTestimonial from "./pages/Testimonials/NewTestimonial";
import TestimonialDetailPage from "./pages/Testimonials/TestimonialDetailPage";

//achievement
import AchievementsPage from "./pages/Achievements/AchievementsPage";
import AchievementDetailPage from "./pages/Achievements/AchievementDetailPage";
import NewAchievement from "./pages/Achievements/NewAchievement";
import EditAchievement from "./pages/Achievements/EditAchievement";

import AdminWelcomePage from "./components/AdminComponents/AdminWelcomePage";
import AuthPage from "./pages/AuthPage";
import UserBlog from "./pages/UserBlog";

import ProtectedRoute from "./APIstore/ProtectedRoute";
import DummyPage from "./components/UtilComponents/DummyPage";
//loaders
import { projectsLoader } from "./Loaders/ProjectLoader";
import { blogsLoader } from "./Loaders/BlogLoader";
import { skillLoader } from "./Loaders/SkillLoader";
import { testimonialLoader } from "./Loaders/TestimonialLoader";
import { certificateLoader } from "./Loaders/CertificateLoader";
import { achievementLoader } from "./Loaders/AchievementLoader";
//public loader
import {
  publicProjectsLoader,
  publicSkillsLoader,
  publicTestimonialsLoader,
  publicAchievementsLoader,
  publicCertificatesLoader,
} from "./APIstore/PublicLoaders";
import UserProjectDetail from "./pages/UserProjectDetail";
// Router setup
const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    loader: async () => {
      const [projects, skills, testimonials, achievements, certificates] =
        await Promise.all([
          publicProjectsLoader(),
          publicSkillsLoader(),
          publicTestimonialsLoader(),
          publicAchievementsLoader(),
          publicCertificatesLoader(),
        ]);

      return {
        projects: projects || [],
        skills: skills || [],
        testimonials: testimonials || [],
        achievements: achievements || [],
        certificates: certificates || [],
      };
    },
  },
  {
    path: "/project-details/:id",
    element: <UserProjectDetail />,
  },
  {
    path: "blogs",
    element: <UserBlog />,
    loader: blogsLoader,
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminWelcomePage /> },
      {
        path: "blogs",
        element: <BlogsPage />,
        loader: blogsLoader,
        children: [
          {
            index: true,
            element: <DummyPage text={"Select a blog to view its details"} />,
          },
          { path: ":id", element: <BlogDetailPage /> },
          { path: "new", element: <NewBlog /> },
          { path: "edit/:id", element: <EditBlog /> },
        ],
      },
      {
        path: "skills",
        element: <SkillsPage />,
        loader: skillLoader,
        children: [
          {
            index: true,
            element: <DummyPage text={"Select a skill to view its details"} />,
          },
          { path: ":id", element: <SkillDetailPage /> },
          { path: "new", element: <NewSkill /> },
          { path: "edit/:id", element: <EditSkill /> },
        ],
      },
      {
        path: "projects",
        element: <ProjectsPage />,
        loader: projectsLoader,
        children: [
          {
            index: true,
            element: (
              <DummyPage text={"Select a project to view its details"} />
            ),
          },
          { path: ":id", element: <ProjectDetailPage /> },
          { path: "new", element: <NewProject /> },
          { path: "edit/:id", element: <EditProject /> },
        ],
      },
      {
        path: "testimonials",
        element: <TestimonialsPage />,
        loader: testimonialLoader,
        children: [
          {
            index: true,
            element: (
              <DummyPage text={"Select a testimonial to view its details"} />
            ),
          },
          { path: ":id", element: <TestimonialDetailPage /> },
          { path: "new", element: <NewTestimonial /> },
          { path: "edit/:id", element: <EditTestimonial /> },
        ],
      },
      {
        path: "certificates",
        element: <CertificatesPage />,
        loader: certificateLoader,
        children: [
          {
            index: true,
            element: (
              <DummyPage text={"Select a certificate to view its details"} />
            ),
          },
          { path: ":id", element: <CertificateDetailPage /> },
          { path: "new", element: <NewCertificate /> },
          { path: "edit/:id", element: <EditCertificate /> },
        ],
      },
      {
        path: "achievements",
        element: <AchievementsPage />,
        loader: achievementLoader,
        children: [
          {
            index: true,
            element: (
              <DummyPage text={"Select an achievement to view its details"} />
            ),
          },
          { path: ":id", element: <AchievementDetailPage /> },
          { path: "new", element: <NewAchievement /> },
          { path: "edit/:id", element: <EditAchievement /> },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <AuthPage />,
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
