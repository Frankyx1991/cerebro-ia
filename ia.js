const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function obtenerTendenciasConGPT() {
  const prompt = `Dame un producto rentable basado en tendencias actuales en España, junto con:
- Un nicho
- Nombre de tienda
- Estilo visual
- Colores recomendados`;
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.8
  });
  return `📊 *Estudio de Mercado IA:*
${response.choices[0].message.content.trim()}`;
}

async function crearCampaniaIA() {
  const prompt = `Crea una campaña breve para promocionar un masajeador facial portátil. Incluye:
- Título
- Texto publicitario
- Hashtags
- Emojis`;
  const res = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7
  });
  return `📣 *Campaña Generada:*
${res.choices[0].message.content.trim()}`;
}

function generarInforme() {
  return `📈 *Informe de Ventas (simulado)*:
- Ventas hoy: 14
- Ganancia total: 212,90 €
- Producto más vendido: Almohada ergonómica
- Reembolsos: 1 (7,50 €)`;
}

async function configurarTienda() {
  const prompt = `Imagina que estoy creando una tienda online sobre descanso. Sugiere:
- Un nombre original
- Paleta de colores
- Estilo visual (moderno, natural, etc.)`;
  const res = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.75
  });
  return `⚙️ *Configuración Sugerida:*
${res.choices[0].message.content.trim()}`;
}

function soporteCliente() {
  return `💬 *Soporte automático:*
- ¿Dónde está mi pedido? → Tu pedido está en camino 🚚
- ¿Cómo puedo pagar? → Aceptamos PayPal, tarjeta y Bizum ✅
- ¿Puedo devolver un producto? → Sí, dentro de 14 días.`;
}

module.exports = {
  obtenerTendenciasConGPT,
  crearCampaniaIA,
  generarInforme,
  configurarTienda,
  soporteCliente
};