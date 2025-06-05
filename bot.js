const { Telegraf, Markup } = require('telegraf');
const { generarTiendaHTML } = require('./generador');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('🎨 Bienvenido al generador de tienda HTML por IA', Markup.inlineKeyboard([
    [Markup.button.callback('🛍️ Crear tienda automática', 'crear')]
  ]));
});

bot.action('crear', async (ctx) => {
  await ctx.reply('🧠 Generando tienda HTML...');
  const zipPath = await generarTiendaHTML();

  if (zipPath) {
    await ctx.replyWithDocument({ source: zipPath, filename: "tienda-html.zip" });
  } else {
    ctx.reply('❌ Error generando la tienda. Intenta más tarde.');
  }
});

module.exports = bot;