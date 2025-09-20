import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";
import PostItem from "./PostItem";

const FeaturedPosts = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: () =>
      apiRequest("/posts/featured").then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="mb-15">
      <h1 className="text-2xl font-bold mb-5">Featured Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 min-h-[300px]">
        {isPending ? (
          <div className="spinner" />
        ) : error ? (
          "Something went wrong"
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center col-span-full text-textSoft font-semibold">
            No featured posts available.
          </div>
        ) : (
          data.map((post) => <PostItem key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default FeaturedPosts;
