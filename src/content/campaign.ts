// Campaign facts. Every number on the page comes from here.
// `null` means "not confirmed by the band yet" and renders as a bracketed placeholder.
// Never replace a null with a plausible guess.

export const campaign = {
  /** Project budget in USD (updated plan: $30K, replaces the PDF's $20K). */
  budgetUsd: 30000 as number | null,
  /** Goal shown in the readout. Set to the budget per the $30K plan.
   *  Still open with the band: show a near-term stage (~$7–8K by January) too? */
  goalUsd: 30000 as number | null,
  /** Raised so far in USD. Will come from Stripe totals. */
  raisedUsd: null as number | null,
  /** Number of contributions. Will come from Stripe. */
  backers: null as number | null,
  /** Campaign end, ISO date (YYYY-MM-DD). Drives "days left". */
  endDate: null as string | null,

  /** Hero media. Swap `video` in when the blob-tracking renders arrive. */
  media: {
    video: null as string | null,
    still: "/media/banda-still.jpg",
  },

  links: {
    bandcamp: "https://combochimbita.bandcamp.com/",
    instagram: "https://instagram.com/combochimbita" as string | null, // verified by Brian, Oct 7 2026
    mailingList: null as string | null,
  },

  coords: {
    brooklyn: "40.68° N 73.94° W",
    bogota: "4.71° N 74.07° W",
  },
};

/** Call on the client only: "now" must be the visitor's clock, not build time. */
export function daysLeft(endDate: string | null, now: Date): number | null {
  if (!endDate) return null;
  const end = new Date(`${endDate}T23:59:59`);
  const ms = end.getTime() - now.getTime();
  return Math.max(0, Math.ceil(ms / 86_400_000));
}

export function formatUsd(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}
