const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('✅ El bot está funcionando correctamente. ¡Hola desde Cerebro IA!');
});

module.exports = bot;