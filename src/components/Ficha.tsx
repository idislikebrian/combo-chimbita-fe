import { copy, type Bilingual } from "@/content/copy";
import { campaign, formatUsd } from "@/content/campaign";
import { DaysLeft } from "./DaysLeft";
import { T } from "./T";

// The campaign counter as a ficha band: one tinta strip in the document flow, read like a
// record spine. Plain label + value pairs separated by rules. No boxes, bars or progress.
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
    { label: copy.ficha.goal, value: campaign.goalUsd === null ? null : formatUsd(campaign.goalUsd), placeholder: p.goal },
    { label: copy.ficha.raised, value: campaign.raisedUsd === null ? null : formatUsd(campaign.raisedUsd), placeholder: p.raised },
    { label: copy.ficha.daysLeft, value: campaign.endDate === null ? null : <DaysLeft endDate={campaign.endDate} />, placeholder: p.daysLeft },
    { label: copy.ficha.backers, value: campaign.backers === null ? null : String(campaign.backers), placeholder: p.backers },
  ];
  return (
    <section className="lomo" data-theme="noche" aria-labelledby="lomo-title">
      <h2 id="lomo-title" className="lomo__label etiqueta">
        <T t={copy.ficha.band} />
      </h2>
      <dl className="lomo__list">
        {items.map((it, i) => (
          <div className="lomo__item" key={i}>
            <dt className="etiqueta">
              <T t={it.label} />
            </dt>
            <dd className="lomo__value">
              <Value value={it.value} placeholder={it.placeholder} />
            </dd>
          </div>
        ))}
      </dl>
      <p className="lomo__coords micro" aria-hidden="true">
        {campaign.coords.brooklyn} · {campaign.coords.bogota}
      </p>
    </section>
  );
}
