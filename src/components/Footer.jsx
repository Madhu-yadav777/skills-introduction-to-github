import { useEffect, useState } from "react";
import { profile } from "../data/portfolio";
import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";

/* Dark contrast footer band — anchors the page like the reference */
export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="relative bg-bg px-6 py-12 text-[#efebe3] lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        {/* name + live clock */}
        <div className="flex items-center gap-4">
          <a href="#top" className="font-display text-lg font-semibold transition-colors hover:text-[#a9bc4a]">
            {profile.firstName}<span className="text-[#a9bc4a]">.</span>
          </a>
          <span className="font-mono hidden items-center gap-2 text-[11px] text-text-muted sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#a9bc4a]" />
            {profile.location.split(",").slice(-1)[0].trim()} · {time}
          </span>
        </div>

        {/* socials */}
        <div className="flex items-center gap-3">
          <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-bg/15 text-text-muted transition-all duration-300 hover:-translate-y-1 hover:border-[#a9bc4a] hover:text-[#a9bc4a]">
            <GithubIcon size={16} />
          </a>
          <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-bg/15 text-text-muted transition-all duration-300 hover:-translate-y-1 hover:border-[#a9bc4a] hover:text-[#a9bc4a]">
            <LinkedinIcon size={16} />
          </a>
          <a href={"mailto:" + profile.email} aria-label="Email"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-bg/15 text-text-muted transition-all duration-300 hover:-translate-y-1 hover:border-[#a9bc4a] hover:text-[#a9bc4a]">
            <Mail size={16} />
          </a>
        </div>

        {/* copyright + back to top */}
        <div className="flex items-center gap-6">
          <p className="font-mono text-[11px] text-text-muted">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-bg/15 text-text-muted transition-all duration-300 hover:border-[#a9bc4a] hover:text-[#a9bc4a]"
          >
            <ArrowUp size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
