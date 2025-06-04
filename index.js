
require('dotenv').config();
const express = require('express');
const app = express();
const bot = require('./bot');

app.use(express.json());
app.post('/webhook', (req, res) => {
  bot.manejarActualizacion(req.body);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Webhook escuchando en puerto ${PORT}`));
