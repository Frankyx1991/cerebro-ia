
const fetch = require('node-fetch');

async function preguntarIA(prompt) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      })
    });

    const data = await response.json();
    return data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content || '❌ Sin respuesta de OpenAI.';
  } catch (err) {
    console.error('❌ Error en OpenAI:', err);
    return '❌ Error en la solicitud a OpenAI.';
  }
}

module.exports = { preguntarIA };
