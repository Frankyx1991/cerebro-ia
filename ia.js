const axios = require('axios');
const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function obtenerTendenciasConGPT() {
  try {
    const { data } = await axios.get('https://serpapi.com/search.json', {
      params: {
        engine: 'google_trends_daily',
        geo: 'ES',
        api_key: process.env.SERPAPI_KEY
      }
    });

    const tendencias = data.trending_searches.slice(0, 5).map((t, i) => `${i + 1}. ${t.title}`).join('\n');

    const prompt = `Estas son las tendencias más buscadas en España hoy:\n${tendencias}\n\nBasado en esto, dime:\n- 1 producto con potencial\n- Un nicho rentable\n- Nombre creativo para una tienda\n- Estilo visual recomendado\n- Colores ideales para su marca`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8
    });

    return `📈 *Tendencias actuales:*
${tendencias}

💡 *Propuesta IA:*
${completion.choices[0].message.content.trim()}`;
  } catch (err) {
    console.error("❌ Error con GPT o SerpAPI:", err);
    return "⚠️ No se pudo completar el análisis en este momento.";
  }
}

module.exports = { obtenerTendenciasConGPT };