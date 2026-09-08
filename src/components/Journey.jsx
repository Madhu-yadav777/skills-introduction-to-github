import useReveal from "../hooks/useReveal";
import { timeline } from "../data/portfolio";
import { Award, BookOpen, FolderGit2, GraduationCap, Briefcase } from "lucide-react";

const typeMeta = {
  education: { icon: GraduationCap, label: "Education" },
  project: { icon: FolderGit2, label: "Project" },
  internship: { icon: Briefcase, label: "Internship" },
  certification: { icon: Award, label: "Certification" },
  achievement: { icon: Award, label: "Achievement" },
};

export default function Journey() {
  const ref = useReveal();

  return (
    <section id="journey" ref={ref} className="relative px-6 py-28 md:py-36 lg:px-10">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-ink/15 to-transparent" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-14 md:mb-20">
          <p className="font-mono reveal mb-4 text-xs uppercase tracking-[0.3em] text-accent-soft">04 — Journey</p>
          <h2 className="font-display line-reveal text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-tight text-text">
            <span>Education, projects &amp;</span>
          </h2>
          <h2 className="font-display line-reveal text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-tight text-text-dim" style={{ transitionDelay: "0.1s" }}>
            <span>milestones so far.</span>
          </h2>
        </div>

        <div className="relative mx-auto max-w-3xl">
          {/* vertical line */}
          <div className="absolute bottom-4 left-[19px] top-2 w-px bg-gradient-to-b from-accent/50 via-ink/10 to-transparent md:left-[23px]" />

          <ol className="space-y-10">
            {timeline.map((item, i) => {
              const meta = typeMeta[item.type] || typeMeta.project;
              const Icon = meta.icon;
              return (
                <li key={i} className="reveal relative pl-14 md:pl-16" style={{ transitionDelay: (i * 0.1) + "s" }}>
                  {/* node */}
                  <span
                    className={
                      "absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border md:h-12 md:w-12 " +
                      (item.current
                        ? "border-accent/60 bg-accent/15 text-accent-soft shadow-[0_0_20px_rgba(168,207,69,0.4)]"
                        : "border-bg/12 bg-bg-soft text-text-muted")
                    }
                  >
                    <Icon size={17} />
                  </span>

                  <div className="group rounded-2xl border border-bg/10 bg-bg-soft p-5 transition-all duration-500 hover:border-bg/20 hover:bg-bg-card md:p-6">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-mono rounded-full bg-bg/5 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-text-muted">
                        {meta.label}
                      </span>
                      <span className="font-mono text-[11px] text-text-dim">{item.period}</span>
                      {item.current && (
                        <span className="font-mono flex items-center gap-1.5 text-[11px] text-accent-soft">
                          <span className="h-1.5 w-1.5 animate-[glow-pulse_2s_ease-in-out_infinite] rounded-full bg-accent-soft" />
                          Current
                        </span>
                      )}
                    </div>
                    <h3 className="font-display mt-3 text-lg font-semibold text-text transition-colors group-hover:text-accent md:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-sm text-text-muted">{item.org}</p>
                    <p className="mt-3 text-sm leading-relaxed text-text-muted">{item.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
