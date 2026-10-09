// Round-trip check of the runtime database path (pooled URL, Prisma client, Neon adapter).
// Usage: npm run db:check. Writes one throwaway row and deletes it; prints no credentials.
import { getDb } from "../src/lib/db";

const db = getDb();
if (!db) throw new Error("DATABASE_URL_POOLED / DATABASE_URL not set");
const id = `cs_check_${Date.now()}`;
const created = await db.pledge.create({
  data: { stripeSessionId: id, livemode: false, tierId: "check", amountCents: 1, currency: "usd", lang: "es", paymentStatus: "PENDING", fulfillmentStatus: "NOT_REQUIRED" },
});
const read = await db.pledge.findUnique({ where: { stripeSessionId: id } });
await db.pledge.delete({ where: { id: created.id } });
const gone = (await db.pledge.count({ where: { stripeSessionId: id } })) === 0;
const [pledges, events] = await Promise.all([db.pledge.count(), db.stripeEvent.count()]);
console.log({ pooled: !!process.env.DATABASE_URL_POOLED, write: !!created.id, read: read?.amountCents === 1, delete: gone, pledges, events });
await db.$disconnect();
