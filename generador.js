require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generarRespuesta(prompt) {
  if (!prompt) {
    throw new Error('Se requiere un prompt');
  }

  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-3.5-turbo'
  });

  return completion.choices[0]?.message?.content.trim();
}

module.exports = { generarRespuesta };
