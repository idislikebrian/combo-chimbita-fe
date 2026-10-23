// Discography strip under the story. Verified against Bandcamp, Oct 23 2026.
// Covers: official Bandcamp art, resized to 640px in public/media/discos.
// Titles follow the band's spelling (IRÉ), not Bandcamp's ("IRE").

import type { Bilingual } from "./copy";

export type Disco = {
  id: string;
  title: string;
  year: number;
  type: "ep" | "album";
  url: string;
  cover: string;
};

export const discos: Disco[] = [
  {
    // On the label's Bandcamp (NYC Trust), released Oct 28 2016, 4 tracks.
    id: "corredor-del-jaguar",
    title: "El Corredor del Jaguar",
    year: 2016,
    type: "ep",
    url: "https://nyctrust.bandcamp.com/album/el-corredor-del-jaguar",
    cover: "/media/discos/corredor-del-jaguar.jpg",
  },
  {
    id: "abya-yala",
    title: "Abya Yala",
    year: 2017,
    type: "album",
    url: "https://combochimbita.bandcamp.com/album/abya-yala",
    cover: "/media/discos/abya-yala.jpg",
  },
  {
    id: "ahomale",
    title: "Ahomale",
    year: 2019,
    type: "album",
    url: "https://combochimbita.bandcamp.com/album/ahomale",
    cover: "/media/discos/ahomale.jpg",
  },
  {
    id: "ire",
    title: "IRÉ",
    year: 2022,
    type: "album",
    url: "https://combochimbita.bandcamp.com/album/ire",
    cover: "/media/discos/ire.jpg",
  },
];

export type Sencillo = { id: string; title: Bilingual; year: number; url: string };

// Dates as Bandcamp shows them: Margarita Feb 23 2024, Dímelo Mar 18 2025, Perdón Divino Mar 27 2026.
export const sencillos: Sencillo[] = [
  { id: "margarita", title: { es: "Margarita", en: "Margarita" }, year: 2024, url: "https://combochimbita.bandcamp.com/album/margarita" },
  { id: "dimelo", title: { es: "Dímelo", en: "Dímelo" }, year: 2025, url: "https://combochimbita.bandcamp.com/album/d-melo" },
  {
    id: "perdon-divino",
    title: { es: "Perdón Divino, con Nick Hakim", en: "Perdón Divino, with Nick Hakim" },
    year: 2026,
    url: "https://combochimbita.bandcamp.com/album/perd-n-divino",
  },
];
