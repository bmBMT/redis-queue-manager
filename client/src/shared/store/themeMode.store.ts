import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeModeType = "light" | "dark";

interface IThemeModeStore {
  mode: ThemeModeType;
  setMode: (mode: ThemeModeType) => void;
}

const useThemeModeStore = create<IThemeModeStore>()(
  persist(
    set => ({
      mode: "light",
      setMode: mode => set({ mode }),
    }),
    {
      name: "theme-mode-storage",
    }
  )
);

export default useThemeModeStore;
