import { copy } from "@/content/copy";
import { campaign } from "@/content/campaign";
import { T } from "./T";

function Pending() {
  return (
    <span className="is-placeholder">
      <T t={copy.footer.pending} />
    </span>
  );
}

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
          <li>{l.instagram ? <a href={l.instagram} rel="noopener">Instagram ↗</a> : <>Instagram · <Pending /></>}</li>
          <li>
            <T t={f.list} /> · {l.mailingList ? <a href={l.mailingList} rel="noopener">↗</a> : <Pending />}
          </li>
        </ul>
      </div>
    </footer>
  );
}
