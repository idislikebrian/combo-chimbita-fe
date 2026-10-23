"use client";

import { useEffect, useRef } from "react";

const FLORES = ["heliconia", "loto", "dalia", "pasiflora"] as const; // back to front: the passionflower prints last

// The four-flower stamp on the funding → rewards seam. Dalia and pasiflora turn with page
// scroll: CSS scroll timelines where supported (globals.css); otherwise this effect sets the
// same `rotate` once per frame. Reduced motion: no turn at all.
export function Ramo() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ramo = ref.current;
    if (!ramo || CSS.supports("animation-timeline: scroll()")) return;
    const dalia = ramo.querySelector<HTMLElement>(".ramo__flor--dalia");
    const pasiflora = ramo.querySelector<HTMLElement>(".ramo__flor--pasiflora");
    if (!dalia || !pasiflora) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let giro = 360;
    let max = 1;
    let frame = 0;

    // Layout reads happen here only (load, resize), never in the scroll path.
    const measure = () => {
      giro = parseFloat(getComputedStyle(ramo).getPropertyValue("--giro")) || 360;
      max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };
    const paint = () => {
      frame = 0;
      const deg = Math.min(1, Math.max(0, window.scrollY / max)) * giro;
      dalia.style.rotate = `${deg}deg`;
      pasiflora.style.rotate = `${-deg}deg`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    const start = () => {
      measure();
      paint();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
    };
    const stop = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frame);
      frame = 0;
      dalia.style.rotate = "";
      pasiflora.style.rotate = "";
    };
    const onMotionPref = () => (reduce.matches ? stop() : start());

    onMotionPref();
    reduce.addEventListener("change", onMotionPref);
    return () => {
      reduce.removeEventListener("change", onMotionPref);
      stop();
    };
  }, []);

  return (
    <span className="ramo" aria-hidden="true" ref={ref}>
      {FLORES.map((n) => (
        <span key={n} className={`sello ramo__flor ramo__flor--${n} flor-glifo--${n}`} />
      ))}
    </span>
  );
}
