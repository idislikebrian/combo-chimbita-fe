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
          <li>Instagram · {l.instagram ? <a href={l.instagram} rel="noopener">Instagram ↗</a> : <Pending />}</li>
          <li>
            <T t={f.contact} /> · {l.contact ? <a href={l.contact}>{l.contact.replace(/^mailto:/, "")}</a> : <Pending />}
          </li>
          <li>
            <T t={f.list} /> · {l.mailingList ? <a href={l.mailingList} rel="noopener">↗</a> : <Pending />}
          </li>
        </ul>
        <div className="inkbar" aria-hidden="true">
          <span className="inkbar__sw inkbar__sw--tinta" />
          <span className="inkbar__sw inkbar__sw--pasiflora" />
          <span className="inkbar__sw inkbar__sw--maiz" />
          <span className="micro">tinta · pasiflora · maiz / Black · Fluorescent Pink · Sunflower (riso)</span>
        </div>
      </div>
    </footer>
  );
}
