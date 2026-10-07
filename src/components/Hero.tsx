import { copy } from "@/content/copy";
import { campaign } from "@/content/campaign";
import { TrackingMedia } from "./TrackingMedia";
import { T } from "./T";
import { Flor } from "./Flor";

// The hero is a poster: billing set to the sheet and cropped, the filtered band image
// cutting into it, and a ficha band running up the left edge.
export function Hero() {
  const f = copy.hero.ficha;
  return (
    <section className="cartel" aria-labelledby="hero-title">
      <p className="cartel__ficha ficha">
        <span>COMBO CHIMBITA</span>
        <Flor name="pasiflora" className="flor-glifo--sep" />
        <span><T t={f.status} /></span>
        <Flor name="dalia" className="flor-glifo--sep" />
        <span><T t={f.record} /></span>
        <Flor name="loto" className="flor-glifo--sep" />
        <span>Brooklyn {campaign.coords.brooklyn}</span>
        <Flor name="heliconia" className="flor-glifo--sep" />
        <span>Bogotá {campaign.coords.bogota}</span>
      </p>

      <div className="cartel__sheet">
        <h1 id="hero-title" className="cartel__billing">
          <span className="sr-only">COMBO CHIMBITA · </span>
          <T t={copy.hero.chapter} />
        </h1>

        <TrackingMedia
          still={campaign.media.still}
          print={campaign.media.print}
          video={campaign.media.video}
          alt={copy.hero.mediaAlt}
          note={copy.hero.mediaNote}
        />

        <div className="cartel__pie">
          <p className="subtitulo cartel__ask">
            <T t={copy.hero.ask} />
          </p>
          <a className="btn btn--primary btn--lg cartel__cta" href="#recompensas">
            <span className="btn__label">
              <T t={copy.hero.cta} /> →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
