require('dotenv').config();
const { Telegraf } = require('telegraf');
const { Configuration, OpenAIApi } = require('openai');

if (!process.env.BOT_TOKEN) {
  console.error('BOT_TOKEN no definido');
  process.exit(1);
}

const bot = new Telegraf(process.env.BOT_TOKEN);
const openai = process.env.OPENAI_API_KEY
  ? new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }))
  : null;

bot.start(ctx => ctx.reply('Bienvenido al bot de Cerebro IA'));

bot.on('text', async ctx => {
  if (!openai) {
    return ctx.reply('OpenAI API key no configurada');
  }
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: ctx.message.text }],
    });
    const reply = completion.choices[0]?.message?.content?.trim() || '';
    ctx.reply(reply);
  } catch (error) {
    console.error(error);
    ctx.reply('Error al obtener respuesta');
  }
});

bot.launch().then(() => console.log('Bot iniciado'));
