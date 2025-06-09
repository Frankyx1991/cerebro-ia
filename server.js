const express = require('express');
const path = require('path');
const { Telegraf } = require('telegraf');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;
const bot = new Telegraf(process.env.BOT_TOKEN);

// Configurar webhook (Railway necesita URL completa)
bot.telegram.setWebhook(`${process.env.WEBHOOK_URL}/bot`);
app.use(bot.webhookCallback('/bot'));

// Servir archivos HTML estáticos desde /tienda
app.use(express.static(path.join(__dirname, 'tienda')));

// Ruta raíz: mostrar index.html de la tienda
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'tienda', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor funcionando en puerto ${PORT}`);
  console.log(`✅ Webhook configurado en ${process.env.WEBHOOK_URL}/bot`);
});
