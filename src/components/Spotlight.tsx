import { useEffect } from "react";

// A soft light that follows the cursor
export default function Spotlight() {
  useEffect(() => {
    const move = (e: PointerEvent) => {
      const root = document.documentElement.style;
      root.setProperty("--x", `${e.clientX}px`);
      root.setProperty("--y", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 bg-[radial-gradient(380px_circle_at_var(--x,50vw)_var(--y,30vh),rgba(200,169,122,.12),transparent_70%)]"
    />
  );
}
