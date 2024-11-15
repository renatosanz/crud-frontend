import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./views/login-view/Login";
import Register from "./views/register-view/Register";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary:{
      main:"#c7a5fd"
    }
  },
});

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
