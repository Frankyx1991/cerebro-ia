require('dotenv').config();
const { Telegraf } = require('telegraf');
const { generarRespuesta } = require('./generador');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('Bienvenido a Cerebro IA'));

bot.on('text', async (ctx) => {
  try {
    const respuesta = await generarRespuesta(ctx.message.text);
    ctx.reply(respuesta);
  } catch (error) {
    console.error(error);
    ctx.reply('Ocurri\u00f3 un error al procesar tu solicitud');
  }
});

bot.launch().then(() => {
  console.log('Bot iniciado');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
