require('dotenv').config();
const axios = require('axios');

async function obtenerEstudioMercado() {
  try {
    // 1. Intentar con OpenAI
    const res = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Dame un estudio de mercado de productos en tendencia' }],
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    return res.data.choices[0].message.content;
  } catch (openaiError) {
    console.warn('❌ OpenAI falló. Probando con Gemini...');
    try {
      const geminiRes = await axios.post(`https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage?key=${process.env.GOOGLE_GEMINI_API_KEY}`, {
        prompt: {
          text: 'Dame un estudio de mercado de productos en tendencia'
        }
      });
      return geminiRes.data.candidates[0].content;
    } catch (geminiError) {
      console.warn('❌ Gemini falló. Probando con DeepSeek...');
      try {
        const deepRes = await axios.post('https://api.deepseek.com/v1/completions', {
          prompt: 'Dame un estudio de mercado de productos en tendencia',
          model: 'deepseek-chat',
          max_tokens: 500
        }, {
          headers: {
            'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
            'Content-Type': 'application/json'
          }
        });
        return deepRes.data.choices[0].text;
      } catch (deepError) {
        return '❌ Todas las IA fallaron. Intenta más tarde.';
      }
    }
  }
}

module.exports = { obtenerEstudioMercado };