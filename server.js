const express = require('express');
const { bot } = require('./bot');
const app = express();

app.use(express.json());
app.post('/bot', (req, res) => {
  bot.handleUpdate(req.body).catch(err => console.error('Error en bot:', err));
  res.sendStatus(200);
});
app.get('/', (req, res) => res.send('Cerebro IA en ejecución'));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Servidor funcionando en puerto ${PORT}`));
