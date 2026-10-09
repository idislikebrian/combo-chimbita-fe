import { defineConfig } from "prisma/config";

// Neon connection names (same in .env.local and Vercel):
//   DATABASE_URL         direct host  -> Prisma CLI (migrate, studio)
//   DATABASE_URL_POOLED  -pooler host -> the app at runtime (src/lib/db.ts)
// The Prisma CLI doesn't load .env files; run it via `npm run db:*` (node --env-file).
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: process.env.DATABASE_URL },
});
