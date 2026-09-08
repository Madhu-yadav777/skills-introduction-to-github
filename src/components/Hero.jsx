import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, FileText, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { profile } from "../data/portfolio";

/* Splits text into per-character spans with a staggered entrance */
function SplitText({ text, className = "", delay = 0 }) {
  return (
    <span className={"inline-block " + className} aria-label={text} role="text">
      {text.split("").map((ch, i) => (
        <span key={i} aria-hidden="true" className="char-span" style={{ animationDelay: (delay + i * 0.028) + "s" }}>
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

function Magnetic({ children, className = "", href, external, label }) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setOffset({ x: x * 0.25, y: y * 0.35 });
  };

  const Tag = href ? "a" : "button";
  return (
    <Tag
      ref={ref}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={label}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      style={{
        transform: "translate(" + offset.x + "px," + offset.y + "px)",
        transition: offset.x === 0 && offset.y === 0 ? "transform 0.5s cubic-bezier(0.16,1,0.3,1)" : "transform 0.1s ease-out",
      }}
    >
      {children}
    </Tag>
  );
}

export default function Hero() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  const onMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    setParallax({
      x: (e.clientX / innerWidth - 0.5) * 20,
      y: (e.clientY / innerHeight - 0.5) * 20,
    });
  };

  return (
    <section
      id="top"
      ref={heroRef}
      onMouseMove={onMouseMove}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-24 lg:px-10"
    >
      {/* ambient background glows */}
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full opacity-25 blur-[140px]"
        style={{ background: "radial-gradient(circle, #ffa38a 0%, transparent 65%)", transform: "translate(" + (parallax.x * -1.2) + "px," + (parallax.y * -1.2) + "px)" }}
      />
      <div
        className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[420px] w-[420px] rounded-full opacity-15 blur-[130px]"
        style={{ background: "radial-gradient(circle, #ff7a59 0%, transparent 65%)", transform: "translate(" + parallax.x + "px," + parallax.y + "px)" }}
      />

      {/* faint grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "linear-gradient(#111111 1px, transparent 1px), linear-gradient(90deg, #111111 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 40%, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 40%, black 30%, transparent 75%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-[1.4fr_1fr]">
          {/* Left: copy */}
          <div>
            <p
              className="font-mono mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-text-muted opacity-0"
              style={{ animation: "fade-in 0.8s ease 0.15s forwards" }}
            >
              <span className="inline-block h-1.5 w-1.5 animate-[glow-pulse_2.5s_ease-in-out_infinite] rounded-full bg-accent-soft" />
              Available for internships &amp; opportunities
            </p>

            <h1 className="font-display text-[clamp(2.8rem,8vw,6.5rem)] font-bold leading-[1.02] tracking-tight text-text">
              <SplitText text="Hi, I'm" delay={0.3} className="block" />
              <span
                className="text-gradient block whitespace-nowrap pb-2 text-[clamp(2.4rem,6vw,5.4rem)] opacity-0"
                style={{ animation: "fade-up 0.9s cubic-bezier(0.16,1,0.3,1) 0.55s forwards" }}
              >
                {profile.name}
              </span>
            </h1>

            <p
              className="font-display mt-4 text-lg font-medium text-text-muted opacity-0 md:text-xl"
              style={{ animation: "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 1.1s forwards" }}
            >
              {profile.role}
            </p>

            <p
              className="mt-6 max-w-xl text-base leading-relaxed text-text-muted opacity-0 md:text-lg"
              style={{ animation: "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 1.25s forwards" }}
            >
              {profile.intro}
            </p>

            <div
              className="mt-10 flex flex-wrap items-center gap-4 opacity-0"
              style={{ animation: "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 1.4s forwards" }}
            >
              <Magnetic
                href={profile.resumeUrl}
                external
                label="Open resume"
                className="group inline-flex items-center gap-2 rounded-full bg-bg px-7 py-3.5 text-sm font-semibold text-text transition-colors duration-300 hover:bg-accent-soft hover:text-text"
              >
                <FileText size={16} />
                Resume
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Magnetic>

              <div className="flex items-center gap-3">
                <Magnetic
                  href={profile.socials.github}
                  external
                  label="GitHub profile"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-bg/15 text-text-muted transition-all duration-300 hover:border-bg/40 hover:text-text"
                >
                  <GithubIcon size={18} />
                </Magnetic>
                <Magnetic
                  href={profile.socials.linkedin}
                  external
                  label="LinkedIn profile"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-bg/15 text-text-muted transition-all duration-300 hover:border-bg/40 hover:text-text"
                >
                  <LinkedinIcon size={18} />
                </Magnetic>
                <Magnetic
                  href={"mailto:" + profile.email}
                  label="Send email"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-bg/15 text-text-muted transition-all duration-300 hover:border-bg/40 hover:text-text"
                >
                  <Mail size={18} />
                </Magnetic>
              </div>
            </div>
          </div>

          {/* Right: photo */}
          <div
            className="relative mx-auto hidden w-full max-w-sm opacity-0 lg:block"
            style={{ animation: "scale-in 1s cubic-bezier(0.16,1,0.3,1) 0.8s forwards" }}
          >
            <div
              className="relative"
              style={{ transform: "translate(" + (parallax.x * 0.6) + "px," + (parallax.y * 0.6) + "px)", transition: "transform 0.3s ease-out" }}
            >
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-ink/20 via-ink/5 to-transparent" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-bg/12 bg-bg-soft">
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="h-full w-full object-cover grayscale-[35%] transition-all duration-700 hover:grayscale-0"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              </div>
              <div className="glass absolute -bottom-4 -left-4 rounded-2xl px-5 py-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim">Based in</p>
                <p className="font-display mt-0.5 text-sm font-semibold text-text">{profile.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* scroll hint */}
      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-text-dim transition-colors hover:text-text md:flex"
        style={{ animation: "fade-in 1s ease 2s forwards", opacity: 0 }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ArrowDown size={14} className="animate-bounce" />
      </a>
    </section>
  );
}
