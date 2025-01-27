import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./views/login-view/Login";
import Register from "./views/register-view/Register";
import Home from "./views/home-view/Home";
import UploadRecipes from "./views/files-view/UploadRecipes.tsx";
import Search from "./views/search-view/Search.tsx";
import RecipePage from "./views/recipe-view/RecipePage.tsx";
import {ThemeProvider} from "@/components/ThemeProvider.tsx";

const router = createBrowserRouter(
  [
    { path: "/", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/home", element: <Home /> },
    { path: "/recipes/upload", element: <UploadRecipes /> },
    { path: "/search/:str", element: <Search /> },
    { path: "/recipe/:id", element: <RecipePage /> },
    { path: "/search", element: <Search /> },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
);
