import { copy } from "@/content/copy";
import { tiers } from "@/content/tiers";
import { TierButton, OpenAmountForm } from "./Checkout";
import { T } from "./T";
import { Flor, FlorList, FLORES } from "./Flor";

// Rewards as a printed price list (market bill / ticket office), not plan cards.
// DOM order is name → contents → price → action so headings lead; the grid puts the price first.
export function Tiers() {
  const c = copy.tiers;
  const anyDraft = tiers.some((t) => !t.approved);
  return (
    <section className="lista" id="recompensas" aria-labelledby="tiers-title">
      <span className="ramo" aria-hidden="true">
        {/* back to front: the passionflower prints last, on top */}
        {(["heliconia", "loto", "dalia", "pasiflora"] as const).map((n) => (
          <span key={n} className={`sello ramo__flor ramo__flor--${n} flor-glifo--${n}`} />
        ))}
      </span>
      <header className="lista__head">
        <p className="lista__kicker etiqueta">
          <T t={c.kicker} />
        </p>
        <h2 id="tiers-title" className="lista__title">
          <T t={c.heading} />
        </h2>
        {anyDraft ? (
          <p className="lista__draft pequeno">
            <T t={c.draftNote} />
          </p>
        ) : null}
        <ul className="lista__terms pequeno">
          {c.terms.es.map((line, i) => (
            <li key={i}>
              <T t={{ es: line, en: c.terms.en[i] }} />
            </li>
          ))}
        </ul>
      </header>

      <ol className="lista__rows">
        {tiers.map((tier, i) => {
          const price = `$${tier.priceUsd.toLocaleString("en-US")}`;
          return (
            <li key={tier.id} className="renglon">
              <p className="renglon__no micro" aria-hidden="true">
                <Flor name={FLORES[i % FLORES.length]} className="flor-glifo--no" />
                № {String(i + 1).padStart(2, "0")}
              </p>
              <h3 id={`tier-${tier.id}`} className="renglon__name">
                <T t={tier.name} />
              </h3>
              <p lang="es" className="l-es renglon__items pequeno">
                <FlorList items={tier.includes.es} />
              </p>
              <p lang="en" className="l-en renglon__items pequeno">
                <FlorList items={tier.includes.en} />
              </p>
              {tier.limit !== null ? (
                <p className="renglon__limit etiqueta">
                  <T t={c.limit} /> {tier.limit}
                </p>
              ) : null}
              <p className="renglon__price">
                {tier.approved ? price : <span className="is-placeholder">[{price}]</span>}
                <span className="sr-only"> USD</span>
              </p>
              <TierButton
                className="renglon__action"
                tierId={tier.id}
                tierName={tier.name}
                disabled={!tier.approved}
              />
            </li>
          );
        })}

        <li className="renglon renglon--open">
          <OpenAmountForm className="renglon__form">
            <p className="renglon__no micro" aria-hidden="true">
              <Flor name={FLORES[tiers.length % FLORES.length]} className="flor-glifo--no" />
              № {String(tiers.length + 1).padStart(2, "0")}
            </p>
            <h3 id="tier-libre" className="renglon__name">
              <T t={c.open.name} />
            </h3>
            <p className="renglon__items pequeno">
              <T t={c.open.body} />
            </p>
          </OpenAmountForm>
        </li>
      </ol>
    </section>
  );
}
