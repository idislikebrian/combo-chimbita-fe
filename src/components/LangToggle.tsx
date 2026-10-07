"use client";

import { useSyncExternalStore } from "react";
import type { Lang } from "@/content/copy";
import { copy } from "@/content/copy";

// Source of truth is <html data-lang>, set before paint by the script in layout.tsx.
const listeners = new Set<() => void>();
const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
const read = (): Lang => (document.documentElement.dataset.lang === "en" ? "en" : "es");

function apply(lang: Lang) {
  const root = document.documentElement;
  root.dataset.lang = lang;
  root.lang = lang;
  try {
    localStorage.setItem("cc-lang", lang);
  } catch {}
  listeners.forEach((fn) => fn());
}

export function LangToggle() {
  const lang = useSyncExternalStore(subscribe, read, () => "es" as Lang);

  return (
    <div className="lang" role="group" aria-label={`${copy.header.langLabel.es} / ${copy.header.langLabel.en}`}>
      {(["es", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          className="lang__btn"
          aria-pressed={lang === l}
          lang={l}
          aria-label={l === "es" ? "ES · Español" : "EN · English"}
          onClick={() => apply(l)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
