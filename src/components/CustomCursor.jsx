import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isPointer, setIsPointer] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setVisible(true);
      const target = e.target.closest("a, button, [data-cursor='hover']");
      setIsPointer(!!target);
    };

    const render = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      if (dot) dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      if (ring) ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      raf = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(render);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <div
      className={`pointer-events-none fixed left-0 top-0 z-[200] hidden transition-opacity duration-300 md:block ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      <div
        ref={ringRef}
        className="fixed -left-4 -top-4 h-8 w-8 rounded-full border border-accent/50 transition-[width,height,margin,border-color,background-color] duration-300"
        style={
          isPointer
            ? { width: 56, height: 56, marginLeft: -28, marginTop: -28, backgroundColor: "rgba(168,207,69,0.2)", borderColor: "rgba(122,139,45,0.8)" }
            : undefined
        }
      />
      <div
        ref={dotRef}
        className={`fixed -left-[3px] -top-[3px] h-1.5 w-1.5 rounded-full transition-colors duration-200 ${
          isPointer ? "bg-accent-soft" : "bg-bg"
        }`}
      />
    </div>
  );
}
