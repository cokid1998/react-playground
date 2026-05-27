import { useState } from "react";

// Good
// HeavyComponent를 children으로 주입하여 count의 변경에 영향을 받지 않음
// HeavyComponent는 App의 결과값??이기 때문에 Counter의 렌더링 사이클에 영향을 받지않음?? <-- 여기 문장 다듬어줘

function HeavyComponent() {
  console.log("매우 무거운 컴포넌트가 리렌더링 됨");

  return <div>매우 무거운 컴포넌트</div>;
}

function Counter({ children }) {
  const [count, setCount] = useState(0);

  const handleCount = () => setCount(count + 1);

  return (
    <div>
      <div>count : {count}</div>
      <button onClick={handleCount}>+1증가</button>
      {children}
    </div>
  );
}

export default function ComponentComposition() {
  return (
    <Counter>
      <HeavyComponent />
    </Counter>
  );
}
