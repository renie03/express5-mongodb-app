import { Link, useLocation } from "react-router";
import { FaSearch } from "react-icons/fa";
import { MdPublic } from "react-icons/md";
import ThemeToggle from "../shared/ThemeToggle";

const Topbar = () => {
  const { pathname } = useLocation();

  return (
    <div className="p-5 rounded-xl bg-bgSoft flex items-center justify-between mb-5">
      <div className="text-textSoft font-bold capitalize">
        {pathname.split("/").pop()}
      </div>
      <div className="flex items-center gap-5">
        <div className="border border-borderColor rounded-lg p-1 pl-2 flex items-center gap-2 focus-within:ring-focusColor focus-within:ring-1">
          <FaSearch />
          <input className="ring-0" type="text" placeholder="Search..." />
        </div>
        <ThemeToggle />
        <Link to="/" className="flex items-center gap-1">
          <MdPublic size={18} />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
