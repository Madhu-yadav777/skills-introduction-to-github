import { useEffect } from "react";
import { X, ExternalLink, Target, Layers, Lightbulb } from "lucide-react";
import { GithubIcon } from "./BrandIcons";

/* Dark contrast panel — the editorial "dark card" moment on cream pages */
export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[150] flex items-end justify-center p-0 md:items-center md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={project.title + " details"}
    >
      {/* backdrop */}
      <button
        aria-label="Close project details"
        onClick={onClose}
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
        style={{ animation: "fade-in 0.3s ease forwards" }}
      />

      {/* dark panel */}
      <div
        className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-[#111110] text-[#efebe3] md:rounded-3xl"
        style={{ animation: "scale-in 0.45s cubic-bezier(0.16,1,0.3,1) forwards", opacity: 0 }}
      >
        {/* header visual */}
        <div className="relative h-52 shrink-0 overflow-hidden md:h-64">
          {project.image ? (
            <img src={project.image} alt={project.title} className="h-full w-full object-cover"
              onError={(e) => { e.currentTarget.style.display = "none"; }} />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1c1c19] to-[#121211]"
              style={{ backgroundImage: "linear-gradient(rgba(169,188,74,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(169,188,74,0.12) 1px, transparent 1px), linear-gradient(135deg, #1c1c19, #121211)", backgroundSize: "32px 32px, 32px 32px, 100% 100%" }}
            >
              <span className="font-display text-6xl font-bold text-white/10">
                {project.title.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111110] via-transparent to-transparent" />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-[#efebe3] backdrop-blur-md transition-all duration-300 hover:rotate-90 hover:border-[#a9bc4a]"
          >
            <X size={16} />
          </button>
        </div>

        {/* scrollable content */}
        <div className="overflow-y-auto p-6 md:p-10">
          <h3 className="font-display text-2xl font-bold text-[#efebe3] md:text-3xl">{project.title}</h3>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="flex gap-3">
                <Lightbulb size={18} className="mt-0.5 shrink-0 text-[#a9bc4a]" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">The problem</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/70">{project.problem}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Layers size={18} className="mt-0.5 shrink-0 text-[#a9bc4a]" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">What it is</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/70">{project.description}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Target size={18} className="mt-0.5 shrink-0 text-[#a9bc4a]" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">Problem solved</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/70">{project.problemSolved}</p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">Built with</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="font-mono rounded-full border border-[#a9bc4a]/40 bg-[#a9bc4a]/10 px-3.5 py-1.5 text-xs text-[#c3d96a]">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#efebe3] px-6 py-3 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-[#a9bc4a]"
                  >
                    <GithubIcon size={16} />
                    GitHub
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-[#efebe3] transition-all duration-300 hover:border-[#a9bc4a] hover:bg-[#a9bc4a]/10"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
                {!project.github && !project.demo && (
                  <p className="font-mono text-xs leading-relaxed text-white/40">
                    Links coming soon — add them in
                    <span className="text-white/60"> src/data/portfolio.js</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
