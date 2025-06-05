const { Telegraf, Markup } = require('telegraf');
const { obtenerTendenciasReales } = require('./trends');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('🤖 Bienvenido a tu Cerebro IA para Tienda Virtual\nSelecciona una opción:',
    Markup.inlineKeyboard([
      [Markup.button.callback('📊 Estudio de Mercado', 'estudio')],
    ])
  );
});

bot.action('estudio', async (ctx) => {
  await ctx.reply('🔍 Consultando Google Trends en tiempo real...');
  const tendencias = await obtenerTendenciasReales();
  ctx.replyWithMarkdown(`*🔝 Tendencias actuales en España:*
${tendencias}`);
});

module.exports = bot;