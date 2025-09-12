import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { toast } from "react-toastify";
import apiRequest from "../utils/apiRequest";
import useAuthStore from "../stores/useAuthStore";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });
      setCurrentUser(res.data);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex items-center justify-center">
      <div className="border border-borderColor rounded-lg p-5 flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <h1 className="text-lg font-medium text-center">Login</h1>
          <input
            className="border border-borderColor rounded-md p-3"
            type="text"
            name="username"
            placeholder="username"
            required
            autoFocus
          />
          <div className="border border-borderColor rounded-md p-3 flex items-center justify-between gap-1 focus-within:ring-focusColor focus-within:ring-1">
            <input
              className="ring-0"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="password"
              required
            />
            <span
              className="cursor-pointer dark:text-textSoft"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <MdOutlineVisibility size={20} />
              ) : (
                <MdOutlineVisibilityOff size={20} />
              )}
            </span>
          </div>
          <button
            className="bg-blue-500 dark:bg-blue-700 text-white rounded-md p-3 cursor-pointer disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? <div className="spinner" /> : "Login"}
          </button>
        </form>
        <span className="text-sm text-textSoft mt-3">
          Don&apos;t have an account?
          <Link to="/register" className="ml-1 font-bold">
            Register
          </Link>
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
