const express = require('express');
const bot = require('./bot');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Solución: usar express.raw para evitar problemas con Telegram
app.use('/bot', express.raw({ type: '*/*' }));
app.post('/bot', bot.webhookCallback('/bot'));

app.get('/', (req, res) => {
  res.send('🤖 Cerebro IA - Webhook limpio y funcional');
});

app.listen(PORT, async () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
  try {
    await bot.telegram.setWebhook(`${process.env.WEBHOOK_URL}/bot`);
    console.log("✅ Webhook configurado con éxito.");
  } catch (err) {
    console.error("❌ Error configurando webhook:", err);
  }
});