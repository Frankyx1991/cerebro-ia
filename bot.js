const { Telegraf } = require('telegraf');
require('dotenv').config();
const axios = require('axios');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Mensaje de bienvenida al iniciar
bot.start((ctx) => {
  ctx.reply(`🤖 Bienvenido a tu Cerebro IA
Puedes usar los siguientes comandos:

🧠 /estudio_mercado - Realiza un análisis del mercado
🛍️ /crear_tienda - Crea automáticamente una tienda HTML
📤 /publicar_tienda - Publica tu tienda en GitHub Pages
🧾 /informe_ventas - Muestra estadísticas de ventas simuladas
🆘 /help - Mostrar ayuda

Estoy listo para ayudarte a lanzar tu negocio con IA.`);
});

// Comandos disponibles (ejemplos básicos de handlers)
bot.command('help', (ctx) => {
  ctx.reply('ℹ️ Usa los comandos para interactuar con tu tienda automatizada.');
});

bot.command('estudio_mercado', async (ctx) => {
  ctx.reply('🔍 Analizando el mercado... (función simulada)');
});

bot.command('crear_tienda', async (ctx) => {
  ctx.reply('🏪 Generando tienda automática... (función simulada)');
});

bot.command('publicar_tienda', async (ctx) => {
  ctx.reply('📤 Publicando en GitHub Pages... (función simulada)');
});

bot.command('informe_ventas', async (ctx) => {
  ctx.reply('📊 Mostrando informe de ventas... (función simulada)');
});

module.exports = bot;