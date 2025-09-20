import { useQuery } from "@tanstack/react-query";
import Pagination from "./Pagination";
import apiRequest from "../../utils/apiRequest";
import PostItem from "./PostItem";

const PaginatedPostList = ({ page, category, sort, q }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["posts", page, category, sort, q],
    queryFn: () =>
      apiRequest
        .get(
          `/posts/paginated?page=${page}&category=${category}&sort=${sort}&q=${
            q || ""
          }`
        )
        .then((res) => res.data),
  });

  const emptyMessage =
    q && category
      ? `No posts found for "${q}" in ${category} category.`
      : q
      ? `No posts found for "${q}".`
      : category
      ? `No posts found in ${category} category.`
      : "No posts available.";

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 min-h-[240px]">
        {isPending ? (
          <div className="spinner" />
        ) : error ? (
          "Something went wrong"
        ) : data.posts.length === 0 ? (
          <div className="flex items-center justify-center col-span-full text-textSoft font-semibold">
            {emptyMessage}
          </div>
        ) : (
          data.posts.map((post) => <PostItem key={post._id} post={post} />)
        )}
      </div>
      <Pagination totalData={data?.totalPosts || 0} isLoading={isPending} />
    </div>
  );
};

export default PaginatedPostList;
