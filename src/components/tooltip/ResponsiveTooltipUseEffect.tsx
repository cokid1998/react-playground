import { useEffect, useRef, useState } from "react";

// useEffect로 좌표값을 수정시키면 초기 렌더링시 깜빡이는 이슈가 있음

export default function ResponsiveTooltipUseEffect() {
  const targetRef = useRef<null | HTMLButtonElement>(null);
  const tooltipRef = useRef<null | HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // 창크기가 움직일 때마다 setState를 이용해서 툴팁의 좌표값을 변경해야함
    const update = () => {
      if (targetRef.current && tooltipRef) {
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
      <button className="border px-2.5 py-5" ref={targetRef}>
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
