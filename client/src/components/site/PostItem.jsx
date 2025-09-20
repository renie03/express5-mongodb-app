import { Link } from "react-router";
import { format } from "timeago.js";

const PostItem = ({ post }) => {
  return (
    <div key={post._id} className="flex flex-col">
      <Link to={`/posts/${post._id}`} className="relative aspect-[2/1]">
        <img
          src={post.img || "/noproduct.jpg"}
          alt={post.title}
          className="absolute inset-0 w-full h-full rounded-xl"
        />
      </Link>
      <h1 className="text-lg font-medium mt-1">{post.title}</h1>
      <div className="flex items-center justify-between">
        <h2>{post.category}</h2>
        <span className="text-textSoft text-sm">{format(post.createdAt)}</span>
      </div>
    </div>
  );
};

export default PostItem;
