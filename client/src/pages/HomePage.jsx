import { Link, useSearchParams } from "react-router";
import FeaturedPosts from "../components/site/FeaturedPosts";
import Categories from "../components/site/Categories";
import PostList from "../components/site/PostList";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";

  return (
    <div>
      <FeaturedPosts />
      <div>
        <h1 className="text-2xl font-bold mb-5">Recent Posts</h1>
        <Categories />
        <PostList category={category} />
      </div>
      <div className="flex justify-end">
        <Link
          to={category ? `/posts/?category=${category}` : "/posts"}
          className="mt-4 underline text-sm text-textSoft"
        >
          View all posts
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
