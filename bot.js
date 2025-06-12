const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// Ejemplo de menú inicial
bot.start(ctx => {
  ctx.reply('🤖 Bienvenido a tu Cerebro IA', {
    reply_markup: {
      inline_keyboard: [
        [{ text: '📊 Estudio de Mercado', callback_data: 'estudio' }],
        [{ text: '🛍️ Crear tienda automática', callback_data: 'crear' }],
        [{ text: '📤 Publicar en GitHub Pages', callback_data: 'publicar' }]
      ]
    }
  });
});

// Callbacks de ejemplo
bot.on('callback_query', async ctx => {
  const data = ctx.callbackQuery.data;
  if (data === 'estudio') {
    await ctx.answerCbQuery();
    await ctx.reply('🔍 Realizando estudio de mercado...');
  } else if (data === 'crear') {
    await ctx.answerCbQuery();
    await ctx.reply('🛠️ Generando tienda HTML...');
  } else if (data === 'publicar') {
    await ctx.answerCbQuery();
    await ctx.reply('📤 Publicando en GitHub Pages...');
  }
});

module.exports = bot;