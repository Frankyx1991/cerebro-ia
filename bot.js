const { Telegraf } = require('telegraf');
require('dotenv').config();
const { generarHTML } = require('./generador');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('🤖 Bienvenido a Cerebro IA', {
    reply_markup: {
      inline_keyboard: [
        [{ text: '📊 Estudio de Mercado', callback_data: 'estudio' }],
        [{ text: '🛍️ Crear tienda automática', callback_data: 'crear' }],
        [{ text: '📤 Publicar tienda en GitHub Pages', callback_data: 'publicar' }]
      ]
    }
  });
});

bot.on('callback_query', async (ctx) => {
  const action = ctx.callbackQuery.data;
  if (action === 'crear') {
    const html = await generarHTML();
    ctx.reply('✅ Tienda generada automáticamente.');
  } else if (action === 'estudio') {
    ctx.reply('🔍 Iniciando estudio de mercado...');
  } else if (action === 'publicar') {
    ctx.reply('🚀 Subiendo a GitHub Pages...');
  }
  ctx.answerCbQuery();
});

module.exports = { bot };
