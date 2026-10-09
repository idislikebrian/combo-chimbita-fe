import type Stripe from "stripe";
import { revalidateTag } from "next/cache";
import { getStripe } from "@/lib/stripe";
import { getDb } from "@/lib/db";
import { TOTALS_TAG } from "@/lib/totals";
import { tiers } from "@/content/tiers";

// Stripe webhook. The only writer of pledge rows. Every request is signature-verified
// with STRIPE_WEBHOOK_SECRET; each event id is recorded so retries are no-ops.
//
// Subscribed events (configure the endpoint in the Stripe dashboard to send exactly these):
//   checkout.session.completed               paid now, or PENDING for async methods
//   checkout.session.async_payment_succeeded PENDING -> PAID
//   checkout.session.async_payment_failed    PENDING -> FAILED
//   charge.refunded                          PAID -> REFUNDED (full refunds only)

export async function POST(request: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const db = getDb();
  if (!stripe || !secret || !db) return new Response("not configured", { status: 503 });

  const signature = request.headers.get("stripe-signature");
  if (!signature) return new Response("missing signature", { status: 400 });
  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(payload, signature, secret);
  } catch {
    return new Response("bad signature", { status: 400 });
  }

  const seen = await db.stripeEvent.findUnique({ where: { id: event.id } });
  if (seen) return Response.json({ received: true, duplicate: true });

  try {
    let changed = false;
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
      case "checkout.session.async_payment_failed":
        changed = await upsertFromSession(event.data.object, event.type);
        break;
      case "charge.refunded":
        changed = await markRefunded(event.data.object);
        break;
    }
    await db.stripeEvent.create({ data: { id: event.id, type: event.type } });
    if (changed) revalidateTag(TOTALS_TAG, { expire: 0 });
    return Response.json({ received: true });
  } catch (err) {
    // Non-2xx makes Stripe retry with backoff. Log the error class only.
    console.error("[webhook] failed", event.type, (err as Error).name, (err as { code?: string }).code);
    return new Response("handler error", { status: 500 });
  }
}

async function upsertFromSession(session: Stripe.Checkout.Session, type: Stripe.Event.Type): Promise<boolean> {
  const db = getDb()!;
  if (session.mode !== "payment") return false;

  const paymentStatus =
    type === "checkout.session.async_payment_failed"
      ? "FAILED"
      : session.payment_status === "paid" || session.payment_status === "no_payment_required"
        ? "PAID"
        : "PENDING";

  const tierId = session.metadata?.pledge ?? "unknown";
  const ships = tiers.find((t) => t.id === tierId)?.ships ?? false;
  const shipping = session.collected_information?.shipping_details;
  const addr = shipping?.address;
  const pi = typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id ?? null;
  const paidAt = paymentStatus === "PAID" ? new Date() : null;

  const data = {
    stripePaymentIntentId: pi,
    livemode: session.livemode,
    tierId,
    amountCents: session.amount_total ?? 0,
    currency: session.currency ?? "usd",
    lang: session.metadata?.lang ?? session.locale ?? "es",
    email: session.customer_details?.email ?? null,
    name: session.collected_information?.individual_name ?? session.customer_details?.name ?? null,
    paymentStatus,
    shippingName: shipping?.name ?? null,
    shippingLine1: addr?.line1 ?? null,
    shippingLine2: addr?.line2 ?? null,
    shippingCity: addr?.city ?? null,
    shippingState: addr?.state ?? null,
    shippingPostalCode: addr?.postal_code ?? null,
    shippingCountry: addr?.country ?? null,
  } as const;

  const existing = await db.pledge.findUnique({ where: { stripeSessionId: session.id } });
  // Out-of-order delivery: never move a refunded pledge back, or a paid one back to pending.
  if (existing?.paymentStatus === "REFUNDED") return false;
  if (existing?.paymentStatus === "PAID" && paymentStatus === "PENDING") return false;

  await db.pledge.upsert({
    where: { stripeSessionId: session.id },
    create: {
      stripeSessionId: session.id,
      ...data,
      fulfillmentStatus: ships ? "PENDING" : "NOT_REQUIRED",
      paidAt,
    },
    update: { ...data, paidAt: existing?.paidAt ?? paidAt },
  });
  return true;
}

async function markRefunded(charge: Stripe.Charge): Promise<boolean> {
  const db = getDb()!;
  if (!charge.refunded) return false; // partial refund: leave the pledge counted, flag manually
  const pi = typeof charge.payment_intent === "string" ? charge.payment_intent : charge.payment_intent?.id;
  if (!pi) return false;
  const res = await db.pledge.updateMany({
    where: { stripePaymentIntentId: pi },
    data: { paymentStatus: "REFUNDED", refundedAt: new Date() },
  });
  return res.count > 0;
}
