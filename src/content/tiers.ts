// Reward tiers. Edit here; the page and checkout both read this file.
// STATUS: first draft. Prices and included rewards come from the band's
// "NEW RECORD CROWDFUNDING" PDF (the working source for tiers, confirmed Oct 7 2026).
// Tier names are descriptive labels for the preview; the PDF only names "Executive producer".
// Set `approved: false` on any tier to bracket its price and refuse checkout.
//
// - priceUsd: whole dollars.
// - limit: number of slots, or null if unconfirmed / unlimited (shows [límite]).
// - stripePriceId: optional. Leave null to let checkout build the price from priceUsd.

import type { Bilingual } from "./copy";

export type Tier = {
  id: string;
  priceUsd: number;
  name: Bilingual;
  includes: Bilingual<string[]>;
  limit: number | null;
  stripePriceId: string | null;
  /** Physical goods: ask for a shipping address at checkout. */
  ships: boolean;
  /** false = not ready to sell: price shows in brackets and checkout is refused. */
  approved: boolean;
};

export const tiers: Tier[] = [
  {
    id: "vinilo",
    priceUsd: 50,
    name: { es: "Vinilo firmado", en: "Signed vinyl" },
    includes: {
      es: ["Preventa del vinilo, firmado por la banda"],
      en: ["Vinyl pre-sale, signed by the band"],
    },
    limit: null,
    stripePriceId: null,
    ships: true,
    approved: true,
  },
  {
    id: "vinilo-afiche",
    priceUsd: 100,
    name: { es: "Vinilo + afiche", en: "Vinyl + poster" },
    includes: {
      es: ["Vinilo", "Afiche firmado"],
      en: ["Vinyl", "Signed poster"],
    },
    limit: null,
    stripePriceId: null,
    ships: true,
    approved: true,
  },
  {
    id: "escucha",
    priceUsd: 300,
    name: { es: "Escucha privada", en: "Private listening" },
    includes: {
      es: ["Vinilo", "Afiche firmado", "Una escucha privada en línea"],
      en: ["Vinyl", "Signed poster", "One private online listening party"],
    },
    limit: null,
    stripePriceId: null,
    ships: true,
    approved: true,
  },
  {
    id: "en-vivo",
    priceUsd: 500,
    name: { es: "Show íntimo", en: "Intimate show" },
    includes: {
      es: ["Vinilo", "Afiche firmado", "Una escucha privada en línea", "Show en vivo exclusivo y limitado"],
      en: ["Vinyl", "Signed poster", "One private online listening party", "Exclusive limited live show"],
    },
    limit: null,
    stripePriceId: null,
    ships: true,
    approved: true,
  },
  {
    id: "productor",
    priceUsd: 1000,
    name: { es: "Productor ejecutivo", en: "Executive producer" },
    includes: {
      es: [
        "Vinilo",
        "Afiche firmado",
        "Una escucha privada en línea",
        "Show en vivo exclusivo y limitado",
        "Pase VIP al show de lanzamiento [confirmar detalle]",
        "Crédito de productor ejecutivo",
      ],
      en: [
        "Vinyl",
        "Signed poster",
        "One private online listening party",
        "Exclusive limited live show",
        "VIP pass to the album release show [confirm detail]",
        "Executive producer credit",
      ],
    },
    limit: null,
    stripePriceId: null,
    ships: true,
    approved: true,
  },
];

/** Open "any amount" contribution. minUsd is a technical floor, not a band decision. */
export const openAmount = {
  id: "libre",
  minUsd: 1,
};
