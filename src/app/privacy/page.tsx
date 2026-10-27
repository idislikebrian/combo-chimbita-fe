import type { Metadata } from "next";
import { T } from "@/components/T";
import { Correo } from "@/components/Preguntas";
import { LegalPage, LegalLinks } from "@/components/Legal";
import { copy } from "@/content/copy";

// Privacy notice for the campaign; Stripe's public business details link here.

const p = copy.privacidad;

export const metadata: Metadata = {
  title: `${p.title.es} · ${p.title.en} · COMBO CHIMBITA`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage id="privacidad" kicker={p.kicker} title={p.title} updated={p.updated} intro={<T t={p.intro} />} sections={p.sections}>
      <section className="legal__seccion legal__seccion--solo">
        <ul className="cuerpo">
          <li>
            <T t={p.contact} /> <Correo />.
          </li>
          <li>
            <a href="https://stripe.com/privacy" rel="noopener">
              <T t={p.stripePolicy} /> <span aria-hidden="true">↗</span>
            </a>
          </li>
          <LegalLinks current="privacy" />
        </ul>
      </section>
    </LegalPage>
  );
}
