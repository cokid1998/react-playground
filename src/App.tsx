import useStore from "./store/Store";
import { useShallow } from "zustand/shallow";

// 아래와 같이 상태를 가져오면 무한 루프 발생!
// 원래 가지고 있던 상태의 주소와 다른 새로운 주소를 가진 객체 리터럴을 반환하기 때문

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
   */

  /**
   * 아래 코드처럼 상태를 가져오면 무한 렌더링이 유발된다.
   * 이유는 {token, login, logout}같은 새로운 리터럴 객체를 리턴하면
   * 값은 똑같지만 이전상태와 참조값이 다르기 때문에 zustand는 값이 바뀌었다고 인식하고 리렌더링을 유발시킨다.
   * 위 과정이 무한이 반복하여 문제가 발생!
   * 해결법 1: 그냥 selector를 통해 3개를 따로 가져오기
   * const token = useStore((state) => state.token);
   * const login = useStore((state) => state.login);
   * const logout = useStore((state) => state.logout);
   *
   * 해결법 2: useShallow 사용
   *
   * 해결법 3: 커스텀 동등성 함수 사용 (zustand v5에서는 사라짐)
   * https://zustand.docs.pmnd.rs/reference/migrations/migrating-to-v5
   * lodash와 useStoreWithEqualityFn라는걸 사용하면 사용할수는 있음
   */
  const { token, login, logout } = useStore(
    useShallow((state) => ({
      token: state.token,
      login: state.login,
      logout: state.logout,
    })),
  );

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

  const theme = useStore((state) => state.theme);
  const setTheme = useStore((state) => state.setTheme);

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

  const user = useStore((state) => state.user);
  const setName = useStore((state) => state.setName);

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
