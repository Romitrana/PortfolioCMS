import "./App.css";
// import { motion } from "motion/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserLayout from "./layout/UserLayout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout/>,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
