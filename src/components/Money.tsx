import { copy } from "@/content/copy";
import { campaign } from "@/content/campaign";
import { funding } from "@/content/funding";
import { T, TBlock } from "./T";
import { Fondos } from "./Fondos";

// Why $30K: sits between the story and the rewards, so the ask is explained before it's made.
export function Money() {
  const m = copy.money;
  const total = funding.reduce((sum, line) => sum + line.amountUsd, 0);
  // The public breakdown must add up to the budget. Fail the build rather than show a wrong sum.
  if (total !== campaign.budgetUsd) {
    throw new Error(`funding.ts adds up to ${total}, budget is ${campaign.budgetUsd}`);
  }
  return (
    <section className="money" id="dinero" aria-labelledby="money-title">
      <p className="kicker etiqueta">
        <T t={m.kicker} />
      </p>
      <h2 id="money-title" className="money__title">
        <T t={m.heading} />
      </h2>
      <div className="money__text cuerpo">
        <TBlock es={m.paragraphs.es.map((p, i) => <p key={i}>{p}</p>)} en={m.paragraphs.en.map((p, i) => <p key={i}>{p}</p>)} />
      </div>
      <Fondos total={total} />
    </section>
  );
}
