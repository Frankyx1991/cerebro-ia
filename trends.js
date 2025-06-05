const googleTrends = require('google-trends-api');

async function obtenerTendenciasReales() {
  try {
    const res = await googleTrends.dailyTrends({ geo: 'ES' });
    const parsed = JSON.parse(res);
    const lista = parsed.default.trendingSearchesDays[0].trendingSearches.slice(0, 5);
    const tendencias = lista.map((t, i) => `${i + 1}. ${t.title.query}`).join('\n');
    return tendencias;
  } catch (error) {
    console.error("❌ Error al consultar Google Trends:", error);
    return "⚠️ No se pudo obtener tendencias en este momento.";
  }
}

module.exports = { obtenerTendenciasReales };