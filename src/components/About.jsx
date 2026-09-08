import useReveal from "../hooks/useReveal";
import { about, profile } from "../data/portfolio";
import { Compass, GraduationCap, Sparkles, Target } from "lucide-react";

const facts = [
  { icon: GraduationCap, label: "Education", value: "B.Tech — CS & Business Systems" },
  { icon: Compass, label: "Focus", value: "Software · Data · AI/ML" },
  { icon: Sparkles, label: "Currently learning", value: about.currentlyLearning.join(" · ") },
  { icon: Target, label: "Looking for", value: "Internships & junior roles" },
];

export default function About() {
  const ref = useReveal();

  return (
    <section id="about" ref={ref} className="relative px-6 py-28 md:py-36 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* section header */}
        <div className="mb-16 md:mb-20">
          <p className="font-mono reveal mb-4 text-xs uppercase tracking-[0.3em] text-accent-soft">
            01 — About
          </p>
          <h2 className="font-display line-reveal text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-tight text-text">
            <span>A builder who ships,</span>
          </h2>
          <h2 className="font-display line-reveal text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-tight text-text-dim" style={{ transitionDelay: "0.1s" }}>
            <span>not just studies.</span>
          </h2>
        </div>

        <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          {/* paragraphs */}
          <div className="space-y-6">
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className={"reveal text-lg leading-relaxed text-text-muted " + (i === 0 ? "text-text md:text-xl" : "")}
                style={{ transitionDelay: (i * 0.08) + "s" }}
              >
                {p}
              </p>
            ))}
            <p className="reveal border-l-2 border-accent/60 pl-6 text-lg italic leading-relaxed text-text" style={{ transitionDelay: "0.3s" }}>
              {about.lookingFor}
            </p>
          </div>

          {/* fact cards */}
          <div className="space-y-4">
            {facts.map((fact, i) => (
              <div
                key={fact.label}
                className="reveal group flex items-start gap-4 rounded-2xl border border-bg/10 bg-bg-soft p-5 transition-all duration-500 hover:border-accent/40 hover:bg-bg-card"
                style={{ transitionDelay: (i * 0.08) + "s" }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-bg/12 text-text-muted transition-colors duration-300 group-hover:border-accent/50 group-hover:text-accent">
                  <fact.icon size={17} />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim">{fact.label}</p>
                  <p className="mt-1 text-sm font-medium leading-snug text-text">{fact.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
