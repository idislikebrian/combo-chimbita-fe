import type { Metadata } from "next";
import { T } from "@/components/T";
import { Correo } from "@/components/Preguntas";
import { LegalPage, LegalLinks } from "@/components/Legal";
import { copy } from "@/content/copy";

// Campaign terms; Stripe's public business details link here.

const t = copy.terminos;

export const metadata: Metadata = {
  title: `${t.title.es} · ${t.title.en} · COMBO CHIMBITA`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage id="terminos" kicker={t.kicker} title={t.title} updated={t.updated} intro={<T t={t.intro} />} sections={t.sections}>
      <section className="legal__seccion legal__seccion--solo">
        <ul className="cuerpo">
          <li>
            <T t={t.contact} /> <Correo />.
          </li>
          <LegalLinks current="terms" />
        </ul>
      </section>
    </LegalPage>
  );
}
