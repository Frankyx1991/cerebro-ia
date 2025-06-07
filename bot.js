const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(
    '🧠 Bienvenido a tu Cerebro IA para tienda virtual. Selecciona una opción:',
    Markup.inlineKeyboard([
      [Markup.button.callback('🛍️ Crear tienda automática', 'crear')],
      [Markup.button.callback('📤 Publicar tienda en GitHub Pages', 'publicar')]
    ])
  );
});

// Acciones dummy para pruebas
bot.action('crear', (ctx) => ctx.reply('🛠 Función de creación de tienda en desarrollo.'));
bot.action('publicar', (ctx) => ctx.reply('🚀 Función de publicación en GitHub en desarrollo.'));

module.exports = bot;