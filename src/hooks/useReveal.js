import { useEffect, useRef } from "react";

/**
 * Adds `.visible` to the returned ref's element (and any `.reveal`
 * / `.line-reveal` descendants) when it scrolls into view.
 */
export default function useReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = [
      root,
      ...root.querySelectorAll(".reveal, .line-reveal, [data-reveal]"),
    ].filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px", ...options }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return ref;
}
