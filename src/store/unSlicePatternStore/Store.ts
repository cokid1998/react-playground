import { create } from "zustand";

interface Store {
  isLogged: boolean;
  token: string;
  login: (token: string) => void;
  logOut: () => void;
  theme: string;
  setTheme: () => void;
}

/**
 * 여러 도메인의 상태값들이 하나의 스토어안에 들어가면
 * 유지보수가 어려워짐
 */

export const useUnSlicePatternStore = create<Store>((set, get) => ({
  isLogged: false,
  token: "",
  login: (token) => set({ isLogged: true, token }),
  logOut: () => set({ isLogged: false, token: "" }),

  theme: "light",
  setTheme: () => {
    const { theme: curTheme } = get();
    set({ theme: curTheme === "light" ? "dark" : "light" });
  },
}));
