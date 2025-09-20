import { useSearchParams } from "react-router";
import Filters from "../components/site/Filters";
import PaginatedPostList from "../components/site/PaginatedPostList";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "newest";
  const q = searchParams.get("q") || "";

  return (
    <div>
      <h1 className="text-lg text-center mb-2">
        Search results for <b>{q}</b>
      </h1>
      <Filters />
      <PaginatedPostList page={page} category={category} sort={sort} q={q} />
    </div>
  );
};

export default SearchPage;
