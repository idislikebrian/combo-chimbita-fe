import type Stripe from "stripe";
import { tiers, openAmount } from "@/content/tiers";
import { shippingCountries } from "@/content/shipping";
import { copy, type Lang } from "@/content/copy";
import { getStripe } from "@/lib/stripe";

// Creates a Stripe Checkout Session for one reward tier or an open amount.
// Prices always come from tiers.ts, never from the request body.

type Body = { tierId?: unknown; amountUsd?: unknown; lang?: unknown };

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Body | null;
  if (!body) return Response.json({ status: "error" }, { status: 400 });
  const lang: Lang = body.lang === "en" ? "en" : "es";

  let line: Stripe.Checkout.SessionCreateParams.LineItem;
  let ships = false;
  let pledge: string;

  if (typeof body.tierId === "string") {
    const tier = tiers.find((t) => t.id === body.tierId);
    if (!tier) return Response.json({ status: "error" }, { status: 400 });
    if (!tier.approved) return Response.json({ status: "unavailable" }, { status: 409 });
    ships = tier.ships;
    pledge = tier.id;
    line = tier.stripePriceId
      ? { price: tier.stripePriceId, quantity: 1 }
      : {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: tier.priceUsd * 100,
            product_data: {
              name: `COMBO CHIMBITA · ${tier.name[lang]}`,
              description: tier.includes[lang].join(" · "),
            },
          },
        };
  } else if (typeof body.amountUsd === "number") {
    const cents = Math.round(body.amountUsd * 100);
    if (!Number.isFinite(cents) || cents < openAmount.minUsd * 100) {
      return Response.json({ status: "error" }, { status: 400 });
    }
    pledge = openAmount.id;
    line = {
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: cents,
        product_data: {
          name: `COMBO CHIMBITA · ${copy.tiers.open.name[lang]}`,
          description: copy.tiers.open.body[lang],
        },
      },
    };
  } else {
    return Response.json({ status: "error" }, { status: 400 });
  }

  const stripe = getStripe();
  if (!stripe) return Response.json({ status: "not_configured" }, { status: 503 });

  const origin = new URL(request.url).origin;
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      // Managed Payments (Stripe as merchant of record) is on by default in new sandboxes.
      // It's for digital goods: it refuses shipping and demands a product tax code.
      // Vinyl and posters ship, so the band stays the seller.
      managed_payments: { enabled: false },
      line_items: [line],
      locale: lang,
      // Checkout always asks for an email in payment mode; this adds the supporter's name.
      name_collection: { individual: { enabled: true } },
      customer_creation: "always",
      ...(ships ? { shipping_address_collection: { allowed_countries: shippingCountries } } : {}),
      metadata: { pledge, ships: String(ships), lang },
      payment_intent_data: { metadata: { pledge } },
      success_url: `${origin}/gracias?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancelado`,
    });
    if (!session.url) return Response.json({ status: "error" }, { status: 502 });
    return Response.json({ url: session.url });
  } catch (err) {
    // Log the Stripe error type/code/param only, never request contents.
    const e = err as { type?: string; code?: string; param?: string };
    console.error("[checkout] session create failed", e.type, e.code, e.param);
    return Response.json({ status: "error" }, { status: 502 });
  }
}
