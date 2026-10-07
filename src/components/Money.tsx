import { copy } from "@/content/copy";
import { campaign, formatUsd } from "@/content/campaign";
import { T } from "./T";

export function Money() {
  const m = copy.money;
  return (
    <section className="money" aria-labelledby="money-title">
      <p className="kicker etiqueta">
        <T t={m.kicker} />
      </p>
      <h2 id="money-title" className="money__title">
        <T t={m.heading} />
      </h2>
      <div className="money__text">
        <p className="subtitulo">
          <T t={m.body} />
        </p>
        {campaign.budgetUsd !== null ? (
          <p className="ficha">
            <T t={m.budgetLabel} />: {formatUsd(campaign.budgetUsd)} USD
          </p>
        ) : null}
        <p className="ficha is-placeholder">
          <T t={m.pending} />
        </p>
      </div>
    </section>
  );
}
