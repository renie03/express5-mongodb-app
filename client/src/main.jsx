import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeProvider from "./providers/ThemeProvider";
import { AuthLayout, Layout, PublicLayout } from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import UpdateUserPage from "./pages/UpdateUserPage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />

            {/* unauthenticated users only */}
            <Route element={<PublicLayout />}>
              <Route path="register" element={<RegisterPage />} />
              <Route path="login" element={<LoginPage />} />
            </Route>

            {/* authenticated users only */}
            <Route element={<AuthLayout />}>
              <Route path="update-user" element={<UpdateUserPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-right" />
    </ThemeProvider>
  </StrictMode>
);
