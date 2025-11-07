import { Link, NavLink } from "react-router";
import useAuthStore from "../../stores/useAuthStore";
import Search from "./Search";
import UserMenu from "./UserMenu";
import ThemeToggle from "../shared/ThemeToggle";
import MobileMenu from "./MobileMenu";
import { links } from "../../constants";

const Navbar = () => {
  const { currentUser } = useAuthStore();

  return (
    <div className="h-20 flex justify-between items-center sticky top-0 bg-bg z-50">
      <Link to="/" className="hidden lg:inline text-lg font-medium">
        Blog App
      </Link>
      <Search />
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <div className="hidden md:flex items-center gap-2">
          {links.map((link) => (
            <NavLink
              key={link.title}
              to={link.path}
              className={({ isActive }) =>
                `py-1 px-3 rounded-full text-lg font-medium ${
                  isActive
                    ? "bg-blue-500 dark:bg-white text-white dark:text-black"
                    : "hover:bg-blue-500 dark:hover:bg-white hover:text-white dark:hover:text-black"
                }`
              }
            >
              {link.title}
            </NavLink>
          ))}
          {currentUser?.isAdmin && (
            <NavLink
              to="/admin/dashboard"
              end
              className={({ isActive }) =>
                `py-1 px-3 rounded-full text-lg font-medium ${
                  isActive
                    ? "bg-blue-500 dark:bg-white text-white dark:text-black"
                    : "hover:bg-blue-500 dark:hover:bg-white hover:text-white dark:hover:text-black"
                }`
              }
            >
              Dashboard
            </NavLink>
          )}
        </div>
        {currentUser ? (
          <UserMenu />
        ) : (
          <NavLink
            to="/login"
            end
            className={({ isActive }) =>
              `hidden md:block py-1 px-3 rounded-full text-lg font-medium ${
                isActive
                  ? "bg-blue-500 dark:bg-white text-white dark:text-black"
                  : "hover:bg-blue-500 dark:hover:bg-white hover:text-white dark:hover:text-black"
              }`
            }
          >
            Login
          </NavLink>
        )}
        {/* MOBILE MENU */}
        <MobileMenu currentUser={currentUser} />
      </div>
    </div>
  );
};

export default Navbar;
