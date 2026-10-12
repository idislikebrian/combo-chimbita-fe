import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { T } from "@/components/T";
import { copy } from "@/content/copy";
import { campaign } from "@/content/campaign";

// Holding page for the root domain, served at / by src/proxy.ts. Same paper, tinta and
// type as the campaign; deliberately no link to it yet.

const h = copy.holding;

// Replaces the campaign's Open Graph and Twitter tags so a shared root-domain link never
// previews the campaign. Robots (noindex, nofollow) still come from the root layout.
export const metadata: Metadata = {
  title: h.title,
  description: h.description,
  openGraph: { title: h.title, description: h.description, url: campaign.rootUrl },
  twitter: { card: "summary", title: h.title, description: h.description },
};

export default function EsperaPage() {
  const l = campaign.links;
  return (
    <>
      <Header />
      <main className="recibo espera">
        <section className="recibo__sheet" aria-labelledby="espera-title">
          <h1 id="espera-title" className="recibo__title">
            <T t={h.line} />
          </h1>
          <p className="subtitulo">
            <T t={h.meanwhile} />
          </p>
          <ul className="espera__links ficha">
            <li>
              <a href={l.bandcamp} rel="noopener">
                Bandcamp <span aria-hidden="true">↗</span>
              </a>
            </li>
            {l.instagram ? (
              <li>
                <a href={l.instagram} rel="noopener">
                  Instagram <span aria-hidden="true">↗</span>
                </a>
              </li>
            ) : null}
          </ul>
        </section>
      </main>
      <footer className="site-footer">
        <p className="site-footer__name" aria-hidden="true">COMBO CHIMBITA</p>
        <div className="site-footer__band ficha">
          <ul className="site-footer__coords">
            <li>Brooklyn · {campaign.coords.brooklyn}</li>
            <li>Bogotá · {campaign.coords.bogota}</li>
          </ul>
        </div>
      </footer>
    </>
  );
}
