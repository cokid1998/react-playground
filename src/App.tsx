import { useRef, useState } from "react";
import SecureInput from "./SecureInput";

function App() {
  const apiRef = useRef();
  return <SecureInput ref={apiRef} />;
}

export default App;
