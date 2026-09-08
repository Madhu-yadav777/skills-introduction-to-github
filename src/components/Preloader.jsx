import { useEffect, useState } from "react";
import { profile } from "../data/portfolio";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let value = 0;
    const id = setInterval(() => {
      value += Math.random() * 16 + 8;
      if (value >= 100) {
        value = 100;
        clearInterval(id);
        setTimeout(() => setDone(true), 250);
        setTimeout(() => setGone(true), 1050);
      }
      setProgress(Math.floor(value));
    }, 90);
    return () => clearInterval(id);
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-bg transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
      style={{ transform: done ? "translateY(-100%)" : "translateY(0)" }}
    >
      <p className="font-display text-2xl font-semibold text-text md:text-3xl">
        {profile.firstName}
        <span className="text-accent-soft">.</span>
      </p>
      <div className="mt-6 h-px w-48 overflow-hidden bg-bg/10">
        <div
          className="h-full bg-gradient-to-r from-accent to-accent-soft transition-all duration-200 ease-out"
          style={{ width: progress + "%" }}
        />
      </div>
      <p className="font-mono mt-4 text-[11px] tracking-[0.3em] text-text-dim">
        {String(progress).padStart(3, "0")}%
      </p>
    </div>
  );
}
