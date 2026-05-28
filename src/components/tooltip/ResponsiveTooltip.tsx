import { useState, useRef, useLayoutEffect } from "react";

// useLayoutEffect를 사용하면 페인팅 이전에 좌표값을 렌더링 정보에 넣기 때문에
// 첫 렌더링시 깜빡이는 이슈가 해결됨

export default function ResponsiveTooltip() {
  const targetRef = useRef<null | HTMLButtonElement>(null);
  const tooltipRef = useRef<null | HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useLayoutEffect(() => {
    const update = () => {
      if (targetRef.current && tooltipRef.current) {
        const { left, width, top } = targetRef.current.getBoundingClientRect();

        setCoords({
          x: left + width / 2,
          y: top,
        });
      }
    };
    update();

    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="flex justify-center pt-20">
      <button ref={targetRef} className="border px-2.5 py-5">
        버튼입니다
      </button>

      <div
        ref={tooltipRef}
        className="fixed p-2 bg-[#333] text-white whitespace-nowrap pointer-events-none"
        style={{
          left: coords.x,
          top: coords.y,
          transform: "translate(-50%, -110%)",
        }}
      >
        툴팁
      </div>
    </div>
  );
}
