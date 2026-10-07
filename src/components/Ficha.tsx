import { copy, type Bilingual } from "@/content/copy";
import { campaign, formatUsd } from "@/content/campaign";
import { DaysLeft } from "./DaysLeft";
import { T } from "./T";

// Raised · Goal · Days left as a mono readout. Unconfirmed values stay bracketed.
function Value({ value, placeholder }: { value: React.ReactNode | null; placeholder: Bilingual }) {
  if (value !== null) return <>{value}</>;
  return (
    <span className="is-placeholder">
      <T t={placeholder} />
    </span>
  );
}

export function Ficha() {
  const p = copy.ficha.placeholders;
  const items: { label: Bilingual; value: React.ReactNode | null; placeholder: Bilingual }[] = [
    { label: copy.ficha.raised, value: campaign.raisedUsd === null ? null : formatUsd(campaign.raisedUsd), placeholder: p.raised },
    { label: copy.ficha.goal, value: campaign.goalUsd === null ? null : formatUsd(campaign.goalUsd), placeholder: p.goal },
    { label: copy.ficha.daysLeft, value: campaign.endDate === null ? null : <DaysLeft endDate={campaign.endDate} />, placeholder: p.daysLeft },
    { label: copy.ficha.backers, value: campaign.backers === null ? null : String(campaign.backers), placeholder: p.backers },
  ];
  return (
    <section className="readout" data-theme="noche" aria-labelledby="readout-title">
      <h2 id="readout-title" className="sr-only">
        <T t={copy.ficha.heading} />
      </h2>
      <dl className="readout__list">
        {items.map((it, i) => (
          <div className="readout__item" key={i}>
            <dt className="etiqueta">
              <T t={it.label} />
            </dt>
            <dd className="readout__value">
              <Value value={it.value} placeholder={it.placeholder} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
