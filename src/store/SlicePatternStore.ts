import { create, type StateCreator } from "zustand";

interface AuthSlice {
  isLogged: boolean;
  token: string;
  login: (token: string) => void;
  logOut: () => void;
}

interface ThemeSlice {
  theme: string;
  setTheme: () => void;
}

interface Store extends AuthSlice, ThemeSlice {}

const createAuthSlice: StateCreator<Store, [], [], AuthSlice> = (set) => ({
  isLogged: false,
  token: "",
  login: (token) => {
    set({ isLogged: true, token });
  },
  logOut: () => {
    set({ isLogged: false, token: "" });
  },
});

const createThemeSlice: StateCreator<Store, [], [], ThemeSlice> = (
  set,
  get,
) => ({
  theme: "light",
  setTheme: () => {
    const { theme: curTheme } = get();
    set({ theme: curTheme === "light" ? "dark" : "light" });
  },
});

export const useSlicePatternStore = create<Store>()((...arg) => ({
  ...createAuthSlice(...arg),
  ...createThemeSlice(...arg),
}));

/**
 * slice패턴을 적용시킨 store
 * 도메인별로 상태들을 쪼개서 관리할 수 있어서 유지보수에 용이해짐
 */
