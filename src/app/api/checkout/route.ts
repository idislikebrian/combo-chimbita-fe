import { tiers, openAmount } from "@/content/tiers";

// Payment provider not wired yet (first preview). Validates the request against the
// tier data so the contract is settled; Stripe Checkout plugs in where marked.

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { tierId?: unknown; amountUsd?: unknown } | null;
  if (!body) return Response.json({ status: "error" }, { status: 400 });

  if (typeof body.tierId === "string") {
    const tier = tiers.find((t) => t.id === body.tierId);
    if (!tier) return Response.json({ status: "error" }, { status: 400 });
    if (!tier.approved) return Response.json({ status: "unavailable" }, { status: 409 });
  } else if (typeof body.amountUsd === "number") {
    if (!Number.isFinite(body.amountUsd) || body.amountUsd < openAmount.minUsd) {
      return Response.json({ status: "error" }, { status: 400 });
    }
  } else {
    return Response.json({ status: "error" }, { status: 400 });
  }

  // TODO(stripe): create a Checkout Session here when STRIPE_SECRET_KEY is set.
  return Response.json({ status: "not_configured" }, { status: 503 });
}
