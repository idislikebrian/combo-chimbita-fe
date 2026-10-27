import Link from "next/link";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { T, TBlock } from "./T";
import { copy, type Bilingual } from "@/content/copy";

// Shared sheet for /privacy, /support and /terms: the receipt slip set as reading text.
// Robots come from the root layout, so these follow the INDEXABLE launch switch.

type Section = { heading: Bilingual; items: Bilingual<readonly string[]> };

export function LegalPage({
  id,
  kicker,
  title,
  updated,
  intro,
  sections,
  children,
}: {
  id: string;
  kicker: Bilingual;
  title: Bilingual;
  updated: Bilingual;
  /** Lead paragraph; pass a node to add a link after the text. */
  intro: React.ReactNode;
  sections: readonly Section[];
  /** Extra sections after the list: contact lines, related links. */
  children?: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="recibo">
        <article className="recibo__sheet" aria-labelledby={`${id}-title`}>
          <p className="kicker etiqueta">
            <T t={kicker} />
          </p>
          <h1 id={`${id}-title`} className="recibo__title">
            <T t={title} />
          </h1>
          <p className="legal__updated etiqueta">
            <T t={updated} />
          </p>
          <p className="legal__intro subtitulo">{intro}</p>
          {sections.map((s, i) => (
            <section key={i} className={`legal__seccion${s.items.es.length === 1 ? " legal__seccion--solo" : ""}`}>
              <h2 className="legal__heading">
                <T t={s.heading} />
              </h2>
              <TBlock
                es={<ul className="cuerpo">{s.items.es.map((x, j) => <li key={j}>{x}</li>)}</ul>}
                en={<ul className="cuerpo">{s.items.en.map((x, j) => <li key={j}>{x}</li>)}</ul>}
              />
            </section>
          ))}
          {children}
        </article>
      </main>
      <Footer />
    </>
  );
}

/** The three campaign policy pages, minus the one being shown. */
export function LegalLinks({ current }: { current: "privacy" | "terms" | "support" }) {
  const l = copy.legal;
  return (
    <>
      {(["support", "privacy", "terms"] as const)
        .filter((k) => k !== current)
        .map((k) => (
          <li key={k}>
            <Link href={`/${k}`}>
              <T t={l[k]} />
            </Link>
          </li>
        ))}
    </>
  );
}
