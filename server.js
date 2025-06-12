const express = require('express');
const app = express();
require('dotenv').config();

const bot = require('./bot'); // Se asegura que el bot se inicie al cargar este archivo

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('🤖 Cerebro IA funcionando correctamente.');
});

app.post('/bot', express.json(), (req, res) => {
  bot.handleUpdate(req.body, res)
    .catch(err => {
      console.error('❌ Error al manejar actualización:', err);
      res.status(500).send('Internal Server Error');
    });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor funcionando en puerto ${PORT}`);
});