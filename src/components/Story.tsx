import { copy } from "@/content/copy";
import { T, TBlock } from "./T";

export function Story() {
  const s = copy.story;
  return (
    <section className="story" id="historia" aria-labelledby="story-title">
      <p className="kicker etiqueta">
        <T t={s.kicker} />
      </p>
      <h2 id="story-title" className="story__title">
        <T t={s.heading} />
      </h2>
      <div className="story__text cuerpo">
        <TBlock es={s.paragraphs.es.map((p, i) => <p key={i}>{p}</p>)} en={s.paragraphs.en.map((p, i) => <p key={i}>{p}</p>)} />
      </div>
      <p className="story__places micro" aria-hidden="true">
        <T t={s.places} />
      </p>
    </section>
  );
}
