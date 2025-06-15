require('dotenv').config();
const { Telegraf } = require('telegraf');
const express = require('express');
const bodyParser = require('body-parser');
const { realizarEstudioMercado } = require('./ia');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('🤖 Bienvenido a tu Cerebro IA conectado con Xenthia.');
});

bot.command('estudio_mercado', async (ctx) => {
  const datos = await realizarEstudioMercado();
  ctx.reply(`📊 Estudio de mercado realizado:

${datos}`);
});

module.exports = bot;