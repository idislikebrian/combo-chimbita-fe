import { copy } from "@/content/copy";
import { campaign } from "@/content/campaign";
import { T } from "./T";
import { Flor, FLORES } from "./Flor";

export function Footer() {
  const f = copy.footer;
  const l = campaign.links;
  return (
    <footer className="site-footer">
      <p className="site-footer__name" aria-hidden="true">COMBO CHIMBITA</p>
      <div className="site-footer__band ficha">
        <ul className="site-footer__coords">
          <li>Lenapehoking · {campaign.coords.brooklyn}</li>
          <li>Abya Yala · {campaign.coords.bogota}</li>
        </ul>
        <ul className="site-footer__links">
          {/* Same order as the holding page. A link without a confirmed URL is left out. */}
          {l.spotify ? (
            <li>
              <a href={l.spotify} rel="noopener">Spotify <span aria-hidden="true">↗</span></a>
            </li>
          ) : null}
          {l.appleMusic ? (
            <li>
              <a href={l.appleMusic} rel="noopener">Apple Music <span aria-hidden="true">↗</span></a>
            </li>
          ) : null}
          <li>
            <a href={l.bandcamp} rel="noopener">Bandcamp <span aria-hidden="true">↗</span></a>
          </li>
          {l.instagram ? (
            <li>
              <a href={l.instagram} rel="noopener">Instagram <span aria-hidden="true">↗</span></a>
            </li>
          ) : null}
          <li>
            <a href={`mailto:${campaign.supportEmail}`}>
              <T t={f.contact} />
            </a>
          </li>
          <li>
            <a href="/privacy">
              <T t={f.privacy} />
            </a>
          </li>
          {l.mailingList ? (
            <li>
              <a href={l.mailingList} rel="noopener">
                <T t={f.list} /> ↗
              </a>
            </li>
          ) : null}
        </ul>
        <p className="site-footer__flores" aria-hidden="true">
          {FLORES.map((n) => (
            <Flor key={n} name={n} />
          ))}
        </p>
      </div>
    </footer>
  );
}
