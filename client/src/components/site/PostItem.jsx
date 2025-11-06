import { Link } from "react-router";
import { format } from "timeago.js";

const PostItem = ({ post }) => {
  return (
    <div
      key={post._id}
      className="flex flex-col border border-bgSoft rounded-xl"
    >
      <Link to={`/posts/${post._id}`}>
        <div className="aspect-[2/1] rounded-t-xl overflow-hidden">
          <img
            src={post.img || "/noproduct.jpg"}
            alt={post.title}
            className="h-full w-full hover:scale-105 transition-all duration-300"
          />
        </div>
      </Link>
      <div className="p-3">
        <h1 className="text-lg font-medium">{post.title}</h1>
        <div className="flex items-center justify-between">
          <h2>{post.category}</h2>
          <span className="text-textSoft text-sm">
            {format(post.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
