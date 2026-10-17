# FB Post Helper
React + Vite + TypeScript + Tailwind v4, Neon Postgres via Vercel serverless (`/api/prompts`).

1. `npm install`
2. Neon-এ project খুলে connection string নিন, `.env.local` এ `DATABASE_URL=...` দিন (table auto-create হয়; `schema.sql` ও আছে)
3. `npm i -g vercel` তারপর `vercel dev` (UI + API একসাথে চলে)
4. Deploy: `vercel` এবং Vercel project settings এ `DATABASE_URL` দিন
