import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { T } from "@/components/T";
import { Ramo } from "@/components/Ramo";
import { Escucha } from "@/components/Escucha";
import { Discografia } from "@/components/Discografia";
import { copy } from "@/content/copy";
import { campaign } from "@/content/campaign";

// Holding page for the root domain, served at / by src/proxy.ts. Same paper, tinta and
// type as the campaign; deliberately no link to it yet.
// Order: headline + flower bunch, rehearsal fragments, listen-and-follow links, discography.

const h = copy.holding;

// Replaces the campaign's Open Graph and Twitter tags so a shared root-domain link never
// previews the campaign. Robots (noindex, nofollow) still come from the root layout.
// The image URL is absolute on the root domain: metadataBase points at the campaign.
const shareImage = {
  url: `${campaign.rootUrl}/media/og/holding.jpg`,
  width: 1200,
  height: 630,
  alt: "COMBO CHIMBITA. Another dream begins. Oct 27, 2026.",
};

export const metadata: Metadata = {
  title: h.title,
  description: h.description,
  openGraph: { title: h.title, description: h.description, url: campaign.rootUrl, images: [shareImage] },
  twitter: { card: "summary_large_image", title: h.title, description: h.description, images: [shareImage] },
};

export default function EsperaPage() {
  const l = campaign.links;
  const links = [
    { name: "Spotify", href: l.spotify },
    { name: "Apple Music", href: l.appleMusic },
    { name: "Bandcamp", href: l.bandcamp },
    { name: "Instagram", href: l.instagram },
  ].filter((x): x is { name: string; href: string } => Boolean(x.href));

  return (
    <>
      <Header />
      <main className="espera">
        <section className="espera__portada" aria-labelledby="espera-title">
          <div className="espera__texto">
            <h1 id="espera-title" className="espera__title">
              <T t={h.line} />
            </h1>
            <p className="espera__fecha">
              <time dateTime="2026-10-27">
                <T t={h.date} />
              </time>
            </p>
          </div>
          {/* Stand-in for the teaser video until the export is chosen: the bunch, turning with scroll. */}
          <div className="espera__visual">
            <Ramo />
          </div>
        </section>

        <Escucha kicker={h.escucha.kicker} heading={h.escucha.heading} />

        <section className="espera__seguir" aria-labelledby="seguir-title">
          <h2 id="seguir-title" className="subtitulo">
            <T t={h.meanwhile} />
          </h2>
          <ul className="espera__links ficha">
            {links.map((x) => (
              <li key={x.name}>
                <a href={x.href} rel="noopener">
                  {x.name} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <Discografia />
      </main>
      <footer className="site-footer">
        <p className="site-footer__name" aria-hidden="true">COMBO CHIMBITA</p>
        <div className="site-footer__band ficha">
          <ul className="site-footer__coords">
            <li>Lenapehoking · {campaign.coords.brooklyn}</li>
            <li>Abya Yala · {campaign.coords.bogota}</li>
          </ul>
        </div>
      </footer>
    </>
  );
}
