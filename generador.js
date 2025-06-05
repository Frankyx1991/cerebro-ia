const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const axios = require('axios');
const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function getIARespuesta(prompt) {
  // 1. OpenAI
  try {
    const res = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    });
    return res.choices[0].message.content;
  } catch (e1) {
    console.log("OpenAI falló, probando Gemini...");
    try {
      const geminiRes = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + process.env.GEMINI_API_KEY,
        { contents: [{ parts: [{ text: prompt }] }] }
      );
      return geminiRes.data.candidates[0].content.parts[0].text;
    } catch (e2) {
      console.log("Gemini falló, probando DeepSeek...");
      try {
        const res = await axios.post("https://api.deepseek.com/v1/chat/completions", {
          model: "deepseek-chat",
          messages: [{ role: "user", content: prompt }],
        }, {
          headers: { Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}` }
        });
        return res.data.choices[0].message.content;
      } catch (e3) {
        console.log("Todas las IAs fallaron.");
        return null;
      }
    }
  }
}

async function generarTiendaHTML() {
  const prompt = "Genera una tienda online sencilla en HTML con estilo moderno. Dame nombre, colores principales y descripción.";
  const respuesta = await getIARespuesta(prompt);

  if (!respuesta) return null;

  const dir = "/tmp/tienda-html";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  const nombre = "TiendaIA";
  const colores = "#4CAF50 y blanco";

  fs.writeFileSync(path.join(dir, "index.html"), `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${nombre}</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header><h1>${nombre}</h1></header>
  <section>
    <p>${respuesta}</p>
    <div class="producto">Producto 1</div>
    <div class="producto">Producto 2</div>
  </section>
</body>
</html>`);

  fs.writeFileSync(path.join(dir, "style.css"), `body {
  font-family: sans-serif;
  background-color: #fff;
  color: #333;
  margin: 0;
  padding: 0;
}
header {
  background-color: #4CAF50;
  color: white;
  padding: 1rem;
  text-align: center;
}
.producto {
  margin: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
}`);

  const zipPath = "/mnt/data/tienda-html.zip";
  const output = fs.createWriteStream(zipPath);
  const archive = archiver("zip", { zlib: { level: 9 } });

  return new Promise((resolve, reject) => {
    archive.pipe(output);
    archive.directory(dir, false);
    archive.finalize();

    output.on("close", () => resolve(zipPath));
    archive.on("error", err => reject(err));
  });
}

module.exports = { generarTiendaHTML };