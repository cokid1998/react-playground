import { useRef, useState } from "react";
import SecureInput from "./SecureInput";
import ValidatedInput from "./components/ValidatedInput";
import AnimatedBox from "./components/AnimatedBox";
import SignupForm from "./components/SignupForm";

function App() {
  const apiRef = useRef(null);

  return (
    <>
      {/* <SecureInput ref={apiRef} /> */}
      {/* <ValidatedInput ref={apiRef} placeholder="placeholder" label="label" /> */}
      {/* <AnimatedBox ref={apiRef} /> */}
      <SignupForm />
    </>
  );
}

export default App;
