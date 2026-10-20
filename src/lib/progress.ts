import { copy, type Bilingual } from "@/content/copy";
import { formatUsd } from "@/content/campaign";

export type Progress = {
  /** Visible figure: "0%", "<1%", or the floored percentage (may exceed 100). */
  label: string;
  /** Fill width as a share of the goal, 0–1. Exactly proportional, capped at the goal. */
  fill: number;
  /** aria-valuenow: raised dollars, capped at the goal (a value over aria-valuemax is invalid). */
  valueNow: number;
  /** aria-valuetext per language: the true amount and true percentage, even past the goal. */
  valueText: Bilingual;
};

// Progress toward the goal, in whole cents so the percentage never rounds up.
// floor(raised × 100 / goal): $299.99 of $30,000 is "<1%", $29,999 is "99%", never "100%".
export function getProgress(raisedCents: number, goalUsd: number): Progress {
  const goalCents = goalUsd * 100;
  const pct = Math.floor((raisedCents * 100) / goalCents);
  const under1 = raisedCents > 0 && pct === 0;
  const label = under1 ? "<1%" : `${pct}%`;
  const spoken: Bilingual = under1 ? copy.ficha.lessThanOne : { es: label, en: label };
  const raised = formatUsd(raisedCents / 100);
  const goal = formatUsd(goalUsd);
  return {
    label,
    fill: Math.min(raisedCents / goalCents, 1),
    valueNow: Math.min(raisedCents / 100, goalUsd),
    valueText: {
      es: `${raised} ${copy.ficha.of.es} ${goal}, ${spoken.es}`,
      en: `${raised} ${copy.ficha.of.en} ${goal}, ${spoken.en}`,
    },
  };
}
