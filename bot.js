const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  console.log("📥 /start recibido de:", ctx.chat.id);
  ctx.reply('🤖 Bienvenido a tu Cerebro IA para Tienda Virtual\nSelecciona una opción:',
    Markup.inlineKeyboard([
      [Markup.button.callback('📊 Estudio de Mercado', 'estudio')],
      [Markup.button.callback('🏪 Crear Tienda', 'crear')],
      [Markup.button.callback('📦 Pedidos', 'pedidos')],
      [Markup.button.callback('📣 Marketing', 'marketing')],
      [Markup.button.callback('🛎️ Soporte', 'soporte')],
      [Markup.button.callback('📈 Informe de Ventas', 'ventas')]
    ])
  );
});

bot.action('estudio', (ctx) => ctx.reply('🔍 Estudio de mercado aún en desarrollo.'));
bot.action('crear', (ctx) => ctx.reply('🛠 Crear tienda aún en desarrollo.'));
bot.action('pedidos', (ctx) => ctx.reply('📦 Gestión de pedidos próximamente.'));
bot.action('marketing', (ctx) => ctx.reply('📢 Módulo de marketing en desarrollo.'));
bot.action('soporte', (ctx) => ctx.reply('💬 Módulo de soporte aún no disponible.'));
bot.action('ventas', (ctx) => ctx.reply('📈 Informe de ventas en construcción.'));

module.exports = bot;