import Link from "next/link";
import type { Metadata } from "next";
import { T } from "@/components/T";
import { Correo } from "@/components/Preguntas";
import { LegalPage, LegalLinks } from "@/components/Legal";
import { copy } from "@/content/copy";

// Customer support page; Stripe's public business details link here.

const s = copy.soporte;

export const metadata: Metadata = {
  title: `${s.title.es} · ${s.title.en} · COMBO CHIMBITA`,
  alternates: { canonical: "/support" },
};

export default function SupportPage() {
  return (
    <LegalPage
      id="soporte"
      kicker={s.kicker}
      title={s.title}
      updated={s.updated}
      intro={
        <>
          <T t={s.intro} /> <Correo />.
        </>
      }
      sections={s.sections}
    >
      <section className="legal__seccion legal__seccion--solo">
        <h2 className="legal__heading">
          <T t={s.more} />
        </h2>
        <ul className="cuerpo">
          <li>
            <Link href="/#preguntas">
              <T t={s.faq} />
            </Link>
          </li>
          <LegalLinks current="support" />
        </ul>
      </section>
    </LegalPage>
  );
}
