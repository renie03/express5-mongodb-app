import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";
import useAuthStore from "../../stores/useAuthStore";
import { NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import apiRequest from "../../utils/apiRequest";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/admin/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/admin/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Posts",
        path: "/admin/posts",
        icon: <MdShoppingBag />,
      },
      {
        title: "Transactions",
        path: "/",
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "/",
        icon: <MdWork />,
      },
      {
        title: "Reports",
        path: "/",
        icon: <MdAnalytics />,
      },
      {
        title: "Teams",
        path: "/",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const Sidebar = () => {
  const { currentUser, removeCurrentUser } = useAuthStore();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await apiRequest.post("/auth/logout");
      removeCurrentUser();
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-bgSoft p-5 w-max md:w-[300px] h-screen flex flex-col justify-between sticky top-0">
      <div>
        <div className="flex items-center gap-5 mb-5">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src={currentUser.img || "/noavatar.png"}
            alt={currentUser.name}
          />
          <div className="hidden md:flex flex-col">
            <span className="font-medium">{currentUser.name}</span>
            <span className="text-sm text-textSoft">Administrator</span>
          </div>
        </div>
        <ul className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <li className="flex flex-col" key={item.title}>
              <span className="text-textSoft font-bold text-sm text-center md:text-start">
                {item.title}
              </span>
              {item.list.map((link) => (
                <NavLink
                  key={link.title}
                  to={link.path}
                  className={({ isActive }) =>
                    `p-3 flex items-center justify-center md:justify-start gap-2 rounded-md text-lg font-medium my-2 hover:bg-blue-500 hover:text-white dark:hover:bg-white dark:hover:text-black ${
                      isActive &&
                      "bg-blue-500 dark:bg-white text-white dark:text-black"
                    }`
                  }
                >
                  {link.icon}
                  <span className="hidden md:block">{link.title}</span>
                </NavLink>
              ))}
            </li>
          ))}
        </ul>
        <button
          className="p-3 my-2 flex items-center justify-center md:justify-start gap-2 rounded-md w-full cursor-pointer"
          onClick={handleLogout}
        >
          <MdLogout />
          <span className="hidden md:block">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
