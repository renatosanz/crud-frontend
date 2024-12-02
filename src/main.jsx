import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./views/login-view/Login";
import Register from "./views/register-view/Register";
import Home from "./views/home-view/Home";
import { ThemeProvider } from "@/components/ThemeProvider";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/home", element: <Home /> },
]);

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme="dark" storageKey="vite-ui-theme">
    <RouterProvider router={router} />
  </ThemeProvider>
);
