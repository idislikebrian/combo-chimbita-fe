import { Suspense } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { T } from "@/components/T";
import { copy, type Bilingual } from "@/content/copy";
import { tiers, openAmount } from "@/content/tiers";
import { formatUsd } from "@/content/campaign";
import { getStripe } from "@/lib/stripe";

// Return page after Stripe Checkout. Reads the session from Stripe on the server so
// nothing shown here comes from the URL except the session id.

export default function GraciasPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  return (
    <>
      <Header />
      <main className="recibo">
        <Suspense fallback={<Receipt state="loading" />}>
          <Resolved searchParams={searchParams} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

type Paid = { reward: Bilingual; amountUsd: number; email: string | null; shipTo: string | null };

async function Resolved({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  const stripe = getStripe();
  if (!stripe || typeof session_id !== "string" || !session_id.startsWith("cs_")) {
    return <Receipt state="missing" />;
  }
  const session = await stripe.checkout.sessions.retrieve(session_id).catch(() => null);
  if (!session || session.status !== "complete") return <Receipt state="missing" />;
  if (session.payment_status !== "paid") return <Receipt state="processing" />;

  const pledge = session.metadata?.pledge;
  const tier = tiers.find((t) => t.id === pledge);
  const addr = session.collected_information?.shipping_details?.address;
  return (
    <Receipt
      state="paid"
      paid={{
        reward: tier ? tier.name : pledge === openAmount.id ? copy.tiers.open.name : { es: "—", en: "—" },
        amountUsd: (session.amount_total ?? 0) / 100,
        email: session.customer_details?.email ?? null,
        shipTo: addr ? [addr.city, addr.country].filter(Boolean).join(", ") : null,
      }}
    />
  );
}

function Receipt({ state, paid }: { state: "loading" | "paid" | "processing" | "missing"; paid?: Paid }) {
  const g = copy.gracias;
  return (
    <section className="recibo__sheet" aria-labelledby="recibo-title" aria-busy={state === "loading" || undefined}>
      <p className="kicker etiqueta">
        <T t={g.kicker} />
      </p>
      <h1 id="recibo-title" className="recibo__title">
        <T t={g.title} />
      </h1>
      {state === "paid" && paid ? (
        <>
          <p className="recibo__body subtitulo">
            <T t={g.body} />
          </p>
          <dl className="recibo__lines ficha">
            <div>
              <dt><T t={g.reward} /></dt>
              <dd><T t={paid.reward} /></dd>
            </div>
            <div>
              <dt><T t={g.amount} /></dt>
              <dd>{formatUsd(paid.amountUsd)} USD</dd>
            </div>
            {paid.email ? (
              <div>
                <dt><T t={g.email} /></dt>
                <dd>{paid.email}</dd>
              </div>
            ) : null}
            {paid.shipTo ? (
              <div>
                <dt><T t={g.shipping} /></dt>
                <dd>{paid.shipTo}</dd>
              </div>
            ) : null}
          </dl>
        </>
      ) : state === "processing" ? (
        <p className="recibo__body subtitulo"><T t={g.processing} /></p>
      ) : state === "missing" ? (
        <p className="recibo__body subtitulo"><T t={g.missing} /></p>
      ) : null}
      <p className="recibo__test etiqueta"><T t={copy.checkout.testMode} /></p>
      <Link className="btn btn--primary recibo__back" href="/">
        <span className="btn__label">← <T t={g.back} /></span>
      </Link>
    </section>
  );
}
