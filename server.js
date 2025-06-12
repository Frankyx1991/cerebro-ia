const express = require('express');
const bodyParser = require('body-parser');
const bot = require('./bot');

const app = express();
app.use(bodyParser.json());
app.post('/bot', bot);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
});