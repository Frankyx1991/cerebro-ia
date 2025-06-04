
const fetch = require('node-fetch');
const { preguntarIA } = require('./market/openai');

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function enviarMensaje(texto) {
  await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text: texto })
  });
}

async function manejarActualizacion(body) {
  if (!body.message || !body.message.text) return;

  const mensaje = body.message.text.trim();

  if (mensaje === '/start') {
    await enviarMensaje('🤖 Bienvenido al Cerebro IA.\nEscríbeme una idea o pregunta.');
  } else {
    const respuesta = await preguntarIA(mensaje);
    await enviarMensaje(respuesta);
  }
}

module.exports = { manejarActualizacion };
