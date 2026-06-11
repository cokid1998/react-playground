import { useUnSlicePatternStore } from "./store/unSlicePatternStore/Store";

function App() {
  const { isLogged, token, login, logOut, theme, setTheme } =
    useUnSlicePatternStore();

  return (
    <div>
      <div>로그인 여부: {isLogged + ""}</div>
      <div>token: {token}</div>
      <div>테마: {theme}</div>
      <button className="border" onClick={() => login("bearer asdf")}>
        로그인
      </button>
      <button className="border" onClick={logOut}>
        로그아웃
      </button>
      <button className="border" onClick={setTheme}>
        테마 버튼
      </button>
    </div>
  );
}

export default App;
