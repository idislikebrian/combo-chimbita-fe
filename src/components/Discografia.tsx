import { copy } from "@/content/copy";
import { discos, sencillos } from "@/content/discografia";
import { T } from "./T";
import { Flor } from "./Flor";

// A compact strip of the records under the story: proof of ten years, not a gallery.
export function Discografia() {
  const c = copy.discografia;
  return (
    <section className="discos" id="discografia" aria-labelledby="discos-title">
      <header className="discos__head">
        <p className="kicker etiqueta">
          <T t={c.kicker} />
        </p>
        <h2 id="discos-title" className="discos__title">
          <T t={c.heading} />
        </h2>
        <p className="discos__line pequeno">
          <T t={c.line} />
        </p>
      </header>

      <ol className="discos__lista">
        {discos.map((d) => (
          <li key={d.id}>
            <a className="disco" href={d.url} rel="noopener">
              {/* Pre-sized 640px covers; no runtime optimisation needed. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="disco__tapa" src={d.cover} alt="" width={640} height={640} loading="lazy" decoding="async" />
              <span className="disco__title">{d.title}</span>
              <span className="disco__meta micro">
                <T t={c.types[d.type]} /> · {d.year}
              </span>
              <span className="disco__link etiqueta">
                <T t={c.link} /> <span aria-hidden="true">↗</span>
              </span>
            </a>
          </li>
        ))}
      </ol>

      <div className="discos__sencillos ficha">
        <h3 className="discos__sencillos-label">
          <T t={c.singles} />
        </h3>
        <ul>
          {sencillos.map((s, i) => (
            <li key={s.id}>
              {i > 0 ? <Flor name="pasiflora" className="flor-glifo--sep" /> : null}
              <a href={s.url} rel="noopener">
                <T t={s.title} /> ({s.year}) <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
