import { useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";
import { toast } from "react-toastify";
import CloudinaryUploadWidget from "../shared/CloudinaryUploadWidget";
import uwConfig from "../../utils/cloudinaryConfig";

const CreateUserForm = ({ setOpen, page, search }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newUser) => {
      return apiRequest.post("/users", newUser);
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
      <h1 className="text-lg font-medium text-center">Create User</h1>
      <input
        className="border border-gray-300 rounded-md p-3 focus:ring-black focus:ring-1"
        type="text"
        name="username"
        placeholder="username"
        required
        autoFocus
      />
      <input
        className="border border-gray-300 rounded-md p-3 focus:ring-black focus:ring-1"
        type="email"
        name="email"
        placeholder="email"
        required
      />
      <input
        className="border border-gray-300 rounded-md p-3 focus:ring-black focus:ring-1"
        type="text"
        name="name"
        placeholder="name"
        required
      />
      <div className="border border-gray-300 rounded-md p-3 flex items-center justify-between gap-1 focus-within:ring-black focus-within:ring-1">
        <input
          className="ring-0"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="password"
          required
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
      <select
        className="border border-gray-300 rounded-md p-3 focus:ring-black focus:ring-1"
        name="isAdmin"
      >
        <option value="false">Is Admin?</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
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
          multiple
          isAdmin
        />
      </div>
      <button
        className="bg-blue-500 dark:bg-blue-700 text-white rounded-md p-3 cursor-pointer disabled:cursor-not-allowed"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? <div className="spinner" /> : "Create"}
      </button>
    </form>
  );
};

export default CreateUserForm;
