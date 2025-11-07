import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";
import { toast } from "react-toastify";
import CloudinaryUploadWidget from "../shared/CloudinaryUploadWidget";
import uwConfig from "../../utils/cloudinaryConfig";

const CreatePostForm = ({ setOpen, page, search }) => {
  const [file, setFile] = useState(null);
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newPost) => {
      return apiRequest.post("/posts", newPost);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["posts", page, search] });
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

    const title = formData.get("title");
    const desc = formData.get("desc");
    const category = formData.get("category");
    const isFeatured = formData.get("isFeatured");

    mutation.mutate({ title, desc, category, isFeatured, img: file });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-black">
      <h1 className="text-lg font-medium text-center">Create Post</h1>
      <input
        className="border border-gray-300 rounded-md p-3 focus:ring-black focus:ring-1"
        type="text"
        name="title"
        placeholder="title"
        required
        ref={titleRef}
      />
      <input
        className="border border-gray-300 rounded-md p-3 focus:ring-black focus:ring-1"
        type="text"
        name="desc"
        placeholder="desc"
        required
      />
      <select
        className="border border-gray-300 rounded-md p-3 focus:ring-black focus:ring-1"
        name="category"
        required
      >
        <option value="">Select Category</option>
        <option value="general">General</option>
        <option value="technology">Technology</option>
        <option value="health">Health</option>
        <option value="sports">Sports</option>
        <option value="education">Education</option>
      </select>
      <select
        className="border border-gray-300 rounded-md p-3 focus:ring-black focus:ring-1"
        name="isFeatured"
      >
        <option value="false">Is Featured?</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
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
        <CloudinaryUploadWidget
          uwConfig={uwConfig}
          setState={setFile}
          isAdmin
        />
      </div>
      <button
        className="bg-blue-500 dark:bg-blue-700 text-white rounded-md p-3 cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-800 disabled:cursor-not-allowed"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? <div className="spinner" /> : "Create"}
      </button>
    </form>
  );
};

export default CreatePostForm;
