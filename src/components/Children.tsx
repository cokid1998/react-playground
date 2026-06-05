import { useContext } from "react";
import { ThemeActionContext, ThemeStateContext } from "../App";

export function A() {
  console.log("A 렌더"); // context 안 씀
  return <div>A</div>;
}

export function B() {
  console.log("B 렌더"); // context 안 씀
  return <div>B</div>;
}

export function C() {
  const { theme } = useContext(ThemeStateContext)!;
  console.log("C 렌더"); // theme만 씀
  return <div>{theme}</div>;
}

export function D() {
  const { handleSetTheme } = useContext(ThemeActionContext)!;
  console.log("D 렌더"); // setTheme만 씀
  return <button onClick={handleSetTheme}>토글</button>;
}

export function E() {
  const { theme } = useContext(ThemeStateContext)!;
  const { handleSetTheme } = useContext(ThemeActionContext)!;

  console.log("E 렌더"); // 둘 다 씀

  return <div>{theme}</div>;
}
