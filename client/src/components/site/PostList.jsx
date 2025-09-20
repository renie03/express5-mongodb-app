import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";
import PostItem from "./PostItem";

const PostList = ({ category }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["posts", category],
    queryFn: () =>
      apiRequest(`/posts?category=${category}`).then((res) => {
        return res.data;
      }),
  });

  const emptyMessage = category
    ? `No posts found in ${category} category.`
    : "No posts available.";

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 min-h-[240px]">
      {isPending ? (
        <div className="spinner" />
      ) : error ? (
        "Something went wrong"
      ) : data.length === 0 ? (
        <div className="flex items-center justify-center col-span-full text-textSoft font-semibold">
          {emptyMessage}
        </div>
      ) : (
        data.map((post) => <PostItem key={post._id} post={post} />)
      )}
    </div>
  );
};

export default PostList;
