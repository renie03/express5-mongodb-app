import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useThemeStore = create(
  persist(
    (set) => ({
      darkMode: false,
      setTheme: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: "theme",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useThemeStore;
