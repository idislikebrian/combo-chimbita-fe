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
          <li>Brooklyn · {campaign.coords.brooklyn}</li>
          <li>Bogotá · {campaign.coords.bogota}</li>
        </ul>
        <ul className="site-footer__links">
          <li>
            <a href={l.bandcamp} rel="noopener">Bandcamp ↗</a>
          </li>
          {/* A link without a confirmed URL is left out rather than shown as a placeholder. */}
          {l.instagram ? (
            <li>
              <a href={l.instagram} rel="noopener">Instagram ↗</a>
            </li>
          ) : null}
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
