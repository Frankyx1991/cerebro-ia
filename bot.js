require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const { obtenerEstudioMercado } = require('./ia');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('🤖 Bienvenido a tu Cerebro IA para Tienda Virtual\nSelecciona una opción:', Markup.inlineKeyboard([
    [Markup.button.callback('📊 Estudio de Mercado', 'estudio')],
    [Markup.button.callback('🛍️ Crear tienda automática', 'crear')],
    [Markup.button.callback('📤 Publicar tienda en GitHub Pages', 'publicar')]
  ]));
});

bot.action('estudio', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply('⏳ Analizando mercado...');
  const resultado = await obtenerEstudioMercado();
  ctx.reply(resultado);
});

bot.action('crear', async (ctx) => {
  await ctx.answerCbQuery();
  ctx.reply('⚙️ Generando tienda...');
  // Aquí se implementa la lógica para generar tienda (HTML + productos + logo + PayPal)
});

bot.action('publicar', async (ctx) => {
  await ctx.answerCbQuery();
  ctx.reply('🚀 Subiendo a GitHub Pages...');
  // Aquí se implementa lógica de push a GitHub
});

module.exports = bot;