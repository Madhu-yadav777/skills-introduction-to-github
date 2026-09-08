import { useState } from "react";
import useReveal from "../hooks/useReveal";
import { profile } from "../data/portfolio";
import { ArrowUpRight, Mail, Send, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";

export default function Contact() {
  const ref = useReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Opens the visitor's mail client prefilled — swap in Formspree /
    // EmailJS later if you want a backend-free form send.
    const subject = encodeURIComponent("Portfolio contact from " + (form.name || "someone"));
    const body = encodeURIComponent(form.message + "\n\n— " + form.name + " (" + form.email + ")");
    window.location.href = "mailto:" + profile.email + "?subject=" + subject + "&body=" + body;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const field =
    "w-full rounded-xl border border-bg/12 bg-bg-soft px-4 py-3.5 text-sm text-text placeholder:text-text-dim outline-none transition-all duration-300 focus:border-accent/60 focus:bg-bg-card";

  return (
    <section id="contact" ref={ref} className="relative px-6 py-28 md:py-36 lg:px-10">
      {/* big ambient glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full opacity-15 blur-[150px]"
        style={{ background: "radial-gradient(circle, #ffa38a 0%, transparent 65%)" }} />

      <div className="relative mx-auto max-w-7xl">
        <p className="font-mono reveal mb-4 text-xs uppercase tracking-[0.3em] text-accent-soft">05 — Contact</p>

        <h2 className="font-display line-reveal text-[clamp(2.4rem,7vw,5.5rem)] font-bold leading-[1.02] tracking-tight text-text">
          <span>Have a project or opportunity?</span>
        </h2>
        <h2 className="font-display line-reveal mt-1 text-[clamp(2.4rem,7vw,5.5rem)] font-bold leading-[1.02] tracking-tight" style={{ transitionDelay: "0.12s" }}>
          <span className="text-gradient">Let&apos;s talk.</span>
        </h2>

        <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          {/* direct channels */}
          <div className="space-y-4">
            <p className="reveal max-w-md leading-relaxed text-text-muted">
              Whether it&apos;s an internship, a collaboration, or just a conversation about
              code, data or AI — my inbox is always open.
            </p>

            {[
              { icon: Mail, label: "Email", value: profile.email, href: "mailto:" + profile.email },
              { icon: LinkedinIcon, label: "LinkedIn", value: profile.socials.linkedin.replace("https://", ""), href: profile.socials.linkedin },
              { icon: GithubIcon, label: "GitHub", value: profile.socials.github.replace("https://", ""), href: profile.socials.github },
            ].map((c, i) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="reveal group flex items-center justify-between rounded-2xl border border-bg/10 bg-bg-soft p-5 transition-all duration-500 hover:border-accent/40 hover:bg-bg-card"
                style={{ transitionDelay: (i * 0.08) + "s" }}
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-bg/12 text-text-muted transition-colors duration-300 group-hover:border-accent/50 group-hover:text-accent">
                    <c.icon size={18} />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim">{c.label}</p>
                    <p className="mt-0.5 break-all text-sm font-medium text-text">{c.value}</p>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-text-dim transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
              </a>
            ))}
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="reveal space-y-4" style={{ transitionDelay: "0.15s" }}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="font-mono mb-2 block text-[10px] uppercase tracking-[0.25em] text-text-dim">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className={field}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="font-mono mb-2 block text-[10px] uppercase tracking-[0.25em] text-text-dim">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className={field}
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className="font-mono mb-2 block text-[10px] uppercase tracking-[0.25em] text-text-dim">Message</label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about the opportunity..."
                className={field + " resize-none"}
              />
            </div>
            <button
              type="submit"
              className="group inline-flex items-center gap-2 rounded-full bg-bg px-7 py-3.5 text-sm font-semibold text-text transition-all duration-300 hover:bg-accent-soft hover:text-text"
            >
              {sent ? <Check size={16} /> : <Send size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />}
              {sent ? "Opening your mail app..." : "Send message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
