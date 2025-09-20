import { useLocation, useNavigate, useSearchParams } from "react-router";

const Filters = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "newest";

  const handleChange = (key, value) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    navigate(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between mb-5 mt-[1px]">
      {/* Category */}
      <div>
        <span className="mr-1">Sort by:</span>
        <select
          name="category"
          value={category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="border border-borderColor rounded-md p-1 text-text bg-bg"
        >
          <option value="">All</option>
          <option value="general">General</option>
          <option value="technology">Technology</option>
          <option value="health">Health</option>
          <option value="sports">Sports</option>
          <option value="education">Education</option>
        </select>
      </div>
      {/* Sort */}
      <div>
        <span className="mr-1">Sort by:</span>
        <select
          name="sort"
          value={sort}
          onChange={(e) => handleChange("sort", e.target.value)}
          className="border border-borderColor rounded-md p-1 text-text bg-bg"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
