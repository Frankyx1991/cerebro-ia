const express = require('express');
const bodyParser = require('body-parser');
const bot = require('./bot');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware para parsear JSON y urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para el webhook de Telegram
app.post('/bot', (req, res) => {
  bot.handleUpdate(req.body)
    .then(() => res.status(200).send('OK'))
    .catch((err) => {
      console.error('❌ Error al manejar actualización:', err);
      res.status(500).send('Error');
    });
});

// Iniciar servidor y bot
app.listen(PORT, async () => {
  console.log(`🚀 Servidor funcionando en puerto ${PORT}`);
  try {
    await bot.launch();
    console.log('🤖 Bot lanzado correctamente');
  } catch (error) {
    console.error('❌ Error al lanzar el bot:', error);
  }
});