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
    name: { es: "El disco, firmado", en: "The record, signed" },
    includes: {
      es: ["Vinilo del disco nuevo, en preventa", "Firmado por la banda"],
      en: ["Pre-order vinyl of the new record", "Signed by the band"],
    },
    limit: null,
    stripePriceId: null,
    ships: true,
    approved: true,
  },
  {
    id: "vinilo-afiche",
    priceUsd: 100,
    name: { es: "Para la pared", en: "For the wall" },
    includes: {
      es: ["Vinilo del disco nuevo [¿firmado?]", "Afiche firmado"],
      en: ["Vinyl of the new record [signed?]", "Signed poster"],
    },
    limit: null,
    stripePriceId: null,
    ships: true,
    approved: true,
  },
  {
    id: "escucha",
    priceUsd: 300,
    name: { es: "Escucha con la banda", en: "Listen with the band" },
    includes: {
      es: ["Vinilo del disco nuevo [¿firmado?]", "Afiche firmado", "Una escucha privada en línea con la banda"],
      en: ["Vinyl of the new record [signed?]", "Signed poster", "A private online listening session with the band"],
    },
    limit: null,
    stripePriceId: null,
    ships: true,
    approved: true,
  },
  {
    id: "en-vivo",
    priceUsd: 500,
    name: { es: "De cerquita", en: "Up close" },
    includes: {
      es: ["Vinilo del disco nuevo [¿firmado?]", "Afiche firmado", "Una escucha privada en línea con la banda", "Un show íntimo de cupo limitado en Nueva York"],
      en: ["Vinyl of the new record [signed?]", "Signed poster", "A private online listening session with the band", "An intimate, limited-capacity show in New York"],
    },
    limit: null,
    stripePriceId: null,
    ships: true,
    approved: true,
  },
  {
    id: "productor",
    priceUsd: 1000,
    name: { es: "Producción ejecutiva", en: "Executive producer" },
    includes: {
      es: [
        "Vinilo del disco nuevo [¿firmado?]",
        "Afiche firmado",
        "Una escucha privada en línea con la banda",
        "Un show íntimo de cupo limitado en Nueva York",
        "Pase VIP al show de lanzamiento [confirmar detalle]",
        "Crédito de producción ejecutiva",
      ],
      en: [
        "Vinyl of the new record [signed?]",
        "Signed poster",
        "A private online listening session with the band",
        "An intimate, limited-capacity show in New York",
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
