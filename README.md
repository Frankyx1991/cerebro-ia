# Cerebro IA

Este proyecto incluye un bot de Telegram, un servidor Express y un pequeño sitio web.

## Scripts

- `npm start` inicia el servidor web en `server.js`.
- `node bot.js` inicia el bot de Telegram (requiere `BOT_TOKEN`).
- `node generador.js` crea un archivo `tienda.zip` con el contenido de la carpeta `tienda`.

## Variables de entorno

Copie el archivo `.env.example` a `.env` y complete los tokens necesarios:

```
BOT_TOKEN=<tu token>
OPENAI_API_KEY=<tu api key>
PORT=3000
```

