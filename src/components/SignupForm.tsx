import ValidatedInput from "./ValidatedInput";
import { useRef } from "react";

export default function SignupForm() {
  const nameRef = useRef(null); // 자식 조종기

  const handleNextStep = () => {
    // TODO: 자식의 check() 메서드를 실행하여 결과를 변수에 담으세요.
    const isValid = nameRef.current.check(); // 여기에 코드 작성

    if (isValid) {
      alert("✅ 검증 성공! 다음 단계로 이동합니다.");
    } else {
      console.log(
        "❌ 검증 실패: 자식이 스스로 에러를 표시하고 포커스를 잡았습니다.",
      );
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>📝 회원가입 (1/3단계)</h2>
      <ValidatedInput
        ref={nameRef}
        label="성함"
        placeholder="이름을 입력하세요"
      />

      <button
        onClick={handleNextStep}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
        }}
      >
        다음 단계로
      </button>
    </div>
  );
}
