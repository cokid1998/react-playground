import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface UserStore {
  user: {
    profile: {
      name: string;
      settings: {
        theme: string;
        role: string;
      };
    };
  };
  updateTheme: (newTheme: string) => void;
}

export const useNonImmer = create<UserStore>((set) => ({
  user: {
    profile: {
      name: "react expert",
      settings: {
        role: "admin",
        theme: "light",
      },
    },
  },
  updateTheme: (newTheme) =>
    // immer를 사용하지 않으면 객체의 depth가 늘어날 수록 가독성이 저하되는 코드가 된다.
    set((state) => ({
      user: {
        ...state,
        profile: {
          ...state.user.profile,
          settings: {
            ...state.user.profile.settings,
            theme: newTheme,
          },
        },
      },
    })),
}));

export const useImmer = create<UserStore>()(
  immer((set) => ({
    user: {
      profile: {
        name: "react expert",
        settings: {
          role: "admin",
          theme: "light",
        },
      },
    },

    updateTheme: (newTheme) =>
      // immer를 사용하면 간편하게 depth가 깊은 값을 간편히 변경가능
      set((draft) => {
        draft.user.profile.settings.theme = newTheme;
      }),
  })),
);
