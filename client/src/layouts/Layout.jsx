import { Navigate, Outlet } from "react-router";
import Navbar from "../components/site/Navbar";
import Footer from "../components/site/Footer";
import useAuthStore from "../stores/useAuthStore";

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-5">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

// logged-in users cannot access /login or /register and navigate to home page
export const PublicLayout = () => {
  const { currentUser } = useAuthStore();
  if (currentUser) return <Navigate to="/" />;

  return <Outlet />;
};

// only authenticated users can access /update-user and navigate to login page
export const AuthLayout = () => {
  const { currentUser } = useAuthStore();
  if (!currentUser) return <Navigate to="/login" />;

  return <Outlet />;
};
