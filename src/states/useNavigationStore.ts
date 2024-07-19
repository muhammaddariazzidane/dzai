import { create } from "zustand";

interface NavigationStore {
  isSidebarOpen: boolean;
  isLoading: boolean;
  setIsLoading: (data: any) => void;
  setIsSidebarOpen: (data: any) => void;
  settingActive: string;
  setSettingActive: (data: string) => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  isSidebarOpen: false,
  isLoading: false,
  settingActive: "general",
  setSettingActive: (settingActive: string) => {
    set({ settingActive });
  },
  setIsLoading: (isLoading: any) => {
    set({ isLoading });
  },
  setIsSidebarOpen: (isSidebarOpen: any) => {
    set({ isSidebarOpen });
  },
}));
