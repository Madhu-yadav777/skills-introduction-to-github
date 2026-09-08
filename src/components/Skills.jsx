import { useRef, useState } from "react";
import useReveal from "../hooks/useReveal";
import { skills } from "../data/portfolio";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Skills() {
  const ref = useReveal();
  const stripRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const update = () => {
    const el = stripRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  const scroll = (dir) => {
    const el = stripRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
    setTimeout(update, 400);
  };

  return (
    <section id="skills" ref={ref} className="relative px-6 py-28 md:py-36 lg:px-10">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-ink/15 to-transparent" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="font-mono reveal mb-4 text-xs uppercase tracking-[0.3em] text-accent">02 — Skills</p>
            <h2 className="font-display line-reveal text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-tight text-text">
              <span>Tools of the trade.</span>
            </h2>
          </div>

          <div className="reveal hidden items-center gap-3 md:flex" style={{ transitionDelay: "0.15s" }}>
            <button
              onClick={() => scroll(-1)}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-bg/15 bg-bg-soft text-text transition-all duration-300 hover:border-accent/60 disabled:opacity-30 disabled:hover:border-bg/15"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll(1)}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-bg/15 bg-bg-soft text-text transition-all duration-300 hover:border-accent/60 disabled:opacity-30 disabled:hover:border-bg/15"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div
          ref={stripRef}
          onScroll={update}
          className="reveal -mx-2 flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-4 scrollbar-none md:px-4"
          style={{ transitionDelay: "0.2s" }}
        >
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              className="snap-center shrink-0 w-[240px] select-none rounded-2xl border border-bg/12 bg-bg-soft p-6 transition-all duration-500 hover:border-accent/60 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(10,10,10,0.25)]"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-display text-lg font-semibold text-text">{skill.name}</h3>
                <span className="mt-1.5 h-2 w-2 rounded-full bg-accent" />
              </div>
              <p className="font-mono mt-2 text-[10px] uppercase tracking-[0.25em] text-text-dim">{skill.category}</p>
              <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-bg/10">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-700 ease-out"
                  style={{ width: skill.level + "%" }}
                />
              </div>
              <p className="font-mono mt-3 text-[11px] text-text-dim">{skill.level}% comfortable</p>
            </div>
          ))}
        </div>

        <p className="reveal mt-4 font-mono text-[11px] text-text-dim md:hidden" style={{ transitionDelay: "0.3s" }}>
          ← swipe or tap arrows to browse
        </p>
      </div>
    </section>
  );
}
