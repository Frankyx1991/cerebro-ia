const fetch = require('node-fetch');
const { preguntarIA } = require('./market/openai');

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const API_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

async function enviarMensaje(texto, chatId) {
  await fetch(`${API_URL}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: texto })
  });
}

async function manejarActualizacion(body) {
  if (!body.message || !body.message.text) return;
  const mensaje = body.message.text.trim();
  const chatId = body.message.chat.id;

  if (mensaje === '/start') {
    await enviarMensaje("🤖 Bienvenido al Cerebro IA.\nComando: /preguntar <tu pregunta>", chatId);
  } else if (mensaje.startsWith('/preguntar')) {
    const pregunta = mensaje.replace('/preguntar', '').trim();
    if (!pregunta) {
      await enviarMensaje("❗ Escribe una pregunta después de /preguntar", chatId);
    } else {
      const respuesta = await preguntarIA(pregunta);
      await enviarMensaje(respuesta, chatId);
    }
  } else {
    await enviarMensaje("❓ Comando no reconocido. Usa /preguntar <tu duda>", chatId);
  }
}

module.exports = { manejarActualizacion };
