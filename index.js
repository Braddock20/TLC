export default {
  async fetch(request) {
    const { searchParams } = new URL(request.url);
    const term = searchParams.get("term") || "burna boy";
    const limit = searchParams.get("limit") || "10";
    const country = searchParams.get("country") || "US";

    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&limit=${limit}&country=${country}`;
    const response = await fetch(url);
    const data = await response.text();

    return new Response(data, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "max-age=60",
      }
    });
  }
}
