import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { T, TBlock } from "@/components/T";
import { Correo } from "@/components/Preguntas";
import { copy } from "@/content/copy";

// Privacy notice for the campaign; Stripe's public business details link here.
// Robots come from the root layout, so it follows the INDEXABLE launch switch.

const p = copy.privacidad;

export const metadata: Metadata = {
  title: `${p.title.es} · ${p.title.en} · COMBO CHIMBITA`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="recibo">
        <article className="recibo__sheet" aria-labelledby="privacidad-title">
          <p className="kicker etiqueta">
            <T t={p.kicker} />
          </p>
          <h1 id="privacidad-title" className="recibo__title">
            <T t={p.title} />
          </h1>
          <p className="legal__updated etiqueta">
            <T t={p.updated} />
          </p>
          <p className="legal__intro subtitulo">
            <T t={p.intro} />
          </p>
          {p.sections.map((s, i) => (
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
          <section className="legal__seccion legal__seccion--solo">
            <ul className="cuerpo">
              <li>
                <T t={p.contact} /> <Correo />.
              </li>
              <li>
                <a href="https://stripe.com/privacy" rel="noopener">
                  <T t={p.stripePolicy} /> <span aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
