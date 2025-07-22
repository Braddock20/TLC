// src/index.js

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const target = url.searchParams.get("url");

    if (!target) {
      return new Response("Missing 'url' parameter", { status: 400 });
    }

    try {
      const response = await fetch(target, {
        headers: {
          "User-Agent": "Mozilla/5.0", // to avoid iTunes blocking
        },
      });
      const data = await response.text();

      return new Response(data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": response.headers.get("content-type") || "text/plain",
        },
      });
    } catch (err) {
      return new Response("Fetch failed: " + err.message, { status: 502 });
    }
  },
};
