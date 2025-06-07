const express = require('express');
const bot = require('./bot');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// 👇 Esto permite que Telegram entienda el cuerpo de la petición
app.use('/bot', express.raw({ type: '*/*' }));
app.post('/bot', bot.webhookCallback('/bot'));

// Endpoint base
app.get('/', (req, res) => {
  res.send("🤖 Cerebro IA - Bot activo");
});

// Iniciar servidor y configurar webhook
app.listen(PORT, async () => {
  console.log("Servidor funcionando en puerto " + PORT);
  try {
    await bot.telegram.setWebhook(`${process.env.WEBHOOK_URL}/bot`);
    console.log("✅ Webhook configurado con éxito.");
  } catch (err) {
    console.error("❌ Error configurando webhook:", err);
  }
});
