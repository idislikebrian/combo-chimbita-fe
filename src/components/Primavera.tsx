import { copy } from "@/content/copy";
import { T } from "./T";

// The flower opening: one pasiflora silhouette on paper, the whole (unbroken) state.
// Flower is a raster crop of the 08-flores sketch until the Illustrator vectors arrive.
export function Primavera() {
  return (
    <section className="primavera" aria-labelledby="primavera-title">
      <div className="primavera__stage">
        <div className="primavera__flower" role="img" aria-labelledby="primavera-alt">
          <span id="primavera-alt" className="sr-only">
            <T t={copy.primavera.alt} />
          </span>
          <span className="flor flor--pasiflora" />
        </div>
      </div>
      <h2 id="primavera-title" className="primavera__word">
        <T t={copy.primavera.word} />
      </h2>
      <p className="primavera__note micro">
        <T t={copy.primavera.note} />
      </p>
    </section>
  );
}
