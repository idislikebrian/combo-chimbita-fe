import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { T } from "@/components/T";
import { copy } from "@/content/copy";

// Stripe Checkout's cancel_url. Nothing was charged; send them back to the price list.

export default function CanceladoPage() {
  const c = copy.cancelado;
  return (
    <>
      <Header />
      <main className="recibo">
        <section className="recibo__sheet" aria-labelledby="recibo-title">
          <p className="kicker etiqueta">
            <T t={c.kicker} />
          </p>
          <h1 id="recibo-title" className="recibo__title">
            <T t={c.title} />
          </h1>
          <p className="recibo__body subtitulo">
            <T t={c.body} />
          </p>
          <Link className="btn btn--primary recibo__back" href="/#recompensas">
            <span className="btn__label">← <T t={c.back} /></span>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
