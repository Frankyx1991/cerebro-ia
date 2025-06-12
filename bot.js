const { Telegraf } = require('telegraf');
const axios = require('axios');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) =>
  ctx.reply('🤖 Bienvenido a tu Cerebro IA
Selecciona una opción:')
);

bot.command('estudio', async (ctx) => {
  try {
    const res = await axios.post(`${process.env.XENTHIA_API}/estudio`);
    ctx.reply(res.data.resultado || '✅ Estudio completado');
  } catch (err) {
    console.error('❌ Error:', err.message);
    ctx.reply('Error al consultar Xenthia.');
  }
});

module.exports = async (req, res) => {
  try {
    await bot.handleUpdate(req.body);
    res.sendStatus(200);
  } catch (err) {
    console.error('❌ Error al manejar actualización:', err);
    res.sendStatus(500);
  }
};