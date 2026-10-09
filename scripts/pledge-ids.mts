// Prints Stripe object IDs for persisted pledges (IDs only, no keys or personal data).
import Stripe from "stripe";
import { getDb } from "../src/lib/db";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const db = getDb()!;
for (const p of await db.pledge.findMany()) {
  const s = await stripe.checkout.sessions.retrieve(p.stripeSessionId, { expand: ["payment_intent.latest_charge"] });
  const pi = s.payment_intent as Stripe.PaymentIntent;
  const ch = pi.latest_charge as Stripe.Charge;
  console.log({ tier: p.tierId, amount: s.amount_total, livemode: s.livemode, session: s.id, paymentIntent: pi.id, charge: ch.id, chargeRefunded: ch.refunded, created: new Date(s.created * 1000).toISOString() });
}
const acct = await stripe.accounts.retrieveCurrent().catch((e) => ({ id: `(not readable with this key: ${e.type})` }));
console.log({ account: acct.id, keyMode: /^(sk|rk)_test_/.test(process.env.STRIPE_SECRET_KEY ?? "") ? "test" : "other" });
await db.$disconnect();
