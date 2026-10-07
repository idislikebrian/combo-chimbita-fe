import { copy } from "@/content/copy";
import { tiers } from "@/content/tiers";
import { TierButton, OpenAmountForm } from "./Checkout";
import { T } from "./T";

export function Tiers() {
  const c = copy.tiers;
  const anyDraft = tiers.some((t) => !t.approved);
  return (
    <section className="tiers" id="recompensas" aria-labelledby="tiers-title">
      <div className="tiers__head">
        <p className="kicker etiqueta">
          <T t={c.kicker} />
        </p>
        <h2 id="tiers-title" className="tiers__title">
          <T t={c.heading} />
        </h2>
        {anyDraft ? (
          <p className="tiers__draft pequeno">
            <T t={c.draftNote} />
          </p>
        ) : null}
      </div>

      <ol className="tiers__list">
        {tiers.map((tier, i) => {
          const price = `$${tier.priceUsd.toLocaleString("en-US")}`;
          return (
            <li key={tier.id} className={`ticket ${tier.approved ? "" : "ticket--draft"}`}>
              <article aria-labelledby={`tier-${tier.id}`}>
                <div className="ticket__body">
                  <p className="ticket__no micro" aria-hidden="true">
                    № {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 id={`tier-${tier.id}`} className="ticket__name">
                    <T t={tier.name} />
                  </h3>
                  <p className="etiqueta ticket__label">
                    <T t={c.includes} />
                  </p>
                  <ul lang="es" className="l-es ticket__includes pequeno">
                    {tier.includes.es.map((x) => <li key={x}>{x}</li>)}
                  </ul>
                  <ul lang="en" className="l-en ticket__includes pequeno">
                    {tier.includes.en.map((x) => <li key={x}>{x}</li>)}
                  </ul>
                  <p className="ticket__limit ficha">
                    <T t={c.limit} />:{" "}
                    {tier.limit === null ? (
                      <span className="is-placeholder">
                        <T t={c.limitPlaceholder} />
                      </span>
                    ) : (
                      tier.limit
                    )}
                  </p>
                </div>
                <div className="ticket__stub">
                  {!tier.approved ? (
                    <p className="ticket__stamp etiqueta">
                      <T t={c.draftStamp} />
                    </p>
                  ) : null}
                  <p className="ticket__price">
                    {tier.approved ? price : <span className="is-placeholder">[{price}]</span>}
                    <span className="sr-only"> USD</span>
                  </p>
                  <TierButton tierId={tier.id} tierName={tier.name} disabled={!tier.approved} />
                </div>
              </article>
            </li>
          );
        })}

        <li className="ticket ticket--open">
          <article aria-labelledby="tier-libre">
            <div className="ticket__body">
              <p className="ticket__no micro" aria-hidden="true">
                № {String(tiers.length + 1).padStart(2, "0")}
              </p>
              <h3 id="tier-libre" className="ticket__name">
                <T t={c.open.name} />
              </h3>
              <p className="pequeno">
                <T t={c.open.body} />
              </p>
            </div>
            <div className="ticket__stub">
              <OpenAmountForm />
            </div>
          </article>
        </li>
      </ol>
    </section>
  );
}
