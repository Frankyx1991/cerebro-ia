const express = require('express');
const path = require('path');
const bot = require('./bot');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Webhook para Telegram
app.use('/bot', express.raw({ type: '*/*' }));
app.post('/bot', bot.webhookCallback('/bot'));

// Servir HTML desde carpeta tienda
app.use(express.static(path.join(__dirname, 'tienda')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'tienda', 'index.html'));
});

// Configurar Webhook
bot.telegram.setWebhook(`${process.env.WEBHOOK_URL}/bot`);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor funcionando en puerto ${PORT}`);
});