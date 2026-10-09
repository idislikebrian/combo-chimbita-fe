import { cacheLife, cacheTag } from "next/cache";
import { getDb } from "./db";
import { isLiveStripe } from "./stripe";

export const TOTALS_TAG = "pledge-totals";

export type Totals = { raisedUsd: number; backers: number; livemode: boolean };

/** Raised total and contribution count from PAID pledges only, in the current Stripe mode
 *  (test rows never count once live keys are in). null = database not reachable. */
export async function getTotals(): Promise<Totals | null> {
  "use cache";
  cacheTag(TOTALS_TAG);
  cacheLife("minutes"); // backstop; the webhook revalidates the tag on every payment change

  const db = getDb();
  if (!db) return null;
  const livemode = isLiveStripe();
  try {
    const agg = await db.pledge.aggregate({
      where: { livemode, paymentStatus: "PAID" },
      _sum: { amountCents: true },
      _count: { _all: true },
    });
    return { raisedUsd: (agg._sum.amountCents ?? 0) / 100, backers: agg._count._all, livemode };
  } catch (err) {
    console.error("[totals] query failed", (err as { code?: string }).code);
    return null;
  }
}
