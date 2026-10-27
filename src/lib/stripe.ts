import Stripe from "stripe";

// Server-only Stripe client. The secret is read from the Vercel environment
// (STRIPE_SECRET_KEY) and never leaves the server.
//
// Test or live: the mode follows the key. Preview keeps test credentials; Production
// goes live when its key is replaced. Anything that isn't a Stripe server key is refused.

let client: Stripe | null | undefined;

export function getStripe(): Stripe | null {
  if (client !== undefined) return client;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    client = null;
  } else if (!/^(sk|rk)_(test|live)_/.test(key)) {
    console.error("[checkout] STRIPE_SECRET_KEY is not a recognized Stripe server key; payments disabled.");
    client = null;
  } else {
    client = new Stripe(key);
  }
  return client;
}

/** True when the server key is a live-mode key. Drives the test-mode labels and which
 *  pledges count toward the totals. */
export function isLiveStripe(): boolean {
  return /^(sk|rk)_live_/.test(process.env.STRIPE_SECRET_KEY ?? "");
}
