import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { useEffect, useImperativeHandle, useRef, type Ref } from "react";

interface MyDatePicker {
  onChange: (dateStr: string) => void;
  ref: Ref<{}>;
}

export default function MyDatePicker({ onChange, ref }: MyDatePicker) {
  const inputRef = useRef<HTMLInputElement>(null);
  const fp = useRef<flatpickr.Instance>(null);

  useEffect(() => {
    fp.current = flatpickr(inputRef.current, {
      onChange: (selectedDates, dateStr) => {
        if (onChange) onChange(dateStr);
      },
    });

    return () => {
      if (fp.current) {
        fp.current.destroy();
      }
    };
  }, [onChange, ref]);

  useImperativeHandle(ref, () => ({
    openPicker: () => {
      if (fp.current) fp.current.open();
    },
    closePicker: () => {
      if (fp.current) fp.current.close();
    },
    clearDate: () => {
      if (fp.current) fp.current.clear();
    },
  }));

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="날짜를 선택하세요"
      style={{
        padding: "10px",
        borderRadius: "8px",
        border: "2px solid #ddd",
        width: "250px",
        fontSize: "16px",
      }}
    />
  );
}
