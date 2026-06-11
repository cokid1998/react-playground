import { create } from "zustand";

interface User {
  profile: {
    name: string;
    settings: {
      role: string;
    };
  };
}

interface Store {
  theme: string;
  setTheme: () => void;
  token: string;

  isLogged: boolean;
  login: () => void;
  logout: () => void;

  user: User;
  setName: (name: string) => void;
}

const useStore = create<Store>((set, get) => ({
  theme: "light",
  setTheme: () => {
    const { theme: curTheme } = get();
    set({ theme: curTheme === "light" ? "dark" : "light" });
  },

  isLogged: false,
  token: "",
  login: () => {
    set({ token: "Bearer asdf", isLogged: true });
  },
  logout: () => {
    set({ token: "", isLogged: false });
  },

  user: {
    profile: {
      name: "lee",
      settings: {
        role: "admin",
      },
    },
  },
  setName: (name) => {
    set((state) => ({
      user: {
        ...state.user,
        profile: {
          ...state.user.profile,
          name,
          settings: {
            ...state.user.profile.settings,
          },
        },
      },
    }));
  },
}));

export default useStore;
