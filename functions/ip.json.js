// functions/ip.json.js
// Cloudflare Pages Function: expõe geolocalização aproximada por IP via request.cf
// URL final: https://seu-site.pages.dev/ip.json
// No seu front, use: fetch("./ip.json")

export async function onRequest(context) {
  const { request } = context;

  // Cloudflare injeta essas infos (quando disponíveis) em request.cf
  const cf = request.cf || {};

  // Algumas contas/planos/regiões podem não fornecer lat/lon sempre.
  // city/region/country costumam vir com mais frequência.
  const payload = {
    ok: true,
    source: "cloudflare",
    city: cf.city || null,
    region: cf.region || null,
    regionCode: cf.regionCode || null,
    postalCode: cf.postalCode || null,
    country: cf.country || null,
    continent: cf.continent || null,
    timezone: cf.timezone || null,

    // lat/lon podem ser undefined em alguns cenários
    lat: typeof cf.latitude === "number" ? cf.latitude : null,
    lon: typeof cf.longitude === "number" ? cf.longitude : null,
  };

  // Cache curto para não ficar batendo toda hora (ajuste se quiser)
  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=3600", // 1h
      "access-control-allow-origin": "*",
    },
  });
}
