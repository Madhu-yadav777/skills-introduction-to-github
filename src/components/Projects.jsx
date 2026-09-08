import { useEffect, useRef, useState } from "react";
import useReveal from "../hooks/useReveal";
import { projects } from "../data/portfolio";
import { ArrowUpRight } from "lucide-react";
import ProjectModal from "./ProjectModal";

/* Simple generated preview for projects without an image yet */
function FallbackPreview({ title }) {
  const initials = title.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#141414] via-[#111111] to-[#141414]">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "linear-gradient(rgba(138,154,59,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(138,154,59,0.2) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <span className="font-display relative text-7xl font-bold text-text/10 transition-all duration-700 group-hover:scale-110 group-hover:text-text">
        {initials}
      </span>
    </div>
  );
}

function TiltCard({ project, index, onOpen }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ rx: (0.5 - py) * 6, ry: (px - 0.5) * 8, mx: px * 100, my: py * 100 });
  };

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0, mx: 50, my: 50 })}
      onClick={() => onOpen(project)}
      data-cursor="hover"
      className={
        "reveal group relative cursor-pointer overflow-hidden rounded-3xl border border-bg/10 bg-bg-soft transition-colors duration-500 hover:border-bg/20 " +
        (project.featured ? "lg:col-span-2" : "")
      }
      style={{ transitionDelay: (index % 3) * 0.1 + "s", transformStyle: "preserve-3d" }}
    >
      {/* mouse-follow glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "radial-gradient(600px circle at " + tilt.mx + "% " + tilt.my + "%, rgba(99,102,241,0.08), transparent 45%)",
        }}
      />
      <div
        className="transition-transform duration-300 ease-out"
        style={{ transform: "rotateX(" + tilt.rx + "deg) rotateY(" + tilt.ry + "deg)" }}
      >
        {/* preview */}
        <div className={"relative overflow-hidden " + (project.featured ? "aspect-[16/8]" : "aspect-[16/9]")}>
          <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="h-full w-full object-cover"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            ) : null}
            {!project.image && <FallbackPreview title={project.title} />}
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* index badge */}
          <span className="font-mono absolute left-5 top-5 rounded-full border border-bg/15 bg-bg-card px-3 py-1 text-[10px] tracking-widest text-text backdrop-blur-sm">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* body */}
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-xl font-bold text-text transition-colors duration-300 group-hover:text-accent md:text-2xl">
              {project.title}
            </h3>
            <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-bg/12 text-text-muted transition-all duration-300 group-hover:rotate-45 group-hover:border-accent/60 group-hover:text-accent">
              <ArrowUpRight size={16} />
            </span>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-muted md:text-base">
            {project.short}
          </p>

          {/* tech tags */}
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <span
                key={t}
                className="font-mono rounded-full border border-bg/12 px-3 py-1 text-[11px] text-text-muted transition-all duration-300 group-hover:border-accent/30 group-hover:text-text"
                style={{ transitionDelay: (i * 40) + "ms" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const ref = useReveal();
  const [active, setActive] = useState(null);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section id="projects" ref={ref} className="relative px-6 py-28 md:py-36 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 md:mb-20">
          <p className="font-mono reveal mb-4 text-xs uppercase tracking-[0.3em] text-accent-soft">03 — Selected Work</p>
          <h2 className="font-display line-reveal text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-tight text-text">
            <span>Projects that solve</span>
          </h2>
          <h2 className="font-display line-reveal text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-tight text-text-dim" style={{ transitionDelay: "0.1s" }}>
            <span>real problems.</span>
          </h2>
          <p className="reveal mt-5 max-w-lg text-text-muted" style={{ transitionDelay: "0.2s" }}>
            A look at what I&apos;ve been building. Click any project for the full story — the problem, the approach and the stack.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, i) => (
            <TiltCard key={project.id} project={project} index={i} onOpen={setActive} />
          ))}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
