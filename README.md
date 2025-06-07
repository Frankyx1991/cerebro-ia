# 🤖 Cerebro IA – Bot de gestión de tienda virtual

Este proyecto permite crear y publicar automáticamente una tienda online en GitHub Pages, controlado desde un bot de Telegram.

## 🚀 Funcionalidades

- Generar sitio HTML automáticamente con IA (OpenAI, Gemini, DeepSeek)
- Descargar la tienda como ZIP
- Publicar directamente en GitHub Pages
- Control completo desde Telegram

## ⚙️ Requisitos

- Node.js >= 16
- Cuenta en Telegram y un bot creado con BotFather
- Cuenta GitHub con un token personal

## 🛠️ Instalación

1. Clona este repositorio en Railway o localmente.
2. Copia `.env.example` a `.env` y rellena tus datos:

```env
BOT_TOKEN=xxxxxxxxxxxxxxxxxx
WEBHOOK_URL=https://tu-app.up.railway.app
OPENAI_API_KEY=sk-...
DEEPSEEK_API_KEY=sk-...
GEMINI_API_KEY=AIza...
GITHUB_TOKEN=ghp_...
GITHUB_USERNAME=TuUsuario
```

3. Instala dependencias:
```bash
npm install
```

4. Ejecuta:
```bash
node server.js
```

## 📱 Telegram

1. Abre tu bot en Telegram.
2. Envía `/start`.
3. Usa los botones:
   - 🛍️ Crear tienda automática
   - 📤 Publicar tienda en GitHub Pages

---

### ❗¿Problemas?

- Asegúrate que el webhook esté configurado:  
  `https://api.telegram.org/bot<tu_token>/getWebhookInfo`

- Revisa logs en Railway si no hay respuesta.
