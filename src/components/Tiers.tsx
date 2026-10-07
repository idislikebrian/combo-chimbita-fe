import { copy } from "@/content/copy";
import { tiers } from "@/content/tiers";
import { TierButton, OpenAmountForm } from "./Checkout";
import { T } from "./T";

// Rewards as a printed price list (market bill / ticket office), not plan cards.
// DOM order is name → contents → price → action so headings lead; the grid puts the price first.
export function Tiers() {
  const c = copy.tiers;
  const anyDraft = tiers.some((t) => !t.approved);
  return (
    <section className="lista" id="recompensas" aria-labelledby="tiers-title">
      <span className="sello sello--lista" aria-hidden="true" />
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
      </header>

      <ol className="lista__rows">
        {tiers.map((tier, i) => {
          const price = `$${tier.priceUsd.toLocaleString("en-US")}`;
          return (
            <li key={tier.id} className="renglon">
              <p className="renglon__no micro" aria-hidden="true">
                № {String(i + 1).padStart(2, "0")}
              </p>
              <h3 id={`tier-${tier.id}`} className="renglon__name">
                <T t={tier.name} />
              </h3>
              <p lang="es" className="l-es renglon__items pequeno">
                {tier.includes.es.join(" ★ ")}
              </p>
              <p lang="en" className="l-en renglon__items pequeno">
                {tier.includes.en.join(" ★ ")}
              </p>
              <p className="renglon__limit etiqueta">
                <T t={c.limit} />{" "}
                {tier.limit === null ? (
                  <span className="is-placeholder">
                    <T t={c.limitPlaceholder} />
                  </span>
                ) : (
                  tier.limit
                )}
              </p>
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
