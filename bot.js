const { Telegraf, Markup } = require('telegraf');
const { obtenerTendenciasConGPT } = require('./ia');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('🤖 Bienvenido a tu Cerebro IA para Tienda Virtual\nSelecciona una opción:',
    Markup.inlineKeyboard([
      [Markup.button.callback('📊 Estudio de Mercado Inteligente', 'estudio')]
    ])
  );
});

bot.action('estudio', async (ctx) => {
  await ctx.reply('🔍 Analizando tendencias reales y generando propuesta con IA...');
  const mensaje = await obtenerTendenciasConGPT();
  ctx.replyWithMarkdown(mensaje);
});

module.exports = bot;