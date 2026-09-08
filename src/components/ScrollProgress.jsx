import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setPct(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[120] h-[2px] bg-transparent" aria-hidden="true">
      <div
        className="h-full bg-gradient-to-r from-accent to-accent-soft transition-[width] duration-100 ease-out"
        style={{ width: pct + "%" }}
      />
    </div>
  );
}
