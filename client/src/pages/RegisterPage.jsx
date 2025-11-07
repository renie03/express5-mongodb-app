import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { toast } from "react-toastify";
import apiRequest from "../utils/apiRequest";
import CloudinaryUploadWidget from "../components/shared/CloudinaryUploadWidget";
import uwConfig from "../utils/cloudinaryConfig";
import useAuthStore from "../stores/useAuthStore";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const name = formData.get("name");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        name,
        password,
        img: avatar,
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
          <h1 className="text-lg font-medium text-center">Register</h1>
          <input
            className="border border-borderColor rounded-md p-3"
            type="text"
            name="username"
            placeholder="username"
            required
            autoFocus
          />
          <input
            className="border border-borderColor rounded-md p-3"
            type="email"
            name="email"
            placeholder="email"
            required
          />
          <input
            className="border border-borderColor rounded-md p-3"
            type="text"
            name="name"
            placeholder="name"
            required
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
          <div className="flex flex-col">
            {/* PREVIEW IMAGE */}
            {avatar && (
              <div className="self-center relative">
                <img
                  src={avatar}
                  alt="profile picture preview"
                  className="h-12 w-12 object-cover rounded-full mb-1 self-center"
                />
                <div
                  className="absolute -top-1 right-0 cursor-pointer bg-bgSoft dark:text-white h-4 w-4 rounded-full flex items-center justify-center text-xs"
                  onClick={() => setAvatar(null)}
                >
                  X
                </div>
              </div>
            )}
            <CloudinaryUploadWidget uwConfig={uwConfig} setState={setAvatar} />
          </div>
          <button
            className="bg-blue-500 dark:bg-blue-700 text-white rounded-md p-3 cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-800 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? <div className="spinner" /> : "Register"}
          </button>
        </form>
        <span className="text-sm text-textSoft mt-3">
          Do you have an account?
          <Link to="/login" className="ml-1 font-bold">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default RegisterPage;
