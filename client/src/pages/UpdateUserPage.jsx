import { useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import CloudinaryUploadWidget from "../components/shared/CloudinaryUploadWidget";
import uwConfig from "../utils/cloudinaryConfig";
import apiRequest from "../utils/apiRequest";
import { toast } from "react-toastify";
import useAuthStore from "../stores/useAuthStore";

const UpdateUserPage = () => {
  const { currentUser, updateCurrentUser } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState(currentUser?.img || null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const name = formData.get("name");
    const password = formData.get("password");

    try {
      const res = await apiRequest.put(`/users/${currentUser?._id}`, {
        username,
        email,
        name,
        password,
        img: file,
      });
      updateCurrentUser(res.data);
      toast.success("User has been updated");

      e.target.password.value = "";
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex items-center justify-center">
      <div className="border border-borderColor rounded-lg p-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <h1 className="text-lg font-medium text-center">Update</h1>
          <div className="flex flex-col gap-1">
            <label htmlFor="username">Username</label>
            <input
              className="border border-borderColor rounded-md p-3"
              type="text"
              name="username"
              id="username"
              defaultValue={currentUser?.username}
              required
              autoFocus
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              className="border border-borderColor rounded-md p-3"
              type="email"
              name="email"
              id="email"
              defaultValue={currentUser?.email}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <input
              className="border border-borderColor rounded-md p-3"
              type="text"
              name="name"
              id="name"
              defaultValue={currentUser?.name}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <div className="border border-borderColor rounded-md p-3 flex items-center justify-between gap-1 focus-within:ring-focusColor focus-within:ring-1">
              <input
                className="ring-0"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="password"
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
          </div>
          <div className="flex flex-col">
            {/* PREVIEW IMAGE */}
            {file && (
              <div className="self-center relative">
                <img
                  src={file}
                  alt="profile picture preview"
                  className="h-12 w-12 object-cover rounded-full mb-1 self-center"
                />
                <div
                  className="absolute -top-1 right-0 cursor-pointer bg-bgSoft dark:text-white h-4 w-4 rounded-full flex items-center justify-center text-xs"
                  onClick={() => setFile(null)}
                >
                  X
                </div>
              </div>
            )}
            <CloudinaryUploadWidget uwConfig={uwConfig} setState={setFile} />
          </div>
          <button
            className="bg-blue-500 dark:bg-blue-700 text-white rounded-md p-3 cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-800 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? <div className="spinner" /> : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserPage;
