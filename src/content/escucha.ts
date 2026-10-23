// Rehearsal fragments for the Listen section, in file order (CLIP7A is 07).
// Source: Dropbox 99-combo-chimbita/assets/NEW ALBUM REHERASAL CLIPS (320 kbps MP3, Oct 20 2026),
// re-encoded to 128 kbps AAC in public/media/escucha. seconds = encoded duration.

export type Fragmento = { no: string; src: string; seconds: number };

const seconds = [26.7, 21.7, 36.5, 41.4, 31.9, 24.7, 13.0, 19.8, 23.3];

export const fragmentos: Fragmento[] = seconds.map((s, i) => {
  const no = String(i + 1).padStart(2, "0");
  return { no, src: `/media/escucha/fragmento-${no}.m4a`, seconds: s };
});

/** 26.7 → "0:27" */
export function formatDuration(s: number) {
  const r = Math.round(s);
  return `${Math.floor(r / 60)}:${String(r % 60).padStart(2, "0")}`;
}
