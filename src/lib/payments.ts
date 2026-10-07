// The page's only contact point with payments. UI components call startCheckout();
// how the money is actually taken (Stripe Checkout today) lives behind /api/checkout.

export type CheckoutRequest = { tierId: string } | { amountUsd: number };

export type CheckoutResult =
  | { status: "redirect"; url: string }
  | { status: "not_configured" }
  | { status: "unavailable" }
  | { status: "error" };

export async function startCheckout(req: CheckoutRequest): Promise<CheckoutResult> {
  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      // Checkout opens in the language the page is showing.
      body: JSON.stringify({ ...req, lang: document.documentElement.dataset.lang === "en" ? "en" : "es" }),
    });
    const data = (await res.json().catch(() => ({}))) as Partial<CheckoutResult> & { url?: string };
    if (res.ok && data.url) return { status: "redirect", url: data.url };
    if (data.status === "not_configured" || data.status === "unavailable") return { status: data.status };
    return { status: "error" };
  } catch {
    return { status: "error" };
  }
}
