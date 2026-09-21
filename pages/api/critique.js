// Alternate version of the same proxy, for a Next.js project using the
// Pages Router (pages/api/...) instead of the App Router (app/api/...).
//
// Use ONLY ONE of app/api/critique/route.js or pages/api/critique.js —
// whichever matches your project's router — not both.
//
// Set ANTHROPIC_API_KEY in Vercel: Project Settings -> Environment Variables
// (and in `.env.local` for local dev — see .env.local.example).

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: { message: "Method not allowed" } });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: { message: "Server is missing ANTHROPIC_API_KEY." } });
    return;
  }

  const body = req.body || {};

  const upstream = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: body.model || "claude-sonnet-4-20250514",
      max_tokens: body.max_tokens || 2500,
      messages: body.messages,
    }),
  });

  const data = await upstream.json().catch(() => ({}));
  res.status(upstream.status).json(data);
}
