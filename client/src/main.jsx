import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeProvider from "./providers/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  AdminLayout,
  AuthLayout,
  Layout,
  PublicLayout,
} from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import UpdateUserPage from "./pages/UpdateUserPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminPostsPage from "./pages/AdminPostsPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import PostsPage from "./pages/PostsPage";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="posts" element={<PostsPage />} />

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

            {/* authenticated users only with admin role */}
            <Route path="admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="posts" element={<AdminPostsPage />} />
              <Route path="users" element={<AdminUsersPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer position="bottom-right" />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
