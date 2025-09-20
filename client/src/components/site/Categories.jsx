import { useLocation, useNavigate, useSearchParams } from "react-router";

const categories = [
  { label: "All", value: "" },
  { label: "General", value: "general" },
  { label: "Technology", value: "technology" },
  { label: "Health", value: "health" },
  { label: "Sports", value: "sports" },
  { label: "Education", value: "education" },
];

const Categories = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const category = searchParams.get("category") || "";

  const handleChange = (value) => {
    const params = new URLSearchParams(searchParams);

    if (!value) {
      params.delete("category");
    } else {
      params.set("category", value);
    }

    navigate(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-3 mb-4">
      {categories.map((item) => (
        <button
          key={item.value}
          className={`w-25 rounded-md font-bold text-center text-white cursor-pointer ${
            category === item.value
              ? "bg-blue-700 dark:bg-blue-900"
              : "bg-blue-500 dark:bg-blue-700"
          }`}
          onClick={() => handleChange(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default Categories;
