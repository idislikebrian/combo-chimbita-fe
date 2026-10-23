// Reward tiers. Edit here; the page and checkout both read this file.
// STATUS: band PDF ("NEW RECORD CROWDFUNDING", Oct 7 2026) updated with the Oct 14 decisions
// in COB-601 (canonical). New wording for the Zoom session, NYC show and special thanks is
// WORKING COPY, pending band review. Never put [bracketed] placeholders here: these strings
// go to Stripe Checkout and receipts.
// Set `approved: false` on any tier to bracket its price and refuse checkout.
//
// - priceUsd: whole dollars.
// - limit: public cap shown as "Cupos N", or null for no public cap (nothing shown).
//   Display only: checkout does not enforce it yet.
// - stripePriceId: optional. Leave null to let checkout build the price from priceUsd.

import type { Bilingual } from "./copy";

export type Tier = {
  id: string;
  priceUsd: number;
  name: Bilingual;
  includes: Bilingual<string[]>;
  limit: number | null;
  stripePriceId: string | null;
  /** Includes the physical record: shipping applies (see shipping.ts). */
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
    // id kept from the earlier name ("Para la pared") so existing pledges still match.
    id: "vinilo-afiche",
    priceUsd: 100,
    name: { es: "Afiche firmado", en: "Signed poster" },
    includes: {
      es: ["Vinilo del disco nuevo", "Afiche firmado"],
      en: ["Vinyl of the new record", "Signed poster"],
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
      es: ["Vinilo del disco nuevo", "Afiche firmado", "Escucha y conversatorio privado con la banda por Zoom (2 horas)"],
      en: ["Vinyl of the new record", "Signed poster", "Private listening session and conversation with the band on Zoom (2 hours)"],
    },
    limit: 50,
    stripePriceId: null,
    ships: true,
    approved: true,
  },
  {
    id: "en-vivo",
    priceUsd: 500,
    name: { es: "De cerquita", en: "Up close" },
    includes: {
      es: ["Vinilo del disco nuevo", "Afiche firmado", "Un show íntimo y exclusivo en Nueva York (lugar y fecha por anunciar)"],
      en: ["Vinyl of the new record", "Signed poster", "An exclusive, intimate show in New York (venue and date to be announced)"],
    },
    limit: 50,
    stripePriceId: null,
    ships: true,
    approved: true,
  },
  {
    // id kept from the earlier name so existing pledges still match. COB-601: no
    // "executive producer" language and no public cap (the ~5 soft limit is internal).
    id: "productor",
    priceUsd: 1000,
    name: { es: "Agradecimiento especial", en: "Special thanks" },
    includes: {
      es: [
        "Vinilo del disco nuevo",
        "Afiche firmado",
        "Escucha y conversatorio privado con la banda por Zoom (2 horas)",
        "Un show íntimo y exclusivo en Nueva York (lugar y fecha por anunciar)",
        "Pase VIP al show de lanzamiento",
        "Agradecimiento especial impreso",
      ],
      en: [
        "Vinyl of the new record",
        "Signed poster",
        "Private listening session and conversation with the band on Zoom (2 hours)",
        "An exclusive, intimate show in New York (venue and date to be announced)",
        "VIP pass to the album release show",
        "Printed special thanks",
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
