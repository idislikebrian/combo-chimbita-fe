// Flowers as liner-note micrographics: small one-ink glyphs that take the colour of the
// text around them. Vectors from Brian's set (deliverables/flowers → public/media/flores).
export const FLORES = ["pasiflora", "dalia", "loto", "heliconia"] as const;
export type FlorName = (typeof FLORES)[number];

/** Decorative glyph. Always aria-hidden; the text beside it carries the meaning. */
export function Flor({ name, className }: { name: FlorName; className?: string }) {
  return <span className={`flor-glifo flor-glifo--${name} ${className ?? ""}`} aria-hidden="true" />;
}

/** Runs a list together with a small passionflower between items, like liner-note credits. */
export function FlorList({ items }: { items: readonly string[] }) {
  return (
    <>
      {items.map((item, i) => (
        <span key={item} className="flor-list__item">
          {i > 0 ? <Flor name="pasiflora" className="flor-glifo--sep" /> : null}
          {item}
        </span>
      ))}
    </>
  );
}
