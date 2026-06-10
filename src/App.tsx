import { useImmer, useNonImmer } from "./store/useImmer";

function App() {
  // const { updateTheme, user } = useNonImmer();
  const { updateTheme, user } = useImmer();

  const handleTheme = () => {
    const curTheme = user.profile.settings.theme;

    updateTheme(curTheme === "dark" ? "light" : "dark");
  };

  return (
    <div>
      <div className="text-red-500">{user.profile.settings.theme}</div>
      <button className="border" onClick={handleTheme}>
        토글
      </button>
    </div>
  );
}

export default App;
