import { neon } from "@neondatabase/serverless";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    await sql`CREATE TABLE IF NOT EXISTS saved_prompts (
      id SERIAL PRIMARY KEY, title TEXT NOT NULL, style TEXT NOT NULL, content TEXT NOT NULL,
      page_name TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT now())`;

    if (req.method === "GET") {
      const rows = await sql`SELECT id, title, style, content, page_name AS "pageName", created_at AS "createdAt"
        FROM saved_prompts ORDER BY created_at DESC LIMIT 200`;
      return res.status(200).json(rows);
    }
    if (req.method === "POST") {
      const { title, style, content, pageName } = req.body ?? {};
      if (!title || !content) return res.status(400).json({ error: "title and content required" });
      const rows = await sql`INSERT INTO saved_prompts (title, style, content, page_name)
        VALUES (${title}, ${style ?? ""}, ${content}, ${pageName ?? null})
        RETURNING id, title, style, content, page_name AS "pageName", created_at AS "createdAt"`;
      return res.status(201).json(rows[0]);
    }
    if (req.method === "DELETE") {
      const id = Number(req.query.id);
      if (!id) return res.status(400).json({ error: "id required" });
      await sql`DELETE FROM saved_prompts WHERE id = ${id}`;
      return res.status(204).end();
    }
    res.setHeader("Allow", "GET, POST, DELETE");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
}
