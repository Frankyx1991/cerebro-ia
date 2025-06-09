const express = require('express');
const path = require('path');
const { Telegraf } = require('telegraf');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;
const bot = new Telegraf(process.env.BOT_TOKEN);

// Middleware del webhook de Telegram
app.use(bot.webhookCallback('/bot'));

// Servir HTML desde carpeta /tienda
app.use(express.static(path.join(__dirname, 'tienda')));

// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'tienda', 'index.html'));
});

// Configurar webhook de Telegram
bot.telegram.setWebhook(`${process.env.WEBHOOK_URL}/bot`);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor funcionando en puerto ${PORT}`);
  console.log(`✅ Webhook configurado en ${process.env.WEBHOOK_URL}/bot`);
});
