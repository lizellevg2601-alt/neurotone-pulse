// @ts-nocheck
export default {
  async fetch(request: Request, env: { neurotone_saved: any; ASSETS: any }): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/saved" && request.method === "GET") {
      const data = await env.neurotone_saved.get("saved", "json");
      return new Response(JSON.stringify(data || []), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (url.pathname === "/api/saved" && request.method === "POST") {
      const body = await request.json();
      await env.neurotone_saved.put("saved", JSON.stringify(body));
      return new Response(JSON.stringify({ ok: true }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (url.pathname === "/api/saved" && request.method === "OPTIONS") {
      return new Response(null, { status: 204 });
    }

    return env.ASSETS.fetch(request);
  },
};
