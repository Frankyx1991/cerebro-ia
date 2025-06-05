const express = require('express');
const bot = require('./bot');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/bot', express.raw({ type: '*/*' }));
app.post('/bot', bot.webhookCallback('/bot'));

app.get('/', (req, res) => {
  res.send('🤖 Cerebro IA en Railway funcionando.');
});

app.listen(PORT, async () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
  try {
    await bot.telegram.setWebhook(`${process.env.WEBHOOK_URL}/bot`);
    console.log("✅ Webhook configurado con éxito en Railway.");
  } catch (err) {
    console.error("❌ Error configurando webhook:", err);
  }
});