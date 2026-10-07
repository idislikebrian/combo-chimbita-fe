import type { Bilingual } from "@/content/copy";

// Renders both languages; CSS shows the one matching <html data-lang>.
// Server-rendered, so the page works and is crawlable without JavaScript.
export function T({ t }: { t: Bilingual }) {
  return (
    <>
      <span lang="es" className="l-es">{t.es}</span>
      <span lang="en" className="l-en">{t.en}</span>
    </>
  );
}

/** Block-level version for paragraphs and lists. */
export function TBlock({ es, en, className }: { es: React.ReactNode; en: React.ReactNode; className?: string }) {
  return (
    <>
      <div lang="es" className={`l-es ${className ?? ""}`}>{es}</div>
      <div lang="en" className={`l-en ${className ?? ""}`}>{en}</div>
    </>
  );
}
