import { useImperativeHandle, forwardRef, useRef } from "react";
import "../App.css";

/**
 * [자식 컴포넌트] 흔들리는 상자
 */
const AnimationBox = forwardRef((props, ref) => {
  const boxRef = useRef<HTMLDivElement>(null);

  /**
   * TODO: 부모가 호출할 'shake' 메서드를 설계하세요.
   * 1. 기존에 붙어있을 수 있는 'apply-shake' 클래스를 제거합니다.
   * 2. 강제 리플로우(void offsetWidth)를 유도하여 브라우저가 변화를 즉시 인식하게 합니다.
   * 3. 다시 'apply-shake' 클래스를 추가하여 애니메이션을 처음부터 재생시킵니다.
   */
  useImperativeHandle(ref, () => ({
    shake: () => {
      // 여기에 46강의 '강제 리플로우' 트릭을 구현하세요.

      if (boxRef.current) {
        boxRef.current.classList.remove("apply-shake");
        void boxRef.current.offsetWidth;
        boxRef.current.classList.add("apply-shake");
      }
    },
  }));

  return (
    <div ref={boxRef} className="shake-box">
      오답입니다!
    </div>
  );
});

/**
 * [부모 컴포넌트] 퀴즈 페이지
 */
export default function QuizPage() {
  const boxRef = useRef();

  const handleWrongAnswer = () => {
    // 자식의 shake 명령 실행
    boxRef.current.shake();
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2>❓ 다음 중 리액트 훅이 아닌 것은?</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <AnimationBox ref={boxRef} />
      </div>

      <button
        onClick={handleWrongAnswer}
        style={{
          padding: "15px 30px",
          fontSize: "16px",
          cursor: "pointer",
          background: "#333",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
        }}
      >
        오답 클릭 (광클 테스트!)
      </button>
    </div>
  );
}
