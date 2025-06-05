const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();
const { generarEstudioMercado, generarTienda } = require('./ia');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('🤖 Bienvenido a tu Cerebro IA para Tienda Virtual\nSelecciona una opción:',
    Markup.inlineKeyboard([
      [Markup.button.callback('📊 Estudio de Mercado', 'estudio')],
      [Markup.button.callback('🏪 Crear Tienda', 'crear')],
    ])
  );
});

bot.action('estudio', async (ctx) => {
  await ctx.reply('🔍 Analizando tendencias en Google, Amazon y AliExpress...');
  const resultado = await generarEstudioMercado();
  ctx.replyWithMarkdown(`*Producto sugerido:* ${resultado.producto}\n*Nicho:* ${resultado.nicho}\n_Tendencia destacada:_ ${resultado.trend}`);
});

bot.action('crear', async (ctx) => {
  const datos = await generarTienda();
  ctx.replyWithMarkdown(`🛒 *Tienda generada automáticamente:*
*Nombre:* ${datos.nombre}
*Colores sugeridos:* ${datos.colores}
*Estilo visual:* ${datos.estilo}`);
});

module.exports = bot;