import { useImperativeHandle, useRef } from "react";

/**
 * [자식 컴포넌트] SecureInput
 * TODO 1: forwardRef를 사용하여 부모로부터 전달될 'ref(조종기)'를 받을 수 있게 감싸세요.
 */
const SecureInput = ({ ref }) => {
  console.log(ref);

  // 자식 내부에서 실제 <input> 엘리먼트를 붙잡기 위한 전용 갈고리(Ref)
  const inputRef = useRef<HTMLInputElement | null>(null);

  /**
   * TODO 2: useImperativeHandle을 사용하여 부모에게만 노출할 '비밀 손잡이'를 정의하세요.
   * - focus(): inputRef를 통해 인풋에 포커스를 줍니다.
   * - clear(): 인풋의 값을 비우고 다시 포커스를 줍니다.
   */
  useImperativeHandle(ref, () => {
    return {
      // 여기에 부모가 호출할 메서드들을 정의하세요.
      focus: () => {
        inputRef.current?.focus();
      },
      clear: () => {
        // inputRef.current?. = "";
      },
    };
  }, []); // 마운트 시점에 한 번만 생성

  return (
    <div style={containerStyle}>
      <label style={labelStyle}>보안 비밀번호 (4자리)</label>
      <input
        ref={inputRef}
        type="password"
        maxLength="4"
        style={inputStyle}
        placeholder="****"
      />
    </div>
  );
};

// 스타일 정의
const containerStyle = {
  padding: "15px",
  border: "2px solid #333",
  borderRadius: "8px",
  background: "#f9f9f9",
};
const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontWeight: "bold",
  fontSize: "14px",
};
const inputStyle = {
  fontSize: "24px",
  letterSpacing: "10px",
  padding: "10px",
  width: "120px",
  textAlign: "center",
};

export default SecureInput;
