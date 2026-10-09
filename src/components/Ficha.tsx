import { copy, type Bilingual } from "@/content/copy";
import { campaign, formatUsd } from "@/content/campaign";
import { getTotals } from "@/lib/totals";
import { T } from "./T";

// The campaign counter as a ficha band (open-ended campaign: no end date, no countdown): one tinta strip in the document flow, read like a
// record spine. Plain label + value pairs separated by rules. No boxes, bars or progress.
function Value({ value, placeholder }: { value: React.ReactNode | null; placeholder: Bilingual }) {
  if (value !== null) return <>{value}</>;
  return (
    <span className="is-placeholder">
      <T t={placeholder} />
    </span>
  );
}

export async function Ficha() {
  const p = copy.ficha.placeholders;
  // Raised and contributions come from paid pledges in the database. If it can't be
  // reached they stay as placeholders rather than showing a number that might be wrong.
  const totals = await getTotals();
  const items: { label: Bilingual; value: React.ReactNode | null; placeholder: Bilingual }[] = [
    { label: copy.ficha.goal, value: campaign.goalUsd === null ? null : formatUsd(campaign.goalUsd), placeholder: p.goal },
    { label: copy.ficha.raised, value: totals ? formatUsd(totals.raisedUsd) : null, placeholder: p.raised },
    { label: copy.ficha.backers, value: totals ? String(totals.backers) : null, placeholder: p.backers },
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
      <p className="lomo__coords micro">
        {/* Test-mode totals are labelled so the preview's numbers never read as real money. */}
        {totals && !totals.livemode ? (
          <span className="lomo__test">
            <T t={copy.ficha.testMode} />
          </span>
        ) : null}
        <span aria-hidden="true">Brooklyn {campaign.coords.brooklyn}</span>
        <span aria-hidden="true">Bogotá {campaign.coords.bogota}</span>
      </p>
    </section>
  );
}
