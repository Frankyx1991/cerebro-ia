require('dotenv').config();
const express = require('express');
const bot = require('./bot');
const app = express();

app.use(express.json());
app.post('/webhook', (req, res) => {
  bot.manejarActualizacion(req.body);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Webhook escuchando en puerto ${PORT}`);
});
