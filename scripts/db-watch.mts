// Prints pledges and processed Stripe events (no emails/addresses), for verifying the webhook.
import { getDb } from "../src/lib/db";
const db = getDb()!;
const pledges = await db.pledge.findMany({ orderBy: { createdAt: "asc" } });
const events = await db.stripeEvent.findMany({ orderBy: { receivedAt: "asc" } });
console.log(JSON.stringify({
  pledges: pledges.map((p) => ({ session: p.stripeSessionId.slice(0, 14), tier: p.tierId, cents: p.amountCents, status: p.paymentStatus, fulfillment: p.fulfillmentStatus, livemode: p.livemode, hasEmail: !!p.email, hasName: !!p.name, shipCountry: p.shippingCountry, paidAt: p.paidAt?.toISOString().slice(11, 19), refundedAt: p.refundedAt?.toISOString().slice(11, 19) })),
  events: events.map((e) => `${e.type} ${e.id.slice(0, 10)}…`),
}, null, 1));
await db.$disconnect();
