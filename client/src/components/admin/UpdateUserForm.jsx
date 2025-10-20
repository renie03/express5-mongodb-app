import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import apiRequest from "../../utils/apiRequest";
import { toast } from "react-toastify";
import CloudinaryUploadWidget from "../shared/CloudinaryUploadWidget";
import uwConfig from "../../utils/cloudinaryConfig";

const UpdateUserForm = ({ setOpen, user, page, search }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState(user.img || "");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updatedUser) => {
      return apiRequest.put(`/users/admin/${user._id}`, updatedUser);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["users", page, search] });
      setOpen(false);
      toast.success(res.data.message);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const name = formData.get("name");
    const password = formData.get("password");
    const isAdmin = formData.get("isAdmin");

    mutation.mutate({ username, email, name, password, isAdmin, img: file });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-black">
      <h1 className="text-lg font-medium text-center">Update User</h1>
      <div className="flex flex-col gap-1">
        <label htmlFor="username">Username</label>
        <input
          className="border border-gray-300 rounded-md p-3 focus:ring-black focus:ring-1"
          type="text"
          name="username"
          id="username"
          defaultValue={user.username}
          required
          autoFocus
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email">Email</label>
        <input
          className="border border-gray-300 rounded-md p-3 focus:ring-black focus:ring-1"
          type="email"
          name="email"
          id="email"
          defaultValue={user.email}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="name">Name</label>
        <input
          className="border border-gray-300 rounded-md p-3 focus:ring-black focus:ring-1"
          type="text"
          name="name"
          id="name"
          defaultValue={user.name}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password">Password</label>
        <div className="border border-gray-300 rounded-md p-3 flex items-center justify-between gap-1 focus-within:ring-black focus-within:ring-1">
          <input
            className="ring-0"
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="password"
          />
          <span
            className="cursor-pointer"
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
      <div>
        <label htmlFor="isAdmin">Admin</label>
        <select
          className="border border-gray-300 rounded-md p-2 ml-1 focus:ring-black focus:ring-1"
          name="isAdmin"
          id="isAdmin"
          defaultValue={user.isAdmin ? "true" : "false"}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div className="flex flex-col">
        {file && (
          <img
            src={file}
            alt=""
            className="h-12 w-12 object-cover rounded-full mb-1 self-center"
          />
        )}
        <CloudinaryUploadWidget
          uwConfig={uwConfig}
          setState={setFile}
          isAdmin
        />
      </div>
      <button
        className="bg-blue-500 dark:bg-blue-700 text-white rounded-md p-3 cursor-pointer disabled:cursor-not-allowed"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? <div className="spinner" /> : "Update"}
      </button>
    </form>
  );
};

export default UpdateUserForm;
