import { copy } from "@/content/copy";
import { tiers } from "@/content/tiers";
import { T } from "./T";

// Questions under the price list, then a closing line that sends readers back up to it.
// The rewards answer is built from tiers.ts so it can never drift from the list above.
export function Preguntas() {
  const c = copy.preguntas;
  const t = copy.tiers;
  return (
    <>
      <section className="preguntas" id="preguntas" aria-labelledby="preguntas-title">
        <header className="preguntas__head">
          <p className="kicker etiqueta">
            <T t={c.kicker} />
          </p>
          <h2 id="preguntas-title" className="preguntas__title">
            <T t={c.heading} />
          </h2>
        </header>
        <dl className="preguntas__lista">
          {c.items.map((item, i) => (
            <div key={i} className="pregunta">
              <dt className="pregunta__q">
                <T t={item.q} />
              </dt>
              <dd className="pregunta__a cuerpo">
                <T t={item.a} />
              </dd>
            </div>
          ))}
          <div className="pregunta">
            <dt className="pregunta__q">
              <T t={c.rewards} />
            </dt>
            <dd className="pregunta__a cuerpo">
              <ul className="pregunta__recompensas">
                {tiers.map((tier) => (
                  <li key={tier.id}>
                    <span className="pregunta__recompensa">
                      ${tier.priceUsd.toLocaleString("en-US")} · <T t={tier.name} />
                    </span>
                    <T t={{ es: tier.includes.es.join(" · "), en: tier.includes.en.join(" · ") }} />
                    {tier.limit !== null ? (
                      <>
                        {" · "}
                        <T t={t.limit} /> {tier.limit}
                      </>
                    ) : null}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </section>

      <section className="cierre" aria-label="COMBO CHIMBITA">
        <p className="cierre__line subtitulo">
          <T t={copy.cierre.line} />
        </p>
        <a className="btn btn--primary btn--lg" href="#recompensas">
          <span className="btn__label">
            <T t={copy.hero.cta} /> <span aria-hidden="true">↑</span>
          </span>
        </a>
      </section>
    </>
  );
}
