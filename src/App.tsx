import { useRef, useState } from "react";
import MyDatePicker from "./components/MyDatePicker";

export default function App() {
  const datePickerRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <div style={{ padding: "50px", fontFamily: "sans-serif" }}>
      <h1>📅 데이트 피커 원격 제어</h1>
      <p>
        선택된 날짜: <strong>{selectedDate || "없음"}</strong>
      </p>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => datePickerRef.current.openPicker()}>
          📅 창 열기
        </button>
        <button onClick={() => datePickerRef.current.closePicker()}>
          ❌ 창 닫기
        </button>
        <button onClick={() => datePickerRef.current.clearDate()}>
          🧹 날짜 초기화
        </button>
      </div>

      <MyDatePicker
        ref={datePickerRef}
        onChange={(date) => setSelectedDate(date)}
      />
    </div>
  );
}
