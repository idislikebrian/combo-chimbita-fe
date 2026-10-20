// Where the $30K goes, and what it unlocks when. The Money section reads this file.
// STATUS: public breakdown from the team (Oct 20 2026). Amounts must add up to campaign.budgetUsd.
// "Artist + Project Support" deliberately combines band and project-management pay:
// never split individual compensation out on the public page.
//
// SPANISH: WORKING TRANSLATION, pending band review. Every es string in this file
// (and copy.money) is the team's working copy; replace it as given after the band's review.

import type { Bilingual } from "./copy";

export type FundingLine = {
  id: string;
  name: Bilingual;
  amountUsd: number;
};

export const funding: FundingLine[] = [
  { id: "grabacion", name: { es: "Grabación + mezcla", en: "Recording + Mixing" }, amountUsd: 8000 },
  { id: "master-arte", name: { es: "Masterización + arte", en: "Mastering + Artwork" }, amountUsd: 1000 },
  { id: "fabricacion", name: { es: "Fabricación", en: "Manufacturing" }, amountUsd: 4000 },
  { id: "sencillos", name: { es: "Sencillos + videos", en: "Singles + Videos" }, amountUsd: 5000 },
  { id: "prensa", name: { es: "Marketing + prensa", en: "Marketing + PR" }, amountUsd: 2000 },
  { id: "apoyo", name: { es: "Artistas + apoyo al proyecto", en: "Artist + Project Support" }, amountUsd: 7000 },
  { id: "impuestos", name: { es: "Impuestos + obligaciones", en: "Taxes + Obligations" }, amountUsd: 3000 },
];

export type RoadmapStep = { when: Bilingual; what: Bilingual };

export const roadmap: RoadmapStep[] = [
  { when: { es: "FEB–MAR 2027", en: "FEB–MAR 2027" }, what: { es: "Grabar + mezclar el álbum", en: "Record + mix the album" } },
  { when: { es: "ABRIL 2027", en: "APRIL 2027" }, what: { es: "Masterización, arte + fabricación", en: "Mastering, artwork + manufacturing" } },
  { when: { es: "MAYO 2027", en: "MAY 2027" }, what: { es: "Primer sencillo/video + comienza el marketing", en: "First single/video + marketing begins" } },
  { when: { es: "JUNIO–JULIO 2027", en: "JUNE–JULY 2027" }, what: { es: "Preventa + marketing y prensa continúan", en: "Pre-sale + ongoing marketing/PR" } },
  {
    when: { es: "AGO–SEPT 2027", en: "AUG–SEPT 2027" },
    what: { es: "Segundo sencillo/video → lanzamiento del álbum → anuncio de gira", en: "Second single/video → album release → tour announcement" },
  },
];
