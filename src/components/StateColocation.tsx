import { useState } from "react";

// Counter라는 컴포넌트를 새로 만들고 count상태값을 위치시켜서
// count의 리렌더링 영향에서 HeavyComponent를 제외시킴

function HeavyComponent() {
  console.log("매우 무거운 컴포넌트가 리렌더링 됨");

  return <div>매우 무거운 컴포넌트</div>;
}

function Counter() {
  const [count, setCount] = useState(0);

  const handleCount = () => setCount(count + 1);
  return (
    <>
      <div>count : {count}</div>
      <button onClick={handleCount}>+1증가</button>
    </>
  );
}

export default function StateColocation() {
  return (
    <div>
      <Counter />
      <HeavyComponent />
    </div>
  );
}
