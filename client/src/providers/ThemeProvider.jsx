import { useEffect } from "react";
import useThemeStore from "../stores/useThemeStore";

const ThemeProvider = ({ children }) => {
  const { darkMode } = useThemeStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return <div>{children}</div>;
};

export default ThemeProvider;
