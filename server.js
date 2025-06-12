require('dotenv').config();
const express = require('express');
const path = require('path');
const { generarRespuesta } = require('./generador');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Servir archivos estáticos de la carpeta "tienda"
app.use(express.static(path.join(__dirname, 'tienda')));

// Endpoint para generar contenido usando OpenAI
app.get('/api/generar', async (req, res) => {
  const { prompt } = req.query;
  if (!prompt) {
    return res.status(400).json({ error: 'Falta el prompt' });
  }
  try {
    const respuesta = await generarRespuesta(prompt);
    res.json({ respuesta });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo generar la respuesta' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
});
