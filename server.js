require("dotenv").config();
const express = require("express");
const path = require("path");
const { Telegraf } = require("telegraf");
const fs = require("fs");

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

// Ruta de Webhook (Telegram)
app.use(bot.webhookCallback("/bot"));

// Ruta pública para la tienda HTML
app.use(express.static(path.join(__dirname, "tienda")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "tienda", "index.html"));
});

// Ruta opcional para revisar logs directamente (protegida si deseas)
app.get("/logs", (req, res) => {
  const logsPath = path.join(__dirname, "logs.txt");
  if (fs.existsSync(logsPath)) {
    res.sendFile(logsPath);
  } else {
    res.send("Sin logs disponibles.");
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
  bot.telegram.setWebhook(`${process.env.WEBHOOK_URL}/bot`)
    .then(() => console.log("✅ Webhook configurado con éxito."))
    .catch(err => console.error("❌ Error al configurar webhook:", err));
});
