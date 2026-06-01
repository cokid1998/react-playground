import { useImperativeHandle, useRef, type Ref } from "react";

interface AnimatedBoxProps {
  ref: Ref<{ startShake: () => void }>;
}

export default function AnimatedBox({ ref }: AnimatedBoxProps) {
  const boxRef = useRef<HTMLDivElement | null>(null);

  useImperativeHandle(ref, () => ({
    startShake: () => {
      if (boxRef.current) {
        boxRef.current.classList.remove("shake-animation");

        // 강제 리플로우 유도
        void boxRef.current.offsetWidth;
        boxRef.current.classList.add("shake-animation");
      }
    },
  }));

  return (
    <div
      ref={boxRef}
      style={{
        width: "100px",
        height: "100px",
        background: "coral",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "bold",
      }}
    >
      Box
    </div>
  );
}
