const fetch = require('node-fetch');
const { preguntarIA } = require('./market/openai.js');

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const API_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

async function enviarMensaje(texto, chatId) {
  console.log("📤 Enviando respuesta:", texto);
  await fetch(`${API_URL}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: texto,
      parse_mode: "Markdown"
    })
  });
}

async function procesarComando(mensaje, chatId) {
  const texto = mensaje.text.trim();
  console.log("🔍 Procesando comando:", texto);

  if (texto === '/start') {
    await enviarMensaje(`🤖 Bienvenido al Cerebro IA.
Comandos disponibles:
/start
/preguntar <tu duda>`, chatId);
  } else if (texto.startsWith('/preguntar')) {
    const pregunta = texto.replace('/preguntar', '').trim();
    if (!pregunta) {
      await enviarMensaje('❗ Escribe una pregunta después de /preguntar', chatId);
    } else {
      const respuesta = await preguntarIA(pregunta);
      await enviarMensaje(`🤖 ${respuesta}`, chatId);
    }
  } else {
    await enviarMensaje('❓ Comando no reconocido.', chatId);
  }
}

module.exports = { procesarComando };
