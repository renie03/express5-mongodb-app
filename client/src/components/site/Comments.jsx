import { useInfiniteQuery } from "@tanstack/react-query";
import useAuthStore from "../../stores/useAuthStore";
import Comment from "./Comment";
import apiRequest from "../../utils/apiRequest";
import InfiniteScroll from "react-infinite-scroll-component";
import AddCommentForm from "./AddCommentForm";
import { Link } from "react-router";

const fetchComments = async ({ pageParam, postId }) => {
  const res = await apiRequest.get(`/comments/${postId}?cursor=${pageParam}`);
  return res.data;
};

const Comments = ({ postId }) => {
  const { currentUser } = useAuthStore();

  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ["comments", postId],
    queryFn: ({ pageParam = 0 }) => fetchComments({ pageParam, postId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  console.log(data);

  const allComments = data?.pages?.flatMap((page) => page.comments) || [];

  return (
    <>
      <h1 className="text-2xl font-medium mb-5">Comments</h1>
      {currentUser ? (
        <div className="flex gap-2">
          <img
            src={currentUser?.img || "/noavatar.png"}
            alt=""
            className="h-12 w-12 rounded-full object-cover"
          />
          <AddCommentForm postId={postId} />
        </div>
      ) : (
        <div className="mb-2">
          <Link to="/login" className="underline">
            Login to write a comment
          </Link>
        </div>
      )}
      {status === "pending" ? (
        <div className="w-full flex justify-center">
          <div className="spinner" />
        </div>
      ) : status === "error" ? (
        "Something went wrong"
      ) : (
        <InfiniteScroll
          dataLength={allComments.length}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={
            <div className="w-full flex justify-center pt-20 pb-5">
              <div className="spinner" />
            </div>
          }
          style={{ overflow: "visible" }}
          // endMessage={
          //   <p>
          //     <b>All posts loaded!</b>
          //   </p>
          // }
        >
          <div className="flex flex-col gap-7 mt-7">
            {allComments.length === 0 ? (
              <div className="text-center text-textSoft font-semibold py-5">
                No comments yet. Be the first to comment!
              </div>
            ) : (
              allComments.map((comment) => (
                <Comment
                  key={comment._id}
                  comment={comment}
                  postId={postId}
                  userId={currentUser?._id}
                />
              ))
            )}
          </div>
        </InfiniteScroll>
      )}
    </>
  );
};

export default Comments;
