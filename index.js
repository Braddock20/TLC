// src/index.js
export default {
  async fetch(request) {
    const url = new URL(request.url)
    const target = url.searchParams.get("url")

    if (!target) {
      return new Response("Missing 'url' parameter", { status: 400 })
    }

    try {
      const res = await fetch(target)
      const data = await res.text()

      return new Response(data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": res.headers.get("content-type") || "text/plain",
        },
      })
    } catch (err) {
      return new Response(`Fetch error: ${err.message}`, { status: 502 })
    }
  },
}
