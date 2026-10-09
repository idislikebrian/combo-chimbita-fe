"use client";

import { useState } from "react";
import { copy, type Bilingual, type Lang } from "@/content/copy";
import { T } from "./T";

// Post-contribution sharing on /gracias. Shares only the campaign link and a fixed
// message: never the supporter's amount, reward, name or email.
//
// Each network is one entry in ACTIONS, so a later "Share to Stories" action (the
// branded 1080×1920 graphic) is one more entry with its own `run`.

type Ctx = { url: string; message: string };
type Result = Bilingual | null;
type Action = { id: string; label: Bilingual; kind: "link" | "button"; href?: (c: Ctx) => string; run?: (c: Ctx) => Promise<Result> };

const s = copy.share;

const LANGS: Lang[] = ["es", "en"];
const currentLang = (): Lang => (document.documentElement.dataset.lang === "en" ? "en" : "es");

async function copyLink(url: string, ok: Bilingual): Promise<Result> {
  try {
    await navigator.clipboard.writeText(url);
    return ok;
  } catch {
    return s.copyFailed;
  }
}

const ACTIONS: Action[] = [
  {
    id: "instagram",
    label: s.instagram,
    kind: "button",
    // No browser API posts to Instagram. On phones the native share sheet lists it;
    // everywhere else the link is copied for a story sticker or bio.
    run: async ({ url, message }) => {
      if (typeof navigator.share === "function" && window.matchMedia("(pointer: coarse)").matches) {
        try {
          await navigator.share({ title: "COMBO CHIMBITA", text: message, url });
          return null;
        } catch (e) {
          if ((e as Error).name === "AbortError") return null;
        }
      }
      return copyLink(url, s.instagramFallback);
    },
  },
  {
    id: "threads",
    label: s.threads,
    kind: "link",
    href: ({ url, message }) => `https://www.threads.com/intent/post?text=${encodeURIComponent(`${message} ${url}`)}`,
  },
  {
    id: "x",
    label: s.x,
    kind: "link",
    href: ({ url, message }) =>
      `https://x.com/intent/post?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`,
  },
  { id: "copy", label: s.copy, kind: "button", run: ({ url }) => copyLink(url, s.copied) },
];

/** `url` is the public campaign URL, resolved on the server. */
export function Share({ url }: { url: string }) {
  const [status, setStatus] = useState<Result>(null);
  const ctxFor = (lang: Lang): Ctx => ({ url, message: s.message[lang] });

  return (
    <section className="compartir" aria-labelledby="compartir-title">
      <h2 id="compartir-title" className="compartir__title">
        <T t={s.heading} />
      </h2>
      <ul className="compartir__list">
        {ACTIONS.map((a, i) => (
          <li key={a.id} className="compartir__item">
            <span className="compartir__no micro" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            {a.kind === "link" && a.href ? (
              // One link per language (CSS shows the current one), so the prefilled
              // message matches the page and the links work without JavaScript.
              LANGS.map((lang) => (
                <a
                  key={lang}
                  lang={lang}
                  className={`compartir__action l-${lang}`}
                  href={a.href!(ctxFor(lang))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {a.label[lang]} <span aria-hidden="true">↗</span>
                  <span className="sr-only"> ({s.newWindow[lang]})</span>
                </a>
              ))
            ) : (
              <button
                type="button"
                className="compartir__action"
                onClick={async () => setStatus(await a.run!(ctxFor(currentLang())))}
              >
                <T t={a.label} /> <span aria-hidden="true">→</span>
              </button>
            )}
          </li>
        ))}
      </ul>
      <p className="compartir__status etiqueta" role="status" aria-live="polite">
        {status ? <T t={status} /> : null}
      </p>
    </section>
  );
}
