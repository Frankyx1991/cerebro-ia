require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const { procesarComando } = require('./bot.js');

const app = express();
const PORT = process.env.PORT || 3000;
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const API_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

function enviarMensaje(texto) {
  fetch(`${API_URL}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text: texto })
  });
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ Cerebro IA activo en Glitch.');
});

app.post('/webhook', async (req, res) => {
  const msg = req.body.message;
  console.log("📩 Mensaje recibido:", JSON.stringify(msg));

  if (msg && msg.text) {
    await procesarComando(msg, msg.chat.id);
  }

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`🚀 Webhook escuchando en puerto ${PORT}`);
  enviarMensaje('🧠 Cerebro IA iniciado en Glitch con Webhook activo.');
});
