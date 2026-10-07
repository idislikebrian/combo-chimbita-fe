import Stripe from "stripe";

// Server-only Stripe client. The secret is read from the Vercel environment
// (STRIPE_SECRET_KEY) and never leaves the server.
//
// TEST MODE ONLY during the preview: a live key is refused outright, so a wrong
// paste in the dashboard can't take real money from the review URL.

let client: Stripe | null | undefined;

export function getStripe(): Stripe | null {
  if (client !== undefined) return client;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    client = null;
  } else if (!/^(sk|rk)_test_/.test(key)) {
    console.error("[checkout] STRIPE_SECRET_KEY is not a test-mode key; payments disabled.");
    client = null;
  } else {
    client = new Stripe(key);
  }
  return client;
}
