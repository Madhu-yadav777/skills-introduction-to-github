import { useEffect, useState } from "react";
import { Menu, X, FileText } from "lucide-react";
import { profile, navLinks } from "../data/portfolio";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "glass py-3" : "bg-transparent py-5"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
          <a href="#top" className="font-display text-lg font-semibold tracking-tight text-text">
            {profile.firstName}
            <span className="text-accent-soft">.</span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative text-sm text-text-muted transition-colors duration-300 hover:text-text"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent-soft transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
            <li>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-bg/15 px-4 py-2 text-sm text-text transition-all duration-300 hover:border-accent/60 hover:bg-accent/10"
              >
                <FileText size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
                Resume
              </a>
            </li>
          </ul>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-bg/15 text-text md:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-bg/95 px-8 backdrop-blur-xl transition-all duration-500 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="space-y-2">
          {navLinks.map((link, i) => (
            <li
              key={link.href}
              className={`transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display block py-3 text-4xl font-semibold text-text transition-colors hover:text-accent"
              >
                <span className="mr-4 font-mono text-sm text-text-dim">0{i + 1}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex w-fit items-center gap-2 rounded-full border border-bg/15 px-6 py-3 text-text"
        >
          <FileText size={16} /> Resume
        </a>
      </div>
    </>
  );
}
