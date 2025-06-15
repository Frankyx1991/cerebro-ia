require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bot = require('./bot');

const app = express();
app.use(bodyParser.json());

app.post('/bot', (req, res) => {
  bot.handleUpdate(req.body);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
});