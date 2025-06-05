const { Telegraf, Markup } = require('telegraf');
const { obtenerTendenciasConGPT, crearCampaniaIA, generarInforme, configurarTienda, soporteCliente } = require('./ia');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('🤖 Bienvenido al Cerebro IA para Tienda Virtual. Selecciona una opción:',
    Markup.inlineKeyboard([
      [Markup.button.callback('📊 Estudio de Mercado', 'estudio')],
      [Markup.button.callback('📣 Crear Campaña', 'campania')],
      [Markup.button.callback('📈 Informe de Ventas', 'informe')],
      [Markup.button.callback('⚙️ Configurar Tienda', 'configurar')],
      [Markup.button.callback('💬 Soporte', 'soporte')]
    ])
  );
});

bot.action('estudio', async (ctx) => {
  await ctx.reply('🔍 Analizando tendencias reales...');
  const mensaje = await obtenerTendenciasConGPT();
  ctx.replyWithMarkdown(mensaje);
});

bot.action('campania', async (ctx) => {
  await ctx.reply('📢 Generando campaña de marketing con IA...');
  const mensaje = await crearCampaniaIA();
  ctx.replyWithMarkdown(mensaje);
});

bot.action('informe', async (ctx) => {
  const informe = generarInforme();
  ctx.replyWithMarkdown(informe);
});

bot.action('configurar', async (ctx) => {
  const mensaje = await configurarTienda();
  ctx.replyWithMarkdown(mensaje);
});

bot.action('soporte', async (ctx) => {
  const mensaje = soporteCliente();
  ctx.replyWithMarkdown(mensaje);
});

module.exports = bot;