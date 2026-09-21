// Server-side proxy for the Crit Room panel.
//
// The browser component (ai-design-panel.jsx) never talks to Anthropic
// directly — it POSTs to this same-origin route instead, and THIS route
// (which runs on Vercel's server, not in the visitor's browser) attaches
// the real API key from an environment variable. That's the only safe
// place for the key to live: anything shipped to the browser — including
// a `NEXT_PUBLIC_...` env var — is visible to anyone who opens dev tools.
//
// Set ANTHROPIC_API_KEY in Vercel: Project Settings -> Environment Variables
// (and in `.env.local` for local dev — see .env.local.example).

export const runtime = "nodejs";

export async function POST(req) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: { message: "Server is missing ANTHROPIC_API_KEY." } },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch (e) {
    return Response.json(
      { error: { message: "Invalid JSON body." } },
      { status: 400 }
    );
  }

  const upstream = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: body.model || "claude-sonnet-4-5",
      max_tokens: body.max_tokens || 2500,
      messages: body.messages,
    }),
  });

  const data = await upstream.json().catch(() => ({}));
  return Response.json(data, { status: upstream.status });
}
