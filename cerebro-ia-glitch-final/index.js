require('dotenv').config();
const express = require('express');
const app = express();
const bot = require('./bot');

app.use(express.json());

app.post('/webhook', (req, res) => {
  console.log("📥 Llamada entrante:", JSON.stringify(req.body));
  bot.manejarActualizacion(req.body);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Webhook escuchando en puerto ${PORT}`);
});
