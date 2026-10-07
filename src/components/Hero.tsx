import { copy } from "@/content/copy";
import { campaign } from "@/content/campaign";
import { TrackingMedia } from "./TrackingMedia";
import { T } from "./T";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__top">
        <h1 id="hero-title" className="hero__chapter">
          <span className="sr-only">COMBO CHIMBITA · </span>
          <T t={copy.hero.chapter} />
        </h1>
        <div className="hero__ask">
          <p className="subtitulo">
            <T t={copy.hero.ask} />
          </p>
          <a className="btn btn--primary btn--lg" href="#recompensas">
            <span className="btn__label">
              <T t={copy.hero.cta} /> →
            </span>
          </a>
        </div>
      </div>
      <TrackingMedia
        still={campaign.media.still}
        video={campaign.media.video}
        alt={copy.hero.mediaAlt}
        note={copy.hero.mediaNote}
      />
    </section>
  );
}
