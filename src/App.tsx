import useStore from "./store/Store";

function TokenComp() {
  /*
  // useStore를 전체 구독을 하기 때문에
  // Store안에 상태가 1개라도 바뀌면 리렌더링 됨
  // const { token login, logout } = useStore();
  */

  /**
  // Selector를 이용하여 리렌더링을 최적화
  const token = useStore((state) => state.token);
  const login = useStore((state) => state.login);
  const logout = useStore((state) => state.logout);
   */

  /**
   * Selector함수는 Store의 상태값이 1개라도 변경되면 다시 실행된다.
   */
  const token = useStore((state) => {
    console.log("1");
    return state.token;
  });
  const login = useStore((state) => {
    console.log("2");
    return state.login;
  });
  const logout = useStore((state) => {
    console.log("3");
    return state.logout;
  });
  console.log("토큰 컴포넌트 리렌더");

  return (
    <>
      <div>{token}</div>
      <button className="border" onClick={login}>
        로그인
      </button>
      <button className="border" onClick={logout}>
        로그아웃
      </button>
    </>
  );
}

function ThemeComp() {
  // const { theme, setTheme } = useStore();
  const theme = useStore((state) => {
    console.log("4");
    return state.theme;
  });
  const setTheme = useStore((state) => {
    console.log("5");
    return state.setTheme;
  });
  console.log("테마 컴포넌트 리렌더");

  return (
    <>
      <div>테마: {theme}</div>
      <button onClick={setTheme} className="border">
        테마변경
      </button>
    </>
  );
}

function UserComp() {
  // const { user, setName } = useStore();
  const user = useStore((state) => {
    console.log("6");
    return state.user;
  });
  const setName = useStore((state) => {
    console.log("7");
    return state.setName;
  });
  console.log("유저 컴포넌트 리렌더");

  return (
    <>
      <div>{user.profile.name}</div>
      <div>{user.profile.settings.role}</div>
      <div onClick={() => setName("park")}>이름 변경</div>
    </>
  );
}

function App() {
  return (
    <div>
      <TokenComp />
      <ThemeComp />
      <UserComp />
    </div>
  );
}

export default App;
