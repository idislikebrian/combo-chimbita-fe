// Campaign facts. Every number on the page comes from here.
// `null` means "not confirmed by the band yet" and renders as a bracketed placeholder.
// Never replace a null with a plausible guess.

export const campaign = {
  /** Project budget in USD (updated plan: $30K, replaces the PDF's $20K). */
  budgetUsd: 30000 as number | null,
  /** Goal shown in the readout. Set to the budget per the $30K plan.
   *  Still open with the band: show a near-term stage (~$7–8K by January) too? */
  goalUsd: 30000 as number | null,
  // Raised and contributions are not set here: they're summed from paid pledges in the
  // database (src/lib/totals.ts), written by the Stripe webhook.

  /** Hero media. Swap `video` in when the blob-tracking renders arrive. */
  media: {
    video: null as string | null,
    still: "/media/banda-still.jpg",
    /** Riso CMYK print of the still: four separations overprinted (scripts/riso-cmyk.py). */
    print: "/media/banda-riso-cmyk.jpg",
  },

  /** Public campaign URL used in share links. null = the site the visitor is on
   *  (the preview today); set to https://combochimbita.net at launch. */
  shareUrl: null as string | null,

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

export function formatUsd(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}
