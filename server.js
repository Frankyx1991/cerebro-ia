require('dotenv').config();
const express = require('express');
const path = require('path');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

const openai = process.env.OPENAI_API_KEY
  ? new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }))
  : null;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'tienda')));

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.post('/api/chat', async (req, res) => {
  if (!openai) {
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'prompt required' });
  }
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });
    const message = completion.choices[0]?.message?.content?.trim() || '';
    res.json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch completion' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
