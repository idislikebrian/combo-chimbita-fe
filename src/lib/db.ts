import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/generated/prisma/client";

// Runtime uses Neon's pooled connection (DATABASE_URL_POOLED); DATABASE_URL is the
// direct host, kept for migrations (prisma.config.ts) and as a fallback.
// Returns null when the database isn't connected, so the page can fall back to placeholders.

const globalForDb = globalThis as unknown as { prisma?: PrismaClient };

export function getDb(): PrismaClient | null {
  if (globalForDb.prisma) return globalForDb.prisma;
  const connectionString = process.env.DATABASE_URL_POOLED ?? process.env.DATABASE_URL;
  if (!connectionString) return null;
  globalForDb.prisma = new PrismaClient({ adapter: new PrismaNeon({ connectionString }) });
  return globalForDb.prisma;
}
