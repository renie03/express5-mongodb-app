import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { useDebouncedCallback } from "use-debounce";

const AdminSearch = ({ placeholder }) => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleSearch = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");

    if (e.target.value) {
      params.set("search", e.target.value);
    } else {
      params.delete("search");
    }

    navigate(`${pathname}?${params.toString()}`, { replace: true });
  }, 300);

  return (
    <div className="border border-borderColor rounded-2xl p-1 pl-2 flex items-center justify-between gap-2 focus-within:ring-focusColor focus-within:ring-1">
      <FaSearch />
      <input
        className="ring-0"
        type="text"
        placeholder={placeholder}
        onChange={handleSearch}
        defaultValue={searchParams.get("search")?.toString()}
      />
    </div>
  );
};

export default AdminSearch;
