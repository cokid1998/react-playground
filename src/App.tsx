import { createContext, useState, type ReactNode } from "react";
import { A, B, C, D, E } from "./components/Children";
interface ThemeContextType {
  theme: string;
}

interface ThemeActionContextType {
  handleSetTheme: () => void;
}

export const ThemeStateContext = createContext<ThemeContextType | null>(null);
export const ThemeActionContext = createContext<ThemeActionContextType | null>(
  null,
);

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState("light");

  const handleSetTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeStateContext.Provider value={{ theme }}>
      <ThemeActionContext.Provider value={{ handleSetTheme }}>
        {children}
      </ThemeActionContext.Provider>
    </ThemeStateContext.Provider>
  );
}

function App() {
  console.log("App 렌더");

  return (
    <ThemeProvider>
      <A />
      <B />
      <C />
      <D />
      <E />
    </ThemeProvider>
  );
}

export default App;

// Provider는 어느 컴포넌트까지 이 값을 공유할것인가에 대한 "경계"를 정하기 위해 쓰임
// provider의 value에 useState을 제외한 정적인 값들은 변경이 불가능함, 즉 value에 넣는값은 거의 state라고 봐야함

/**
 * Context API에서 리렌더링 최적화를 하는 방법
 *
 * 1. state와 action함수를 제공하는 context를 2개로 나눈다.
 *
 * 2. useCallback을 쓰는 케이스: Provider안에 상태값이 변경될 때 리렌더링 되기 때문에
 * 함수의 주소값이 바뀌는 문제를 해결하기 위해 useCallback을 사용해서 함수의 주소값을 고정해야한다.
 *
 * 3. useMemo를 쓰는 케이스: Provider안에 상태값이 2개있다고 가정했을 때 1개의 상태값이 변동되면
 * Provider가 리렌더링 되면 객체,배열 리터럴이 재정의 되면서 주소값이 바뀌게 된다.
 * 때문에 useMemo를 사용해서 객체,배열 리터럴의 주소값을 고정시킨다.
 *
 * 4. memo를 쓰는 케이스: Provider안에 context를 사용하지 않는 컴포넌트가 직접 렌더링 될 때
 * 해당 컴포넌트에 memo를 사용한다.
 *
 * 5. children패턴을 사용한다: children으로 받는 컴포넌트들은 부모가 Provider가 아니라 Provider의 상위 컴포넌트이다.
 * 따라서 Provider의 리렌더링 영역에서 벗어나기 때문에 children은 리렌더링 최적화가 된다.
 */
