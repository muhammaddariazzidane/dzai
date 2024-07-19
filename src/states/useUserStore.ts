import { auth } from "@/lib/firebase";
import { UserInfo } from "firebase/auth";
import { create } from "zustand";
import { deleteCookie, setCookie } from "cookies-next";

interface UserStore {
  user: UserInfo | null;
  isPreload: boolean;
  preloadProcess: () => void;
  logout: () => void;
  setAuthUser: (data: any) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isPreload: false,
  setAuthUser: (data: any) => {
    setCookie("token", data.accessToken);
    set({
      user: {
        uid: data.uid,
        displayName: data.displayName,
        email: data.email,
        photoURL: data.photoURL,
        phoneNumber: data.phoneNumber,
        providerId: data.providerId,
      },
    });
  },
  preloadProcess: async () => {
    try {
      set({ isPreload: true });
      auth.onAuthStateChanged((user) => user && set({ user }));
    } catch (error) {
      console.log(error);
      set({ user: null });
    } finally {
      set({ isPreload: false });
    }
  },
  logout: () => {
    deleteCookie("token");
    auth.signOut();
    set({ user: null });
  },
}));
