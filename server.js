const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const bot = require('./bot');

const app = express();
app.use(bodyParser.json());

app.post('/bot', (req, res) => {
  bot.handleUpdate(req.body, res).catch(err => {
    console.error('❌ Error al manejar actualización:', err);
    res.sendStatus(500);
  });
});

app.get('/', (req, res) => {
  res.send('🤖 Cerebro IA funcionando correctamente.');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Servidor funcionando en puerto ${PORT}`);
});