export default async function handler(req, res) {
  const { path = [] } = req.query;

  const upstream = `https://www.demonslayer-api.com/${path.join("/")}`;

  const qs = new URLSearchParams(req.query);
  qs.delete("path");

  const url = qs.toString() ? `${upstream}?${qs}` : upstream;

  try {
    const upstreamRes = await fetch(url, {
      method: req.method,
      headers: {
        accept: req.headers.accept || "*/*",
      },
    });

    res.setHeader(
      "Content-Type",
      upstreamRes.headers.get("content-type") || "application/json",
    );

    // CORS liberado para o front
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

    if (req.method === "OPTIONS") return res.status(204).end();

    const data = await upstreamRes.arrayBuffer();
    return res.status(upstreamRes.status).send(Buffer.from(data));
  } catch (e) {
    return res.status(500).json({ error: "Proxy failed", details: String(e) });
  }
}
