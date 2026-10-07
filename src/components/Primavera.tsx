import { copy } from "@/content/copy";
import { T } from "./T";

// The flower opening: one pasiflora silhouette on paper, the whole (unbroken) state.
// A quiet room with no heading. Vector from Brian's flower set (deliverables/flowers).
export function Primavera() {
  return (
    <div className="primavera">
      <div className="primavera__stage">
        <div className="primavera__flower" role="img" aria-labelledby="primavera-alt">
          <span id="primavera-alt" className="sr-only">
            <T t={copy.primavera.alt} />
          </span>
          <span className="flor flor--pasiflora" />
        </div>
      </div>
    </div>
  );
}
