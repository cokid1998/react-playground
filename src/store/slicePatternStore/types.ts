export interface AuthSlice {
  isLogged: boolean;
  token: string;
  login: () => void;
  logOut: () => void;
}

export interface ThemeSlice {
  theme: string;
  setTheme: () => void;
}

export interface Store extends AuthSlice, ThemeSlice {}
