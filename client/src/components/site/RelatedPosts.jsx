import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";
import PostItem from "./PostItem";

const RelatedPosts = ({ category, postId }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["relatedPosts", category, postId],
    queryFn: () =>
      apiRequest
        .get(`/posts/related?category=${category}&postId=${postId}`)
        .then((res) => res.data),
  });

  return (
    <div>
      <h1 className="text-xl font-semibold mb-2">Related Post</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 min-h-[235px]">
        {isPending ? (
          <div className="spinner" />
        ) : error ? (
          "Something went wrong"
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center col-span-full text-textSoft font-semibold">
            No related posts found.
          </div>
        ) : (
          data.map((post) => <PostItem key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default RelatedPosts;
